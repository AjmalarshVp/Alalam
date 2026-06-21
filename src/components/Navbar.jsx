import React, { useState } from 'react';
import logoImg from '../assets/logo.png';

const translations = {
  en: {
    logo: 'AL ALAM POOLS',
    services: 'Services',
    portfolio: 'Portfolio',
    maintenance: 'Maintenance',
    contact: 'Contact',
    quoteBtn: 'Get a Quote',
    langBtn: 'العربية'
  },
  ar: {
    logo: 'مسابح العالم',
    services: 'الخدمات',
    portfolio: 'أعمالنا',
    maintenance: 'الصيانة',
    contact: 'اتصل بنا',
    quoteBtn: 'احصل على عرض سعر',
    langBtn: 'English'
  }
};

export default function Navbar({ currentPage, setCurrentPage, lang, toggleLang, openQuoteModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang];

  const handleNavClick = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-primary/80 backdrop-blur-xl shadow-sm border-b border-outline-variant/10">
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto">
        {/* Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2 cursor-pointer hover:opacity-90 active:scale-95 transition-all"
        >
          <img src={logoImg} alt="Al Alam Pools Logo" className="h-10 md:h-12 object-contain" />
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => handleNavClick('services')}
            className={`font-semibold py-1 transition-all ${
              currentPage === 'services'
                ? 'text-secondary dark:text-secondary-fixed border-b-2 border-secondary'
                : 'text-on-surface dark:text-on-primary-container hover:text-secondary'
            }`}
          >
            {t.services}
          </button>
          <button
            onClick={() => handleNavClick('gallery')}
            className={`font-semibold py-1 transition-all ${
              currentPage === 'gallery'
                ? 'text-secondary dark:text-secondary-fixed border-b-2 border-secondary'
                : 'text-on-surface dark:text-on-primary-container hover:text-secondary'
            }`}
          >
            {t.portfolio}
          </button>
          <button
            onClick={() => handleNavClick('services')}
            className="font-semibold py-1 text-on-surface dark:text-on-primary-container hover:text-secondary transition-all"
          >
            {t.maintenance}
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className={`font-semibold py-1 transition-all ${
              currentPage === 'contact'
                ? 'text-secondary dark:text-secondary-fixed border-b-2 border-secondary'
                : 'text-on-surface dark:text-on-primary-container hover:text-secondary'
            }`}
          >
            {t.contact}
          </button>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={openQuoteModal}
            className="px-6 py-2.5 bg-primary text-white rounded-full font-bold hover:bg-secondary transition-all duration-300 scale-95 active:scale-90 shadow-md"
          >
            {t.quoteBtn}
          </button>
          <button
            onClick={toggleLang}
            className="text-primary dark:text-white font-bold hover:text-secondary transition-colors"
          >
            {t.langBtn}
          </button>
        </div>

        {/* Mobile Buttons Shell */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleLang}
            className="text-primary dark:text-white font-bold hover:text-secondary transition-colors px-2 py-1 text-sm"
          >
            {t.langBtn}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-primary dark:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-3xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-primary/95 backdrop-blur-xl border-t border-outline-variant/10 shadow-lg px-margin-mobile py-6 flex flex-col gap-5 absolute top-full left-0 w-full animate-fade-in">
          <button
            onClick={() => handleNavClick('services')}
            className={`text-lg font-bold text-left ${
              currentPage === 'services' ? 'text-secondary' : 'text-on-surface'
            }`}
          >
            {t.services}
          </button>
          <button
            onClick={() => handleNavClick('gallery')}
            className={`text-lg font-bold text-left ${
              currentPage === 'gallery' ? 'text-secondary' : 'text-on-surface'
            }`}
          >
            {t.portfolio}
          </button>
          <button
            onClick={() => handleNavClick('services')}
            className="text-lg font-bold text-left text-on-surface"
          >
            {t.maintenance}
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className={`text-lg font-bold text-left ${
              currentPage === 'contact' ? 'text-secondary' : 'text-on-surface'
            }`}
          >
            {t.contact}
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              openQuoteModal();
            }}
            className="w-full bg-primary text-white py-3.5 rounded-xl font-bold hover:bg-secondary text-center shadow-md active:scale-98 transition-all"
          >
            {t.quoteBtn}
          </button>
        </div>
      )}
    </nav>
  );
}
