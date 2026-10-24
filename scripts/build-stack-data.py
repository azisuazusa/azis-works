#!/usr/bin/env python3
"""Count which technologies appear in the repositories I committed to (aggregate only).

Reads go.mod / package.json / build.gradle* / composer.json in local clones. Writes src/data/stack.json.
Repository names are never written. Set KITABISA_DIR / FLIK_DIR to the folders holding the clones.
"""
import json, os, re, subprocess

KITABISA = os.environ.get("KITABISA_DIR", "../kitabisa")
FLIK = os.environ.get("FLIK_DIR", "../flik")
FLIK_REPOS = ["flik-shipping", "flik-backend", "flik-abdidalem", "merchant-dashboard-revamp", "flik-cicd",
              "shared", "blnk", "payment-gateway", "feature-flags", "asynq", "checkout-web", "test_tools"]
AUTHORS = ["azis.abdul.bachar@gmail.com", "azisuazusa@gmail.com",
           "azisuazusa@users.noreply.github.com", "18085025+azisuazusa@users.noreply.github.com"]

# label -> regexes matched against dependency manifests
TECH = {
    "Go": r"^module |^go \d",
    "PostgreSQL": r"lib/pq|jackc/pgx|go-pg|lib/pq",
    "Redis": r"go-redis|gomodule/redigo|hibiken/asynq|redis/",
    "RabbitMQ": r"streadway/amqp|rabbitmq/amqp091",
    "Kafka": r"segmentio/kafka-go|Shopify/sarama|IBM/sarama|confluent-kafka-go",
    "gRPC": r"google\.golang\.org/grpc",
    "AWS SDK": r"aws/aws-sdk-go",
    "Google Cloud": r"cloud\.google\.com/go",
    "OpenTelemetry": r"go\.opentelemetry\.io",
    "MongoDB": r"mongo-driver|mgo",
    "Kotlin / Android": r"org\.jetbrains\.kotlin|com\.android\.",
    "PHP / Laravel": r"laravel/framework",
}

def manifests(repo):
    out = []
    for root, dirs, files in os.walk(repo):
        dirs[:] = [d for d in dirs if d not in (".git", "node_modules", "vendor", "dist", "build")]
        for f in files:
            if f in ("go.mod", "package.json", "build.gradle", "build.gradle.kts", "composer.json", "libs.versions.toml"):
                out.append(os.path.join(root, f))
    return out

def authored(repo):
    r = subprocess.run(["git", "-C", repo, "log", "--all", "--no-merges", "-1", "--format=%H",
                        *[f"--author={a}" for a in AUTHORS]], capture_output=True, text=True)
    return bool(r.stdout.strip())

def scan(repo):
    text = ""
    for m in manifests(repo):
        try:
            text += open(m, errors="ignore").read() + "\n"
        except OSError:
            pass
    return {k for k, rx in TECH.items() if re.search(rx, text, re.M)}

def collect(paths):
    counts, n = {}, 0
    for p in paths:
        if not os.path.isdir(os.path.join(p, ".git")) or not authored(p):
            continue
        n += 1
        for t in scan(p):
            counts[t] = counts.get(t, 0) + 1
    return n, counts

k_repos = [os.path.join(KITABISA, d) for d in sorted(os.listdir(KITABISA))]
f_repos = [os.path.join(FLIK, d) for d in FLIK_REPOS]
kn, kc = collect(k_repos)
fn, fc = collect(f_repos)
techs = sorted(set(kc) | set(fc), key=lambda t: -(kc.get(t, 0) + fc.get(t, 0)))
out = {"kitabisaRepos": kn, "flikRepos": fn,
       "items": [{"name": t, "kitabisa": kc.get(t, 0), "flik": fc.get(t, 0)} for t in techs]}
json.dump(out, open("src/data/stack.json", "w"), indent=1)
print(json.dumps(out))
