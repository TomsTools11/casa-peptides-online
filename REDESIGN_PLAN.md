# Casa Labs Catalog — Visual Redesign Plan

## Context

The catalog (`Peptide_Catalog.html`) is a fully functional single-file SPA with hash routing, 127 products across 22 categories, search/filter/sort, product comparison, and detail pages. All features work — the problem is visual: the current dark theme with cool blue accents looks unstructured and generic. The user wants a polished, warm, light-themed design matching reference screenshots of professional product catalogs, using their brand color palette and logo assets.

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Charcoal | `#222222` | Primary text, floating bar bg, footer |
| Warm Brown | `#50473e` | Secondary text, muted elements |
| Tan/Gold | `#d4ba99` | Primary accent — active tabs, buttons, selected borders, badges |
| Light Cream | `#fce9d0` | Card surfaces, header bg, highlights |
| White | `#FFFFFF` | Page background, form inputs |

## Logo Assets

| File | Use |
|------|-----|
| `Images/Casa-logos/casa 1.png` | Header logo (dark text + tan cross, best on cream bg) |
| `Images/Casa-logos/casa 5.png` | Footer logo (warm brown mono, subtle) |
| `Images/Casa-logos/bottle_blank_design_transparent.png` | Product detail page vial image (fix broken path) |

## File to Modify

**`Peptide_Catalog.html`** — single file containing all CSS, HTML, and JS

---

## Implementation Steps

### Step 1: CSS Custom Properties — Full Palette Swap

Replace `:root` block (lines 11–35). Theme shifts from dark to light.

```
--color-bg-primary: #FFFFFF              (page bg, was #191919)
--color-bg-secondary: #fce9d0            (cards/header, was #202020)
--color-bg-elevated: #f5dfc5             (hover states, was #2F2F2F)
--color-bg-hover: #eedbb8               (active hover, was #383838)
--color-text-primary: #222222            (headings, was #FFFFFF)
--color-text-secondary: #50473e          (body text, was #EDEEEE)
--color-text-muted: #8a7e73             (muted, was #A7A39A)
--color-accent: #d4ba99                  (NEW, replaces --color-blue-primary)
--color-accent-hover: #c5a882           (NEW, replaces --color-blue-primary-hover)
--color-accent-bg: rgba(212,186,153,0.15) (NEW, for tag/badge bg)
--color-success: #5a8a5e                (prices, was #448361)
--color-warning: #c47a2a                (diff highlights, was #D9730D)
--color-error: #c44e49                  (destructive, was #D44E49)
--color-border: #d4ba99                 (borders, was #444B4E)
--color-border-light: rgba(212,186,153,0.4)  (NEW, subtle dividers)
--color-form: #FFFFFF                   (inputs, was #364954)
```

Also increase radii: `--radius-sm: 0.375rem`, `--radius-md: 0.625rem`, `--radius-lg: 1rem`, add `--radius-pill: 2rem`. Lighten shadows for light theme. Rename all `--color-blue-primary` references to `--color-accent` throughout. Replace all hardcoded `rgba(64,126,201,...)` values with `var(--color-accent-bg)`.

### Step 2: Header — Logo Image + Clean Layout

Replace the text-based `<h1>Casa <span>Peptides</span>` with an `<img>` logo element.

```html
<div class="header-brand">
  <img src="Images/Casa-logos/casa 1.png" alt="Casa Labs" class="header-logo">
  <span class="header-subtitle">Product Catalog</span>
</div>
```

Style: cream bg (`--color-bg-secondary`), logo height 44px, subtitle separated by a thin border-left line, stats on the right. Keep sticky positioning.

### Step 3: Catalog Landing — Hero Section + Repositioned Search

Add a hero area above controls with:
- Large heading: "Explore Our Peptide Catalog"
- Subtitle: "{count} products across {categories} categories"
- Search box positioned top-right (pill-shaped, white bg, tan focus ring)

Remove search from the inline controls bar. Controls bar retains only: price filter, sort dropdown, view toggle — right-aligned.

### Step 4: Category Tabs — Horizontal Scrolling Pills

**Replace** the wrapping category card grid AND the filter button row with a single horizontal scrolling tab bar of pill buttons:

