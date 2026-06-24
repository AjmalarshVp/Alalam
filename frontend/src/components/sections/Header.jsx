import React, { useEffect, useState } from "react";
import { Logo } from "../AAIcon";
import { Menu, X, Languages } from "lucide-react";

const Header = ({ lang, setLang, t, scrollTo }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleLang = () => setLang(lang === "en" ? "ar" : "en");

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-2.5 backdrop-blur-xl bg-[#040B16]/75 border-b border-white/5"
          : "py-4 bg-transparent"
      }`}
    >
      <div className="max-w-md mx-auto px-5 flex items-center justify-between">
        <a href="#top" data-testid="header-logo" className="shrink-0">
          <Logo />
        </a>

        <div className="flex items-center gap-2">
          <button
            data-testid="lang-toggle"
            onClick={toggleLang}
            aria-label="Toggle language"
            className="flex items-center gap-1.5 h-9 px-3 rounded-full border border-white/10 bg-white/[0.04] text-[12px] font-semibold tracking-wider text-white hover:border-cyan-400/40 transition-colors"
          >
            <Languages size={14} className="text-cyan-300" />
            <span>{lang === "en" ? "AR" : "EN"}</span>
          </button>

          <button
            data-testid="menu-toggle"
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
            className="w-9 h-9 grid place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white hover:border-cyan-400/40 transition-colors"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {open && (
        <div
          data-testid="mobile-menu"
          className="max-w-md mx-auto mt-2 mx-5 sm:mx-auto px-5"
        >
          <div className="aa-glass rounded-2xl p-3 mt-1 grid gap-1">
            {[
              { k: "services", id: "services" },
              { k: "process", id: "process" },
              { k: "contact", id: "contact" },
            ].map((it) => (
              <button
                key={it.id}
                data-testid={`menu-${it.id}`}
                onClick={() => {
                  setOpen(false);
                  scrollTo(it.id);
                }}
                className="text-start px-4 py-3 rounded-xl text-[15px] text-white/90 hover:bg-white/5 transition"
              >
                {t.nav[it.k]}
              </button>
            ))}
            <button
              data-testid="menu-quote"
              onClick={() => {
                setOpen(false);
                scrollTo("contact");
              }}
              className="aa-btn-primary mt-1"
            >
              {t.nav.quote}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
