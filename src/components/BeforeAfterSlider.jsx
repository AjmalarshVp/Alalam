import React, { useState, useRef, useEffect } from 'react';

export default function BeforeAfterSlider({ beforeImage, afterImage, beforeLabel = "Before", afterLabel = "After" }) {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let position = (x / rect.width) * 100;
    if (position < 0) position = 0;
    if (position > 100) position = 100;
    setSliderPosition(position);
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleStart = () => {
    isDragging.current = true;
  };

  const handleEnd = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    const handleGlobalEnd = () => {
      isDragging.current = false;
    };

    window.addEventListener('mouseup', handleGlobalEnd);
    window.addEventListener('touchend', handleGlobalEnd);

    return () => {
      window.removeEventListener('mouseup', handleGlobalEnd);
      window.removeEventListener('touchend', handleGlobalEnd);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="slider-comparison w-full max-w-4xl mx-auto h-[400px] md:h-[600px] rounded-2xl shadow-xl select-none relative"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseDown={handleStart}
      onTouchStart={handleStart}
    >
      {/* After Image (Background) */}
      <img
        src={afterImage}
        alt="After Renovation"
        className="w-full h-full object-cover pointer-events-none"
      />

      {/* Before Image (Clipped Overlay) */}
      <div
        className="before-image absolute top-0 left-0 h-full overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeImage}
          alt="Before Renovation"
          className="w-full h-full object-cover pointer-events-none absolute top-0 left-0"
          style={{ width: containerRef.current ? containerRef.current.offsetWidth : 800, maxWidth: 'none' }}
        />
      </div>

      {/* Handle */}
      <div
        className="handle absolute top-0 bottom-0 z-20 w-[4px] bg-white cursor-ew-resize -translate-x-1/2"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white text-primary rounded-full flex items-center justify-center font-bold shadow-lg text-lg select-none">
          ↔
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 z-30 bg-primary/80 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
        {beforeLabel}
      </div>
      <div className="absolute top-4 right-4 z-30 bg-secondary/80 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
        {afterLabel}
      </div>
    </div>
  );
}
