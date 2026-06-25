import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { translations } from "./lib/translations";
import HomePage from "./pages/HomePage";
import PackagesPage from "./pages/PackagesPage";

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
      <Routes>
        <Route path="/" element={<HomePage lang={lang} setLang={setLang} />} />
        <Route path="/packages" element={<PackagesPage lang={lang} setLang={setLang} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
