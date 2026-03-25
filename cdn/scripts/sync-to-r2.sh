#!/usr/bin/env bash
# Sync brand assets from repo root into R2 bucket
# Usage: ./scripts/sync-to-r2.sh [production]
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
BUCKET="chitty-brand-assets"
ENV="${1:-}"

upload() {
  local src="$1" key="$2"
  echo "  $key"
  if [ -n "$ENV" ]; then
    npx wrangler r2 object put "$BUCKET/$key" --file "$src" --remote
  else
    npx wrangler r2 object put "$BUCKET/$key" --file "$src" --remote
  fi
}

echo "Syncing brand assets to R2 bucket: $BUCKET"

# Logos
for f in "$REPO_ROOT"/logos/mark/*.svg; do
  upload "$f" "logos/mark/$(basename "$f")"
done
for f in "$REPO_ROOT"/logos/wordmark/*.svg; do
  upload "$f" "logos/wordmark/$(basename "$f")"
done
for f in "$REPO_ROOT"/logos/lockup/*.svg; do
  upload "$f" "logos/lockup/$(basename "$f")"
done

# Tokens
upload "$REPO_ROOT/tokens/design-tokens.json" "tokens/design-tokens.json"

# Badges
for f in "$REPO_ROOT"/badges/*.svg; do
  upload "$f" "badges/$(basename "$f")"
done

# OG images
for f in "$REPO_ROOT"/og-images/*.svg; do
  upload "$f" "og-images/$(basename "$f")"
done

echo "Done."
