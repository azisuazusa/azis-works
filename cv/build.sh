#!/usr/bin/env bash
# Render cv/cv.html to cv/Azis-Abdul-Bachar-CV.pdf with headless Chrome.
# Usage: ./cv/build.sh   (set CHROME to override the browser path)
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
chrome="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
out="$here/Azis-Abdul-Bachar-CV.pdf"

"$chrome" --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$out" "file://$here/cv.html" 2>/dev/null

echo "Wrote $out"
