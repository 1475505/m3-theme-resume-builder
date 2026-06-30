---
version: alpha
name: M3-Resume-Builder-design-system
description: A Material Design 3 (M3 / Material You) design system for resume builders, built on HCT color generation from a user-selected seed color, a 15-level type scale, 7-step shape scale, 6-level elevation, and a 4dp spacing grid. The system is print-optimized for A4 paper output via Puppeteer PDF rendering. All visual decisions use M3 design tokens — no arbitrary values are permitted. Colors are generated dynamically through the HCT (Hue-Chroma-Tone) algorithm from 5 key color groups (Primary, Secondary, Tertiary, Neutral, Neutral Variant), each producing a tone palette from 0–100. Typography pairs Roboto for Latin text with Noto Sans SC for CJK, with print-specific constraints ensuring readability at 10.5pt minimum body size. Components follow M3 specifications with resume-specific adaptations for print density and A4 page constraints.

colors:
  # Primary (M3 baseline seed #6750A4, light theme)
  primary: "#6750A4"
  on-primary: "#FFFFFF"
  primary-container: "#EADDFF"
  on-primary-container: "#21005D"
  # Secondary
  secondary: "#625B71"
  on-secondary: "#FFFFFF"
  secondary-container: "#E8DEF8"
  on-secondary-container: "#1D192B"
  # Tertiary
  tertiary: "#7D5260"
  on-tertiary: "#FFFFFF"
  tertiary-container: "#FFD8E4"
  on-tertiary-container: "#31111D"
  # Error
  error: "#B3261E"
  on-error: "#FFFFFF"
  error-container: "#F9DEDC"
  on-error-container: "#410E0B"
  # Surface
  surface: "#FEF7FF"
  on-surface: "#1D1B20"
  on-surface-variant: "#49454F"
  surface-variant: "#E7E0EC"
  surface-container-lowest: "#FFFFFF"
  surface-container-low: "#F7F2FA"
  surface-container: "#F3EDF7"
  surface-container-high: "#ECE6F0"
  surface-container-highest: "#E6E0E9"
  surface-dim: "#DED8E1"
  surface-bright: "#FEF7FF"
  # Inverse
  inverse-surface: "#322F35"
  inverse-on-surface: "#F5EFF7"
  inverse-primary: "#D0BCFF"
  # Outline
  outline: "#79747E"
  outline-variant: "#CAC4D0"
  # Scrim
  scrim: "#000000"
  # Derived (state layer opacities)
  primary-08: "rgba(103, 80, 164, 0.08)"
  primary-12: "rgba(103, 80, 164, 0.12)"

typography:
  display-large:
    fontFamily: "Roboto, Noto Sans SC, sans-serif"
    fontSize: 57px
    fontWeight: 400
    lineHeight: 64px
    letterSpacing: -0.25px
  display-medium:
    fontFamily: "Roboto, Noto Sans SC, sans-serif"
    fontSize: 45px
    fontWeight: 400
    lineHeight: 52px
    letterSpacing: 0
  display-small:
    fontFamily: "Roboto, Noto Sans SC, sans-serif"
    fontSize: 36px
    fontWeight: 400
    lineHeight: 44px
    letterSpacing: 0
  headline-large:
    fontFamily: "Roboto, Noto Sans SC, sans-serif"
    fontSize: 32px
    fontWeight: 400
    lineHeight: 40px
    letterSpacing: 0
  headline-medium:
    fontFamily: "Roboto, Noto Sans SC, sans-serif"
    fontSize: 28px
    fontWeight: 400
    lineHeight: 36px
    letterSpacing: 0
  headline-small:
    fontFamily: "Roboto, Noto Sans SC, sans-serif"
    fontSize: 24px
    fontWeight: 400
    lineHeight: 32px
    letterSpacing: 0
  title-large:
    fontFamily: "Roboto, Noto Sans SC, sans-serif"
    fontSize: 22px
    fontWeight: 600
    lineHeight: 28px
    letterSpacing: 0
  title-medium:
    fontFamily: "Roboto, Noto Sans SC, sans-serif"
    fontSize: 16px
    fontWeight: 500
    lineHeight: 24px
    letterSpacing: 0.15px
  title-small:
    fontFamily: "Roboto, Noto Sans SC, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 20px
    letterSpacing: 0.1px
  body-large:
    fontFamily: "Roboto, Noto Sans SC, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 24px
    letterSpacing: 0.5px
  body-medium:
    fontFamily: "Roboto, Noto Sans SC, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 20px
    letterSpacing: 0.25px
  body-small:
    fontFamily: "Roboto, Noto Sans SC, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 16px
    letterSpacing: 0.4px
  label-large:
    fontFamily: "Roboto, Noto Sans SC, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 20px
    letterSpacing: 0.1px
  label-medium:
    fontFamily: "Roboto, Noto Sans SC, sans-serif"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 16px
    letterSpacing: 0.5px
  label-small:
    fontFamily: "Roboto, Noto Sans SC, sans-serif"
    fontSize: 11px
    fontWeight: 500
    lineHeight: 16px
    letterSpacing: 0.5px

