import React from "react";
import { Reveal } from "../Reveal";
import { ArrowRight, MessageCircle } from "lucide-react";
import { WHATSAPP_LINK } from "../../lib/translations";
import { trackButtonClick, trackExternalLink } from "../../lib/analytics";
import { useSectionView } from "../../hooks/useSectionView";
import { setBookingContext } from "../../lib/bookingContext";
import { EVENTS } from "../../lib/analyticsEvents";

const FinalCTA = ({ t, scrollTo }) => {
  const lang = document.documentElement.lang || "en";
  const sectionRef = useSectionView(EVENTS.HOW_IT_WORKS_SECTION_VIEW, { page: "home", language: lang });

  const handleBookNow = () => {
    setBookingContext({ sourcePage: "home", sourceSection: "final_cta" });
    trackButtonClick(EVENTS.FINAL_CTA_BOOK_NOW_CLICK, { language: lang, section: "final_cta", page: "home" });
    scrollTo("contact");
  };

  const handleWhatsApp = () => {
    trackExternalLink({
      specificEvent: EVENTS.FINAL_CTA_WHATSAPP_CLICK,
      linkName: "final_cta_whatsapp",
      linkType: "whatsapp",
      destinationDomain: "wa.me",
      page: "home",
      section: "final_cta",
      language: lang,
    });
  };

  return (
    <section ref={sectionRef} data-testid="final-cta-section" className="relative py-8 px-6">
      <div className="max-w-md mx-auto">
        <Reveal>
          <div className="relative rounded-3xl overflow-hidden aa-glass p-7 aa-shimmer">
            <div className="absolute -top-24 -left-12 w-60 h-60 aa-radial-glow opacity-90 pointer-events-none" />
            <div className="absolute -bottom-24 -right-12 w-60 h-60 aa-radial-glow opacity-60 pointer-events-none" />

            <div className="relative">
              <span className="aa-overline left-only">{t.cta.overline}</span>
              <h2 className="font-display text-[28px] leading-[1.12] text-white mt-4 tracking-tight">
                {t.cta.title}
              </h2>
              <p className="text-[13.5px] text-slate-300/85 mt-3 leading-relaxed">
                {t.cta.sub}
              </p>

              <div className="mt-6 flex flex-col gap-3">
                <button
                  data-testid="final-cta-book"
                  onClick={handleBookNow}
                  className="aa-btn-primary w-full"
                >
                  {t.hero.ctaPrimary}
                  <ArrowRight size={16} />
                </button>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noreferrer"
                  data-testid="final-cta-whatsapp"
                  onClick={handleWhatsApp}
                  className="aa-btn-ghost w-full"
                >
                  <MessageCircle size={16} />
                  {t.hero.ctaWhatsapp}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default FinalCTA;