```
[All Categories (127)] [Anti-Aging / Longevity (7)] [Blend / Combo (3)] ...
```

- Active tab: filled tan/gold bg (`--color-accent`), white text
- Inactive: white bg, tan border, scrollable overflow-x
- Clicking a tab filters inline (same as old filter buttons)
- `#/category/{name}` route still works for direct links

This dramatically reduces vertical space vs the old 22-card grid.

### Step 5: Product Cards — Spacious, Light, Professional

Restyle cards:
- **Background**: cream (`--color-bg-secondary`)
- **Border**: subtle `--color-border-light`, 1.5px
- **Hover**: tan border, slight lift, soft shadow
- **Compare selected state**: tan border, 2px, subtle glow ring — add `.compare-selected` class
- **Compare checkbox**: move from top-LEFT to top-RIGHT (matching reference)
- **Category tag**: pill-shaped badge below name
- **Price**: green success color in footer area
- **Grid**: `repeat(auto-fill, minmax(300px, 1fr))` with 1.25rem gap (4 cols on wide, 3 mid, 1 mobile)

### Step 6: Product Detail Page — Two-Column with Tabs

**Image LEFT, info RIGHT** (swap current order):
- Left column (340px): bottle image in cream container with subtle border
- Right column: title, badges, description, price box, size pills, compare button
- **Fix image path**: `Images/Casa-logos/bottle_blank_design_transparent.png` (currently broken)

**Size variants**: change from grid of cards to inline **pill/toggle buttons** (flex-wrap row). Current size gets filled accent bg.

**Add tabbed section** below hero:
- **Overview tab**: structured key-value table (Category, Cat. No., Size, Description, Box Contents)
- **Details tab**: size variants grid + related products

Simple JS tab switching with `data-tab` attributes.

### Step 7: Floating Compare Bar — Centered Dark Pill

Complete restyle:
- **Position**: fixed bottom center (not full-width), `bottom: 1.25rem`, `max-width: 700px`
- **Background**: dark charcoal `#222222`
- **Shape**: pill (`border-radius: 2rem`)
- **Shadow**: prominent `--shadow-lg`
- **Contents**: "{N} products selected" | "Clear" button | "Compare Now →" button (tan accent bg)
- **Animation**: slide up from below viewport with cubic-bezier easing
- Remove individual product pills (too crowded) — just show count

### Step 8: Compare Page — Clean Table with Badge Header

- Header: `[N Selected]` badge (tan pill) + "Compare Products" heading
- Toggle switches: accent color when checked
- Table: cream header bg, light border dividers
- Diff highlight: warm tan background `rgba(212,186,153,0.12)` with tan left border (replaces orange)
- Column headers with subtle × remove buttons

### Step 9: Table View, Breadcrumbs, Footer

- **Table**: cream header, warm hover rows `rgba(252,233,208,0.5)`, tan accent on cat cells
- **Breadcrumbs**: tan accent links, muted separator
- **Footer**: optional small `casa 5.png` logo above text, light top border

### Step 10: Responsive Polish

**1024px breakpoint** (tablet): stack hero, full-width search, 2-3 col grid
**768px breakpoint** (mobile): single column cards, hide header subtitle/stats, full-width compare bar (flush bottom, rounded top only), product hero stacks with image on top

---

## What Does NOT Change

- All product data (peptides array) — untouched
- Routing logic (hash router, 4 views) — untouched
- Filtering/sorting/search JS logic — untouched
- Compare state management (sessionStorage) — untouched
- Derived indexes — untouched
- Font loading (Red Hat Display + Inter) — kept

---

## Verification

1. Open `Peptide_Catalog.html` in browser — confirm cream/tan theme renders
2. Catalog page: hero with search, horizontal category tabs, spacious cards
3. Click category tab → filters inline; click card → navigates to `#/product/{cat}`
4. Product page: image left, info right, size pills, tabs (Overview/Details)
5. Select 2+ products via checkboxes → dark pill compare bar slides up from bottom center
6. Compare page: badge header, tan diff highlights, toggle switch works
7. Browser back button navigation works across all routes
8. Mobile (375px viewport): single column, stacked hero, full-width compare bar
9. Bottle image loads on product detail pages (fixed path)
10. Use `/frontend-design` skill during implementation for final polish pass
