import React, { useEffect } from 'react';

export default function Lightbox({ isOpen, onClose, images, currentIndex, setCurrentIndex, lang }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    // Lock scroll
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentIndex]);

  if (!isOpen || !images || images.length === 0) return null;

  const currentImage = images[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-primary/95 flex items-center justify-center p-4 animate-fade-in">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-8 right-8 text-white hover:text-secondary-fixed transition-colors cursor-pointer focus:outline-none"
        aria-label="Close lightbox"
      >
        <span className="material-symbols-outlined text-4xl">close</span>
      </button>

      {/* Prev Button */}
      <button
        onClick={handlePrev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white hover:text-secondary-fixed transition-colors cursor-pointer focus:outline-none z-10 bg-black/20 p-2 rounded-full backdrop-blur-sm"
        aria-label="Previous image"
      >
        <span className="material-symbols-outlined text-4xl">chevron_left</span>
      </button>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white hover:text-secondary-fixed transition-colors cursor-pointer focus:outline-none z-10 bg-black/20 p-2 rounded-full backdrop-blur-sm"
        aria-label="Next image"
      >
        <span className="material-symbols-outlined text-4xl">chevron_right</span>
      </button>

      {/* Content Container */}
      <div className="max-w-5xl w-full max-h-[80vh] flex flex-col items-center justify-center">
        <img
          src={currentImage.src}
          alt={lang === 'ar' && currentImage.titleAr ? currentImage.titleAr : currentImage.title}
          className="max-w-full max-h-[70vh] object-contain rounded shadow-2xl pointer-events-none select-none transition-all duration-300"
        />
        <div className="mt-6 text-center text-white max-w-2xl px-4">
          <h2 className="font-display-lg text-2xl md:text-3xl font-bold mb-2">
            {lang === 'ar' && currentImage.titleAr ? currentImage.titleAr : currentImage.title}
          </h2>
          <p className="text-secondary-fixed text-sm md:text-base">
            {lang === 'ar' && currentImage.descAr ? currentImage.descAr : currentImage.desc}
          </p>
        </div>
      </div>
    </div>
  );
}
