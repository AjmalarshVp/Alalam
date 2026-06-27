import React, { useCallback, useEffect } from "react";
import { translations } from "../lib/translations";
import { trackPageView } from "../lib/analytics";
import { useScrollDepth } from "../hooks/useScrollDepth";
import Header from "../components/sections/Header";
import Hero from "../components/sections/Hero";
import Services from "../components/sections/Services";
import Process from "../components/sections/Process";
import Results from "../components/sections/Results";
import ContactForm from "../components/sections/ContactForm";
import FinalCTA from "../components/sections/FinalCTA";
import Footer from "../components/sections/Footer";
import FloatingWhatsApp from "../components/sections/FloatingWhatsApp";
import { WaveDivider } from "../components/WaveDivider";
import PackagesCarousel from "../components/sections/PackagesCarousel";

const HomePage = ({ lang, setLang }) => {
  const t = translations[lang];

  useEffect(() => {
    trackPageView({ pageName: "home", pagePath: "/", language: lang });
  }, [lang]);

  useScrollDepth({ page: "home", pagePath: "/", language: lang });

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="min-h-screen bg-[#040B16] text-white font-body relative overflow-x-hidden">
      <Header lang={lang} setLang={setLang} t={t} scrollTo={scrollTo} />
      <main>
        <Hero t={t} scrollTo={scrollTo} />
        <WaveDivider />
        <PackagesCarousel lang={lang} t={t} />
        <WaveDivider flip />
        <Services t={t} scrollTo={scrollTo} />
        <WaveDivider flip />
        <Process t={t} />
        <Results t={t} />
        <FinalCTA t={t} scrollTo={scrollTo} />
        <ContactForm t={t} lang={lang} />
      </main>
      <Footer t={t} scrollTo={scrollTo} />
      <FloatingWhatsApp />
    </div>
  );
};

export default HomePage;
