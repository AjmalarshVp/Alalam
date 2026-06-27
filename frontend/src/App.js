import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { translations } from "./lib/translations";
import { trackReturnAfterOutbound } from "./lib/analytics";
import HomePage from "./pages/HomePage";
import PackagesPage from "./pages/PackagesPage";
import ContactPage from "./pages/ContactPage";

// Detects when a user returns to the site after clicking an outbound link.
function OutboundReturnTracker({ lang }) {
  useEffect(() => {
    const handle = () => {
      if (!document.hidden) {
        const p = window.location.pathname;
      const page = p === "/packages" ? "packages" : p === "/contact" ? "contact" : "home";
        trackReturnAfterOutbound(page, lang);
      }
    };
    document.addEventListener("visibilitychange", handle);
    return () => document.removeEventListener("visibilitychange", handle);
  }, [lang]);
  return null;
}

function App() {
  const [lang, setLang] = useState("en");
  const t = translations[lang];

  useEffect(() => {
    document.body.dir = t.dir;
    document.documentElement.lang = lang;
  }, [lang, t.dir]);

  return (
    <BrowserRouter>
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
      <OutboundReturnTracker lang={lang} />
      <Routes>
        <Route path="/" element={<HomePage lang={lang} setLang={setLang} />} />
        <Route path="/packages" element={<PackagesPage lang={lang} setLang={setLang} />} />
        <Route path="/contact" element={<ContactPage lang={lang} setLang={setLang} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
