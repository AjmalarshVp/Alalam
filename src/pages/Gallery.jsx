import React, { useState } from 'react';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import Lightbox from '../components/Lightbox';

const translations = {
  en: {
    heroBadge: "Our Masterpieces",
    heroTitle: "Transforming Visions into Aquatic Realities",
    heroDesc: "Explore our curated gallery of luxury swimming pools, from serene private villas in Riyadh to prestigious commercial aquatic centers across Saudi Arabia.",
    
    filterAll: "All / الكل",
    filterCleaning: "Cleaning / تنظيف",
    filterMaintenance: "Maintenance / صيانة",
    filterRenovation: "Renovation / تجديد",
    filterLabel: "Filter Projects",
    
    sliderHeader: "Transformation Excellence",
    sliderDesc: "Slide to see how our renovation experts breathe new life into aged pools.",
    
    ctaHeader: "Ready for your own aquatic masterpiece?",
    ctaSub: "Join the elite club of Al Alam pool owners. Contact us for a bespoke consultation today.",
    btnBook: "Book a Consultation",
    btnPortfolio: "Download Portfolio",
    
    formHeader: "Request a Quote / طلب عرض سعر",
    fieldName: "Full Name",
    fieldEmail: "Email Address",
    fieldService: "Select Service",
    serviceSelect: "Select Service",
    serviceNew: "New Design",
    serviceMaint: "Maintenance",
    serviceReno: "Renovation",
    btnSubmit: "Submit Request",
    btnSending: "Sending...",
    btnSuccess: "Success! Our team will contact you.",
    
    beforeLabel: "Before",
    afterLabel: "After"
  },
  ar: {
    heroBadge: "روائعنا الفنية",
    heroTitle: "تحويل الرؤى والخيال إلى واقع مائي ملموس",
    heroDesc: "استكشف معرضنا المنسق للمسابح الفاخرة، من الفلل الخاصة الهادئة في الرياض إلى المراكز المائية التجارية المرموقة في جميع أنحاء المملكة العربية السعودية.",
    
    filterAll: "الكل / All",
    filterCleaning: "تنظيف / Cleaning",
    filterMaintenance: "صيانة / Maintenance",
    filterRenovation: "تجديد / Renovation",
    filterLabel: "تصفية المشاريع",
    
    sliderHeader: "تميز التحول والترميم",
    sliderDesc: "اسحب الشريط لرؤية كيف يبث خبراء التجديد لدينا حياة جديدة في المسابح القديمة والمهملة.",
    
    ctaHeader: "هل أنت مستعد لتحفتك المائية الخاصة؟",
    ctaSub: "انضم إلى نادي النخبة من مالكي مسابح العالم. اتصل بنا للحصول على استشارة خاصة اليوم.",
    btnBook: "حجز استشارة",
    btnPortfolio: "تحميل ملف الأعمال",
    
    formHeader: "طلب عرض سعر / Request a Quote",
    fieldName: "الاسم الكامل",
    fieldEmail: "البريد الإلكتروني",
    fieldService: "اختر الخدمة",
    serviceSelect: "اختر الخدمة المطلوبة",
    serviceNew: "تصميم جديد",
    serviceMaint: "صيانة دورية",
    serviceReno: "تجديد وترميم",
    btnSubmit: "إرسال الطلب",
    btnSending: "جاري الإرسال...",
    btnSuccess: "تم الإرسال بنجاح! سنتصل بك.",
    
    beforeLabel: "قبل",
    afterLabel: "بعد"
  }
};

