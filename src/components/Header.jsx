import React, { useState } from 'react';
import logoImg from '../assets/logo.png';

export default function Header({ activePage, setActivePage, isArabic, setIsArabic }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', labelEn: 'Home', labelAr: 'الرئيسية' },
    { id: 'services', labelEn: 'Services', labelAr: 'خدماتنا' },
    { id: 'gallery', labelEn: 'Portfolio', labelAr: 'معرض الأعمال' },
    { id: 'contact', labelEn: 'Contact', labelAr: 'اتصل بنا' }
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-primary/80 backdrop-blur-xl shadow-sm border-b border-outline-variant/10">
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto">
        {/* Logo */}
        <a 
          href="#home" 
          onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
          className="flex items-center gap-2 cursor-pointer hover:opacity-90 active:scale-95 transition-all"
        >
          <img src={logoImg} alt="Al Alam Pools Logo" className="h-10 md:h-12 object-contain" />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => { e.preventDefault(); handleNavClick(item.id); }}
              className={`font-semibold transition-all duration-300 ${
                activePage === item.id 
                  ? 'text-secondary border-b-2 border-secondary font-bold' 
                  : 'text-on-surface hover:text-secondary border-b-2 border-transparent'
              }`}
            >
              {isArabic ? item.labelAr : item.labelEn}
            </a>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => handleNavClick('contact')}
            className="hidden md:block px-6 py-2 bg-primary text-white rounded-full font-semibold hover:opacity-80 transition-all duration-300 scale-95 active:scale-90"
          >
            {isArabic ? 'احصل على عرض سعر' : 'Get a Quote'}
          </button>
          
          <button 
            onClick={() => setIsArabic(!isArabic)}
            className="text-primary font-bold hover:text-secondary transition-colors px-2 py-1 rounded border border-outline-variant/20 hover:bg-surface-container"
          >
            {isArabic ? 'English' : 'العربية'}
          </button>

          {/* Hamburger Menu (Mobile) */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-primary focus:outline-none"
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
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-outline-variant/20 shadow-xl py-6 px-margin-mobile flex flex-col gap-4 animate-fade-in">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => { e.preventDefault(); handleNavClick(item.id); }}
              className={`text-lg py-2 font-semibold ${
                activePage === item.id ? 'text-secondary' : 'text-on-surface'
              }`}
            >
              {isArabic ? item.labelAr : item.labelEn}
            </a>
          ))}
          <button 
            onClick={() => handleNavClick('contact')}
            className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-container"
          >
            {isArabic ? 'طلب عرض سعر' : 'Get Free Quote'}
          </button>
        </div>
      )}
    </nav>
  );
}
