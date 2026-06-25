import { useEffect, useRef } from "react";
import { trackScrollDepth } from "../lib/analytics";

// Fires scroll-depth milestones (25 / 50 / 75 / 100) once per page view.
// Reset automatically when page/pagePath changes (route change).
export const useScrollDepth = ({ page, pagePath, language }) => {
  const fired = useRef(new Set());

  useEffect(() => {
    fired.current = new Set(); // reset per route

    const onScroll = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      const pct = (scrolled / total) * 100;

      [25, 50, 75, 100].forEach((threshold) => {
        if (pct >= threshold && !fired.current.has(threshold)) {
          fired.current.add(threshold);
          trackScrollDepth(threshold, { page, pagePath, language });
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [page, pagePath, language]);
};
