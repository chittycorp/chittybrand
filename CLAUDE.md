# CLAUDE.md — ChittyBrand

## What This Is

Static brand asset repository + CDN worker for the ChittyOS ecosystem.

## Commands

```bash
# Validate SVGs:
find logos -name "*.svg" -exec xmllint --noout {} \;

# CDN worker (in cdn/ directory):
cd cdn && npm install
npm run dev              # Local dev server
npm run deploy:production # Deploy to brand.chitty.cc

# Sync assets to R2:
cd cdn && ./scripts/sync-to-r2.sh --env production
```

## Patterns

- Logo filenames: `chittyos-{variant}.svg` (e.g., `chittyos-mark.svg`, `chittyos-wordmark-white.svg`)
- SVG gradient IDs: `chitty-{variant}-grad` (e.g., `chitty-mark-grad`, `chitty-wm-grad`) — must match `@chittyos/core/brand` inline constants
- All hex colors uppercase in documentation, lowercase in SVG `style` attributes
- Design tokens follow W3C Design Tokens Community Group format
- OG template uses `{{PLACEHOLDER}}` syntax — values MUST be XML-escaped before substitution
- CDN serves assets at `brand.chitty.cc/{path}` (same paths as repo structure)

## Adding New Assets

1. Add the asset file to the appropriate directory
2. Update `README.md` with the new asset in the Contents section
3. If it's a new color or font, update `tokens/design-tokens.json` first, then align `@chittyos/core/brand`

## Canonical Reference

- Design tokens are the source of truth for colors/fonts
- `@chittyos/core/brand` must stay aligned with `tokens/design-tokens.json`
- When in doubt, the token file wins
