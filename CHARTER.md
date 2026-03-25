---
uri: chittycanon://docs/tech/charter/chittybrand
namespace: chittycanon://docs/tech
type: charter
title: ChittyBrand Charter
author: ChittyCorp
created: 2026-03-24
version: 1.0.0
status: DRAFT
visibility: public
registered_with: chittycanon://core/services/canon
---

# ChittyBrand Charter

## Purpose

Single source of truth for ChittyOS ecosystem visual identity — logos, design tokens, badge kit, OG image templates, and style guide.

## Scope

### In Scope

- Logo SVGs (mark, wordmark, lockup) in light and dark variants
- Design tokens JSON (colors, typography, spacing, shadows)
- Badge SVGs and shields.io URL templates for GitHub READMEs
- OG image templates for social sharing
- README header template for ecosystem-wide consistency

### Out of Scope

- Runtime brand code (lives in `@chittyos/core/brand`)
- UI component library (future scope)
- Marketing copy or landing page content

## Dependencies

- None (static assets, no runtime dependencies)

## Consumers

- All ChittyOS ecosystem repos (README badges, favicons)
- `@chittyos/core/brand` (canonical color/font values derived from `tokens/design-tokens.json`)
- OG image generation services (template consumers)

## Exports

| Asset | Path | Format |
|-------|------|--------|
| Logo mark | `logos/mark/chittyos-mark.svg` | SVG |
| Logo mark (dark) | `logos/mark/chittyos-mark-dark.svg` | SVG |
| Wordmark | `logos/wordmark/chittyos-wordmark.svg` | SVG |
| Wordmark (white) | `logos/wordmark/chittyos-wordmark-white.svg` | SVG |
| Lockup | `logos/lockup/chittyos-lockup.svg` | SVG |
| Design tokens | `tokens/design-tokens.json` | JSON |
| OG template | `og-images/og-template.svg` | SVG |
| Badges | `badges/*.svg` | SVG |
| Tier badge URLs | `badges/tier-badges.md` | Markdown |
| README template | `templates/README-HEADER.md` | Markdown |
| CDN worker | `cdn/` | Cloudflare Worker |
| CDN endpoint | `brand.chitty.cc/*` | HTTPS |
