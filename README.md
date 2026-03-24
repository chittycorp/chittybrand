# ChittyBrand

Official brand assets for the ChittyOS ecosystem.

> Making proof as frictionless as speech

## Contents

```
logos/
  mark/           # "C" mark — primary icon, favicon, app icon
  wordmark/       # Mark + "ChittyOS" text
  lockup/         # Mark + text + tagline
tokens/
  design-tokens.json   # Colors, typography, spacing, shadows
badges/
  chittyos-badge.svg   # GitHub README badge
  foundation-badge.svg
  tier-badges.md       # Copy-paste shields.io badge URLs
og-images/
  og-template.svg      # 1200x630 OG image template
```

## Colors

| Role | Light | Dark | Hex |
|------|-------|------|-----|
| Primary | Indigo 600 | Indigo 400 | `#4F46E5` / `#818CF8` |
| Secondary | Indigo 500 | Indigo 300 | `#6366F1` / `#A5B4FC` |
| Accent | Violet 500 | Violet 300 | `#8B5CF6` / `#C4B5FD` |
| Surface | White | Deep Navy | `#FFFFFF` / `#0F0F1A` |
| Gradient | — | — | `#6366F1 → #8B5CF6` (135deg) |

## Typography

| Role | Family | Weights |
|------|--------|---------|
| Display / Headings | **Syne** | 600, 700, 800 |
| Body | **Figtree** | 400, 500, 600, 700 |
| Code | **JetBrains Mono** | 400, 500, 700 |

```css
@import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Syne:wght@600;700;800&display=swap');
```

## Usage in Code

### Via `@chittyos/core`

```ts
import { CHITTY_COLORS, CHITTY_THEME, LOGO_MARK_SVG } from '@chittyos/core/brand'
```

### Google Fonts link tag

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Syne:wght@600;700;800&display=swap" rel="stylesheet">
```

## Org Mapping

| Org | Purpose | Badge Color |
|-----|---------|-------------|
| **CHITTYFOUNDATION** | Non-profit trust infrastructure | Violet `#8B5CF6` |
| **CHITTYOS** | Core platform services | Indigo `#6366F1` |
| **CHITTYCORP** | Corporate / internal | Deep Indigo `#4F46E5` |
| **CHITTYAPPS** | End-user applications | Light Violet `#A78BFA` |
| **CHICAGOAPPS** | Chicago-specific apps | Indigo `#6366F1` |
| **CHITCOMMIT** | Data & case repos | Slate `#312E81` |

## License

Brand assets are proprietary to ChittyCorp. Not licensed for use outside the ChittyOS ecosystem without written permission.
