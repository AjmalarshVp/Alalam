import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "../AAIcon";
import { Menu, X, Languages } from "lucide-react";
import { trackButtonClick, trackEvent } from "../../lib/analytics";
import { EVENTS } from "../../lib/analyticsEvents";

const NAV_PAGES = [
  { key: "home",        path: "/" },
  { key: "packages",   path: "/packages" },
  { key: "contactPage", path: "/contact" },
];

const NAV_SECTIONS = [
  { k: "services", id: "services" },
  { k: "process",  id: "process" },
];

const Header = ({ lang, setLang, t, scrollTo }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const currentPage =
    location.pathname === "/packages" ? "packages"
    : location.pathname === "/contact" ? "contact"
    : "home";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => { setOpen(false); }, [location.pathname]);

  const toggleLang = () => {
    const next = lang === "en" ? "ar" : "en";
    trackEvent(next === "ar" ? EVENTS.LANGUAGE_SWITCH_ARABIC : EVENTS.LANGUAGE_SWITCH_ENGLISH, {
      language: lang,
      page_name: currentPage,
    });
    setLang(next);
  };

  const toggleMenu = () => {
    const next = !open;
    trackEvent(next ? EVENTS.HEADER_MENU_OPEN : EVENTS.HEADER_MENU_CLOSE, {
      language: lang,
      page_name: currentPage,
    });
    setOpen(next);
  };

  const handleLogoClick = () => {
    trackButtonClick(EVENTS.HEADER_LOGO_CLICK, { language: lang, page_name: currentPage });
  };

  const handleSectionClick = (k, id) => {
    trackEvent(EVENTS.HEADER_MENU_ITEM_CLICK, {
      menu_item_name: k,
      destination_path: `/#${id}`,
      language: lang,
      page_name: currentPage,
    });
    setOpen(false);
    // Cross-page: navigate to home with hash; on home page use smooth scroll
    if (currentPage === "home") {
      scrollTo(id);
    } else {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-2.5 backdrop-blur-xl bg-[#040B16]/80 border-b border-white/5"
          : "py-4 bg-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-5 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" data-testid="header-logo" className="shrink-0" onClick={handleLogoClick}>
          <Logo />
        </Link>

        {/* Desktop page nav — visible sm+ */}
        <nav className="hidden sm:flex items-center gap-1">
          {NAV_PAGES.map(({ key, path }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={key}
                to={path}
                className={`px-3.5 py-1.5 rounded-full text-[12.5px] font-medium transition-colors ${
                  isActive
                    ? "bg-cyan-400/10 text-cyan-300 border border-cyan-400/30"
                    : "text-white/70 hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                {t.nav[key]}
              </Link>
            );
          })}
        </nav>

        {/* Right controls */}
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

      {/* Mobile / hamburger menu */}
      {open && (
        <div data-testid="mobile-menu" className="max-w-5xl mx-auto mt-2 px-5">
          <div className="aa-glass rounded-2xl p-3 mt-1 grid gap-1">
            {/* Page links */}
            {NAV_PAGES.map(({ key, path }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={key}
                  to={path}
                  onClick={() => setOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-xl text-[15px] transition ${
                    isActive
                      ? "text-cyan-300 bg-cyan-400/[0.08]"
                      : "text-white/90 hover:bg-white/5"
                  }`}
                >
                  {t.nav[key]}
                </Link>
              );
            })}

            {/* Divider */}
            <div className="my-1 border-t border-white/[0.06]" />

            {/* Section scroll links */}
            {NAV_SECTIONS.map((it) => (
              <button
                key={it.id}
                data-testid={`menu-${it.id}`}
                onClick={() => handleSectionClick(it.k, it.id)}
                className="text-start px-4 py-3 rounded-xl text-[14px] text-white/70 hover:bg-white/5 transition"
              >
                {t.nav[it.k]}
              </button>
            ))}

            {/* CTA */}
            <button
              data-testid="menu-quote"
              onClick={() => handleSectionClick("quote", "contact")}
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
