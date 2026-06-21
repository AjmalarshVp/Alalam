import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import QuoteModal from './components/QuoteModal';
import Home from './pages/Home';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [lang, setLang] = useState('en');
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  // Sync HTML direction and language
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    if (lang === 'ar') {
      document.documentElement.classList.add('rtl');
    } else {
      document.documentElement.classList.remove('rtl');
    }
  }, [lang]);

  const toggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Home
            lang={lang}
            setCurrentPage={setCurrentPage}
            openQuoteModal={() => setQuoteModalOpen(true)}
          />
        );
      case 'services':
        return <Services lang={lang} />;
      case 'gallery':
        return (
          <Gallery
            lang={lang}
            openQuoteModal={() => setQuoteModalOpen(true)}
          />
        );
      case 'contact':
        return <Contact lang={lang} />;
      default:
        return (
          <Home
            lang={lang}
            setCurrentPage={setCurrentPage}
            openQuoteModal={() => setQuoteModalOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface select-none font-body-md transition-colors duration-300">
      {/* Top Navbar */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        lang={lang}
        toggleLang={toggleLang}
        openQuoteModal={() => setQuoteModalOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-grow">
        {renderPage()}
      </div>

      {/* Footer */}
      <Footer
        lang={lang}
        setCurrentPage={setCurrentPage}
      />

      {/* Quote request form Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        lang={lang}
      />

      {/* Floating Action Button (WhatsApp) */}
      <div className={`fixed bottom-8 z-[100] ${lang === 'ar' ? 'left-8' : 'right-8'}`}>
        <a
          href="https://wa.me/966571467576"
          target="_blank"
          rel="noopener noreferrer"
          className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all float-anim"
          aria-label="Chat on WhatsApp"
        >
          <span className="material-symbols-outlined text-3xl font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
        </a>
      </div>
    </div>
  );
}

export default App;
