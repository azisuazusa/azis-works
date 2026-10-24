# azis.works

Static portfolio site (Astro 6) for Azis Abdul Bachar. Deployed to GitHub Pages at <https://azis.works>.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # output in dist/
```

Requires Node >= 22.12.

## Where things live

| What | Where |
|---|---|
| Contact links, PDF URL | `src/config.ts` |
| LinkedIn-derived experience, awards, education | `src/data/experience.ts` |
| FLIK PR aggregates | `src/data/flik.json` (generated) |
| FLIK deep-dive pages | `src/pages/flik/*.md` |
| yourspace page | `src/pages/yourspace.astro` |
| Optional yourspace usage totals | `src/data/yourspace-metrics.json` (page renders without it) |

## Refreshing FLIK numbers

```bash
(cd ../flik/contribution-summary && ./update.sh --no-db)   # refresh the PR data
python3 scripts/build-flik-data.py                          # or set FLIK_DATA to another path
```

`flik.json` holds only aggregate counts. Business figures on the deep-dive pages are rounded and hand-written (production data as of 8 Sep 2026).

## Resume button

The button uses `site.pdf` in `src/config.ts`, a Google Drive direct-download link
(`https://drive.google.com/uc?export=download&id=<FILE_ID>`). The Drive file must be shared as "Anyone with the link".

## Deploy and custom domain

1. Push to a GitHub repo, then Settings > Pages > Source: **GitHub Actions**.
2. `public/CNAME` already contains `azis.works`. Set Settings > Pages > Custom domain to `azis.works` and enable HTTPS.
3. DNS for the apex `azis.works`: four `A` records to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   (and optionally the matching `AAAA` records). Optional `www`: a `CNAME` to `<github-user>.github.io`.
