#!/usr/bin/env bash
# Render the social preview images (1200x630) from og/og.html + og/pages.js with headless Chrome.
# "home" -> public/og.png; every other slug -> public/og/<slug>.png.
# Usage: ./og/build.sh   (set CHROME to override the browser path)
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
pub="$here/../public"
chrome="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
slugs=$(grep -oE "^  '?[a-z-]+'?: \{" "$here/pages.js" | tr -d " ':{")

mkdir -p "$pub/og"
for slug in $slugs; do
  if [ "$slug" = home ]; then out="$pub/og.png"; else out="$pub/og/$slug.png"; fi
  "$chrome" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
    --window-size=1200,630 --screenshot="$out" "file://$here/og.html#$slug" 2>/dev/null
  echo "Wrote ${out#$here/../}"
done
