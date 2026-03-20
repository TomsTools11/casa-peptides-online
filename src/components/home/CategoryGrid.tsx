import Link from 'next/link';
import { consolidatedCategories, getCategoryStats, productsByConsolidatedCategory } from '@/lib/categories';
import { peptides } from '@/lib/products';
import styles from './CategoryGrid.module.css';

const categoryDescriptions: Record<string, string> = {
  'weight-management': 'Metabolic optimization and GLP-1 receptor agonist research compounds.',
  'growth-hormone': 'HGH, secretagogues, and growth factors for repair and recovery.',
  'brain-sleep-wellness': 'Nootropics, sleep peptides, and immune modulators for cognitive clarity.',
  'anti-aging-skin': 'Senolytics, telomere support, and skin-rejuvenation compounds.',
  'hormonal-health': 'Gonadotropins and hormonal support compounds for balance.',
  'healing-recovery': 'Tissue-repair peptides and anti-inflammatory compounds.',
  'specialty-blends-research': 'Multi-peptide blends for targeted research protocols.',
  'supplies-essentials': 'Bacteriostatic water, reconstitution acids, and essential supplies.',
};

export default function CategoryGrid() {
  const cats = consolidatedCategories.slice(0, 6);
  const totalProducts = peptides.length;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.heading}>Research Domains</h2>
          <p className={styles.subtitle}>
            Specialist classification to simplify research methodologies. Each
            compound is indexed by its primary biological pathway.
          </p>
        </div>
        <div className={styles.totalBadge}>
          <span className={styles.totalLabel}>Total Catalogue</span>
          <span className={styles.totalCount}>{totalProducts}</span>
        </div>
      </div>

      <div className={styles.grid}>
        {cats.map((cat, i) => {
          const stats = getCategoryStats(cat.slug);
          const isLarge = i === 0 || i === 3;
          return (
            <Link
              key={cat.slug}
              href={`/catalog/${cat.slug}`}
              className={`${styles.card} ${isLarge ? styles.cardLarge : styles.cardSmall}`}
            >
              <div className={styles.cardContent}>
                <span className={styles.cardLabel}>{cat.name}</span>
                <p className={styles.cardDesc}>
                  {categoryDescriptions[cat.slug] || cat.description}
                </p>
                <span className={styles.cardArrow}>→</span>
              </div>
              <span className={styles.cardCount}>{stats.productCount} products</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
