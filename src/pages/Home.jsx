import React, { useEffect, useState } from 'react';

const translations = {
  en: {
    badge: "Saudi Arabia's Premier Pool Experts",
    heroTitle1: "Pure Serenity,",
    heroTitle2: "Expertly Maintained.",
    heroDesc: "Elevate your outdoor lifestyle with Saudi Arabia's elite swimming pool care. From crystal-clear maintenance to bespoke luxury installations.",
    quoteBtn: "Get Free Quote",
    whatsappBtn: "WhatsApp Us",
    arabicHeroTitle: "استرخِ في مياهٍ نقية",
    arabicHeroDesc: "خدمات احترافية للعناية بالمسابح في جميع أنحاء المملكة",
    
    statPools: "Pools Maintained",
    statClients: "Happy Clients",
    statCities: "Major Cities",
    statYears: "Years Experience",

    servicesHeader: "Comprehensive Pool Care",
    servicesDesc: "We provide specialized technical services tailored to the unique climate of Saudi Arabia, ensuring your pool remains a pristine sanctuary.",
    viewAllServices: "View All Services",

    cleaningTitle: "Pool Cleaning",
    cleaningDesc: "Scheduled deep cleaning and chemical balancing for year-round perfection.",
    maintenanceTitle: "Maintenance Plans",
    maintenanceDesc: "Preventative care and technical inspections to protect your luxury investment.",
    renovationsTitle: "Renovations",
    renovationsDesc: "Breathe new life into your pool with premium tiling and modern lighting.",
    learnMore: "Learn More",

    eliteStandard: "The Elite Standard",
    qualityTitle: "Uncompromising Quality",
    qualityDesc: "Our technicians are internationally certified and use the highest grade eco-friendly chemicals in the industry.",
    responseTitle: "Rapid Response",
    responseDesc: "Emergency support available in Riyadh, Jeddah, and Dammam within 4 hours.",
    certifiedTitle: "Certified Expertise",
    certifiedDesc: "Over 15 years of technical leadership in the Gulf region's pool market.",
    scaleTitle: "Luxury At Every Scale",
    scaleDesc: "From olympic training facilities to intimate private plunge pools, our care is universal.",

    processHeader: "Our Seamless Process",
    step1Title: "Request Quote",
    step1Desc: "Instant digital assessment of your pool needs.",
    step2Title: "Technical Visit",
    step2Desc: "Expert inspection at your location.",
    step3Title: "Execution",
    step3Desc: "Precision work using top-tier materials.",
    step4Title: "Pure Enjoyment",
    step4Desc: "Dive into perfection, worry-free.",

    testimonialHeader: "Trusted by Saudi's Elite",
    testimonialText: '"Al Alam transformed our backyard pool. Their maintenance team is punctual, professional, and the water has never looked clearer."',
    testimonialAuthor: "Ahmed Al-Sudairy",
    testimonialCity: "Al Olaya, Riyadh",

    regionsHeader: "Regions We Serve",
    riyadhTitle: "Riyadh",
    riyadhDesc: "Headquarters & Main Hub",
    jeddahTitle: "Jeddah",
    jeddahDesc: "Red Sea Coastal Services",
    dammamTitle: "Dammam",
    dammamDesc: "Eastern Province Experts",
    khobarTitle: "Al Khobar",
    khobarDesc: "Premium Maintenance Plans",
    otherTitle: "In another city?",
    otherDesc: "We are expanding rapidly across the Kingdom.",
    inquireBtn: "Inquire",

    ctaTitle1: "Ready for a",
    ctaTitle2: "Pristine Pool?",
    ctaDesc: "Speak with our consultants today. We provide free on-site assessments and custom maintenance proposals.",
    callUs: "Call +966 57 146 7576",
    whatsappNow: "WhatsApp Now",

    instagramHeader: "Follow Our Journey",
    instagramSub: "@swimmingpools_riyad",
    instagramFollowBtn: "Follow on Instagram"
  },
  ar: {
    badge: "خبراء المسابح الرواد في المملكة العربية السعودية",
    heroTitle1: "نقاء مطلق،",
    heroTitle2: "بصيانة احترافية.",
    heroDesc: "ارتقِ بأسلوب حياتك الخارجي مع رعاية مسابح النخبة في المملكة العربية السعودية. من الصيانة الكريستالية إلى التركيبات الفاخرة المخصصة.",
    quoteBtn: "احصل على عرض سعر مجاني",
    whatsappBtn: "تواصل معنا عبر واتساب",
    arabicHeroTitle: "Relax in Pure Water",
    arabicHeroDesc: "Professional pool care services across the Kingdom",

    statPools: "مسبح تتم صيانته",
    statClients: "عميل سعيد",
    statCities: "مدينة رئيسية",
    statYears: "عاماً من الخبرة",

    servicesHeader: "رعاية متكاملة للمسابح",
    servicesDesc: "نحن نقدم خدمات تقنية متخصصة مصممة خصيصاً للمناخ الفريد للمملكة العربية السعودية، مما يضمن بقاء مسبحك ملاذاً نقياً.",
    viewAllServices: "عرض جميع الخدمات",

    cleaningTitle: "تنظيف المسابح",
    cleaningDesc: "تنظيف عميق مجدول وموازنة كيميائية للمياه للوصول إلى الكمال طوال العام.",
    maintenanceTitle: "خطط الصيانة",
    maintenanceDesc: "الرعاية الوقائية والفحوصات الفنية لحماية استثمارك الفاخر.",
    renovationsTitle: "التجديد والترميم",
    renovationsDesc: "بث حياة جديدة في مسبحك باستخدام بلاط فاخر وإضاءة حديثة.",
    learnMore: "معرفة المزيد",

    eliteStandard: "المعيار النخبوي المتميز",
    qualityTitle: "جودة لا تضاهى",
    qualityDesc: "فنيونا معتمدون دولياً ويستخدمون أجود المواد الكيميائية الصديقة للبيئة في هذا المجال.",
    responseTitle: "استجابة سريعة",
    responseDesc: "دعم الطوارئ متاح في الرياض وجدة والدمام في غضون 4 ساعات.",
    certifiedTitle: "خبرة معتمدة",
    certifiedDesc: "أكثر من 15 عاماً من الريادة التقنية في سوق المسابح بمنطقة الخليج.",
    scaleTitle: "فخامة تناسب كل المقاييس",
    scaleDesc: "من المرافق الأولمبية للتدريب إلى مسابح الغطس الخاصة والمريحة، رعايتنا شاملة.",

    processHeader: "خطوات خدمتنا السلسة",
    step1Title: "طلب عرض سعر",
    step1Desc: "تقييم رقمي فوري لاحتياجات مسبحك.",
    step2Title: "زيارة فنية",
    step2Desc: "فحص دقيق من قبل خبراء في موقعك.",
    step3Title: "التنفيذ",
    step3Desc: "عمل دقيق عالي الجودة باستخدام أفضل الخامات.",
    step4Title: "متعة نقية",
    step4Desc: "استمتع بمسبحك المثالي بكل راحة بال.",

    testimonialHeader: "محل ثقة نخبة المجتمع السعودي",
    testimonialText: '"غيرت مسابح العالم مسبح فنائنا الخلفي بالكامل. فريق الصيانة لديهم دقيق في مواعيده ومحترف، والمياه لم تبدُ أبداً بهذا النقاء من قبل."',
    testimonialAuthor: "أحمد السديري",
    testimonialCity: "حي العليا، الرياض",

    regionsHeader: "المناطق التي نخدمها",
    riyadhTitle: "الرياض",
    riyadhDesc: "المقر الرئيسي والمركز الرئيسي",
    jeddahTitle: "جدة",
    jeddahDesc: "خدمات ساحل البحر الأحمر",
    dammamTitle: "الدمام",
    dammamDesc: "خبراء المنطقة الشرقية",
    khobarTitle: "الخبر",
    khobarDesc: "خطط صيانة متميزة ومخصصة",
    otherTitle: "في مدينة أخرى؟",
    otherDesc: "نحن نتوسع سريعاً في جميع أنحاء المملكة.",
    inquireBtn: "استفسر الآن",

    ctaTitle1: "هل أنت مستعد لمسبح",
    ctaTitle2: "خالٍ من العيوب ونظيف؟",
    ctaDesc: "تحدث مع مستشارينا اليوم. نحن نقدم تقييمات مجانية في الموقع ومقترحات صيانة مخصصة تناسب احتياجاتك.",
    callUs: "اتصل بنا 966571467576",
    whatsappNow: "تواصل واتساب الآن",

    instagramHeader: "تابعوا رحلتنا اليومية",
    instagramSub: "swimmingpools_riyad@",
    instagramFollowBtn: "تابعونا على إنستغرام"
  }
};

