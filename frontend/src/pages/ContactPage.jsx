import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Phone, Mail, MapPin, Clock, MessageCircle,
  Send, CheckCircle2, ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { translations, WHATSAPP_NUMBER, WHATSAPP_LINK, PHONE_DISPLAY, EMAIL } from "../lib/translations";
import { trackPageView, trackEvent, trackExternalLink } from "../lib/analytics";
import { EVENTS } from "../lib/analyticsEvents";
import { useScrollDepth } from "../hooks/useScrollDepth";
import { Reveal } from "../components/Reveal";
import Header from "../components/sections/Header";
import Footer from "../components/sections/Footer";
import FloatingWhatsApp from "../components/sections/FloatingWhatsApp";

const SHEETS_URL = process.env.REACT_APP_SHEETS_URL;

const CONTACT_BG =
  "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1400&q=80";

const ContactPage = ({ lang, setLang }) => {
  const t = translations[lang];
  const cp = t.contactPage;
  const isRtl = t.dir === "rtl";

  useEffect(() => {
    trackPageView({ pageName: "contact", pagePath: "/contact", language: lang });
  }, [lang]);

  useScrollDepth({ page: "contact", pagePath: "/contact", language: lang });

  const scrollTo = (id) => { window.location.href = "/#" + id; };

  const handleWhatsApp = (section) => {
    trackExternalLink({
      specificEvent: EVENTS.CONTACT_WHATSAPP_CLICK,
      linkName: `contact_${section}_whatsapp`,
      linkType: "whatsapp",
      destinationDomain: "wa.me",
      page: "contact",
      section,
      language: lang,
    });
  };

  const handlePhone = () => {
    trackEvent(EVENTS.CONTACT_PHONE_CLICK, { page: "contact", language: lang });
  };

  const handleEmail = () => {
    trackEvent(EVENTS.CONTACT_EMAIL_CLICK, { page: "contact", language: lang });
  };

  return (
    <div className="min-h-screen bg-[#040B16] text-white font-body relative overflow-x-hidden">
      {/* Background ambient glow */}
      <div className="absolute inset-x-0 top-0 h-[70vh] aa-radial-glow pointer-events-none opacity-60" />

      <Header lang={lang} setLang={setLang} t={t} scrollTo={scrollTo} />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[42vh] flex items-end pt-32 pb-12 px-5 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src={CONTACT_BG}
            alt="Pool"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020812]/70 via-[#040B16]/70 to-[#040B16]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#04111F]/60 via-transparent to-[#04111F]/40" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto w-full">
          <Reveal>
            <span className="aa-overline">{cp.overline}</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1
              className="font-display text-[36px] sm:text-[52px] leading-[1.05] text-white mt-5 tracking-tight"
              style={{ textShadow: "0 4px 28px rgba(0,0,0,0.5)" }}
            >
              {cp.title}
            </h1>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="text-[15px] text-slate-300/90 mt-4 leading-relaxed max-w-[52ch]">
              {cp.subtitle}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <main className="relative max-w-5xl mx-auto px-5 pb-24">
        <div className="grid md:grid-cols-5 gap-7 mt-8">
          {/* ── Contact Form (wider column) ── */}
          <div className="md:col-span-3">
            <Reveal>
              <ContactForm cp={cp} lang={lang} isRtl={isRtl} />
            </Reveal>
          </div>

          {/* ── Right column: Info + WhatsApp card ── */}
          <div className="md:col-span-2 flex flex-col gap-5">
            {/* Company info card */}
            <Reveal delay={0.1}>
              <InfoCard cp={cp} onPhone={handlePhone} onEmail={handleEmail} onWhatsApp={() => handleWhatsApp("info")} />
            </Reveal>

            {/* WhatsApp quick card */}
            <Reveal delay={0.2}>
              <WhatsAppCard cp={cp} lang={lang} onWhatsApp={() => handleWhatsApp("quick_card")} />
            </Reveal>
          </div>
        </div>

        {/* ── Map section ── */}
        <Reveal delay={0.15}>
          <div className="mt-12">
            <h2 className="font-display text-[22px] text-white mb-2">{cp.mapTitle}</h2>
            <p className="text-[13px] text-slate-400 mb-5">{cp.mapSub}</p>
            <div className="relative rounded-3xl overflow-hidden border border-white/[0.07]" style={{ height: 320 }}>
              <iframe
                title="Al Alam Service Area"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14497.673!2d46.6828!3d24.6877!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489399%3A0xba974d1c98e79fd5!2sRiyadh%20Saudi%20Arabia!5e0!3m2!1sen!2ssa!4v1700000000000!5m2!1sen!2ssa"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(0.85)" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* Dark overlay tint for premium feel */}
              <div className="absolute inset-0 pointer-events-none rounded-3xl"
                style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)" }} />
            </div>
          </div>
        </Reveal>
      </main>

      <Footer t={t} scrollTo={scrollTo} />
      <FloatingWhatsApp />
    </div>
  );
};

