#!/usr/bin/env python3
"""Derive src/data/flik.json from the FLIK contribution-summary pipeline output.

Usage: python3 scripts/build-flik-data.py [path/to/classified_prs.json]   (or set FLIK_DATA)
Only aggregate PR counts are written; titles, links and business figures are not.
"""
import collections, datetime, json, sys

import os
src = sys.argv[1] if len(sys.argv) > 1 else os.environ.get("FLIK_DATA", "../flik/contribution-summary/data/classified_prs.json")
prs = json.load(open(src))
prs.sort(key=lambda p: p["mergedAt"])

by_year = collections.Counter(p["mergedAt"][:4] for p in prs)
by_month = collections.Counter(p["mergedAt"][:7] for p in prs)
by_repo = collections.Counter(p["repository"]["name"] for p in prs)
by_theme = collections.Counter(p["theme"] for p in prs)

# every month between first and last, zero-filled, so the chart has no gaps
y, m = map(int, prs[0]["mergedAt"][:7].split("-"))
ly, lm = map(int, prs[-1]["mergedAt"][:7].split("-"))
months = []
while (y, m) <= (ly, lm):
    k = f"{y}-{m:02d}"
    months.append({"month": k, "prs": by_month.get(k, 0)})
    y, m = (y + 1, 1) if m == 12 else (y, m + 1)

out = {
    "asOf": prs[-1]["mergedAt"][:10],
    "firstMerged": prs[0]["mergedAt"][:10],
    "total": len(prs),
    "repos": len(by_repo),
    "additions": sum(p["additions"] for p in prs),
    "deletions": sum(p["deletions"] for p in prs),
    "byYear": dict(sorted(by_year.items())),
    "byRepo": [{"name": k, "prs": v} for k, v in by_repo.most_common()],
    "byTheme": [{"name": k, "prs": v} for k, v in by_theme.most_common() if k != "Other"],
    "byMonth": months,
}
json.dump(out, open("src/data/flik.json", "w"), indent=1)
print(f"flik.json: {out['total']} PRs, {out['repos']} repos, as of {out['asOf']}")