rounded:
  none: 0px
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 28px
  full: 9999px

spacing:
  sp-2: 2px
  sp-4: 4px
  sp-6: 6px
  sp-8: 8px
  sp-10: 10px
  sp-12: 12px
  sp-16: 16px
  sp-20: 20px
  sp-24: 24px
  sp-32: 32px
  sp-48: 48px

components:
  card-elevated:
    backgroundColor: "{colors.surface-container-low}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "{spacing.sp-16}"
  card-filled:
    backgroundColor: "{colors.surface-container-highest}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "{spacing.sp-16}"
  card-outlined:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "{spacing.sp-16}"
  chip:
    backgroundColor: "{colors.secondary-container}"
    textColor: "{colors.on-secondary-container}"
    typography: "{typography.label-medium}"
    rounded: "{rounded.sm}"
    padding: "0 {spacing.sp-12}"
    height: "28px"
  chip-highlight:
    backgroundColor: "{colors.primary-container}"
    textColor: "{colors.on-primary-container}"
    typography: "{typography.label-medium}"
    rounded: "{rounded.sm}"
    padding: "0 {spacing.sp-12}"
    height: "28px"
  list-item-single:
    height: "56px"
    padding: "{spacing.sp-8} {spacing.sp-16}"
    typography: "{typography.body-large}"
  list-item-double:
    height: "72px"
    padding: "{spacing.sp-8} {spacing.sp-16}"
    typography: "{typography.body-large}"
  list-item-triple:
    height: "88px"
    padding: "{spacing.sp-12} {spacing.sp-16}"
    typography: "{typography.body-large}"
  divider:
    backgroundColor: "{colors.outline-variant}"
    size: "1px"
  icon-xs:
    size: "18px"
  icon-s:
    size: "20px"
  icon-m:
    size: "24px"
  icon-l:
    size: "36px"
---

## Overview

This design system defines the visual language for an M3-style resume builder. The system is built on Google Material Design 3 (M3 / Material You) and extends it with print-optimized constraints for A4 paper output via Puppeteer PDF rendering.

The color system uses the HCT (Hue-Chroma-Tone) color space. Users select a Seed Color, and the HCT algorithm generates a complete 30+ role palette from 5 key color groups: Primary, Secondary, Tertiary, Neutral, and Neutral Variant. Each group produces a tone palette from 0–100. The Neutral hue inherits the Seed Hue with saturation at 8% of the Seed Saturation (chroma clamped to 16); the Neutral Variant inherits the Seed Hue at 16% saturation (chroma clamped to 16). The Tertiary color is offset +60° in hue from the Primary for contrast.

Typography pairs Roboto (M3 default) for Latin text with Noto Sans SC for CJK. The system defines a 15-level type scale from displayLarge (57px) to labelSmall (11px). For print output, a parallel pt-based scale is used with the conversion `1pt = 4/3 px (at 96dpi)`. The minimum body text size for print is 10.5pt (14px) to preserve CJK stroke legibility.

The layout system is based on a 4dp spacing grid with tokens from 2px to 48px. A4 paper dimensions (210mm × 297mm) define the print canvas, with standard page margins of 15–18mm. The system supports light and dark themes, with all color roles having defined tone mappings for both.

**Key Characteristics:**
- HCT-based dynamic color generation from a user-selected seed color — no hardcoded hex values, all colors reference M3 tokens.
- 15-level M3 type scale with parallel pt-based print mapping for A4 output.
- Print-first design: `print-color-adjust: exact` is mandatory; `break-inside: avoid` prevents content fragmentation across pages.
- 4dp spacing grid with 11 tokens from `{spacing.sp-2}` to `{spacing.sp-48}`.
- 7-step shape scale from `{rounded.none}` (0px) to `{rounded.full}` (9999px) — no other radius values are permitted.
- 6-level elevation system using box-shadow (not tonal tint) for print consistency.
- Puppeteer PDF rendering with `printBackground: true` and `deviceScaleFactor: 2` for Retina-quality output.
- All WCAG 2.1 contrast requirements enforced: 4.5:1 for body text, 3:1 for large text and UI components.

## Colors

### Color Architecture

M3 color is based on the HCT (Hue-Chroma-Tone) color space. Five key color groups each generate a tone palette (tone 0–100):

