#!/usr/bin/env bash
# Copies the screenshots and the app icon from the app repository into src/assets/images/.
# Usage: scripts/import-assets.sh <path-to-The-Shed-repo>
# Uses sips and qlmanage, both part of macOS. The app repository is only read: every file is
# written to this repository, never back to the source.
set -euo pipefail

app=${1:-}
if [[ -z "$app" || ! -d "$app" ]]; then
  echo "Usage: scripts/import-assets.sh <path-to-The-Shed-repo>" >&2
  exit 1
fi

root=$(cd "$(dirname "$0")/.." && pwd)
images="$root/src/assets/images"

need() {
  if [[ ! -f "$1" ]]; then
    echo "missing: $1${2:+ ($2)}" >&2
    exit 1
  fi
}

# Long edge 1600 px; Astro derives the smaller WebP variants at build time.
resize() {
  need "$1" "${3:-}"
  mkdir -p "$(dirname "$2")"
  sips -Z 1600 "$1" --out "$2" >/dev/null
  echo "✓ ${2#"$root/"}"
}

# The framed device shots (transparent background) for the homepage.
ipad=(mute loop tempo chords stems)
for lang in en de; do
  for index in "${!ipad[@]}"; do
    n=$((index + 1))
    resize "$app/design/screenshots/raw/ipad/$lang/0$n.png" \
      "$images/screenshots/$lang/ipad-0$n-${ipad[$index]}.png"
  done
  resize "$app/design/screenshots/raw/mac/$lang/01.png" "$images/screenshots/$lang/mac-01-practice.png"
done

# The captioned, opaque store screenshots for link previews.
for pair in en:en-US de:de-DE; do
  lang=${pair%%:*}
  locale=${pair#*:}
  resize "$app/store/build/screenshots/ios/$locale/APP_IPAD_PRO_3GEN_129/01_mute-your-part.png" \
    "$images/og/$lang.png" "run \`make screenshots\` in the app repo"
done

# The app icon, rendered from its SVG at 1024 × 1024.
icon="$app/design/app-icon/the-shed-icon.svg"
need "$icon"
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT
qlmanage -t -s 1024 -o "$tmp" "$icon" >/dev/null 2>&1
need "$tmp/the-shed-icon.svg.png" "qlmanage could not render the icon"
mv "$tmp/the-shed-icon.svg.png" "$images/app-icon.png"
echo "✓ ${images#"$root/"}/app-icon.png"
