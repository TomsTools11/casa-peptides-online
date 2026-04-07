# Casa Labs Catalog — Advanced Interactive Upgrade Plan

## Context

The current catalog is a single 774-line HTML file (`Peptide_Catalog.html`) containing 127 peptide products across 22 categories. It has basic search, category filters, sorting, and card/table view toggle — all in vanilla HTML/CSS/JS with a dark theme. The goal is to transform this into a richer, multi-page-feel catalog with individual product pages, category pages, a product comparison feature, and enhanced filtering — all while keeping the single-file, no-build-tools approach.

## Architecture Decisions

- **Single HTML file** — all CSS, JS, and HTML stay in one file, organized into clearly commented sections
- **Hash-based SPA routing** — URLs like `#/product/SM5`, `#/category/Fat%20Loss`, `#/compare` for multi-page navigation within the single file
- **Product images** — use `Images/bottle_blank_design.png` (and transparent variant) on product detail pages
- **Data source** — current HTML data is authoritative, no changes to product data

---

## Route Map

| Route | View | Description |
|-------|------|-------------|
| `#/` or `#/catalog` | Catalog | Main listing with category nav grid, search, filters, products |
| `#/category/{name}` | Category | Dedicated category page with scoped products |
| `#/product/{cat}` | Product | Individual product detail page |
| `#/compare` | Compare | Side-by-side comparison of 2-4 selected products |

---

## Implementation Steps

### Step 1: Data Layer & Derived Indexes

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

### Step 2: Hash Router

Replace the static body content with a persistent shell + dynamic `<div id="app">`:

```
<body>
  <div class="header">...</div>          ← persistent header (with nav links)
  <div id="app"></div>                   ← route-driven content swapped here
  <div id="compareBar" class="compare-bar"></div>  ← persistent floating bar
  <div class="footer">...</div>          ← persistent footer
</body>
```

Router (~30 lines): listen on `hashchange`, parse route, call the appropriate render function, scroll to top.

### Step 3: Catalog View (`#/catalog`)

Enhance the current listing:
- **Category navigation grid** at top — 22 clickable cards showing category name + product count, linking to `#/category/{name}`
- Existing controls: search box, sort dropdown, view toggle
- **New: price range filter** — two `<input type="number">` fields (min/max per-vial price)
- Product cards become **clickable** (navigate to `#/product/{cat}`)
- Each card/row gets a **comparison checkbox** (top-left of card, first column of table)

### Step 4: Category Pages (`#/category/{name}`)

- **Breadcrumb**: `Catalog > {Category Name}`
- Category header with name and product count
- Same filter/sort/view controls, scoped to this category's products
- Price range filter with bounds scoped to this category
- Cards are clickable and have comparison checkboxes

### Step 5: Product Detail Pages (`#/product/{cat}`)

- **Breadcrumb**: `Catalog > {Category} > {Product Name}`
- Product hero section:
  - Large product name heading
  - Catalog # badge, clickable category tag
  - Full description text
  - Price info box (per-vial price prominent, box price below)
  - Bottle image (`Images/bottle_blank_design.png`) as decorative element
- **Size variants section**: if the same product name exists in multiple sizes (e.g., Tirzepatide 5mg–120mg), show a grid/table of all sizes with prices, highlighting the current one. Each links to its own product page.
- **Related products section**: up to 6 cards from the same category (excluding size variants of current product), each clickable
- "Add to Compare" button

### Step 6: Product Comparison Feature

**Selection state:**
- Global `compareSet` (a `Set` of catalog numbers, max 4 items)
- Persisted to `sessionStorage` so it survives route changes (optional: survives refresh)
- Checkboxes on all cards/rows bound to this set

**Floating compare bar** (persistent, outside `#app`):
- Fixed to bottom of viewport, hidden by default
- Slides up via CSS transition when `compareSet.size >= 2`
- Shows: pill/chip for each selected product (with × remove button), count text, **"Compare Products"** button linking to `#/compare`, "Clear All" button
- When 4 selected: remaining checkboxes disabled, "Max 4" notice shown

