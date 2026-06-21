import React, { useState } from 'react';

const translations = {
  en: {
    heroBadge: "Expert Pool Care",
    heroTitle: "Elite Aquatic Services in Saudi Arabia",
    heroDesc: "From meticulous cleaning to advanced hydraulic repairs, Al Alam Pools provides the most comprehensive swimming pool solutions for premium estates in Riyadh, Jeddah, and Dammam.",
    
    sectionTitle: "Our Comprehensive Services",
    sectionDesc: "Ensuring your pool remains a serene oasis through technical excellence and personalized care.",
    
    cleanTitle: "Comprehensive Cleaning",
    cleanDesc: "Our weekly service includes tile scrubbing, surface skimming, and vacuuming to maintain clinical levels of clarity. We specialize in removing desert dust and debris unique to the region.",
    chemistryTitle: "Water Chemistry",
    chemistryDesc: "Advanced chemical balancing and pH management to ensure safe, skin-friendly water quality year-round.",
    plumbTitle: "Leak Detection",
    plumbDesc: "Non-invasive ultrasonic leak detection to preserve water and protect your property's foundation.",
    equipTitle: "Equipment Maintenance",
    equipDesc: "Precision maintenance for pumps, heaters, and filtration systems. We use high-efficiency components to reduce energy consumption in extreme temperatures.",
    
    detailsBtn: "Details",
    learnMore: "Learn More",
    
    statActive: "Active Pools",
    statResponse: "Response Time",
    statExp: "Kingdom Wide Experience",
    
    specTitle: "Service Specializations",
    specHeading1: "Acid Washing & Refurbishment",
    specDesc1: "Restore your pool's original brilliance with our deep-cleaning restoration services.",
    specHeading2: "Winterizing & Seasonal Care",
    specDesc2: "Protecting structures during cooler months to ensure a perfect spring opening.",
    specHeading3: "Saltwater System Conversion",
    specDesc3: "Eco-friendly alternatives for a safer, more natural swimming experience.",
    premiumBadge: "PREMIUM",
    
    arSpecTitle: "خدماتنا المتخصصة",
    arSpecDesc: "نقدم في شركة العالم للمسابح حلولاً متكاملة للعناية بمسبحك في الرياض وجدة والدمام، بدءاً من التنظيف الدوري وصولاً إلى الإصلاحات الهيدروليكية المتقدمة.",
    arBullet1: "تنظيف وتعقيم دوري عالي الجودة",
    arBullet2: "صيانة ومعالجة كيميائية متطورة",
    arBullet3: "كشف التسربات بأحدث الأجهزة",
    
    formHeader: "Request a Specialized Consultation",
    formSub: "Get a customized maintenance plan tailored to your pool's specific needs.",
    fieldName: "Full Name",
    namePlaceholder: "Your Name",
    fieldPhone: "Phone Number",
    phonePlaceholder: "+966 5x xxx xxxx",
    fieldType: "Service Type",
    typeCleaning: "Weekly Maintenance",
    typeRepair: "Equipment Repair",
    typeLeak: "Leak Detection",
    typeDeepClean: "One-time Deep Cleaning",
    fieldDetails: "Additional Details",
    detailsPlaceholder: "How can we help you today?",
    btnSubmit: "Send Inquiry",
    btnSending: "Processing...",
    btnSuccess: "Request Sent Successfully"
  },
  ar: {
    heroBadge: "العناية الاحترافية بالمسابح",
    heroTitle: "خدمات مسابح نخبوية في المملكة العربية السعودية",
    heroDesc: "من التنظيف الدقيق إلى الإصلاحات الهيدروليكية المتقدمة، توفر مسابح العالم الحلول الأكثر تكاملاً لبرك السباحة في العقارات والقصور الفاخرة في الرياض وجدة والدمام.",
    
    sectionTitle: "خدماتنا المتكاملة والاحترافية",
    sectionDesc: "ضمان بقاء مسبحك ملاذاً نقياً ومريحاً من خلال التميز التقني والرعاية الشخصية الفائقة.",
    
    cleanTitle: "تنظيف شامل وعميق",
    cleanDesc: "تتضمن خدمتنا الأسبوعية المميزة فرك البلاط، وقشط الأسطح، والتنظيف بالمكنسة المائية للحفاظ على مستويات نقاء فائقة. نحن متخصصون في إزالة الغبار الصحراوي والأتربة الفريدة في المنطقة.",
    chemistryTitle: "كيمياء المياه ومعالجتها",
    chemistryDesc: "معالجة كيميائية متقدمة وضبط مستويات الأس الهيدروجيني (pH) لضمان مياه آمنة ولطيفة على البشرة طوال العام.",
    plumbTitle: "كشف تسربات المياه",
    plumbDesc: "كشف تسربات المياه بأجهزة الموجات فوق الصوتية دون تكسير لحفظ المياه وحماية أساسات المبنى.",
    equipTitle: "صيانة وتركيب المعدات",
    equipDesc: "صيانة دقيقة للمضخات والسخانات وأنظمة الفلترة. نحن نستخدم مكونات عالية الكفاءة لتقليل استهلاك الطاقة في درجات الحرارة القصوى.",
    
    detailsBtn: "التفاصيل",
    learnMore: "معرفة المزيد",
    
    statActive: "مسبح نشط",
    statResponse: "سرعة الاستجابة",
    statExp: "خبرة في جميع أنحاء المملكة",
    
    specTitle: "تخصصاتنا الخدمية الدقيقة",
    specHeading1: "الغسيل بالحمض والتجديد الكامل",
    specDesc1: "استعد لمعان مسبحك الأصلي وجماله مع خدمات التنظيف العميق والتجديد المتميزة لدينا.",
    specHeading2: "التجهيز للشتاء والرعاية الموسمية",
    specDesc2: "حماية هيكل المسبح والمعدات خلال الأشهر الباردة لضمان فتح المسبح بشكل مثالي في الربيع.",
    specHeading3: "التحويل إلى نظام المياه المالحة",
    specDesc3: "بدائل صديقة للبيئة لتجربة سباحة أكثر نعومة وطبيعية للبشرة والعينين.",
    premiumBadge: "مميز",
    
    arSpecTitle: "Our Specialized Services",
    arSpecDesc: "We at Al Alam Pools provide integrated solutions for your pool care in Riyadh, Jeddah and Dammam, from regular cleaning to advanced hydraulic repairs.",
    arBullet1: "High quality regular cleaning and disinfection",
    arBullet2: "Advanced maintenance and chemical treatment",
    arBullet3: "Leak detection with the latest equipment",
    
    formHeader: "طلب استشارة متخصصة",
    formSub: "احصل على خطة صيانة مخصصة تناسب احتياجات مسبحك الدقيقة.",
    fieldName: "الاسم الكامل",
    namePlaceholder: "اسمك الكريم",
    fieldPhone: "رقم الجوال",
    phonePlaceholder: "+966 5x xxx xxxx",
    fieldType: "نوع الخدمة المطلوبة",
    typeCleaning: "صيانة أسبوعية دورية",
    typeRepair: "إصلاح المعدات والمضخات",
    typeLeak: "كشف تسربات المياه",
    typeDeepClean: "تنظيف عميق لمرة واحدة",
    fieldDetails: "تفاصيل إضافية",
    detailsPlaceholder: "كيف يمكننا مساعدتك اليوم؟",
    btnSubmit: "إرسال الطلب",
    btnSending: "جاري المعالجة...",
    btnSuccess: "تم إرسال طلبك بنجاح"
  }
};