| Key Color Group | Use |
|-----------------|-----|
| Primary | Main brand color, primary interactive elements |
| Secondary | Secondary elements, auxiliary emphasis |
| Tertiary | Contrast decoration (hue = Primary +60°) |
| Neutral | Surface backgrounds, body text |
| Neutral Variant | Surface variants, outline lines |

### Color Roles

All colors must be referenced via M3 tokens — hardcoded hex values are prohibited.

**Primary:**
- `{colors.primary}` — Main brand color (Primary tone 40 light / tone 80 dark)
- `{colors.on-primary}` — Text on primary (White light / Primary tone 20 dark)
- `{colors.primary-container}` — Container background (Primary tone 90 light / tone 30 dark)
- `{colors.on-primary-container}` — Text on container (Primary tone 10 light / tone 90 dark)

**Secondary:**
- `{colors.secondary}` — Secondary color (Secondary tone 40 light / tone 80 dark)
- `{colors.on-secondary}` — Text on secondary
- `{colors.secondary-container}` — Secondary container
- `{colors.on-secondary-container}` — Text on secondary container

**Tertiary:**
- `{colors.tertiary}` — Tertiary color
- `{colors.tertiary-container}` — Tertiary container
- `{colors.on-tertiary-container}` — Text on tertiary container

**Error:**
- `{colors.error}` — Error color
- `{colors.error-container}` — Error container

**Surface:**
- `{colors.surface}` — Main background
- `{colors.on-surface}` — Main text
- `{colors.on-surface-variant}` — Variant text
- `{colors.surface-variant}` — Variant surface
- `{colors.surface-container-lowest}` → `{colors.surface-container-highest}` — 5-tier container hierarchy
- `{colors.surface-dim}` / `{colors.surface-bright}` — Dim and bright surfaces

**Inverse:**
- `{colors.inverse-surface}` / `{colors.inverse-on-surface}` / `{colors.inverse-primary}` — Inverse theme roles

**Outline:**
- `{colors.outline}` — Outline line
- `{colors.outline-variant}` — Secondary outline

**Scrim:**
- `{colors.scrim}` — Scrim overlay

### Color Pairing Rules

M3-defined safe pairings must be used. Mixing roles outside these pairings is prohibited:

- `{colors.primary}` + `{colors.on-primary}`
- `{colors.primary-container}` + `{colors.on-primary-container}`
- `{colors.secondary-container}` + `{colors.on-secondary-container}`
- `{colors.surface}` + `{colors.on-surface}`
- `{colors.surface-variant}` + `{colors.on-surface-variant}`
- `{colors.surface-container}*` + `{colors.on-surface}`

### Theme Generation Constraints

- User selects a Seed Color → HCT algorithm generates 30+ roles
- Neutral hue = Seed Hue, saturation = Seed Sat × 0.08 (chroma clamp 16)
- Neutral Variant hue = Seed Hue, saturation = Seed Sat × 0.16 (chroma clamp 16)
- All colors must satisfy WCAG 2.1 contrast requirements:
  - Body text (< 18px or non-bold < 14px): contrast ≥ **4.5:1**
  - Large text (≥ 18px or bold ≥ 14px): contrast ≥ **3:1**
  - Non-text UI components (icons, borders, controls): contrast ≥ **3:1**
  - Disabled states are exempt from contrast requirements

### Surface Hierarchy (Light Theme, shallow to deep)

```
{colors.surface-container-lowest}  → Neutral 100 (white)
{colors.surface}                   → Neutral 98
{colors.surface-container-low}     → Neutral 96
{colors.surface-container}         → Neutral 94
{colors.surface-container-high}    → Neutral 92
{colors.surface-container-highest} → Neutral 90
{colors.surface-dim}               → Neutral 87
```

## Typography

### Font Families

- **Body & Display:** Roboto (M3 default) + Noto Sans SC (CJK)
- **Mono:** Roboto Mono + JetBrains Mono
- Fonts must be loaded via `@font-face` or Google Fonts — system font dependencies are prohibited
- PDF output environment must have CJK fonts installed (`fonts-noto-cjk`)

### M3 Type Scale (15 levels)

| Token | Size | Weight | Line Height | Letter Spacing |
|-------|------|--------|-------------|----------------|
| `{typography.display-large}` | 57px | 400 | 64px | -0.25px |
| `{typography.display-medium}` | 45px | 400 | 52px | 0 |
| `{typography.display-small}` | 36px | 400 | 44px | 0 |
| `{typography.headline-large}` | 32px | 400 | 40px | 0 |
| `{typography.headline-medium}` | 28px | 400 | 36px | 0 |
| `{typography.headline-small}` | 24px | 400 | 32px | 0 |
| `{typography.title-large}` | 22px | 600 | 28px | 0 |
| `{typography.title-medium}` | 16px | 500 | 24px | 0.15px |
| `{typography.title-small}` | 14px | 500 | 20px | 0.1px |
| `{typography.body-large}` | 16px | 400 | 24px | 0.5px |
| `{typography.body-medium}` | 14px | 400 | 20px | 0.25px |
| `{typography.body-small}` | 12px | 400 | 16px | 0.4px |
| `{typography.label-large}` | 14px | 500 | 20px | 0.1px |
| `{typography.label-medium}` | 12px | 500 | 16px | 0.5px |
| `{typography.label-small}` | 11px | 500 | 16px | 0.5px |