**Comparison view (`#/compare`):**
- Side-by-side table layout, one column per selected product
- Rows: Product Name, Catalog #, Category, Size, Price/Vial, Box Price (10 vials), Description
- **"Highlight Differences" toggle switch** at top:
  - When ON: for each row, if values are not all identical, apply a highlight style (subtle warm background + left accent border using `var(--color-warning)` at low opacity)
  - Comparison is string/number equality per field
- Remove button (×) on each column header to deselect a product
- If <2 products selected, show message directing back to catalog

### Step 7: Enhanced Search & Filtering

- **Search**: searches name, catalog #, description, category (same as current)
- **Price range filter**: two number inputs, filters on per-vial price (`boxPrice / 10`)
- **Category filter buttons**: kept on catalog view, replaced by breadcrumb on category pages
- Search state clears when navigating to a category page (user is narrowing scope intentionally)
- Sort options unchanged: Name A→Z/Z→A, Price Low→High/High→Low, Cat # A→Z

---

## New CSS Required

All new styles use existing CSS custom properties for consistency:

| Class | Purpose |
|-------|---------|
| `.breadcrumb` | Navigation trail (Catalog > Category > Product) |
| `.category-grid` | Grid layout for category navigation cards |
| `.category-card` | Individual category nav card (name + count) |
| `.product-detail` | Product page layout |
| `.size-variants` | Size variant selector grid |
| `.related-products` | Related products section |
| `.compare-bar` | Floating bottom bar |
| `.compare-checkbox` | Checkbox overlay on product cards |
| `.compare-table` | Side-by-side comparison layout |
| `.diff-highlight` | Highlighted difference row |
| `.highlight-toggle` | Toggle switch for highlight differences |
| `.price-filter` | Price range input group |

---

## File to Modify

**`Peptide_Catalog.html`** — the single file receiving all changes

**Referenced asset:**
- `Images/bottle_blank_design.png` — used on product detail pages

---

## Version Control & Deployment

### GitHub Setup
1. Initialize git repo in project directory
2. Add `.gitignore` (OS files like `.DS_Store`)
3. Create GitHub repository (private or public as preferred)
4. Initial commit with current catalog + images
5. Push to GitHub

### Netlify Deployment
1. Connect Netlify to the GitHub repository
2. Build settings — no build command needed, publish directory is `/` (root)
3. Netlify auto-deploys on every push to `main`
4. Hash-based routing works out of the box — no `_redirects` or rewrite rules needed
5. Custom domain can be added later via Netlify dashboard

### Development Workflow
- Work locally, test by opening `Peptide_Catalog.html` in browser
- Commit and push to `main` → Netlify auto-deploys in ~30 seconds
- Optionally use feature branches + Netlify deploy previews for larger changes

---

## Implementation Sequence

0. **Git + GitHub setup** — init repo, create GitHub remote, initial commit and push
1. **Data indexes** — add derived lookups after peptides array
2. **Router** — restructure body HTML, implement hash router
3. **Catalog view** — migrate existing render logic into a view function, add category nav grid
4. **Category view** — new view scoped to one category
5. **Product view** — new detail page with variants + related products
6. **Price filter** — add to catalog + category views
7. **Compare state + checkboxes** — add selection mechanism to cards/rows
8. **Floating compare bar** — persistent UI element
9. **Compare view** — side-by-side table with highlight differences toggle
10. **Polish** — transitions, responsive testing, edge cases

---

## Verification

1. Open `Peptide_Catalog.html` directly in browser (file:// protocol) — confirm all routes work
2. Test navigation: catalog → category → product → back (browser back button)
3. Test search + price filter on catalog and category pages
4. Select 2-4 products via checkboxes, confirm floating bar appears at 2+
5. Click "Compare Products", verify side-by-side layout
6. Toggle "Highlight Differences" — confirm visual diff highlighting
7. Test max 4 limit — confirm checkboxes disable at 4
8. Test on mobile viewport (responsive)
9. Verify bottle image loads on product pages