export default function Services({ lang }) {
  const t = translations[lang];
  const [formData, setFormData] = useState({ name: '', phone: '', type: 'Weekly Maintenance', details: '' });
  const [formStatus, setFormStatus] = useState('idle'); // idle | sending | success

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', phone: '', type: 'Weekly Maintenance', details: '' });
      setTimeout(() => {
        setFormStatus('idle');
      }, 3000);
    }, 1500);
  };

  return (
    <div className={`w-full overflow-hidden ${lang === 'ar' ? 'rtl font-sans' : ''}`}>
      {/* Hero Section */}
      <section className="relative h-[550px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBiY7ZJG0q3hrQFPeqfgYJR-epJGIJvurg8sIoHjrAUHFay-fCZZTpq0IxPSjXZ9-PTVsXehV0IqnBuITD0Inr1STYffP9BvMrWBEyzUOPbpAIzR06hP2d0ZQabqjY3S4rrTi-K9GL4krieqV5dff4zJuOk2kAULnuFB8cCoFf3yalA8rykTVLfkFM-_7y82xgiXYpZV-SqFEOaHoUwneQguN6Mxi72ZwSbYmiFjZXeoaoRhH5F4VjHLsyPQJFYuuyxqXMEWDN8yca4')" }}></div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/85 to-primary/20"></div>
        </div>
        <div className="relative z-10 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
          <div className="max-w-2xl text-white space-y-6">
            <span className="inline-block px-4 py-1.5 rounded-full border border-secondary-fixed text-secondary-fixed font-label-sm uppercase tracking-widest text-xs md:text-sm font-bold bg-secondary/20">
              {t.heroBadge}
            </span>
            <h1 className="font-display-lg-mobile md:text-display-lg text-4xl md:text-6xl font-extrabold leading-tight">
              {t.heroTitle}
            </h1>
            <p className="font-body-lg text-white/80 max-w-xl text-base md:text-lg leading-relaxed">
              {t.heroDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Bento Services Grid */}
      <section className="py-stack-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-headline-md text-primary text-3xl md:text-5xl font-extrabold tracking-tight">
            {t.sectionTitle}
          </h2>
          <div className="h-1.5 w-24 bg-tertiary-container mx-auto rounded-full"></div>
          <p className="font-body-md text-outline max-w-2xl mx-auto text-sm md:text-base">
            {t.sectionDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {/* Card 1 - Clean (Large) */}
          <div className="md:col-span-8 group relative overflow-hidden rounded-2xl bg-white premium-card-shadow border border-outline-variant/30 flex flex-col md:flex-row transition-all duration-300 hover:-translate-y-1">
            <div className="md:w-1/2 h-64 md:h-full overflow-hidden">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt="Cleaning pool"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcrTSRLJ8P4N4WMKpYPVdj9CPq0mHrpkkgrvy2cDh0IbUjr2YcqcnuRubQe5jN18c6Ww8d77mixj3iE5O6tLDX_-ZgzbHY6e1G5xniAsMLdKKZiYDNrHlFjR7Po4ViIqOzilBCtheWRvjxEOq_Ob9sjEoUKg4twM5Y8li9ddRLk3rq2tMRDZvri1LIEYqEjrZJJ3yd0j9F0z0w8-KOfuWyH8bA5td-g78PCIrLiw6sx2IP1iZydkFMBlSvvBpYIs58SAQo3m27OKYG"
              />
            </div>
            <div className="md:w-1/2 p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="material-symbols-outlined text-secondary text-5xl" style={{ fontVariationSettings: "'FILL' 0" }}>cleaning_services</span>
                <h3 className="font-headline-md text-2xl font-bold text-primary tracking-tight">{t.cleanTitle}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{t.cleanDesc}</p>
              </div>
              <button className="text-secondary font-bold inline-flex items-center group/link cursor-pointer mt-6 self-start hover:opacity-80">
                {t.learnMore}
                <span className={`material-symbols-outlined ml-2 transition-transform group-hover/link:translate-x-1 ${lang === 'ar' ? 'rotate-180' : ''}`}>arrow_right_alt</span>
              </button>
            </div>
          </div>

          {/* Card 2 - Chemistry (Small) */}
          <div className="md:col-span-4 group bg-white p-8 rounded-2xl premium-card-shadow border border-outline-variant/30 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="w-14 h-14 bg-secondary-fixed/30 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>opacity</span>
              </div>
              <h3 className="font-headline-md text-xl md:text-2xl font-bold text-primary tracking-tight">{t.chemistryTitle}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">{t.chemistryDesc}</p>
            </div>
            <button className="text-secondary font-bold inline-flex items-center group/link cursor-pointer mt-8 hover:opacity-80">
              {t.detailsBtn}
              <span className={`material-symbols-outlined ml-2 ${lang === 'ar' ? 'rotate-180' : ''}`}>chevron_right</span>
            </button>
          </div>

          {/* Card 3 - Leak (Small) */}
          <div className="md:col-span-4 group bg-white p-8 rounded-2xl premium-card-shadow border border-outline-variant/30 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="w-14 h-14 bg-tertiary-fixed/30 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-tertiary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>plumbing</span>
              </div>
              <h3 className="font-headline-md text-xl md:text-2xl font-bold text-primary tracking-tight">{t.plumbTitle}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">{t.plumbDesc}</p>
            </div>
            <button className="text-secondary font-bold inline-flex items-center group/link cursor-pointer mt-8 hover:opacity-80">
              {t.detailsBtn}
              <span className={`material-symbols-outlined ml-2 ${lang === 'ar' ? 'rotate-180' : ''}`}>chevron_right</span>
            </button>
          </div>

          {/* Card 4 - Equipment (Large) */}
          <div className="md:col-span-8 group relative overflow-hidden rounded-2xl bg-white premium-card-shadow border border-outline-variant/30 flex flex-col md:flex-row-reverse transition-all duration-300 hover:-translate-y-1">
            <div className="md:w-1/2 h-64 md:h-full overflow-hidden">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt="Pool mechanical systems"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyow6Bo9E2QxTiWOSpXvCcw93eFPbdVKZZQHE3rSufZUdhpZlmKnd2H_KFUN8fazBt8Rgq4dI6IX5HjSgwzVtOfZVK_RHEga3UGFhUY9ugRVHNEwLLK5RnvfvU6wJHRd4s6qz9-fJHeEN9bWUNMxYJ0fDdYVaU_2QoRyx4ejriw1HB7jRR_Lslq4SbHKUAlelCkxrY8BI1i53993S65UkTOQAP4Npy54rj0Wi4_Fpeh6zVakKVFG7Acx8Tr4V7kjFmpAhWKnlyZKE3"
              />
            </div>
            <div className="md:w-1/2 p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="material-symbols-outlined text-secondary text-5xl" style={{ fontVariationSettings: "'FILL' 0" }}>settings_suggest</span>
                <h3 className="font-headline-md text-2xl font-bold text-primary tracking-tight">{t.equipTitle}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{t.equipDesc}</p>
              </div>
              <button className="text-secondary font-bold inline-flex items-center group/link cursor-pointer mt-6 self-start hover:opacity-80">
                {t.learnMore}
                <span className={`material-symbols-outlined ml-2 transition-transform group-hover/link:translate-x-1 ${lang === 'ar' ? 'rotate-180' : ''}`}>arrow_right_alt</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary py-12 md:py-16 text-white">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="py-4 md:py-0">
              <p className="font-display-lg text-4xl md:text-5xl font-extrabold text-secondary-fixed-dim">1500+</p>
              <p className="font-label-sm text-tertiary-fixed text-xs md:text-sm font-bold uppercase tracking-widest mt-2">{t.statActive}</p>
            </div>
            <div className="py-4 md:py-0">
              <p className="font-display-lg text-4xl md:text-5xl font-extrabold text-secondary-fixed-dim">15 min</p>
              <p className="font-label-sm text-tertiary-fixed text-xs md:text-sm font-bold uppercase tracking-widest mt-2">{t.statResponse}</p>
            </div>
            <div className="py-4 md:py-0">
              <p className="font-display-lg text-4xl md:text-5xl font-extrabold text-secondary-fixed-dim">12 Years</p>
              <p className="font-label-sm text-tertiary-fixed text-xs md:text-sm font-bold uppercase tracking-widest mt-2">{t.statExp}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Specializations Table */}
      <section className="py-stack-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-stack-lg items-center">
          {/* English Table Area */}
          <div className="space-y-6">
            <h2 className="font-headline-md text-primary text-2xl md:text-3xl font-extrabold tracking-tight">
              {t.specTitle}
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-5 border-l-4 border-secondary bg-white shadow-sm rounded-r-xl">
                <div className="flex-grow">
                  <h4 className="font-bold text-primary text-base md:text-lg">{t.specHeading1}</h4>
                  <p className="text-xs md:text-sm text-on-surface-variant mt-1">{t.specDesc1}</p>
                </div>
                <span className="font-label-sm text-xs font-bold text-tertiary px-2 py-0.5 bg-tertiary-fixed/30 rounded">
                  {t.premiumBadge}
                </span>
              </div>
              <div className="flex items-start gap-4 p-5 border-l-4 border-outline bg-white shadow-sm rounded-r-xl">
                <div className="flex-grow">
                  <h4 className="font-bold text-primary text-base md:text-lg">{t.specHeading2}</h4>
                  <p className="text-xs md:text-sm text-on-surface-variant mt-1">{t.specDesc2}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 border-l-4 border-outline bg-white shadow-sm rounded-r-xl">
                <div className="flex-grow">
                  <h4 className="font-bold text-primary text-base md:text-lg">{t.specHeading3}</h4>
                  <p className="text-xs md:text-sm text-on-surface-variant mt-1">{t.specDesc3}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Arabic Area (with RTL presentation) */}
          <div className="bg-surface-container p-8 rounded-2xl space-y-6 shadow-inner border border-outline-variant/10" dir={lang === 'ar' ? 'ltr' : 'rtl'}>
            <h2 className="font-headline-md text-primary text-2xl md:text-3xl font-extrabold tracking-tight">
              {t.arSpecTitle}
            </h2>
            <p className="font-body-md text-on-surface-variant text-sm md:text-base leading-relaxed">
              {t.arSpecDesc}
            </p>
            <ul className="space-y-4 font-semibold text-primary">
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span className="text-sm md:text-base">{t.arBullet1}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span className="text-sm md:text-base">{t.arBullet2}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span className="text-sm md:text-base">{t.arBullet3}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Consult Form Section */}
      <section className="py-stack-lg bg-surface-bright relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-container/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="px-margin-mobile md:px-margin-desktop max-w-3xl mx-auto relative z-10">
          <div className="bg-white p-6 md:p-12 rounded-3xl premium-card-shadow gold-accent-border border border-outline-variant/10">
            <div className="text-center mb-10 space-y-4">
              <h2 className="font-display-lg-mobile md:text-headline-md text-2xl md:text-4xl text-primary font-bold tracking-tight">
                {t.formHeader}
              </h2>
              <p className="text-on-surface-variant font-body-md text-sm md:text-base">
                {t.formSub}
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1 flex flex-col gap-1">
                <label className="text-sm font-semibold text-primary mb-1">{t.fieldName}</label>
                <input
                  type="text"
                  required
                  placeholder={t.namePlaceholder}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-outline-variant rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all font-body-md"
                />
              </div>
              <div className="col-span-1 flex flex-col gap-1">
                <label className="text-sm font-semibold text-primary mb-1">{t.fieldPhone}</label>
                <input
                  type="tel"
                  required
                  placeholder={t.phonePlaceholder}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-outline-variant rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all font-body-md"
                />
              </div>
              <div className="col-span-2 flex flex-col gap-1">
                <label className="text-sm font-semibold text-primary mb-1">{t.fieldType}</label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-3 border border-outline-variant rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all bg-white font-body-md"
                >
                  <option value="Weekly Maintenance">{t.typeCleaning}</option>
                  <option value="Equipment Repair">{t.typeRepair}</option>
                  <option value="Leak Detection">{t.typeLeak}</option>
                  <option value="One-time Deep Cleaning">{t.typeDeepClean}</option>
                </select>
              </div>
              <div className="col-span-2 flex flex-col gap-1">
                <label className="text-sm font-semibold text-primary mb-1">{t.fieldDetails}</label>
                <textarea
                  placeholder={t.detailsPlaceholder}
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  rows="4"
                  className="w-full px-4 py-3 border border-outline-variant rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all resize-none font-body-md"
                ></textarea>
              </div>
              <div className="col-span-2 mt-2">
                <button
                  type="submit"
                  disabled={formStatus !== 'idle'}
                  className={`w-full py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:scale-95 transition-all text-white flex items-center justify-center gap-2 cursor-pointer ${
                    formStatus === 'success'
                      ? 'bg-green-600'
                      : formStatus === 'sending'
                      ? 'bg-primary/75 cursor-not-allowed'
                      : 'bg-primary hover:bg-primary-container'
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
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
