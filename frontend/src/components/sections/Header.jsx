import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "../AAIcon";
import { Menu, X, Languages } from "lucide-react";
import { trackButtonClick, trackEvent } from "../../lib/analytics";
import { EVENTS } from "../../lib/analyticsEvents";

const Header = ({ lang, setLang, t, scrollTo }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const page = location.pathname === "/packages" ? "packages" : "home";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleLang = () => {
    const next = lang === "en" ? "ar" : "en";
    // Track which language is being switched TO
    trackEvent(next === "ar" ? EVENTS.LANGUAGE_SWITCH_ARABIC : EVENTS.LANGUAGE_SWITCH_ENGLISH, {
      language: lang,
      page_name: page,
    });
    setLang(next);
  };

  const toggleMenu = () => {
    const next = !open;
    trackEvent(next ? EVENTS.HEADER_MENU_OPEN : EVENTS.HEADER_MENU_CLOSE, {
      language: lang,
      page_name: page,
    });
    setOpen(next);
  };

  const handleLogoClick = () => {
    trackButtonClick(EVENTS.HEADER_LOGO_CLICK, { language: lang, page_name: page });
  };

  const handleMenuItemClick = (key, id) => {
    trackEvent(EVENTS.HEADER_MENU_ITEM_CLICK, {
      menu_item_name: key,
      destination_path: `/#${id}`,
      language: lang,
      page_name: page,
    });
    setOpen(false);
    scrollTo(id);
  };

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
        <Link to="/" data-testid="header-logo" className="shrink-0" onClick={handleLogoClick}>
          <Logo />
        </Link>

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
            onClick={toggleMenu}
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
                onClick={() => handleMenuItemClick(it.k, it.id)}
                className="text-start px-4 py-3 rounded-xl text-[15px] text-white/90 hover:bg-white/5 transition"
              >
                {t.nav[it.k]}
              </button>
            ))}
            <button
              data-testid="menu-quote"
              onClick={() => handleMenuItemClick("quote", "contact")}
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
