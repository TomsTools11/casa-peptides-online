import HomeHero from '@/components/home/HomeHero';
import TrustBar from '@/components/home/TrustBar';
import CategoryGrid from '@/components/home/CategoryGrid';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import QualitySection from '@/components/home/QualitySection';

export default function Home() {
  return (
    <div>
      <HomeHero />
      <TrustBar />
      <CategoryGrid />
      <FeaturedProducts />
      <QualitySection />
    </div>
  );
}
