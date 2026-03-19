import { consolidatedCategories, getCategoryStats } from '@/lib/categories';
import CategoryCard from './CategoryCard';
import styles from './CategoryGrid.module.css';

export default function CategoryGrid() {
  return (
    <div className={styles.grid}>
      {consolidatedCategories.map((cat, i) => (
        <CategoryCard
          key={cat.slug}
          category={cat}
          stats={getCategoryStats(cat.slug)}
          delay={i * 60}
        />
      ))}
    </div>
  );
}
