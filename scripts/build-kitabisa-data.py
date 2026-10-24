#!/usr/bin/env python3
"""Derive src/data/kitabisa.json from local clones of the Kitabisa repositories.

Usage: python3 scripts/build-kitabisa-data.py [path/to/kitabisa/clones]   (or set KITABISA_DIR)
Only aggregates are written (no repository names, messages or code).
"""
import collections, json, os, subprocess, sys

root = sys.argv[1] if len(sys.argv) > 1 else os.environ.get("KITABISA_DIR", "../kitabisa")
AUTHORS = ["azis.abdul.bachar@gmail.com", "azisuazusa@gmail.com",
           "azisuazusa@users.noreply.github.com", "18085025+azisuazusa@users.noreply.github.com"]
CUTOFF = "2023-07-31"  # end of the Kitabisa role on LinkedIn

def git(repo, *args):
    return subprocess.run(["git", "-C", repo, *args], capture_output=True, text=True).stdout

by_year = collections.Counter()
by_period = {"employed": collections.Counter(), "later": collections.Counter()}
repos_period = {"employed": set(), "later": set()}
repos_active = set()
langs = collections.Counter()
for name in sorted(os.listdir(root)):
    repo = os.path.join(root, name)
    if not os.path.isdir(os.path.join(repo, ".git")):
        continue
    out = git(repo, "log", "--all", "--no-merges", *[f"--author={a}" for a in AUTHORS],
              "--numstat", "--format=@@%ad", "--date=short")
    date, n_repo = None, 0
    for line in out.splitlines():
        if line.startswith("@@"):
            date = line[2:]; n_repo += 1
            per = "employed" if date <= CUTOFF else "later"
            by_year[date[:4]] += 1
            by_period[per]["commits"] += 1
            repos_period[per].add(name)
        elif line.strip():
            a, d, *_ = line.split("\t")
            if a != "-":
                per = "employed" if date <= CUTOFF else "later"
                by_period[per]["added"] += int(a); by_period[per]["deleted"] += int(d)
    if n_repo:
        repos_active.add(name)
        files = git(repo, "ls-files").split()
        ext = collections.Counter(f.rsplit(".", 1)[-1] for f in files if "." in f)
        top = max(("go", "php", "kt", "java", "js", "ts", "py"), key=lambda e: ext.get(e, 0))
        langs[top] += 1

tot = lambda k: sum(p[k] for p in by_period.values())
out = {
    "cutoff": CUTOFF,
    "commits": tot("commits"),
    "added": tot("added"),
    "deleted": tot("deleted"),
    "repos": len(repos_active),
    "mainLanguageRepos": dict(langs),
    "byYear": dict(sorted(by_year.items())),
    "periods": {k: {"commits": v["commits"], "added": v["added"], "deleted": v["deleted"], "repos": len(repos_period[k])}
                for k, v in by_period.items()},
}
json.dump(out, open("src/data/kitabisa.json", "w"), indent=1)
print(json.dumps(out))
