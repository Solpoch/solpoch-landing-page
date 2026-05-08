import Footer from "./components/Footer";
import Hero from "./components/Hero";
import WalletStandardTestSection from "./components/WalletStandardTestSection";

export default function App() {

  return (
    <div className="min-h-screen bg-black overflow-x-hidden h-fit scrollbar">
      <Hero />
      <WalletStandardTestSection />
      <Footer />
    </div>
  )
}