const STATS_DATA = [
  { id: 'stat-pools', target: 500, suffix: '+' },
  { id: 'stat-clients', target: 1000, suffix: '+' },
  { id: 'stat-cities', target: 12, suffix: '' },
  { id: 'stat-experience', target: 15, suffix: '+' }
];

export default function Home({ lang, setCurrentPage, openQuoteModal }) {
  const t = translations[lang];
  const [stats, setStats] = useState({ pools: 0, clients: 0, cities: 0, experience: 0 });

  // Animate stats counter
  useEffect(() => {
    let active = true;
    const duration = 2000;
    const steps = 50;
    const intervalTime = duration / steps;
    
    let step = 0;
    const timer = setInterval(() => {
      if (!active) return;
      step++;
      
      setStats({
        pools: Math.min(Math.round((500 / steps) * step), 500),
        clients: Math.min(Math.round((1000 / steps) * step), 1000),
        cities: Math.min(Math.round((12 / steps) * step), 12),
        experience: Math.min(Math.round((15 / steps) * step), 15)
      });

      if (step >= steps) {
        clearInterval(timer);
      }
    }, intervalTime);

    return () => {
      active = false;
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={`w-full overflow-hidden ${lang === 'ar' ? 'rtl font-sans' : ''}`}>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent z-10"></div>
          <img
            className="w-full h-full object-cover"
            alt="Luxury swimming pool at sunset"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWvObs4EFFpbt0kdw8SRI3YmpVLKCGONXTaTJvE0GGCZ9kvGg5gZdVYNljSRHi1MyIYA72VwvFHIBOhX7i_kaqkNib1lgr4bHoI76iajiQirLG2mSTuGVCIVlbyYTbuSiJnGp-MBs8JAtfprwoN3YQjO1f06rI0Kvz7cS4plCDmziGSu5Ur6bTWyA0FzROyTebPGUOd6JS7PTJWue4Zn4j0-IsBpOE5gIA_76OFa_6W7GrgbnHvm4_tH8BjP7ZOTw-qaOQS59pet3L"
          />
        </div>
        <div className="relative z-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-stack-lg items-center">
          <div className="text-white space-y-6">
            <div className="inline-block px-4 py-1 bg-secondary-container/20 backdrop-blur-md border border-secondary-container/30 rounded-full">
              <span className="text-secondary-fixed font-label-sm uppercase tracking-widest flex items-center gap-2 text-xs md:text-sm">
                <span className="material-symbols-outlined text-[18px] text-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                {t.badge}
              </span>
            </div>
            <h1 className="font-display-lg-mobile md:text-display-lg text-4xl md:text-6xl font-extrabold text-white leading-tight">
              {t.heroTitle1} <br />
              <span className="text-secondary-container">{t.heroTitle2}</span>
            </h1>
            <p className="font-body-lg text-surface-variant max-w-lg leading-relaxed text-base md:text-lg">
              {t.heroDesc}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={openQuoteModal}
                className="px-8 py-4 bg-secondary text-white rounded-lg font-bold flex items-center gap-2 hover:bg-secondary-container hover:text-on-secondary-container transition-all shadow-lg scale-98 hover:scale-100 cursor-pointer"
              >
                {t.quoteBtn}
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
              <a
                href="https://wa.me/966571467576"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-lg font-bold flex items-center gap-2 hover:bg-white/20 transition-all scale-98 hover:scale-100"
              >
                <span className="material-symbols-outlined text-green-400" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
                {t.whatsappBtn}
              </a>
            </div>
          </div>
          <div className="hidden md:flex items-end justify-end">
            <div className={`text-white ${lang === 'ar' ? 'text-left' : 'text-right'}`}>
              <h2 className="text-4xl font-extrabold mb-2 tracking-tight">{t.arabicHeroTitle}</h2>
              <p className="text-xl text-surface-variant font-medium">{t.arabicHeroDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-stack-lg bg-surface relative -mt-16 z-30">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-outline-variant/10">
            <div className="text-center group border-r border-outline-variant/10 last:border-r-0">
              <div className="font-display-lg text-3xl md:text-5xl font-extrabold text-primary mb-1 group-hover:text-secondary transition-colors">
                {stats.pools}+
              </div>
              <div className="text-tertiary font-label-sm text-xs md:text-sm font-semibold uppercase tracking-wide">
                {t.statPools}
              </div>
            </div>
            <div className="text-center group border-r border-outline-variant/10 last:border-r-0">
              <div className="font-display-lg text-3xl md:text-5xl font-extrabold text-primary mb-1 group-hover:text-secondary transition-colors">
                {stats.clients}+
              </div>
              <div className="text-tertiary font-label-sm text-xs md:text-sm font-semibold uppercase tracking-wide">
                {t.statClients}
              </div>
            </div>
            <div className="text-center group border-r border-outline-variant/10 last:border-r-0">
              <div className="font-display-lg text-3xl md:text-5xl font-extrabold text-primary mb-1 group-hover:text-secondary transition-colors">
                {stats.cities}
              </div>
              <div className="text-tertiary font-label-sm text-xs md:text-sm font-semibold uppercase tracking-wide">
                {t.statCities}
              </div>
            </div>
            <div className="text-center group">
              <div className="font-display-lg text-3xl md:text-5xl font-extrabold text-primary mb-1 group-hover:text-secondary transition-colors">
                {stats.experience}+
              </div>
              <div className="text-tertiary font-label-sm text-xs md:text-sm font-semibold uppercase tracking-wide">
                {t.statYears}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-stack-lg" id="services">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex flex-col md:flex-row justify-between items-end mb-stack-lg gap-4">
            <div className="space-y-4">
              <h2 className="text-primary font-headline-md text-3xl font-extrabold gold-accent inline-block pb-2">
                {t.servicesHeader}
              </h2>
              <p className="text-on-surface-variant font-body-md max-w-xl text-sm md:text-base">
                {t.servicesDesc}
              </p>
            </div>
            <button
              onClick={() => setCurrentPage('services')}
              className="text-secondary font-bold flex items-center gap-2 group cursor-pointer hover:opacity-85"
            >
              {t.viewAllServices}
              <span className={`material-symbols-outlined transition-transform ${lang === 'ar' ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'}`}>
                arrow_forward
              </span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-outline-variant/10 flex flex-col justify-between h-[420px]">
              <div className="h-60 overflow-hidden relative">
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  alt="Pool Cleaning"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXDo-OS3YNFthLbco1pWmwSQ9dEKPMuPasU3rgLrgpaRbujLVngt0gEq34NF7lx_gAyeMSxt5YJ7fUmT-VWlt2aeS9hv1bl6ypN9MvXQHX7TlJ37i57ilITaKl9CKhDOfGj4fIjuUuu7sDU71WQ1lWCQrISk9lAuWjGlYNvYJGD9e-D5yFYxXFQFlk9xgXarTyhHqvlnBUZsqljFydvdFlDg8bHunP8Hyodj8meUJJGtgVNV85A8C0zEuH71z_wMhjO9MxW8bbl9Uk"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent"></div>
                <div className="absolute bottom-4 left-6 right-6 text-white font-bold text-xl">{t.cleaningTitle}</div>
              </div>
              <div className="p-6 flex flex-col justify-between flex-grow">
                <p className="text-on-surface-variant text-sm md:text-base line-clamp-3">
                  {t.cleaningDesc}
                </p>
                <button
                  onClick={() => setCurrentPage('services')}
                  className="inline-flex items-center text-secondary font-bold hover:gap-3 transition-all cursor-pointer mt-4 self-start"
                >
                  {t.learnMore}
                  <span className={`material-symbols-outlined ${lang === 'ar' ? 'mr-2 rotate-180' : 'ml-2'}`}>east</span>
                </button>
              </div>
            </div>

            {/* Service 2 */}
            <div className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-outline-variant/10 flex flex-col justify-between h-[420px]">
              <div className="h-60 overflow-hidden relative">
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  alt="Pool Maintenance"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrLWX9IVUyT6g_bF-Ig0RgBl5xvK1LF9L5t-YKtSfUn95gNbE_2Z_hxq9iyBewEZfgz15ggUK1UrTKLCZtBXlMPiAbGNQLN2getCiMLd5ygKjLHKSDKiaQK_ViVXijy-wS1ViQX61Fd6WAUEgkiq4yTCmKaeW8B1zxfayDIFyCZzSVNRfJ0gzYTNDMGbjiJjcylm6dupTlRCa-4EOhdnWWkS6gB_RTqnKyS4ZzDr8Q5POf6VKZqSV8-2mVyiqdn72KALgU430xJhJa"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent"></div>
                <div className="absolute bottom-4 left-6 right-6 text-white font-bold text-xl">{t.maintenanceTitle}</div>
              </div>
              <div className="p-6 flex flex-col justify-between flex-grow">
                <p className="text-on-surface-variant text-sm md:text-base line-clamp-3">
                  {t.maintenanceDesc}
                </p>
                <button
                  onClick={() => setCurrentPage('services')}
                  className="inline-flex items-center text-secondary font-bold hover:gap-3 transition-all cursor-pointer mt-4 self-start"
                >
                  {t.learnMore}
                  <span className={`material-symbols-outlined ${lang === 'ar' ? 'mr-2 rotate-180' : 'ml-2'}`}>east</span>
                </button>
              </div>
            </div>

            {/* Service 3 */}
            <div className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-outline-variant/10 flex flex-col justify-between h-[420px]">
              <div className="h-60 overflow-hidden relative">
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  alt="Pool Renovations"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBr4nEwbEsH5URf86oKqDOdEIVPI5PsB1nilTnsuPiICk_OUz9eCOZ8mIhjn0nl_leGr16B6NG1oE4voizXHjRsD1TNN5Juc3nQVw2zcrkg7WhltKyjv522KNwN4jcDegDkzF31uYMXc_MRi3sfY7yGRBqf3JANH7OJ4WqapWo4dk--zNV8TDzpRkkcFBV6MePYZOXK0zWbGkykXe8-IdCikC5COZpj-B-MQCv6ryiTK4fVSBoKZZCBG1GFjm3GG9KwrnlzTRo2dlxo"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent"></div>
                <div className="absolute bottom-4 left-6 right-6 text-white font-bold text-xl">{t.renovationsTitle}</div>
              </div>
              <div className="p-6 flex flex-col justify-between flex-grow">
                <p className="text-on-surface-variant text-sm md:text-base line-clamp-3">
                  {t.renovationsDesc}
                </p>
                <button
                  onClick={() => setCurrentPage('services')}
                  className="inline-flex items-center text-secondary font-bold hover:gap-3 transition-all cursor-pointer mt-4 self-start"
                >
                  {t.learnMore}
                  <span className={`material-symbols-outlined ${lang === 'ar' ? 'mr-2 rotate-180' : 'ml-2'}`}>east</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Bento Grid */}
      <section className="py-stack-lg bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <h2 className="text-primary font-display-lg text-3xl md:text-5xl font-extrabold text-center mb-stack-lg tracking-tight">
            {t.eliteStandard}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            {/* Col 8 */}
            <div className="md:col-span-8 bg-primary rounded-3xl p-8 md:p-12 text-white flex flex-col justify-between overflow-hidden relative min-h-[250px] shadow-lg border border-white/5">
              <div className="relative z-10 space-y-4 max-w-md">
                <span className="material-symbols-outlined text-secondary-fixed text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
                <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">{t.qualityTitle}</h3>
                <p className="text-surface-variant text-sm md:text-base leading-relaxed">{t.qualityDesc}</p>
              </div>
            </div>

            {/* Col 4 */}
            <div className="md:col-span-4 bg-secondary-container rounded-3xl p-8 md:p-12 text-on-secondary-container flex flex-col justify-between min-h-[250px] shadow-lg">
              <span className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>speed</span>
              <div>
                <h3 className="text-xl md:text-2xl font-extrabold mt-8 tracking-tight">{t.responseTitle}</h3>
                <p className="mt-2 text-sm font-medium opacity-90 leading-relaxed">{t.responseDesc}</p>
              </div>
            </div>

            {/* Col 4 */}
            <div className="md:col-span-4 bg-white rounded-3xl p-8 md:p-12 shadow-md border border-outline-variant/10 flex flex-col justify-between min-h-[250px]">
              <span className="material-symbols-outlined text-tertiary text-4xl">workspace_premium</span>
              <div>
                <h3 className="text-xl md:text-2xl font-extrabold mt-8 text-primary tracking-tight">{t.certifiedTitle}</h3>
                <p className="mt-2 text-sm text-on-surface-variant leading-relaxed">{t.certifiedDesc}</p>
              </div>
            </div>

            {/* Col 8 */}
            <div className="md:col-span-8 bg-surface-bright rounded-3xl p-8 md:p-12 border border-outline-variant/20 flex flex-col md:flex-row items-center gap-6 overflow-hidden min-h-[250px] shadow-md">
              <div className="flex-1 space-y-4">
                <h3 className="text-xl md:text-2xl font-extrabold text-primary tracking-tight">{t.scaleTitle}</h3>
                <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">{t.scaleDesc}</p>
              </div>
              <div className="w-36 h-36 rounded-full border-4 border-secondary-container/20 p-2 shrink-0 hidden md:block">
                <img
                  className="w-full h-full object-cover rounded-full"
                  alt="Water texture"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZMgsNH2qOY0KWsFYxzFlwaF56l8IOB1QnTcfXEdEHlln39luBCV1mTewSEI8u9bhm0IcVUhJT4hR2pkSZQEZF75T5AoimzBIoFevlApolborH8BwEmVvsAMZeDCN_AoddagvKDGPSxXHMBK6fQN7ZriHevxyDUFsJyp5k_2oRnNXSlpWjALMrWfPdc5D0pZwj5dcaQoe-S0zNkl4CGX__7cuKzoLk0IUmXxVfHw6O9CeOef6N9MVMVBnaSrX7715xW03aV6iwDdG6"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-stack-lg overflow-hidden bg-white">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <h2 className="text-primary font-headline-md text-3xl font-extrabold text-center mb-16">
            {t.processHeader}
          </h2>
          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-outline-variant/30 -translate-y-1/2 z-0"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter relative z-10">
              {/* Step 1 */}
              <div className="text-center group bg-white md:bg-transparent p-4 rounded-xl">
                <div className="w-16 h-16 bg-white border-2 border-secondary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-secondary group-hover:text-white transition-all duration-300 shadow-md">
                  <span className="material-symbols-outlined">request_quote</span>
                </div>
                <h4 className="font-bold text-primary text-lg mb-2">{t.step1Title}</h4>
                <p className="text-sm text-on-surface-variant px-4">{t.step1Desc}</p>
              </div>
              {/* Step 2 */}
              <div className="text-center group bg-white md:bg-transparent p-4 rounded-xl">
                <div className="w-16 h-16 bg-white border-2 border-secondary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-secondary group-hover:text-white transition-all duration-300 shadow-md">
                  <span className="material-symbols-outlined">engineering</span>
                </div>
                <h4 className="font-bold text-primary text-lg mb-2">{t.step2Title}</h4>
                <p className="text-sm text-on-surface-variant px-4">{t.step2Desc}</p>
              </div>
              {/* Step 3 */}
              <div className="text-center group bg-white md:bg-transparent p-4 rounded-xl">
                <div className="w-16 h-16 bg-white border-2 border-secondary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-secondary group-hover:text-white transition-all duration-300 shadow-md">
                  <span className="material-symbols-outlined">design_services</span>
                </div>
                <h4 className="font-bold text-primary text-lg mb-2">{t.step3Title}</h4>
                <p className="text-sm text-on-surface-variant px-4">{t.step3Desc}</p>
              </div>
              {/* Step 4 */}
              <div className="text-center group bg-white md:bg-transparent p-4 rounded-xl">
                <div className="w-16 h-16 bg-white border-2 border-secondary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-secondary group-hover:text-white transition-all duration-300 shadow-md">
                  <span className="material-symbols-outlined">sentiment_very_satisfied</span>
                </div>
                <h4 className="font-bold text-primary text-lg mb-2">{t.step4Title}</h4>
                <p className="text-sm text-on-surface-variant px-4">{t.step4Desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials & Areas */}
      <section className="py-stack-lg bg-primary text-white">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-stack-lg items-center">
            <div className="space-y-8">
              <h2 className="text-secondary-fixed text-3xl font-extrabold tracking-tight">
                {t.testimonialHeader}
              </h2>
              <div className="space-y-6">
                <div className="bg-primary-container p-8 rounded-2xl relative shadow-lg border border-white/5">
                  <span className="material-symbols-outlined absolute top-4 right-4 text-secondary/20 text-6xl select-none" style={{ fontVariationSettings: "'FILL' 1" }}>format_quote</span>
                  <div className="flex gap-1 mb-4 text-tertiary-fixed">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    ))}
                  </div>
                  <p className="font-body-lg italic mb-6 text-base md:text-lg leading-relaxed opacity-90">
                    {t.testimonialText}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-white font-bold font-display-lg shadow-inner">
                      AS
                    </div>
                    <div>
                      <p className="font-bold text-white">{t.testimonialAuthor}</p>
                      <p className="text-sm text-on-primary-container">{t.testimonialCity}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              <h2 className="text-secondary-fixed text-3xl font-extrabold tracking-tight">
                {t.regionsHeader}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 border border-outline-variant/20 rounded-xl hover:bg-white/5 transition-colors cursor-default">
                  <h4 className="font-bold text-lg mb-1 text-white">{t.riyadhTitle}</h4>
                  <p className="text-surface-variant text-xs md:text-sm">{t.riyadhDesc}</p>
                </div>
                <div className="p-5 border border-outline-variant/20 rounded-xl hover:bg-white/5 transition-colors cursor-default">
                  <h4 className="font-bold text-lg mb-1 text-white">{t.jeddahTitle}</h4>
                  <p className="text-surface-variant text-xs md:text-sm">{t.jeddahDesc}</p>
                </div>
                <div className="p-5 border border-outline-variant/20 rounded-xl hover:bg-white/5 transition-colors cursor-default">
                  <h4 className="font-bold text-lg mb-1 text-white">{t.dammamTitle}</h4>
                  <p className="text-surface-variant text-xs md:text-sm">{t.dammamDesc}</p>
                </div>
                <div className="p-5 border border-outline-variant/20 rounded-xl hover:bg-white/5 transition-colors cursor-default">
                  <h4 className="font-bold text-lg mb-1 text-white">{t.khobarTitle}</h4>
                  <p className="text-surface-variant text-xs md:text-sm">{t.khobarDesc}</p>
                </div>
              </div>
              <div className="p-5 bg-secondary text-white rounded-xl flex items-center justify-between shadow-lg">
                <div>
                  <p className="font-bold text-base md:text-lg">{t.otherTitle}</p>
                  <p className="text-xs md:text-sm opacity-90">{t.otherDesc}</p>
                </div>
                <button
                  onClick={() => setCurrentPage('contact')}
                  className="px-6 py-2 bg-white text-secondary rounded-lg font-bold hover:bg-surface-variant transition-colors cursor-pointer text-sm"
                >
                  {t.inquireBtn}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Feed Section */}
      <section className="py-stack-lg bg-surface-container-low border-t border-outline-variant/10">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <div className="mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 text-secondary font-bold text-sm uppercase tracking-widest justify-center">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
              <span>Instagram</span>
            </div>
            <h2 className="font-display-lg text-3xl md:text-5xl font-extrabold text-primary tracking-tight">
              {t.instagramHeader}
            </h2>
            <a 
              href="https://www.instagram.com/swimmingpools_riyad?igsh=emllOWJ1Y3ZjZGw5" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-lg md:text-xl font-semibold text-secondary hover:underline direction-ltr inline-block"
            >
              {t.instagramSub}
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">
            {/* Instagram Card 1 */}
            <a 
              href="https://www.instagram.com/swimmingpools_riyad?igsh=emllOWJ1Y3ZjZGw5" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group relative overflow-hidden aspect-square rounded-2xl bg-white shadow-md border border-outline-variant/10"
            >
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCjn8PJB3dSyHeyH8dNiXKWgGjlc2THBSEH4fZb8TIfvgisE2jN6YOYqPlTjNN5M3pvz_bZ8Afnb1q0DtU4820AfDusx5tw4SD9RlxC3by-CLyHeN2vNGQi_818D3XsmgJjXiqW7sMtFHMllEymaUk_onZZtuCY1DcFp-B_GVXYl1DEnNMT6madW-34QWWjXLs2j7OITvk21IbLl14e8558xFGnpyQvMmGkA2bnI1o8MmrQuCxO57rHKyqgupoMyPTmtnlLXN8YXMN" 
                alt="Luxury Desert Oasis Swimming Pool" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 text-white font-bold">
                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-base">favorite</span> 124</span>
                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-base">mode_comment</span> 18</span>
              </div>
            </a>

            {/* Instagram Card 2 */}
            <a 
              href="https://www.instagram.com/swimmingpools_riyad?igsh=emllOWJ1Y3ZjZGw5" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group relative overflow-hidden aspect-square rounded-2xl bg-white shadow-md border border-outline-variant/10"
            >
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6ghxi_txia0CwIAVkbq3YIWWKHqc5jjiPoTKVJur9OSYzjXcGGiS7pcvUg7LA1EYpWWkr1y34LUg-c_Gw5673lKoWQB9XN1-PcWV7zu_l8Rq4cEn7svnI6UyUfUCkgNg2NNgougtYTga5diXktnjmSSmFyx5WJhcx9aUMTtCCMHei1aqiFSESNmhX-kmHNzrls0MPbvUU4A8qrNd2gbRkX5wg_dPDC8hjQ0tpE8tdsi91dJQAM3iGO6GK_rnmFPQo6WkTUZg7PYwg" 
                alt="Hotel Olympic Swimming Pool Project" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 text-white font-bold">
                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-base">favorite</span> 98</span>
                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-base">mode_comment</span> 12</span>
              </div>
            </a>

            {/* Instagram Card 3 */}
            <a 
              href="https://www.instagram.com/swimmingpools_riyad?igsh=emllOWJ1Y3ZjZGw5" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group relative overflow-hidden aspect-square rounded-2xl bg-white shadow-md border border-outline-variant/10"
            >
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5HsRAlbxf2H917KBof3ge9NDhOLQzm4x2exTzCmRpL87TvV8xN2IKjfyCXYrN1sREfGiIs7aMQnTfRpusentCc0GYf8zMuibHzzPHnG1GA3OkaVTcxgxkOBUNPf9DX6vheuMKJ4MZBiuoW32_wJ_ZHwOD9zkqvDiKbvPcXrtLFjZzlrBz3AseXqitom60R5oVh1OCeuLGOINRbDWNFzl0qHZGmtrRDqQ3P9i6iZX9QvJ7S4WE2xWwTLcvM33lGNgGvS3aVI790hMR" 
                alt="Al Rawdah Villa Residential Swimming Pool" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 text-white font-bold">
                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-base">favorite</span> 156</span>
                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-base">mode_comment</span> 24</span>
              </div>
            </a>

            {/* Instagram Card 4 */}
            <a 
              href="https://www.instagram.com/swimmingpools_riyad?igsh=emllOWJ1Y3ZjZGw5" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group relative overflow-hidden aspect-square rounded-2xl bg-white shadow-md border border-outline-variant/10"
            >
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDA_j5KPoHUMMH1m89Z7SVXn4ZDEPZn9NF9vhW9g3AFBr7Ro30s7P81rh3EdkAq18eVzXNR8chIhgUIG6DneiyXaQOSpG-3lwr1Jwx7uu7daTQ2XJcu9qIYUrXMQOObJRQU9auBYitMS2OC25PE5X1wyxAKmHF8qSIfaFk8pgXbxhKtTOSWWDbvohTha4Qul3Z2v4CCQYNAJCZkitkNiBkGZQCMUMBL6-K658J_HRgLprm8ApjJCoKcJs2MQA0LN6-lSImBJyHcyoOM" 
                alt="Symmetrical Modern Swimming Pool Layout" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 text-white font-bold">
                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-base">favorite</span> 210</span>
                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-base">mode_comment</span> 31</span>
              </div>
            </a>
          </div>

          <a 
            href="https://www.instagram.com/swimmingpools_riyad?igsh=emllOWJ1Y3ZjZGw5" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-xl font-bold hover:bg-secondary transition-all shadow-md scale-98 hover:scale-100"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            {t.instagramFollowBtn}
          </a>
        </div>
      </section>

      {/* Lead Gen / CTA Section */}
      <section className="py-stack-lg bg-surface relative overflow-hidden">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
          <div className="bg-white rounded-[32px] p-6 md:p-16 shadow-2xl flex flex-col md:flex-row items-center gap-stack-lg border border-outline-variant/10">
            <div className="md:w-1/2 space-y-6">
              <h2 className="text-primary font-display-lg-mobile md:text-display-lg text-3xl md:text-5xl font-extrabold leading-tight">
                {t.ctaTitle1} <br />
                <span className="text-secondary">{t.ctaTitle2}</span>
              </h2>
              <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">
                {t.ctaDesc}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:966571467576"
                  className="flex-1 px-8 py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:shadow-lg transition-all scale-95 active:scale-90 text-center"
                >
                  <span className="material-symbols-outlined">call</span>
                  {t.callUs}
                </a>
                <a
                  href="https://wa.me/966571467576"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-8 py-4 bg-green-600 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:shadow-lg transition-all scale-95 active:scale-90 text-center"
                >
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
                  {t.whatsappNow}
                </a>
              </div>
            </div>
            <div className="md:w-1/2 w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden relative shadow-lg">
              <img
                className="w-full h-full object-cover"
                alt="Symmetrical modern pool"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDA_j5KPoHUMMH1m89Z7SVXn4ZDEPZn9NF9vhW9g3AFBr7Ro30s7P81rh3EdkAq18eVzXNR8chIhgUIG6DneiyXaQOSpG-3lwr1Jwx7uu7daTQ2XJcu9qIYUrXMQOObJRQU9auBYitMS2OC25PE5X1wyxAKmHF8qSIfaFk8pgXbxhKtTOSWWDbvohTha4Qul3Z2v4CCQYNAJCZkitkNiBkGZQCMUMBL6-K658J_HRgLprm8ApjJCoKcJs2MQA0LN6-lSImBJyHcyoOM"
              />
              <div className="absolute inset-0 bg-secondary/10 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
