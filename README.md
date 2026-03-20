# Casa Peptides — Advanced Research Compounds

A product catalog and blog for Casa Peptides, built with Next.js and deployed on Vercel as a static site.

## Features

- **Product Catalog** — Browse peptides organized by category (Weight Management, Growth Hormone, Brain/Sleep/Wellness, and more) with individual product pages
- **Product Comparison** — Compare multiple peptides side by side
- **Blog** — MDX-powered blog with category filtering
- **Dark/Light Theme** — Automatic OS theme detection
- **Static Export** — Fully static site for fast, reliable hosting

## Tech Stack

- [Next.js](https://nextjs.org/) 16 (App Router, static export)
- [React](https://react.dev/) 19
- TypeScript
- [MDX](https://mdxjs.com/) via `next-mdx-remote` for blog content
- Deployed on [Vercel](https://vercel.com/)

## Getting Started

```bash
# Install dependencies
npm install

# Run the dev server
npm run dev

# Build for production
npm run build
```

The dev server starts at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── blog/         # Blog listing and individual posts
│   ├── catalog/      # Catalog, category, and product pages
│   └── compare/      # Product comparison page
├── components/       # React components (layout, blog, catalog, home, etc.)
├── content/blog/     # MDX blog posts
├── data/             # Product data (JSON) and category definitions
├── hooks/            # Custom React hooks
└── lib/              # Utility functions
```

## License

ISC
