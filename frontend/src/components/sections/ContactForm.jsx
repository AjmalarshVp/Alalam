import React, { useState, useRef, useEffect } from "react";
import { Reveal } from "../Reveal";
import { ArrowRight, MessageCircle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { WHATSAPP_LINK } from "../../lib/translations";
import { trackFormEvent, trackExternalLink } from "../../lib/analytics";
import { getBookingContext, clearBookingContext } from "../../lib/bookingContext";
import { EVENTS } from "../../lib/analyticsEvents";

// Google Sheets endpoint (same Apps Script used by the main branch)
const SHEETS_URL = process.env.REACT_APP_SHEETS_URL;

// Total trackable fields used for form-completion percentage
const TOTAL_FIELDS = 4;

const ContactForm = ({ t, lang }) => {
  const [form, setForm] = useState({ name: "", phone: "", service: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  // Refs track interaction state without causing re-renders
  const formStarted = useRef(false);
  const formSubmitted = useRef(false);
  const lastField = useRef("");
  const touchedFields = useRef(new Set());

  const onChange = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  // Fire form-start event only once on the very first field interaction
  const onFormStart = () => {
    if (!formStarted.current) {
      formStarted.current = true;
      trackFormEvent(EVENTS.BOOKING_FORM_START, { language: lang, page: "home" });
    }
  };

  // Per-field focus handlers — only the field name is sent, never the value
  const onFieldFocus = (eventName, fieldKey) => {
    onFormStart();
    lastField.current = fieldKey;
    touchedFields.current.add(fieldKey);
    trackFormEvent(eventName, { language: lang, page: "home", fieldName: fieldKey });
  };

  // Track abandonment on unmount (route change) and browser unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (formStarted.current && !formSubmitted.current) {
        const completionPct = Math.round((touchedFields.current.size / TOTAL_FIELDS) * 100);
        trackFormEvent(EVENTS.BOOKING_FORM_ABANDON, {
          language: lang,
          page: "home",
          lastField: lastField.current,
          completionPct,
        });
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      handleBeforeUnload(); // also fires on React route unmount
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const submit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.phone) {
      toast.error(lang === "ar" ? "يرجى إدخال الاسم والهاتف" : "Please fill name and phone");
      trackFormEvent(EVENTS.BOOKING_FORM_VALIDATION_ERROR, {
        language: lang,
        page: "home",
        fieldName: !form.name ? "name" : "phone",
        errorType: "required_field_empty",
      });
      return;
    }

    setSubmitting(true);

    // Read non-sensitive booking context set by the Book Now button that was clicked
    const ctx = getBookingContext();

    // Payload mirrors the field structure used across the main branch's Sheets integration.
    // email and city are empty strings to match existing spreadsheet columns.
    // source_* fields provide context metadata for the spreadsheet without sending PII.
    const payload = {
      name: form.name,
      phone: form.phone,
      email: "",
      service: form.service,
      message: form.message,
      city: "",
      source_page: ctx.sourcePage || "home",
      source_section: ctx.sourceSection || "contact_form",
      selected_package: ctx.selectedPackage || "",
    };

    try {
      await fetch(SHEETS_URL, {
        method: "POST",
        mode: "no-cors", // Apps Script does not return CORS headers; response is always opaque
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      // no-cors means the response is opaque — treat a resolved fetch as success
      formSubmitted.current = true;
      clearBookingContext();
      setSubmitting(false);
      setDone(true);
      toast.success(t.form.success);
      trackFormEvent(EVENTS.BOOKING_FORM_SUBMIT_SUCCESS, { language: lang, page: "home" });
    } catch {
      // Network-level failure (no connection, script unavailable)
      setSubmitting(false);
      toast.error(lang === "ar" ? "حدث خطأ، يرجى المحاولة مجدداً" : "Something went wrong. Please try again.");
      trackFormEvent(EVENTS.BOOKING_FORM_SUBMIT_ERROR, {
        language: lang,
        page: "home",
        errorType: "network_error",
      });
    }
  };

  const handleWhatsApp = () => {
    trackExternalLink({
      specificEvent: "contact_form_whatsapp_click",
      linkName: "contact_whatsapp",
      linkType: "whatsapp",
      destinationDomain: "wa.me",
      page: "home",
      section: "contact_form",
      language: lang,
    });
  };

  return (
    <section
      data-testid="contact-section"
      id="contact"
      className="relative py-12 px-6"
    >
      <div className="absolute inset-x-0 top-0 h-72 aa-radial-glow-soft pointer-events-none" />

      <div className="max-w-md mx-auto">
        <Reveal>
          <span className="aa-overline left-only">{t.cta.overline}</span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display text-[32px] leading-[1.08] text-white mt-4 tracking-tight">
            {t.cta.title}
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="text-[14px] text-slate-400 mt-3 leading-relaxed">
            {t.cta.sub}
          </p>
        </Reveal>

        <Reveal delay={0.22}>
          <div className="aa-glass rounded-3xl p-6 mt-8 relative overflow-hidden">
            <div className="absolute -top-24 -right-12 w-56 h-56 aa-radial-glow opacity-70 pointer-events-none" />

            <div className="relative">
              <h3 className="font-display text-[20px] text-white">
                {t.form.title}
              </h3>
              <p className="text-[12.5px] text-slate-400 mt-1.5">
                {t.form.sub}
              </p>

              {done ? (
                <div
                  data-testid="form-success"
                  className="mt-6 rounded-2xl border border-cyan-400/30 bg-cyan-400/[0.06] p-5 flex items-start gap-3"
                >
                  <CheckCircle2 size={20} className="text-cyan-300 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-[14.5px] font-semibold text-white">
                      {t.form.success}
                    </div>
                    <a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noreferrer"
                      onClick={handleWhatsApp}
                      className="text-[12.5px] text-cyan-300 mt-2 inline-flex items-center gap-1.5 hover:underline"
                    >
                      <MessageCircle size={13} />
                      {t.form.whatsappAlt}
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={submit} className="mt-5 grid gap-3">
                  <Field
                    testid="form-name"
                    placeholder={t.form.name}
                    value={form.name}
                    onChange={onChange("name")}
                    onFocus={() => onFieldFocus(EVENTS.BOOKING_FORM_NAME_FOCUS, "name")}
                  />
                  <Field
                    testid="form-phone"
                    type="tel"
                    placeholder={t.form.phone}
                    value={form.phone}
                    onChange={onChange("phone")}
                    onFocus={() => onFieldFocus(EVENTS.BOOKING_FORM_PHONE_FOCUS, "phone")}
                  />
                  <SelectField
                    testid="form-service"
                    value={form.service}
                    onChange={(e) => {
                      onChange("service")(e);
                      onFieldFocus(EVENTS.BOOKING_FORM_SERVICE_SELECT, "service");
                    }}
                    placeholder={t.form.service}
                    options={t.services.list.map((s) => s.name)}
                    lang={lang}
                  />
                  <textarea
                    data-testid="form-message"
                    rows={3}
                    placeholder={t.form.message}
                    value={form.message}
                    onChange={onChange("message")}
                    onFocus={() => onFieldFocus(EVENTS.BOOKING_FORM_MESSAGE_FOCUS, "message")}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-[14px] text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400/50 transition resize-none"
                  />
                  <button
                    type="submit"
                    data-testid="form-submit"
                    disabled={submitting}
                    className="aa-btn-primary w-full mt-1 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {submitting ? t.form.sending : t.form.submit}
                    {!submitting && <ArrowRight size={16} />}
                  </button>

                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noreferrer"
                    data-testid="form-whatsapp"
                    onClick={handleWhatsApp}
                    className="text-[12.5px] text-center text-slate-400 mt-1 hover:text-cyan-300 transition inline-flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle size={13} />
                    {t.form.whatsappAlt}
                  </a>
                </form>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const Field = ({ testid, type = "text", onFocus, ...rest }) => (
  <input
    data-testid={testid}
    type={type}
    onFocus={onFocus}
    {...rest}
    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-[14px] text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400/50 transition"
  />
);

const SelectField = ({ testid, value, onChange, placeholder, options, lang }) => (
  <div className="relative">
    <select
      data-testid={testid}
      value={value}
      onChange={onChange}
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-[14px] text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400/50 transition appearance-none pe-10"
    >
      <option value="" className="bg-[#0A1428]">
        {placeholder}
      </option>
      {options.map((o) => (
        <option key={o} value={o} className="bg-[#0A1428]">
          {o}
        </option>
      ))}
    </select>
    <span className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-slate-400">
      ▾
    </span>
  </div>
);

export default ContactForm;