### Resume-Specific Type Mapping

Screen px comes from the M3 type scale; print pt is a physical unit. Both are controlled via `@media screen` / `@media print` in CSS. Conversion: `1pt = 4/3 px (at 96dpi)`.

| Resume Element | M3 Style | Screen px | Print pt | Print px |
|----------------|----------|-----------|----------|----------|
| Name | `{typography.display-small}` | 36px | 24pt | 32px |
| Section title | `{typography.title-large}` | 18px (*) | 13pt | 17.3px |
| Company / Project | `{typography.title-medium}` | 16px | 12pt | 16px |
| Job title | `{typography.title-small}` | 14px | 10.5pt | 14px |
| Body text | `{typography.body-medium}` | 14px | 10.5pt | 14px |
| Secondary info | `{typography.body-small}` | 12px | 9pt | 12px |
| Skill tag | `{typography.label-medium}` | 12px | 9pt | 12px |
| Micro caption | `{typography.label-small}` | 11px | 8pt | 10.67px |

> (*) The resume scene scales M3 standard titleLarge (22px) to 18px for A4 paper fit. Screen preview uses px values; PDF output uses pt values via `@media print`.

### Print Typography Constraints

| Constraint | Value | Note |
|------------|-------|------|
| Minimum body size | **10.5pt** (14px) | CJK strokes lose detail below 10.5pt |
| Recommended line height | **1.3×** | Optimal for CJK resume body text |
| Paragraph spacing | **3–6pt** | Tighter than book typesetting |
| Section spacing | **8–12pt** | Whitespace above section titles |
| Bullets per section | **3–5** | Not exceeding 6 |
| Characters per bullet | **10–30 chars** | Quantified results preferred |
| Font embedding | **Subset required** | Reduces PDF file size |
| PDF weight rendering | Body uses 400–500 | PDF has no subpixel rendering; 400 appears thin |

## Layout

### Spacing System

Based on a **4dp grid**, the following spacing tokens are defined:

| Token | Value | Use |
|-------|-------|-----|
| `{spacing.sp-2}` | 2px | Tight padding |
| `{spacing.sp-4}` | 4px | Icon-to-text gap |
| `{spacing.sp-6}` | 6px | Chip spacing |
| `{spacing.sp-8}` | 8px | Compact padding, list item gap |
| `{spacing.sp-10}` | 10px | Card inner spacing (compact) |
| `{spacing.sp-12}` | 12px | Card inner padding |
| `{spacing.sp-16}` | 16px | Standard page margin, card padding, section gap |
| `{spacing.sp-20}` | 20px | Medium spacing |
| `{spacing.sp-24}` | 24px | Large section gap |
| `{spacing.sp-32}` | 32px | Large block separation |
| `{spacing.sp-48}` | 48px | Touch target minimum size |

### Z-Index Layers

| Layer | Z-Index | Use |
|-------|---------|-----|
| Behind | -1 | Background elements |
| Base | 0 | Default |
| Dropdown | 10 | Dropdown menus |
| Sticky | 100 | Sticky toolbar |
| Modal | 1000 | Dialogs |
| Tooltip | 9999 | Tooltips |

### A4 Paper Dimensions

| Property | Value |
|----------|-------|
| Physical size | 210mm × 297mm |
| CSS @page | `size: 210mm 297mm` or `size: A4` |
| 96dpi pixels | 794px × 1123px |
| 300dpi pixels | 2480px × 3508px |
| Aspect ratio | 1 : √2 ≈ 1 : 1.414 |

### Page Margins

| Mode | Top/Bottom | Left/Right | Note |
|------|------------|------------|------|
| Loose | 20–25mm | 20–25mm | Premium resume |
| **Standard (default)** | **15–18mm** | **15–18mm** | **Recommended** |
| Compact | 12–15mm | 13–15mm | Maximum content density |
| Absolute minimum | 12mm | 12mm | Cannot go smaller |

### Content Density Constraints

| Metric | Recommended | Min | Max |
|--------|-------------|-----|-----|
| Sections per page | 4–6 | 3 | 8 |
| Bullets per job | 3–5 | 2 | 6 |
| Characters per bullet | 10–30 chars | 5 chars | 40 chars |
| Whitespace ratio | 25–35% | 20% | 50% |
| Section spacing | 8–12pt | 6pt | 18pt |
| Pages vs experience | <10y → 1 page | — | ≤2 pages |

