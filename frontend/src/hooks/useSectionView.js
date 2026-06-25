import { useEffect, useRef } from "react";
import { trackSectionView } from "../lib/analytics";

// Attaches an IntersectionObserver to a DOM element (via returned ref) and
// fires the given analytics event once when 20% of the element is visible.
// Fires once per mount — resets if sectionEvent/page/language changes.
export const useSectionView = (sectionEvent, { page, language }) => {
  const ref = useRef(null);
  const fired = useRef(false);

  useEffect(() => {
    fired.current = false;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired.current) {
          fired.current = true;
          trackSectionView(sectionEvent, { page, language });
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [sectionEvent, page, language]);

  return ref;
};
