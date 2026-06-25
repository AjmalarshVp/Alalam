import React, { useState, useCallback } from "react";
import { translations } from "../lib/translations";
import WaterIntro from "../components/WaterIntro";
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

const HomePage = ({ lang, setLang }) => {
  const [introDone, setIntroDone] = useState(
    typeof window !== "undefined" && sessionStorage.getItem("aa_intro") === "1"
  );
  const t = translations[lang];

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleIntroDone = () => {
    setIntroDone(true);
    try {
      sessionStorage.setItem("aa_intro", "1");
    } catch {}
  };

  return (
    <div className="min-h-screen bg-[#040B16] text-white font-body relative overflow-x-hidden">
      {!introDone && <WaterIntro onDone={handleIntroDone} />}
      <Header lang={lang} setLang={setLang} t={t} scrollTo={scrollTo} />
      <main>
        <Hero t={t} scrollTo={scrollTo} />
        <WaveDivider />
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
