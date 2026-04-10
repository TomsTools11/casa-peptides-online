import HomeHero from '@/components/home/HomeHero';
import TrustBar from '@/components/home/TrustBar';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import QualitySection from '@/components/home/QualitySection';

export default function Home() {
  return (
    <div>
      <HomeHero />
      <TrustBar />
      <FeaturedProducts />
      <QualitySection />
    </div>
  );
}
