import { useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import { OrderProvider } from "./context/OrderContext";
import { DEFAULT_FILTERS, type MenuFilters } from "./data/menu";
import { scrollToId } from "./lib/scroll";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import QuickInfo from "./components/QuickInfo";
import About from "./components/About";
import FeaturedDishes from "./components/FeaturedDishes";
import CravingFilter from "./components/CravingFilter";
import MenuSection from "./components/MenuSection";
import Gallery from "./components/Gallery";
import Reviews from "./components/Reviews";
import Location from "./components/Location";
import ContactCTA from "./components/ContactCTA";
import Footer from "./components/Footer";
import DishModal from "./components/DishModal";
import OrderDrawer from "./components/OrderDrawer";
import WhatsAppButton from "./components/WhatsAppButton";
import LegalPage from "./components/LegalPage";

function HomePage() {
  const [menuFilters, setMenuFilters] = useState<MenuFilters>(DEFAULT_FILTERS);

  return (
    <>
      <button
        type="button"
        onClick={() => scrollToId("menu")}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:bg-chilli focus:px-4 focus:py-2 focus:text-cream"
      >
        Skip to menu
      </button>
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <QuickInfo />
        <About />
        <FeaturedDishes />
        <CravingFilter filters={menuFilters} onChange={setMenuFilters} />
        <MenuSection filters={menuFilters} onChange={setMenuFilters} />
        <Gallery />
        <Reviews />
        <Location />
        <ContactCTA />
      </main>
      <Footer />
      <WhatsAppButton />
      <DishModal />
      <OrderDrawer />
    </>
  );
}

export default function App() {
  return (
    <OrderProvider>
      <MotionConfig reducedMotion="user">
        <HashRouter>
          <Routes>
            <Route path="/privacy" element={<LegalPage kind="privacy" />} />
            <Route path="/terms" element={<LegalPage kind="terms" />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </HashRouter>
      </MotionConfig>
      <Analytics />
    </OrderProvider>
  );
}
