---
uri: chittycanon://docs/tech/arch/chittybrand
namespace: chittycanon://docs/tech
type: architecture
title: ChittyBrand Architecture
author: ChittyCorp
created: 2026-03-24
version: 1.0.0
status: DRAFT
visibility: public
registered_with: chittycanon://core/services/canon
---

# ChittyBrand Architecture

## Position in Ecosystem

ChittyBrand is a static asset repository — no runtime, no deployments. It serves as the canonical reference for visual identity across all orgs (CHITTYFOUNDATION, CHITTYOS, CHITTYCORP, CHITTYAPPS, CHICAGOAPPS, CHITCOMMIT).

## Stack

- Static SVG, JSON, and Markdown files
- No build step
- Assets referenced via GitHub raw URLs or copied into consuming services

## Relationship to @chittyos/core/brand

The `design-tokens.json` in this repo is the **design source of truth**. The TypeScript constants in `@chittyos/core/brand` are the **programmatic source of truth** derived from these tokens. When values diverge, `design-tokens.json` wins.

## Brand Identity

- **Colors**: Indigo (#6366F1) → Violet (#8B5CF6) gradient, dark surface #0F0F1A
- **Typography**: Syne (display), Figtree (body), JetBrains Mono (code)
- **Tagline**: "Making proof as frictionless as speech"

## Org Color Mapping

| Org | Color | Hex |
|-----|-------|-----|
| CHITTYFOUNDATION | Violet | #8B5CF6 |
| CHITTYOS | Indigo | #6366F1 |
| CHITTYCORP | Deep Indigo | #4F46E5 |
| CHITTYAPPS | Light Violet | #A78BFA |
| CHICAGOAPPS | Indigo | #6366F1 |
| CHITCOMMIT | Dark Indigo | #312E81 |

## Certification

- **Level**: Pending
- **Registry ID**: Not yet registered