### Unit Conversion

```
Anchor: 1in = 96px = 72pt = 25.4mm = 2.54cm
```

| From | To | Formula | Example |
|------|----|---------|---------|
| pt → px | px = pt × 4/3 | 12pt = 16px |
| px → pt | pt = px × 3/4 | 16px = 12pt |
| mm → px | px = mm × 96/25.4 | 210mm ≈ 794px |
| px → mm | mm = px × 25.4/96 | 794px ≈ 210mm |

### Print CSS Rules

```css
@media print {
  /* 1. Force exact color printing */
  * {
    print-color-adjust: exact !important;
    -webkit-print-color-adjust: exact !important;
  }

  /* 2. Hide non-print elements */
  .toolbar, .no-print, button, nav { display: none !important; }

  /* 3. Prevent page fragmentation */
  .job-card, .project-card, .skill-card, .section {
    break-inside: avoid;
    page-break-inside: avoid;
  }

  /* 4. Keep headings with content */
  .section-title, h2, h3 {
    break-after: avoid;
    page-break-after: avoid;
  }

  /* 5. Orphan / widow control */
  p, li {
    orphans: 3;
    widows: 2;
  }

  /* 6. Page background */
  html, body { background: white !important; }
  .a4-page {
    width: 210mm;
    min-height: 297mm;
    box-shadow: none;
    border-radius: 0;
  }
}
```

## Elevation & Depth

### Elevation Levels (6 tiers)

| Level | Value | Shadow | Use |
|-------|-------|--------|-----|
| 0 | 0dp | none | Base surface |
| 1 | 1dp | `0 1px 3px 1px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.04)` | Slightly floating elements |
| 2 | 3dp | `0 2px 6px 2px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.04)` | Cards, Menus |
| 3 | 6dp | `0 4px 8px 3px rgba(0,0,0,.08), 0 1px 3px rgba(0,0,0,.06)` | FAB, Dialogs |
| 4 | 8dp | — | Navigation Drawer |
| 5 | 12dp | — | Modal Dialog |

### Tonal Elevation

M3 tonal elevation is achieved through `surfaceTint` (default: `primary` color) semi-transparent overlay:

| Level | Tint Opacity (approx) |
|-------|----------------------|
| 0 | 0% |
| 1 | ~5% |
| 2 | ~8% |
| 3 | ~11% |
| 4 | ~12% |
| 5 | ~14% |

**Resume constraint:** Since resumes primarily output to print, elevation should use `box-shadow` rather than tonal tint to ensure consistent results under `print-color-adjust: exact`.

## Shapes

### Border Radius Scale (7 levels)

| Token | Value | Use |
|-------|-------|-----|
| `{rounded.none}` | 0px | Full-width dividers |
| `{rounded.xs}` | 4px | Tooltip, Snackbar |
| `{rounded.sm}` | 8px | Chip, small buttons, inputs |
| `{rounded.md}` | 12px | Card, Dialog, Menu |
| `{rounded.lg}` | 16px | Navigation Drawer, Bottom Sheet |
| `{rounded.xl}` | 28px | Large cards, prominent surfaces |
| `{rounded.full}` | 9999px | FAB, avatar, circular badges |

### Border Widths

| Token | Value |
|-------|-------|
| thin | 1px |
| medium | 2px |
| thick | 4px |

## Components

### Card

Three card variants for different resume sections:

| Property | Elevated | Filled | Outlined |
|----------|----------|--------|----------|
| Background | `{colors.surface-container-low}` | `{colors.surface-container-highest}` | `{colors.surface}` |
| Elevation | 1dp (level-1) | 0dp (level-0) | 0dp (level-0) |
| Rounded | `{rounded.md}` (12px) | `{rounded.md}` (12px) | `{rounded.md}` (12px) |
| Border | none | none | 1px `{colors.outline-variant}` |
| Padding | `{spacing.sp-16}` (16px) | `{spacing.sp-16}` (16px) | `{spacing.sp-16}` (16px) |
| Resume use | Work experience | Skill emphasis | Project experience |

### Chip

| Property | Value |
|----------|-------|
| Height | 28px (resume) / 32px (interactive) |
| Rounded | `{rounded.sm}` (8px) |
| Padding | 0 `{spacing.sp-12}` (12px) |
| Typography | `{typography.label-medium}` (12px) / `{typography.label-large}` (14px) |
| Icon size | 18px |
| Gap | `{spacing.sp-6}` (6px) |
| Default background | `{colors.secondary-container}` |
| Highlight background | `{colors.primary-container}` |