const ALL_PROJECTS = [
  {
    title: "The Desert Oasis",
    titleAr: "واحة الصحراء",
    desc: "Riyadh, KSA - Luxury Villa Pool",
    descAr: "الرياض، المملكة العربية السعودية - مسبح فيلا فاخرة",
    category: "renovation",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDCjn8PJB3dSyHeyH8dNiXKWgGjlc2THBSEH4fZb8TIfvgisE2jN6YOYqPlTjNN5M3pvz_bZ8Afnb1q0DtU4820AfDusx5tw4SD9RlxC3by-CLyHeN2vNGQi_818D3XsmgJjXiqW7sMtFHMllEymaUk_onZZtuCY1DcFp-B_GVXYl1DEnNMT6madW-34QWWjXLs2j7OITvk21IbLl14e8558xFGnpyQvMmGkA2bnI1o8MmrQuCxO57rHKyqgupoMyPTmtnlLXN8YXMN",
    aspect: "aspect-[4/5]"
  },
  {
    title: "Royal Blue Plaza",
    titleAr: "رويال بلو بلازا",
    desc: "Jeddah, KSA - Hotel Olympic Project",
    descAr: "جدة، المملكة العربية السعودية - مشروع مسبح أولمبي في فندق",
    category: "maintenance",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6ghxi_txia0CwIAVkbq3YIWWKHqc5jjiPoTKVJur9OSYzjXcGGiS7pcvUg7LA1EYpWWkr1y34LUg-c_Gw5673lKoWQB9XN1-PcWV7zu_l8Rq4cEn7svnI6UyUfUCkgNg2NNgougtYTga5diXktnjmSSmFyx5WJhcx9aUMTtCCMHei1aqiFSESNmhX-kmHNzrls0MPbvUU4A8qrNd2gbRkX5wg_dPDC8hjQ0tpE8tdsi91dJQAM3iGO6GK_rnmFPQo6WkTUZg7PYwg",
    aspect: "aspect-square"
  },
  {
    title: "Skyline Heights",
    titleAr: "سكاي لاين هايتس",
    desc: "Dammam, KSA - Rooftop Renovation",
    descAr: "الدمام، المملكة العربية السعودية - تجديد مسبح على السطح",
    category: "renovation",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBgnFLtwK0YRBYaIx0bhZenqxJwOTzXYk0kWPo_hL3BNorkc4kPeaTkcdp2YK8p5P-AbplkAReg8e5timyxZesSwQwgV3uHcCu7fBBCp7gbYbIQllDe8FGblRrOJjEZM3PJGemmhJqV7Geem21ux4QD6vc-tBYBAmzIWQ9PtUUeCPTUQklQ4JhXArtbxWPHZbogL99izCP7zFbRty-998Mdk_5Xz0Ivd-GtL9e-ItBJpZJH8ee95KVVGBYPXCFeGP2NDrhlajytMaVX",
    aspect: "aspect-[3/4]"
  },
  {
    title: "Precision Systems",
    titleAr: "الأنظمة الدقيقة",
    desc: "Maintenance Hub - Technical Service",
    descAr: "مركز الصيانة - خدمة فنية للمعدات والأنابيب",
    category: "maintenance",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBD1KuDoLo_Dhv9D4e7-lZ8NrgYyXRZOlGRz35dKrR44Sx3mCL_mEBDeQ1L0DYnblATysYV7KOCsmonHtyjT-k1Q4YaCv0Dq-feVGCoEyNr8xnLNYNrq-UPv0TxYgLQfstjJOrUiMo7fCDI6Y6bkAeZQwzuKZnj4qfOeI8BbgH2duJF3TuYz6-usYQRAeo4M8_O5TKTr41rBacInRe9iUYF_ebNX-5La9dK5337KAk2aAXC-7KlJnOu2tsnPwRGnMZmZkK-dXiucT52",
    aspect: "aspect-video"
  },
  {
    title: "Al Rawdah Villa",
    titleAr: "فيلا الروضة",
    desc: "Riyadh, KSA - Residential Oasis",
    descAr: "الرياض، المملكة العربية السعودية - واحة سكنية خاصة مريحة",
    category: "cleaning",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC5HsRAlbxf2H917KBof3ge9NDhOLQzm4x2exTzCmRpL87TvV8xN2IKjfyCXYrN1sREfGiIs7aMQnTfRpusentCc0GYf8zMuibHzzPHnG1GA3OkaVTcxgxkOBUNPf9DX6vheuMKJ4MZBiuoW32_wJ_ZHwOD9zkqvDiKbvPcXrtLFjZzlrBz3AseXqitom60R5oVh1OCeuLGOINRbDWNFzl0qHZGmtrRDqQ3P9i6iZX9QvJ7S4WE2xWwTLcvM33lGNgGvS3aVI790hMR",
    aspect: "aspect-[4/5]"
  }
];

