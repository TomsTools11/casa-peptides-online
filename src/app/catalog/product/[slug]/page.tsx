import { peptides, productByCat } from '@/lib/products';
import { slugifyCategory } from '@/lib/utils';
import Breadcrumb from '@/components/layout/Breadcrumb';
import ProductHero from '@/components/product/ProductHero';
import ProductTabs from '@/components/product/ProductTabs';
import RelatedProducts from '@/components/product/RelatedProducts';

export function generateStaticParams() {
  return peptides.map(p => ({
    slug: p.cat,
  }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = productByCat[slug];

  if (!product) {
    return (
      <div className="main" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>
          Product not found
        </h3>
        <p><a href="/catalog" style={{ color: 'var(--color-accent)' }}>Back to Catalog</a></p>
      </div>
    );
  }

  return (
    <>
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: product.category, href: `/catalog/${slugifyCategory(product.category)}` },
        { label: product.name },
      ]} />
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '1.5rem 2rem 3rem' }}>
        <ProductHero product={product} />
        <ProductTabs product={product} />
        <RelatedProducts product={product} />
      </div>
    </>
  );
}