### List Item

| Property | Single-line | Double-line | Triple-line |
|----------|-------------|-------------|-------------|
| Min height | 56px | 72px | 88px |
| Horizontal padding | `{spacing.sp-16}` (16px) | `{spacing.sp-16}` (16px) | `{spacing.sp-16}` (16px) |
| Vertical padding | `{spacing.sp-8}` (8px) | `{spacing.sp-8}` (8px) | `{spacing.sp-12}` (12px) |
| Leading icon | 24px | 24px | 24px |
| Headline | `{typography.body-large}` | `{typography.body-large}` | `{typography.body-large}` |
| Supporting text | — | `{typography.body-medium}` | `{typography.body-medium}` |

### Divider

| Property | Value |
|----------|-------|
| Thickness | 1px |
| Color | `{colors.outline-variant}` |
| Direction | Horizontal or vertical |

### Icons

| Size | Value | Use |
|------|-------|-----|
| XS | 18px | Chip internal icon |
| S | 20px | Toolbar button |
| M | 24px | Default |
| L | 36px | Card title icon |

Uses Material Symbols Outlined, loaded via Google Fonts.

### Motion

**Duration tokens:**

| Category | Values |
|----------|--------|
| Short | 50ms, 100ms, 150ms, 200ms |
| Medium | 250ms, 300ms, 350ms, 400ms |
| Long | 450ms, 500ms, 550ms, 600ms |
| Extra-long | 700ms, 800ms, 900ms, 1000ms |

**Easing curves:**

| Curve | Cubic-bezier | Use |
|-------|-------------|-----|
| Emphasized | `cubic-bezier(0.2, 0, 0, 1)` | Primary transitions (long duration) |
| Emphasized Decelerate | `cubic-bezier(0.05, 0.7, 0.1, 1)` | Element entrance |
| Emphasized Accelerate | `cubic-bezier(0.3, 0, 0.8, 0.15)` | Element exit |
| Standard | `cubic-bezier(0.2, 0, 0, 1)` | Default transitions (medium duration) |
| Standard Decelerate | `cubic-bezier(0, 0, 0, 1)` | Subtle entrance |
| Standard Accelerate | `cubic-bezier(0.3, 0, 1, 1)` | Subtle exit |

> Emphasized and Standard use the same curve shape but differ in duration: Emphasized uses long (450–600ms), Standard uses medium (250–400ms).

**State layer opacity:**

| State | Opacity |
|-------|---------|
| hover | 8% |
| focus | 12% |
| pressed | 12% |
| dragged | 16% |
| disabled | 38% |

**Resume constraint:** Resumes are primarily static; motion is only used for theme switching transitions (300–400ms) and view transitions (200–300ms).

### PDF Rendering (Puppeteer)

**Recommended configuration:**

```javascript
const page = await browser.newPage();

// Viewport set to A4 @ 96dpi
await page.setViewport({
  width: 794,
  height: 1123,
  deviceScaleFactor: 2  // Retina quality
});

// PDF output
await page.pdf({
  format: 'A4',
  printBackground: true,        // Required! Otherwise background colors won't print
  preferCSSPageSize: true,      // Prioritize CSS @page size
  margin: { top: '0', right: '0', bottom: '0', left: '0' },
  tagged: true,                 // Generate accessible PDF
});
```

**Common issues & solutions:**

| Issue | Cause | Solution |
|-------|-------|----------|
| Background color not showing | `printBackground` defaults to false | Set to `true` |
| Unexpected white margins | Puppeteer default 0.4in margin | Explicitly set to `'0'` |
| A4 size not taking effect | CSS `@page` conflicts with `format` | Use `preferCSSPageSize: true` |
| Missing CJK fonts | No CJK system fonts | `apt install fonts-noto-cjk` |
| Font appears thin | PDF has no subpixel rendering | Use font-weight 500 for body |
| Image blurriness | Low resolution | `deviceScaleFactor: 2` + 2x images |
| Content page fragmentation | Default pagination behavior | `break-inside: avoid` |

**Font rendering differences:**

| Aspect | Screen | PDF |
|--------|--------|-----|
| Color model | RGB | RGB (inside PDF) |
| Anti-aliasing | Subpixel (LCD) | Grayscale |
| Weight rendering | Normal | Appears thin, recommend +100 |
| DPI | 96 (CSS ref) | 72 (PDF native, lossless vector) |

## Do's and Don'ts

### Do