/* ── Contact Form ─────────────────────────────────────────────────────────── */

const ContactForm = ({ cp, lang, isRtl }) => {
  const [form, setForm] = useState({
    name: "", phone: "", email: "",
    city: "", poolType: "", poolSize: "",
    service: "", message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const started = useRef(false);

  const onChange = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onFirstInteraction = () => {
    if (!started.current) {
      started.current = true;
      trackEvent(EVENTS.CONTACT_FORM_START, { page: "contact", language: lang });
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast.error(lang === "ar" ? "يرجى إدخال الاسم ورقم الهاتف" : "Please fill in your name and phone number.");
      return;
    }
    setSubmitting(true);
    const payload = {
      name: form.name,
      phone: form.phone,
      email: form.email,
      city: form.city,
      pool_type: form.poolType,
      pool_size: form.poolSize,
      service: form.service,
      message: form.message,
      source_page: "contact",
      source_section: "contact_form",
      selected_package: form.service,
    };
    try {
      await fetch(SHEETS_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setSubmitting(false);
      setDone(true);
      toast.success(cp.form.success);
      trackEvent(EVENTS.CONTACT_FORM_SUBMITTED, {
        selected_service: form.service,
        city: form.city,
        source_page: "contact",
        timestamp: Date.now(),
        language: lang,
      });
    } catch {
      setSubmitting(false);
      toast.error(lang === "ar" ? "حدث خطأ، يرجى المحاولة مجدداً" : "Something went wrong. Please try again.");
      trackEvent(EVENTS.CONTACT_FORM_SUBMIT_ERROR, { page: "contact", language: lang });
    }
  };

  if (done) {
    return (
      <div className="aa-card p-8 flex flex-col items-center text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-cyan-400/10 border border-cyan-400/30 grid place-items-center">
          <CheckCircle2 size={32} className="text-cyan-300" />
        </div>
        <h3 className="font-display text-[22px] text-white">{cp.form.success}</h3>
        <p className="text-[13px] text-slate-400 max-w-[32ch]">
          {lang === "ar"
            ? "سيتواصل معك أحد متخصصينا قريباً."
            : "One of our specialists will reach out to you shortly."}
        </p>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noreferrer"
          className="aa-btn-ghost mt-2"
        >
          <MessageCircle size={15} />
          {cp.whatsappCard.cta}
        </a>
      </div>
    );
  }

  return (
    <div className="aa-card p-6 sm:p-8">
      <h2 className="font-display text-[22px] text-white">{cp.form.title}</h2>
      <p className="text-[12.5px] text-slate-400 mt-1.5 mb-6">{cp.form.sub}</p>

      <form onSubmit={submit} className="grid gap-3.5">
        {/* Row 1: Name + Phone */}
        <div className="grid sm:grid-cols-2 gap-3.5">
          <FormInput
            placeholder={cp.form.name}
            value={form.name}
            onChange={onChange("name")}
            onFocus={onFirstInteraction}
            required
          />
          <FormInput
            type="tel"
            placeholder={cp.form.phone}
            value={form.phone}
            onChange={onChange("phone")}
            onFocus={onFirstInteraction}
            required
          />
        </div>

        {/* Row 2: Email + City */}
        <div className="grid sm:grid-cols-2 gap-3.5">
          <FormInput
            type="email"
            placeholder={cp.form.email}
            value={form.email}
            onChange={onChange("email")}
            onFocus={onFirstInteraction}
          />
          <FormInput
            placeholder={cp.form.city}
            value={form.city}
            onChange={onChange("city")}
            onFocus={onFirstInteraction}
          />
        </div>

        {/* Row 3: Pool Type + Pool Size */}
        <div className="grid sm:grid-cols-2 gap-3.5">
          <FormSelect
            value={form.poolType}
            onChange={onChange("poolType")}
            onFocus={onFirstInteraction}
            placeholder={cp.form.poolType}
            options={cp.form.poolTypes}
            lang={lang}
          />
          <FormInput
            placeholder={cp.form.poolSize}
            value={form.poolSize}
            onChange={onChange("poolSize")}
            onFocus={onFirstInteraction}
          />
        </div>

        {/* Service */}
        <FormSelect
          value={form.service}
          onChange={onChange("service")}
          onFocus={onFirstInteraction}
          placeholder={cp.form.service}
          options={cp.form.services}
          lang={lang}
        />

        {/* Message */}
        <textarea
          rows={4}
          placeholder={cp.form.message}
          value={form.message}
          onChange={onChange("message")}
          onFocus={onFirstInteraction}
          className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-[14px] text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400/50 transition resize-none"
        />

        <motion.button
          type="submit"
          disabled={submitting}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="aa-btn-primary w-full mt-1 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {submitting ? cp.form.sending : cp.form.submit}
          {!submitting && <Send size={15} />}
        </motion.button>
      </form>
    </div>
  );
};

/* ── Company info card ────────────────────────────────────────────────────── */

const InfoCard = ({ cp, onPhone, onEmail, onWhatsApp }) => {
  const rows = [
    {
      icon: <MessageCircle size={16} className="text-green-400" />,
      label: cp.info.whatsapp,
      value: PHONE_DISPLAY,
      href: WHATSAPP_LINK,
      onClick: onWhatsApp,
      target: "_blank",
    },
    {
      icon: <Phone size={16} className="text-cyan-400" />,
      label: cp.info.phone,
      value: PHONE_DISPLAY,
      href: `tel:${PHONE_DISPLAY.replace(/\s/g, "")}`,
      onClick: onPhone,
    },
    {
      icon: <Mail size={16} className="text-cyan-400" />,
      label: cp.info.email,
      value: EMAIL,
      href: `mailto:${EMAIL}`,
      onClick: onEmail,
    },
    {
      icon: <MapPin size={16} className="text-cyan-400" />,
      label: cp.info.area,
      value: cp.info.areaValue,
    },
    {
      icon: <Clock size={16} className="text-cyan-400" />,
      label: cp.info.hours,
      value: cp.info.hoursValue,
      note: cp.info.hoursNote,
    },
  ];

  return (
    <div className="aa-card p-6">
      <h3 className="font-display text-[18px] text-white mb-5">{cp.info.title}</h3>
      <div className="space-y-4">
        {rows.map((row, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className="mt-0.5 w-8 h-8 rounded-full bg-white/[0.05] border border-white/[0.08] grid place-items-center shrink-0">
              {row.icon}
            </span>
            <div>
              <p className="text-[10.5px] uppercase tracking-[0.18em] text-slate-500 mb-0.5">
                {row.label}
              </p>
              {row.href ? (
                <a
                  href={row.href}
                  target={row.target}
                  rel="noreferrer"
                  onClick={row.onClick}
                  className="text-[13.5px] text-white hover:text-cyan-300 transition"
                >
                  {row.value}
                </a>
              ) : (
                <p className="text-[13.5px] text-white">{row.value}</p>
              )}
              {row.note && (
                <p className="text-[12px] text-slate-500 mt-0.5">{row.note}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── WhatsApp quick card ──────────────────────────────────────────────────── */

const WhatsAppCard = ({ cp, onWhatsApp }) => (
  <div
    className="aa-card p-6 relative overflow-hidden"
    style={{
      background: "linear-gradient(135deg, rgba(37,211,102,0.10) 0%, rgba(37,211,102,0.04) 100%)",
      borderColor: "rgba(37,211,102,0.35)",
    }}
  >
    {/* Glow */}
    <div
      className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none"
      style={{ background: "radial-gradient(circle, rgba(37,211,102,0.15) 0%, transparent 70%)" }}
    />
    <div className="relative">
      <div className="w-10 h-10 rounded-full bg-green-500/20 border border-green-400/40 grid place-items-center mb-4">
        <MessageCircle size={18} className="text-green-400" />
      </div>
      <h3 className="font-display text-[17px] text-white leading-snug">{cp.whatsappCard.title}</h3>
      <p className="text-[12.5px] text-slate-400 mt-1.5 mb-5">{cp.whatsappCard.sub}</p>
      <motion.a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noreferrer"
        onClick={onWhatsApp}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center justify-center gap-2 w-full py-3 px-5 rounded-xl font-semibold text-[14px] transition-all"
        style={{
          background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
          color: "#fff",
          boxShadow: "0 4px 20px -4px rgba(37,211,102,0.45)",
        }}
      >
        <MessageCircle size={16} />
        {cp.whatsappCard.cta}
        <ArrowRight size={14} />
      </motion.a>
    </div>
  </div>
);

/* ── Shared form primitives ───────────────────────────────────────────────── */

const FormInput = ({ type = "text", ...rest }) => (
  <input
    type={type}
    {...rest}
    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-[14px] text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400/50 transition"
  />
);

const FormSelect = ({ value, onChange, onFocus, placeholder, options, lang }) => (
  <div className="relative">
    <select
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-[14px] text-white focus:outline-none focus:border-cyan-400/50 transition appearance-none pe-10"
    >
      <option value="" className="bg-[#0A1428]">{placeholder}</option>
      {options.map((o) => (
        <option key={o} value={o} className="bg-[#0A1428]">{o}</option>
      ))}
    </select>
    <span className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-slate-400">▾</span>
  </div>
);

export default ContactPage;
