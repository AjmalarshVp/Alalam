import React, { useEffect, useState, useCallback } from "react";
import { Toaster } from "sonner";
import { translations } from "./lib/translations";
import Header from "./components/sections/Header";
import Hero from "./components/sections/Hero";
import TrustStats from "./components/sections/TrustStats";
import Services from "./components/sections/Services";
import Spotlights from "./components/sections/Spotlights";
import Process from "./components/sections/Process";
import Results from "./components/sections/Results";
import Testimonials from "./components/sections/Testimonials";
import ContactForm from "./components/sections/ContactForm";
import FinalCTA from "./components/sections/FinalCTA";
import Footer from "./components/sections/Footer";
import FloatingWhatsApp from "./components/sections/FloatingWhatsApp";

function App() {
  const [lang, setLang] = useState("en");
  const t = translations[lang];

  useEffect(() => {
    document.body.dir = t.dir;
    document.documentElement.lang = lang;
  }, [lang, t.dir]);

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="min-h-screen bg-[#040B16] text-white font-body relative overflow-x-hidden">
      <Toaster
        position="top-center"
        theme="dark"
        toastOptions={{
          style: {
            background: "rgba(10, 20, 40, 0.92)",
            border: "1px solid rgba(0, 229, 255, 0.25)",
            color: "#fff",
            backdropFilter: "blur(12px)",
          },
        }}
      />

      <Header lang={lang} setLang={setLang} t={t} scrollTo={scrollTo} />

      <main>
        <Hero t={t} scrollTo={scrollTo} />
        <TrustStats t={t} />
        <Services t={t} scrollTo={scrollTo} />
        <Spotlights t={t} scrollTo={scrollTo} />
        <Process t={t} />
        <Results t={t} />
        <Testimonials t={t} />
        <FinalCTA t={t} scrollTo={scrollTo} />
        <ContactForm t={t} lang={lang} />
      </main>

      <Footer t={t} scrollTo={scrollTo} />
      <FloatingWhatsApp />
    </div>
  );
}

export default App;