- Reference all colors via M3 tokens (`{colors.primary}`, `{colors.surface}`, etc.) — never hardcode hex values.
- Use only the 7 defined border radius values: 0, 4, 8, 12, 16, 28, 9999px.
- Use only the 11 defined spacing tokens: 2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 48px.
- Ensure body text is at least 10.5pt (14px) for CJK print readability.
- Use pt or px for print typesetting.
- Use `print-color-adjust: exact !important` for all elements in `@media print`.
- Use `break-inside: avoid` on cards and sections to prevent page fragmentation.
- Embed fonts as subsets when exporting PDF.
- Set `printBackground: true` in Puppeteer — M3 color system depends on background colors.
- Use M3 elevation tokens (level-0 through level-3) for shadows.
- Use `box-shadow` rather than tonal tint for print elevation consistency.
- Use M3-defined safe color pairings (e.g., `{colors.primary}` + `{colors.on-primary}`).
- Ensure focus indicators on all interactive elements: 2px `{colors.primary}` outline, 2px offset.
- Use semantic HTML tags (`<header>`, `<main>`, `<section>`, `<h1>`–`<h3>`) for digital resume.
- Add `aria-label` to icon buttons.

### Don't

- **Don't hardcode colors** — all colors must reference M3 tokens.
- **Don't use radius values outside the M3 system** — only 0/4/8/12/16/28/9999px are permitted.
- **Don't use spacing values outside the M3 system** — only 2/4/6/8/10/12/16/20/24/32/48px are permitted.
- **Don't use body text smaller than 10.5pt (14px)** — CJK becomes unreadable in print.
- **Don't use rem/em for print typesetting** — meaningless in print context, use pt or px.
- **Don't use visibility hiding other than `display: none`** — print output must use `!important`.
- **Don't export PDF without embedded fonts** — will cause CJK garbled text.
- **Don't set `printBackground: false`** — M3 color system depends on background colors.
- **Don't use page margins smaller than 12mm** — printer physical limits + visual crowding.
- **Don't use `box-shadow` with rgba black on colored surfaces** — print results are unpredictable, use M3 elevation tokens.
- **Don't mix color roles outside M3 safe pairings** (e.g., `{colors.primary-container}` background with `{colors.secondary-container}` text).
- **Don't ignore WCAG 2.1 contrast requirements** for non-disabled elements.

## Responsive Behavior

### M3 Breakpoints

| Window Size | Breakpoint | Device | Navigation Mode |
|-------------|-----------|--------|-----------------|
| Compact | 0–599dp | Phone portrait | NavigationBar |
| Medium | 600–839dp | Foldable | NavigationRail |
| Expanded | 840–1199dp | Tablet | NavigationDrawer |
| Large | 1200–1599dp | Desktop | NavigationDrawer |
| Extra Large | 1600+dp | Widescreen | NavigationDrawer |

### Resume Preview Constraints

- Desktop browser: A4 page centered, whitespace on both sides
- Tablet / small screen (< 840px): A4 width auto-fits, cancel side whitespace
- Print / PDF: strict 210mm × 297mm

### Accessibility

**Contrast requirements:**

| Element type | Minimum contrast |
|-------------|-----------------|
| Body text (< 18px) | 4.5:1 |
| Large text (≥ 18px or bold ≥ 14px) | 3:1 |
| UI components and icons | 3:1 |
| Disabled elements | No requirement |

**Focus indicators:**

Interactive elements (buttons, toggles) must display a focus ring on keyboard focus:

| Property | Value |
|----------|-------|
| Color | `{colors.primary}` |
| Thickness | 2px |
| Offset | 2px |
| Style | outline (not box-shadow) |

**HTML semantics (digital resume):**

- Use semantic tags: `<header>`, `<main>`, `<section>`, `<h1>`–`<h3>`
- Icon buttons must have `aria-label`
- Link `href` must be accessible
- Print version ignores semantic constraints (pure visual output)

## Iteration Guide

1. Focus on ONE component at a time.
2. Reference component names and tokens directly (`{colors.primary}`, `{colors.surface-container}`, `{rounded.md}`, `{typography.body-medium}`).
3. Run `npx @google/design.md lint DESIGN.md` after edits (when available).
4. Add new variants as separate entries in the YAML frontmatter `components` section.
5. Default body text to `{typography.body-medium}` (14px screen / 10.5pt print).
6. Use `{typography.label-medium}` for skill tags and chips.
7. Use `{typography.title-large}` (scaled to 18px) for resume section titles.
8. Always test print output via Puppeteer with `printBackground: true` and `deviceScaleFactor: 2`.
9. Verify WCAG 2.1 contrast for all color pairings — 4.5:1 for body text, 3:1 for large text and UI.
10. The 4dp spacing grid is non-negotiable — use `{spacing.*}` tokens, never arbitrary values.
11. The 7-step shape scale is non-negotiable — use `{rounded.*}` tokens, never arbitrary radius values.
12. For print elevation, use `box-shadow` (M3 elevation tokens), not tonal tint — ensures `print-color-adjust: exact` consistency.

