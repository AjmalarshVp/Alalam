import React, { useState } from 'react';

const translations = {
  en: {
    title: 'Request a Quote',
    subtitle: 'Get a customized proposal within 24 hours',
    name: 'Full Name',
    namePlaceholder: 'e.g. Khalid Al-Faisal',
    phone: 'Phone Number',
    phonePlaceholder: '+966 5X XXX XXXX',
    email: 'Email Address',
    emailPlaceholder: 'name@company.sa',
    service: 'Service Type',
    selectService: 'Select a Service',
    newDesign: 'New Construction & Design',
    maintenance: 'Weekly Maintenance Plan',
    renovation: 'Pool Renovation & Tiling',
    message: 'Your Message',
    messagePlaceholder: 'Tell us about your pool dimensions, location, and requirements...',
    submit: 'Submit Request',
    sending: 'Sending...',
    success: 'Success! We will contact you soon.'
  },
  ar: {
    title: 'طلب عرض سعر',
    subtitle: 'احصل على عرض مخصص خلال 24 ساعة',
    name: 'الاسم الكامل',
    namePlaceholder: 'مثال: خالد الفيصل',
    phone: 'رقم الجوال',
    phonePlaceholder: '+966 5X XXX XXXX',
    email: 'البريد الإلكتروني',
    emailPlaceholder: 'name@company.sa',
    service: 'نوع الخدمة',
    selectService: 'اختر الخدمة المطلوبة',
    newDesign: 'تصميم وإنشاء مسابح جديدة',
    maintenance: 'خطة صيانة دورية أسبوعية',
    renovation: 'تجديد وترميم المسبح والبلاط',
    message: 'تفاصيل الطلب',
    messagePlaceholder: 'أخبرنا عن أبعاد مسبحك وموقعك ومتطلباتك...',
    submit: 'إرسال الطلب',
    sending: 'جاري الإرسال...',
    success: 'تم الإرسال بنجاح! سنتصل بك قريباً.'
  }
};

export default function QuoteModal({ isOpen, onClose, lang }) {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', service: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success
  const t = translations[lang];

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', phone: '', email: '', service: '', message: '' });
      setTimeout(() => {
        setStatus('idle');
        onClose();
      }, 2500);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-primary/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl p-8 max-w-lg w-full relative shadow-2xl border border-outline-variant/20 max-h-[90vh] overflow-y-auto">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-primary hover:text-secondary transition-colors cursor-pointer focus:outline-none"
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined text-3xl">close</span>
        </button>

        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-display-lg text-primary font-bold mb-2">
            {t.title}
          </h2>
          <p className="text-sm text-on-surface-variant font-body-md">
            {t.subtitle}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-primary uppercase tracking-wider">{t.name}</label>
            <input
              type="text"
              required
              placeholder={t.namePlaceholder}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="border-b-2 border-outline-variant focus:border-secondary outline-none py-2 px-1 transition-all text-primary font-body-md"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-primary uppercase tracking-wider">{t.phone}</label>
            <input
              type="tel"
              required
              placeholder={t.phonePlaceholder}
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="border-b-2 border-outline-variant focus:border-secondary outline-none py-2 px-1 transition-all text-primary font-body-md"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-primary uppercase tracking-wider">{t.email}</label>
            <input
              type="email"
              required
              placeholder={t.emailPlaceholder}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="border-b-2 border-outline-variant focus:border-secondary outline-none py-2 px-1 transition-all text-primary font-body-md"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-primary uppercase tracking-wider">{t.service}</label>
            <select
              required
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="border-b-2 border-outline-variant focus:border-secondary outline-none py-2 px-1 transition-all text-primary bg-transparent font-body-md"
            >
              <option value="">{t.selectService}</option>
              <option value="new">{t.newDesign}</option>
              <option value="maintenance">{t.maintenance}</option>
              <option value="renovation">{t.renovation}</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-primary uppercase tracking-wider">{t.message}</label>
            <textarea
              rows="3"
              placeholder={t.messagePlaceholder}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="border-b-2 border-outline-variant focus:border-secondary outline-none py-2 px-1 transition-all text-primary resize-none font-body-md"
            />
          </div>

          <button
            type="submit"
            disabled={status !== 'idle'}
            className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:scale-95 transition-all text-white flex items-center justify-center gap-2 cursor-pointer ${
              status === 'success'
                ? 'bg-green-600'
                : status === 'sending'
                ? 'bg-primary/70 cursor-not-allowed'
                : 'bg-primary hover:bg-primary-container'
            }`}
          >
            {status === 'success' && (
              <>
                <span className="material-symbols-outlined">check_circle</span>
                {t.success}
              </>
            )}
            {status === 'sending' && (
              <>
                <span className="material-symbols-outlined animate-spin">progress_activity</span>
                {t.sending}
              </>
            )}
            {status === 'idle' && (
              <>
                <span className="material-symbols-outlined">send</span>
                {t.submit}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
