# CLAUDE.md — ChittyBrand

## What This Is

Static brand asset repository for the ChittyOS ecosystem. No code, no build, no deploy.

## Commands

```bash
# None — this is a static asset repo
# To validate SVGs:
find logos -name "*.svg" -exec xmllint --noout {} \;
```

## Patterns

- Logo filenames: `chittyos-{variant}.svg` (e.g., `chittyos-mark.svg`, `chittyos-wordmark-white.svg`)
- All hex colors uppercase in documentation, lowercase in SVG `style` attributes
- Design tokens follow W3C Design Tokens Community Group format
- OG template uses `{{PLACEHOLDER}}` syntax — values MUST be XML-escaped before substitution

## Adding New Assets

1. Add the asset file to the appropriate directory
2. Update `README.md` with the new asset in the Contents section
3. If it's a new color or font, update `tokens/design-tokens.json` first, then align `@chittyos/core/brand`

## Canonical Reference

- Design tokens are the source of truth for colors/fonts
- `@chittyos/core/brand` must stay aligned with `tokens/design-tokens.json`
- When in doubt, the token file wins
