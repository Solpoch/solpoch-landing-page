import BentoGrid from "./components/Bento/BentoGrid";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import ProblemSection from "./components/ProblemSection";
import WalletStandardTestSection from "./components/WalletStandardTestSection";

export default function App() {

  return (
    <div className="min-h-screen bg-black overflow-x-hidden h-fit scrollbar">
      <Hero />
      <BentoGrid />
      <WalletStandardTestSection />
      <ProblemSection />
      <Footer />
    </div>
  )
}