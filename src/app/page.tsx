import HomeHero from '@/components/home/HomeHero';
import CategoryGrid from '@/components/home/CategoryGrid';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <HomeHero />
      <div className={styles.grid}>
        <CategoryGrid />
      </div>
    </div>
  );
}