## Appendix: CSS Variable Quick Reference

For convenience, the M3 token names map to CSS custom properties as follows:

```css
:root {
  /* === Color === */
  --md-primary:               /* {colors.primary} */
  --md-on-primary:            /* {colors.on-primary} */
  --md-primary-container:     /* {colors.primary-container} */
  --md-on-primary-container:  /* {colors.on-primary-container} */
  --md-secondary:             /* {colors.secondary} */
  --md-on-secondary:          /* {colors.on-secondary} */
  --md-secondary-container:   /* {colors.secondary-container} */
  --md-on-secondary-container:/* {colors.on-secondary-container} */
  --md-tertiary:              /* {colors.tertiary} */
  --md-tertiary-container:    /* {colors.tertiary-container} */
  --md-on-tertiary-container: /* {colors.on-tertiary-container} */
  --md-error:                 /* {colors.error} */
  --md-error-container:       /* {colors.error-container} */
  --md-surface:               /* {colors.surface} */
  --md-on-surface:            /* {colors.on-surface} */
  --md-on-surface-variant:    /* {colors.on-surface-variant} */
  --md-surface-variant:       /* {colors.surface-variant} */
  --md-surface-container-lowest:  /* {colors.surface-container-lowest} */
  --md-surface-container-low:     /* {colors.surface-container-low} */
  --md-surface-container:         /* {colors.surface-container} */
  --md-surface-container-high:    /* {colors.surface-container-high} */
  --md-surface-container-highest: /* {colors.surface-container-highest} */
  --md-surface-dim:               /* {colors.surface-dim} */
  --md-surface-bright:            /* {colors.surface-bright} */
  --md-inverse-surface:           /* {colors.inverse-surface} */
  --md-inverse-on-surface:        /* {colors.inverse-on-surface} */
  --md-inverse-primary:           /* {colors.inverse-primary} */
  --md-outline:                   /* {colors.outline} */
  --md-outline-variant:           /* {colors.outline-variant} */
  --md-scrim:                     /* {colors.scrim} */

  /* === Derived === */
  --md-primary-08:   /* {colors.primary-08} */
  --md-primary-12:   /* {colors.primary-12} */

  /* === Shape === */
  --md-shape-none:   0;       /* {rounded.none} */
  --md-shape-xs:     4px;     /* {rounded.xs} */
  --md-shape-sm:     8px;     /* {rounded.sm} */
  --md-shape-md:     12px;    /* {rounded.md} */
  --md-shape-lg:     16px;    /* {rounded.lg} */
  --md-shape-xl:     28px;    /* {rounded.xl} */
  --md-shape-full:   9999px;  /* {rounded.full} */

  /* === Elevation === */
  --md-elevation-1:  0 1px 3px 1px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.04);  /* M3 elevation level-1 */
  --md-elevation-2:  0 2px 6px 2px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.04);  /* M3 elevation level-2 */
  --md-elevation-3:  0 4px 8px 3px rgba(0,0,0,.08), 0 1px 3px rgba(0,0,0,.06);  /* M3 elevation level-3 */

  /* === Spacing === */
  --sp-2:   2px;   /* {spacing.sp-2} */
  --sp-4:   4px;   /* {spacing.sp-4} */
  --sp-6:   6px;   /* {spacing.sp-6} */
  --sp-8:   8px;   /* {spacing.sp-8} */
  --sp-10:  10px;  /* {spacing.sp-10} */
  --sp-12:  12px;  /* {spacing.sp-12} */
  --sp-16:  16px;  /* {spacing.sp-16} */
  --sp-20:  20px;  /* {spacing.sp-20} */
  --sp-24:  24px;  /* {spacing.sp-24} */
  --sp-32:  32px;  /* {spacing.sp-32} */
  --sp-48:  48px;  /* {spacing.sp-48} */

  /* === Font === */
  --md-font-body:    'Roboto', 'Noto Sans SC', -apple-system, sans-serif;
  --md-font-display: 'Roboto', 'Noto Sans SC', sans-serif;
  --md-font-mono:    'Roboto Mono', 'JetBrains Mono', monospace;
}
```

## Appendix: Sources

- Material Design 3 official docs: https://m3.material.io/
- material-web SCSS tokens: `material-components/material-web/tokens/`
- Android Jetpack Compose Material 3: developer.android.com
- Flutter Material Design 3: pub.dev/packages/material_design
- W3C CSS Paged Media: https://www.w3.org/TR/css-page-3/
- Puppeteer API: https://pptr.dev/api/
- ISO 216 (A4 standard)
- Google Stitch DESIGN.md specification: https://stitch.withgoogle.com/docs/design-md/overview/
- Awesome DESIGN.md collection: https://github.com/VoltAgent/awesome-design-md