export default function Gallery({ lang, openQuoteModal }) {
  const t = translations[lang];
  const [filter, setFilter] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', service: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle'); // idle | sending | success

  const filteredProjects = filter === 'all'
    ? ALL_PROJECTS
    : ALL_PROJECTS.filter(p => p.category === filter);

  const handleProjectClick = (item) => {
    const globalIndex = ALL_PROJECTS.indexOf(item);
    setLightboxIndex(globalIndex);
    setLightboxOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', service: '', message: '' });
      setTimeout(() => {
        setFormStatus('idle');
      }, 3000);
    }, 1500);
  };

  return (
    <div className={`w-full overflow-hidden ${lang === 'ar' ? 'rtl font-sans' : ''}`}>
      <main className="pt-32 pb-stack-lg animate-fade-in">
        {/* Page Header */}
        <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-stack-lg">
          <div className="text-center md:text-left max-w-3xl space-y-3">
            <span className="text-tertiary font-label-sm tracking-widest uppercase block font-bold text-xs md:text-sm">
              {t.heroBadge}
            </span>
            <h1 className="font-display-lg-mobile md:text-display-lg text-3xl md:text-5xl font-extrabold text-primary leading-tight">
              {t.heroTitle}
            </h1>
            <p className="text-on-surface-variant font-body-lg text-sm md:text-base leading-relaxed">
              {t.heroDesc}
            </p>
          </div>
        </section>

        {/* Filters Section */}
        <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-outline-variant/30 pb-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-6 py-2 rounded-full font-label-sm text-sm font-semibold transition-all cursor-pointer ${
                  filter === 'all'
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                }`}
              >
                {t.filterAll}
              </button>
              <button
                onClick={() => setFilter('cleaning')}
                className={`px-6 py-2 rounded-full font-label-sm text-sm font-semibold transition-all cursor-pointer ${
                  filter === 'cleaning'
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                }`}
              >
                {t.filterCleaning}
              </button>
              <button
                onClick={() => setFilter('maintenance')}
                className={`px-6 py-2 rounded-full font-label-sm text-sm font-semibold transition-all cursor-pointer ${
                  filter === 'maintenance'
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                }`}
              >
                {t.filterMaintenance}
              </button>
              <button
                onClick={() => setFilter('renovation')}
                className={`px-6 py-2 rounded-full font-label-sm text-sm font-semibold transition-all cursor-pointer ${
                  filter === 'renovation'
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                }`}
              >
                {t.filterRenovation}
              </button>
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant font-semibold text-sm">
              <span className="material-symbols-outlined">filter_list</span>
              <span>{t.filterLabel}</span>
            </div>
          </div>
        </section>

        {/* Project Gallery Masonry Grid */}
        <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-stack-lg">
          <div className="masonry-grid gap-6">
            {filteredProjects.map((item, index) => (
              <div
                key={index}
                onClick={() => handleProjectClick(item)}
                className="masonry-item group relative overflow-hidden rounded-2xl bg-white shadow-md border border-outline-variant/10 cursor-pointer transition-all duration-300 hover:shadow-2xl"
              >
                <div className={`relative overflow-hidden ${item.aspect}`}>
                  <img
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none select-none"
                    alt={item.title}
                    src={item.src}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="text-secondary-fixed font-label-sm mb-1 text-xs uppercase tracking-wider font-bold">
                      {lang === 'ar' && item.titleAr ? item.titleAr : item.title}
                    </span>
                    <h3 className="text-white font-headline-md text-lg font-bold">
                      {lang === 'ar' && item.titleAr ? item.titleAr : item.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-2 text-white/80 text-xs">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      <span>{lang === 'ar' && item.descAr ? item.descAr : item.desc}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Before & After Section */}
        <section className="bg-surface-container py-stack-lg overflow-hidden border-y border-outline-variant/10 shadow-inner">
          <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
            <div className="text-center mb-stack-md space-y-2">
              <h2 className="font-display-lg-mobile md:text-headline-md text-2xl md:text-4xl text-primary font-bold tracking-tight">
                {t.sliderHeader}
              </h2>
              <p className="text-on-surface-variant max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                {t.sliderDesc}
              </p>
            </div>
            <BeforeAfterSlider
              beforeImage="https://lh3.googleusercontent.com/aida-public/AB6AXuDgxoc1h7EIDem3ikfw-tlwc8NCplYI8QLTm_dx7WZ9jZyabQDLnlRe__lxRzITIA3liaMkYmuK_g5X9KPrtswzNN4J1FfthcHYDTg0vJGDqoCB6ykE4_rCe7Lb4DsREp9yiQoSEJJtx9U7Mm8byAVuikuZ_M5U48noiqMBSNHim9Tb56vBATjp2AC5Kj5_g0KWyMTKxNiufy8Ha7cyLEZOlQLi1YbuZCPSqOiK8YhnVwPAp8Ervxo_csWOnzWSScypTMVjMZn9ZOIZ"
              afterImage="https://lh3.googleusercontent.com/aida-public/AB6AXuCPHf5DLoht3SZ5cT25wf7AVQIIB9WhDMk-GHqY317wwTMjDbMsVTDrjmcYoZbj3uJO9yT0--IniZ3Y0dZGVgK828dgGy71hpLjXjeENoTH4ZfGGJ3_8MYemRPOKdmWuy09SB3mxarigefW3XCSSa8pSL5Ffkyq6-ZhaZRyOjSfBW3OAh0-WOpggeQr4KHq8bRB2-yIRuWzQ7ynZXrJmteEMYeJb7zlB00_62TF1MwqugLHETqmuFfk-4Csa4ip4EaFbt59VYfsxFdo"
              beforeLabel={t.beforeLabel}
              afterLabel={t.afterLabel}
            />
          </div>
        </section>

        {/* Lead Gen Call to Action Banner */}
        <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-stack-lg">
          <div className="relative rounded-3xl bg-primary overflow-hidden p-6 md:p-16 flex flex-col md:flex-row items-center gap-stack-md text-white shadow-xl border border-white/5">
            <div className="relative z-10 md:w-1/2 space-y-6">
              <h2 className="font-display-lg-mobile md:text-display-lg text-2xl md:text-5xl font-extrabold tracking-tight leading-tight">
                {t.ctaHeader}
              </h2>
              <p className="text-primary-fixed-dim text-sm md:text-base leading-relaxed opacity-90">
                {t.ctaSub}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  onClick={openQuoteModal}
                  className="bg-secondary-container text-on-secondary-container px-8 py-4 rounded-xl font-bold hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md text-sm md:text-base"
                >
                  {t.btnBook}
                  <span className={`material-symbols-outlined ${lang === 'ar' ? 'rotate-180' : ''}`}>arrow_forward</span>
                </button>
                <a
                  href="#"
                  className="border border-white/30 px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-center text-sm md:text-base"
                >
                  {t.btnPortfolio}
                  <span className="material-symbols-outlined">download</span>
                </a>
              </div>
            </div>
            
            <div className="relative z-10 md:w-1/2 bg-white/10 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/20 w-full shadow-lg">
              <h3 className="font-headline-md text-lg md:text-xl font-bold mb-6">{t.formHeader}</h3>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/95 text-primary border-0 rounded-lg p-3.5 focus:ring-2 focus:ring-secondary-container outline-none transition-all font-body-md text-sm"
                    placeholder={t.fieldName}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/95 text-primary border-0 rounded-lg p-3.5 focus:ring-2 focus:ring-secondary-container outline-none transition-all font-body-md text-sm"
                    placeholder={t.fieldEmail}
                  />
                </div>
                <div>
                  <select
                    required
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-white/95 text-primary border-0 rounded-lg p-3.5 focus:ring-2 focus:ring-secondary-container outline-none transition-all bg-white font-body-md text-sm"
                  >
                    <option value="">{t.fieldService}</option>
                    <option value="new">{t.serviceNew}</option>
                    <option value="maint">{t.serviceMaint}</option>
                    <option value="reno">{t.serviceReno}</option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={formStatus !== 'idle'}
                  className={`w-full font-bold py-3.5 rounded-lg transition-all shadow-md active:scale-98 cursor-pointer text-sm flex items-center justify-center gap-2 ${
                    formStatus === 'success'
                      ? 'bg-green-600 text-white'
                      : formStatus === 'sending'
                      ? 'bg-white/70 text-primary cursor-not-allowed'
                      : 'bg-white text-primary hover:bg-secondary-fixed'
                  }`}
                >
                  {formStatus === 'success' && (
                    <>
                      <span className="material-symbols-outlined">check_circle</span>
                      {t.btnSuccess}
                    </>
                  )}
                  {formStatus === 'sending' && (
                    <>
                      <span className="material-symbols-outlined animate-spin">progress_activity</span>
                      {t.btnSending}
                    </>
                  )}
                  {formStatus === 'idle' && (
                    <>
                      <span className="material-symbols-outlined">send</span>
                      {t.btnSubmit}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Lightbox Modal overlay */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={ALL_PROJECTS}
        currentIndex={lightboxIndex}
        setCurrentIndex={setLightboxIndex}
        lang={lang}
      />
    </div>
  );
}
