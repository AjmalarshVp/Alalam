import React from "react";
import { Logo } from "../AAIcon";
import { Phone, Mail, MapPin, MessageCircle, Instagram, Twitter } from "lucide-react";
import { WHATSAPP_LINK, PHONE_DISPLAY, EMAIL, INSTAGRAM_LINK } from "../../lib/translations";
import { trackExternalLink } from "../../lib/analytics";
import { useSectionView } from "../../hooks/useSectionView";
import { EVENTS } from "../../lib/analyticsEvents";

const Footer = ({ t, scrollTo, year = new Date().getFullYear() }) => {
  const lang = document.documentElement.lang || "en";
  const page = typeof window !== "undefined" && window.location.pathname === "/packages" ? "packages" : "home";
  const sectionRef = useSectionView(EVENTS.FOOTER_SECTION_VIEW, { page, language: lang });

  const mkExternal = (specificEvent, linkName, linkType, domain) => () =>
    trackExternalLink({ specificEvent, linkName, linkType, destinationDomain: domain, page, section: "footer", language: lang });

  return (
    <footer
      ref={sectionRef}
      data-testid="footer-section"
      className="relative pt-12 pb-32 px-6 border-t border-white/5 bg-[#040B16]"
    >
      <div className="max-w-md mx-auto">
        <Logo />
        <p className="text-[13.5px] text-slate-400 mt-4 leading-relaxed max-w-[34ch]">
          {t.footer.tagline}
        </p>

        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noreferrer"
          data-testid="footer-whatsapp"
          onClick={mkExternal(EVENTS.FOOTER_WHATSAPP_CLICK, "footer_whatsapp", "whatsapp", "wa.me")}
          className="aa-btn-wa mt-6 w-full"
        >
          <MessageCircle size={17} />
          {t.hero.ctaWhatsapp}
        </a>

        <div className="aa-divider my-9" />

        <div className="grid grid-cols-2 gap-7">
          <div>
            <div className="text-[10.5px] uppercase tracking-[0.24em] text-cyan-300/80 font-semibold">
              {t.footer.contact}
            </div>
            <ul className="mt-3 space-y-2.5 text-[13px] text-slate-300">
              <li className="flex items-center gap-2">
                <Phone size={13} className="text-cyan-300 shrink-0" />
                <a href={`tel:${PHONE_DISPLAY.replace(/\s/g, "")}`} data-testid="footer-phone"
                  onClick={mkExternal(EVENTS.FOOTER_PHONE_CLICK, "footer_phone", "phone", "tel")}>
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={13} className="text-cyan-300 shrink-0" />
                <a href={`mailto:${EMAIL}`} data-testid="footer-email"
                  onClick={mkExternal(EVENTS.FOOTER_EMAIL_CLICK, "footer_email", "email", "gmail.com")}>
                  {EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={13} className="text-cyan-300 shrink-0 mt-1" />
                <span className="text-slate-400 leading-snug">
                  {t.footer.address}
                </span>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-[10.5px] uppercase tracking-[0.24em] text-cyan-300/80 font-semibold">
              {t.footer.quick}
            </div>
            <ul className="mt-3 space-y-2.5 text-[13px] text-slate-300">
              <li>
                <button onClick={() => scrollTo("services")} className="hover:text-cyan-300 transition">
                  {t.nav.services}
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("process")} className="hover:text-cyan-300 transition">
                  {t.nav.process}
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("contact")} className="hover:text-cyan-300 transition">
                  {t.nav.contact}
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="aa-divider my-8" />

        <div className="flex items-center justify-between">
          <div className="text-[11px] text-slate-500">
            © {year} Al Alam Pools. {t.footer.rights}
          </div>
          <div className="flex items-center gap-2">
            <a
              href={INSTAGRAM_LINK}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              onClick={mkExternal(EVENTS.FOOTER_INSTAGRAM_CLICK, "footer_instagram", "social", "instagram.com")}
              className="w-9 h-9 rounded-full grid place-items-center border border-white/10 text-slate-300 hover:text-cyan-300 hover:border-cyan-400/30 transition"
            >
              <Instagram size={14} />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="w-9 h-9 rounded-full grid place-items-center border border-white/10 text-slate-300 hover:text-cyan-300 hover:border-cyan-400/30 transition"
            >
              <Twitter size={14} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
