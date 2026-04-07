# Casa Labs Catalog — Unified Redesign & Upgrade Plan

## Context

The catalog (`Peptide_Catalog.html`) is a single-file SPA with 127 products across 22 categories, basic search, category filters, sorting, and card/table view toggle — all in vanilla HTML/CSS/JS with a dark theme. This plan transforms it into a polished, light-themed professional catalog with individual product pages, category pages, product comparison, and enhanced filtering — while keeping the single-file, no-build-tools approach.

---

## Architecture

- **Single HTML file** — all CSS, JS, and HTML in one file, organized into clearly commented sections
- **Hash-based SPA routing** — `#/`, `#/catalog`, `#/category/{name}`, `#/product/{cat}`, `#/compare`
- **Persistent shell** — header, footer, and floating compare bar live outside `#app`; only `#app` content swaps on route change

### Route Map

| Route | View | Description |
|-------|------|-------------|
| `#/` or `#/catalog` | Catalog | Main listing with category tabs, search, filters, products |
| `#/category/{name}` | Category | Dedicated category page with scoped products |
| `#/product/{cat}` | Product | Individual product detail page |
| `#/compare` | Compare | Side-by-side comparison of 2–4 selected products |

---

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
| `Images/Casa-logos/bottle_blank_design_transparent.png` | Product detail page vial image |

---

## Implementation Steps

### Step 1: CSS Custom Properties — Full Palette Swap

Replace the `:root` block. Theme shifts from dark to light.

```css
--color-bg-primary: #FFFFFF;               /* page bg */
--color-bg-secondary: #fce9d0;             /* cards, header */
--color-bg-elevated: #f5dfc5;              /* hover states */
--color-bg-hover: #eedbb8;                 /* active hover */
--color-text-primary: #222222;             /* headings */
--color-text-secondary: #50473e;           /* body text */
--color-text-muted: #8a7e73;              /* muted */
--color-accent: #d4ba99;                   /* replaces --color-blue-primary */
--color-accent-hover: #c5a882;             /* replaces --color-blue-primary-hover */
--color-accent-bg: rgba(212,186,153,0.15); /* tag/badge bg */
--color-success: #5a8a5e;                  /* prices */
--color-warning: #c47a2a;                  /* diff highlights */
--color-error: #c44e49;                    /* destructive */
--color-border: #d4ba99;                   /* borders */
--color-border-light: rgba(212,186,153,0.4); /* subtle dividers */
--color-form: #FFFFFF;                     /* inputs */
--radius-sm: 0.375rem;
--radius-md: 0.625rem;
--radius-lg: 1rem;
--radius-pill: 2rem;
```

Rename all `--color-blue-primary` references to `--color-accent` throughout. Replace all hardcoded `rgba(64,126,201,...)` values with `var(--color-accent-bg)`. Lighten shadows for light theme.

### Step 2: Data Layer & Derived Indexes

Add computed lookup structures after the existing `peptides` array:

```js
const productByCat = {};        // "SM5" → product object
const productsByCategory = {};  // "Fat Loss" → [products...]
const productsByBaseName = {};  // "Semaglutide" → [products...]
peptides.forEach(p => {
  productByCat[p.cat] = p;
  (productsByCategory[p.category] ||= []).push(p);
  (productsByBaseName[p.name] ||= []).push(p);
});
const categories = Object.keys(productsByCategory).sort();
```

### Step 3: Hash Router

Replace static body content with a persistent shell + dynamic `<div id="app">`:

```html
<body>
  <div class="header">...</div>
  <div id="app"></div>
  <div id="compareBar" class="compare-bar"></div>
  <div class="footer">...</div>
</body>
```

Router (~30 lines): listen on `hashchange`, parse route, call appropriate render function, scroll to top.

### Step 4: Header — Logo Image + Clean Layout

Replace the text-based `<h1>` with an `<img>` logo:

```html
<div class="header-brand">
  <img src="Images/Casa-logos/casa 1.png" alt="Casa Labs" class="header-logo">
  <span class="header-subtitle">Product Catalog</span>
</div>
```

Style: cream bg (`--color-bg-secondary`), logo height 44px, subtitle separated by a thin `border-left` line, stats on the right. Keep sticky positioning.

### Step 5: Catalog View (`#/catalog`) — Hero + Tabs + Cards

**Hero section** above controls:
- Large heading: "Explore Our Peptide Catalog"
- Subtitle: "{count} products across {categories} categories"
- Search box positioned top-right (pill-shaped, white bg, tan focus ring)

**Category tabs** — replace the wrapping category card grid AND filter button row with a single horizontal scrolling tab bar of pill buttons:

```
[All Categories (127)] [Anti-Aging / Longevity (7)] [Blend / Combo (3)] ...
```

- Active tab: filled tan/gold bg (`--color-accent`), white text
- Inactive: white bg, tan border, scrollable `overflow-x`
- Clicking a tab filters inline; `#/category/{name}` route still works for direct links

**Controls bar** (below tabs): price range filter (min/max per-vial inputs), sort dropdown, view toggle — right-aligned. Search is in the hero, not here.

**Product cards:**
- Background: cream (`--color-bg-secondary`), border: `--color-border-light` 1.5px
- Hover: tan border, slight lift, soft shadow
- Compare checkbox: top-RIGHT corner
- Compare selected state: `.compare-selected` class — tan border 2px, subtle glow ring
- Category tag: pill-shaped badge below name
- Price: green success color in footer area
- Grid: `repeat(auto-fill, minmax(300px, 1fr))` with 1.25rem gap
- Cards are **clickable** — navigate to `#/product/{cat}`

