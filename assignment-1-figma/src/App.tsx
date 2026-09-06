import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import ProductOverview from './components/sections/ProductOverview';
import BrandBanner from './components/sections/BrandBanner';
import ClinicallyProven from './components/sections/ClinicallyProven';
import PremiumIngredients from './components/sections/PremiumIngredients';
import ProductCarousel from './components/sections/ProductCarousel';
import BeforeAfterReviews from './components/sections/BeforeAfterReviews';
import InfluencerSection from './components/sections/InfluencerSection';
import HairTypesGrid from './components/sections/HairTypesGrid';
import LearnAndGrow from './components/sections/LearnAndGrow';
import StatsAndCta from './components/sections/StatsAndCta';

function App() {
  return (
    <div className="min-h-screen bg-brand-ice">
      <Navbar />
      <main>
        <HeroSection />
        <ProductOverview />
        <BrandBanner />
        <ClinicallyProven />
        <PremiumIngredients />
        <ProductCarousel />
        <BeforeAfterReviews />
        <InfluencerSection />
        <HairTypesGrid />
        <LearnAndGrow />
        <StatsAndCta />
      </main>
      <Footer />
    </div>
  );
}

export default App;