### Step 6: Category Pages (`#/category/{name}`)

- Breadcrumb: `Catalog > {Category Name}`
- Category header with name and product count
- Same filter/sort/view controls, scoped to this category's products
- Price range filter with bounds scoped to this category
- Cards are clickable and have comparison checkboxes

### Step 7: Product Detail Pages (`#/product/{cat}`)

**Breadcrumb**: `Catalog > {Category} > {Product Name}`

**Two-column hero** — image LEFT, info RIGHT:
- Left column (340px): bottle image (`Images/Casa-logos/bottle_blank_design_transparent.png`) in cream container with subtle border
- Right column: title, badges, description, price box, size pills, compare button

**Size variants**: inline pill/toggle buttons (flex-wrap row). Current size gets filled accent bg. Each pill links to its own product page.

**Tabbed section** below hero:
- **Overview tab**: structured key-value table (Category, Cat. No., Size, Description, Box Contents)
- **Details tab**: size variants grid + related products (up to 6 cards from same category, excluding size variants of current product)

Simple JS tab switching with `data-tab` attributes.

### Step 8: Compare State + Floating Bar

**Selection state:**
- Global `compareSet` (a `Set` of catalog numbers, max 4 items)
- Persisted to `sessionStorage` so it survives route changes
- Checkboxes on all cards/rows bound to this set
- When 4 selected: remaining checkboxes disabled, "Max 4" notice shown

**Floating compare bar** (persistent, outside `#app`):
- Fixed bottom center, `bottom: 1.25rem`, `max-width: 700px`
- Background: dark charcoal `#222222`, shape: pill (`border-radius: 2rem`)
- Prominent `--shadow-lg`
- Shows: "{N} products selected" | "Clear" button | "Compare Now →" button (tan accent bg)
- Animation: slide up from below viewport with cubic-bezier easing
- No individual product pills — just show count

### Step 9: Compare View (`#/compare`)

- Header: `[N Selected]` badge (tan pill) + "Compare Products" heading
- Side-by-side table, one column per selected product
- Rows: Product Name, Catalog #, Category, Size, Price/Vial, Box Price (10 vials), Description
- Column headers with subtle × remove buttons
- **"Highlight Differences" toggle switch**: when ON, rows where values differ get `rgba(212,186,153,0.12)` bg + tan left border
- Toggle switches: accent color when checked
- Table: cream header bg, light border dividers
- If < 2 products selected, show message directing back to catalog

### Step 10: Table View, Breadcrumbs, Footer

- **Table**: cream header, warm hover rows `rgba(252,233,208,0.5)`, tan accent on category cells, compare checkbox as first column
- **Breadcrumbs**: tan accent links, muted separator
- **Footer**: small `casa 5.png` logo above text, light top border

### Step 11: Responsive Polish

**1024px** (tablet): stack hero, full-width search, 2–3 col grid
**768px** (mobile): single column cards, hide header subtitle/stats, full-width compare bar (flush bottom, rounded top only), product hero stacks with image on top

---

## New CSS Classes Required

| Class | Purpose |
|-------|---------|
| `.breadcrumb` | Navigation trail |
| `.category-tabs` | Horizontal scrolling pill tab bar |
| `.product-detail` | Product page two-column layout |
| `.size-variants` | Size pill/toggle selector |
| `.related-products` | Related products section |
| `.compare-bar` | Floating bottom bar |
| `.compare-selected` | Selected card state |
| `.compare-checkbox` | Checkbox overlay on product cards |
| `.compare-table` | Side-by-side comparison layout |
| `.diff-highlight` | Highlighted difference row |
| `.highlight-toggle` | Toggle switch for highlight differences |
| `.price-filter` | Price range input group |

---

## What Does NOT Change

- All product data (peptides array)
- Font loading (Red Hat Display + Inter)

---

## Implementation Sequence

1. CSS custom properties — full palette swap
2. Data indexes — add derived lookups after peptides array
3. Router — restructure body HTML, implement hash router
4. Header — logo image, clean layout
5. Catalog view — hero, category tabs, enhanced cards, price filter
6. Category view — new view scoped to one category
7. Product view — detail page with image, tabs, variants, related products
8. Compare state + checkboxes — selection mechanism on all cards/rows
9. Floating compare bar — persistent UI element
10. Compare view — side-by-side table with highlight differences toggle
11. Table view, breadcrumbs, footer polish
12. Responsive breakpoints

---

## Verification

1. Open `Peptide_Catalog.html` in browser — confirm cream/tan theme renders
2. Catalog page: hero with search, horizontal category tabs, spacious cards
3. Click category tab → filters inline; click card → navigates to `#/product/{cat}`
4. Category page (`#/category/{name}`): breadcrumb, scoped filters, clickable cards
5. Product page: image left, info right, size pills, tabs (Overview/Details), related products
6. Select 2+ products via checkboxes → dark pill compare bar slides up from bottom center
7. At 4 selected: remaining checkboxes disable, "Max 4" notice shown
8. Compare page: badge header, tan diff highlights, toggle switch works, × removes columns
9. Browser back button navigation works across all routes
10. Bottle image loads on product detail pages (fixed path)
11. Mobile (375px viewport): single column, stacked hero, full-width compare bar
