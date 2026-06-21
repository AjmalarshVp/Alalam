import React, { useState } from 'react';

const translations = {
  en: {
    heroTitle: "Let’s Build Your Oasis",
    heroSub: "Expert pool design, construction, and maintenance across the Kingdom of Saudi Arabia.",
    
    formTitle: "Request a Private Consultation",
    formSub: "Complete the form below and our regional expert will contact you within 24 hours.",
    
    fieldName: "Full Name",
    namePlaceholder: "e.g. Khalid Al-Faisal",
    fieldPhone: "Phone Number",
    phonePlaceholder: "+966 5X XXX XXXX",
    fieldEmail: "Email Address",
    emailPlaceholder: "name@company.sa",
    fieldCity: "City",
    cityRiyadh: "Riyadh",
    cityJeddah: "Jeddah",
    cityDammam: "Dammam / Al Khobar",
    cityOther: "Other",
    
    fieldService: "Service Required",
    srvNew: "New Construction",
    srvMaint: "Maintenance",
    srvReno: "Renovation",
    srvConsult: "Consultation",
    
    fieldMessage: "Your Message",
    messagePlaceholder: "Tell us about your project requirements...",
    btnSubmit: "Submit Inquiry",
    btnSending: "Sending...",
    btnSuccess: "Success! Our team will contact you.",
    
    sidebarTitle: "Direct Support",
    callLabel: "Click to Call",
    callNum: "+966 57 146 7576",
    whatsappLabel: "WhatsApp Chat",
    whatsappChat: "Chat with an Expert",
    emailLabel: "Email Us",
    emailAdd: "info@alalampools.sa",
    
    hoursLabel: "Office Hours",
    hoursVal: "Sat - Thu: 9 AM - 7 PM",
    
    branchRiyadh: "Riyadh HQ",
    addressRiyadh: "Olaya District, Office 402",
    branchJeddah: "Jeddah Branch",
    addressJeddah: "Tahlia St, Building 18",
    
    presenceTitle: "Our Presence",
    presenceDesc: "Serving residential and commercial clients across major Saudi cities with dedicated on-site teams.",
    
    statBuilt: "Pools Built",
    statExp: "Years Expertise",
    statGuarantee: "Quality Guarantee"
  },
  ar: {
    heroTitle: "لنقم ببناء واحتك الخاصة",
    heroSub: "تصميم وإنشاء وصيانة مسابح احترافية في جميع أنحاء المملكة العربية السعودية.",
    
    formTitle: "طلب استشارة خاصة ومباشرة",
    formSub: "أكمل النموذج أدناه وسيتواصل معك خبيرنا الإقليمي في غضون 24 ساعة.",
    
    fieldName: "الاسم الكامل",
    namePlaceholder: "مثال: خالد الفيصل",
    fieldPhone: "رقم الجوال",
    phonePlaceholder: "+966 5X XXX XXXX",
    fieldEmail: "البريد الإلكتروني",
    emailPlaceholder: "name@company.sa",
    fieldCity: "المدينة",
    cityRiyadh: "الرياض",
    cityJeddah: "جدة",
    cityDammam: "الدمام / الخبر",
    cityOther: "أخرى",
    
    fieldService: "الخدمة المطلوبة",
    srvNew: "إنشاء جديد",
    srvMaint: "صيانة دورية",
    srvReno: "تجديد وترميم",
    srvConsult: "استشارة خاصة",
    
    fieldMessage: "رسالتك",
    messagePlaceholder: "أخبرنا عن متطلبات وتفاصيل مشروعك...",
    btnSubmit: "إرسال الطلب",
    btnSending: "جاري الإرسال...",
    btnSuccess: "تم الإرسال بنجاح! سنتصل بك.",
    
    sidebarTitle: "الدعم المباشر السريع",
    callLabel: "اضغط للاتصال",
    callNum: "+966 57 146 7576",
    whatsappLabel: "محادثة واتساب",
    whatsappChat: "تحدث مع خبير الصيانة",
    emailLabel: "راسلنا بالبريد",
    emailAdd: "info@alalampools.sa",
    
    hoursLabel: "ساعات العمل",
    hoursVal: "السبت - الخميس: 9 ص - 7 م",
    
    branchRiyadh: "المقر الرئيسي بالرياض",
    addressRiyadh: "حي العليا، مكتب 402",
    branchJeddah: "فرع مدينة جدة",
    addressJeddah: "شارع التحلية، مبنى 18",
    
    presenceTitle: "تواجدنا الجغرافي",
    presenceDesc: "نخدم العملاء السكنيين والتجاريين في مدن المملكة الرئيسية بفرق صيانة ميدانية مخصصة.",
    
    statBuilt: "مسبح تم بناؤه",
    statExp: "عاماً من الخبرة",
    statGuarantee: "ضمان الجودة 100%"
  }
};

export default function Contact({ lang }) {
  const t = translations[lang];
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', city: 'Riyadh', service: 'New Construction', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', phone: '', email: '', city: 'Riyadh', service: 'New Construction', message: '' });
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    }, 1500);
  };

  const servicesList = ['New Construction', 'Maintenance', 'Renovation', 'Consultation'];

  return (
    <div className={`w-full overflow-hidden ${lang === 'ar' ? 'rtl font-sans' : ''}`}>
      <main className="pt-24 pb-stack-lg animate-fade-in">
        {/* Hero Section */}
        <section className="relative h-[420px] min-h-[300px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB0PX1PhOeaO7cOSGZQwJD4qztduaana2WvRUArpqAOR0plZ-KV9uzSNx5KL8FcZ_d_IJP-MZ-nIUAiubeZDTOMyM9SN0Dlu8Y4YbkA9RaePQ69ASBgIqXq5h1TdI6xM7Yv2PEvibE523r_udZXTmYPbMTxtXzlZ6-UIt5EdL7gbLJQXi9WWTC_AhwCnZF5sjYWkvVktw0Re6lqZH2jHQd4z_BeAM85TOhg9q5xMYGBRQtNT_2fQzT0SK4W0uiUWdaFG3x-k1z4zJpI')" }}
            ></div>
            <div className="absolute inset-0 bg-primary/45 backdrop-blur-[2px]"></div>
          </div>
          <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full text-white space-y-3">
            <h1 className="font-display-lg-mobile md:text-display-lg text-3xl md:text-5xl font-extrabold leading-tight">
              {t.heroTitle}
            </h1>
            <p className="font-body-lg text-white/90 max-w-xl text-base md:text-lg">
              {t.heroSub}
            </p>
          </div>
        </section>

        {/* Contact Form Grid */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop -mt-20 relative z-20 mb-stack-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
            
            {/* Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl shadow-xl p-8 border-t-4 border-tertiary-container border border-outline-variant/10">
              <div className="mb-8">
                <h2 className="font-headline-md text-2xl font-bold text-primary mb-2">{t.formTitle}</h2>
                <p className="text-on-surface-variant font-body-md text-sm">{t.formSub}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative flex flex-col gap-1">
                    <label className="text-xs font-bold text-outline uppercase tracking-wider">{t.fieldName}</label>
                    <input
                      type="text"
                      required
                      placeholder={t.namePlaceholder}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full border-b-2 border-outline-variant focus:border-secondary outline-none py-3 px-1 transition-all bg-transparent font-body-md text-primary"
                    />
                  </div>
                  <div className="relative flex flex-col gap-1">
                    <label className="text-xs font-bold text-outline uppercase tracking-wider">{t.fieldPhone}</label>
                    <input
                      type="tel"
                      required
                      placeholder={t.phonePlaceholder}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full border-b-2 border-outline-variant focus:border-secondary outline-none py-3 px-1 transition-all bg-transparent font-body-md text-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative flex flex-col gap-1">
                    <label className="text-xs font-bold text-outline uppercase tracking-wider">{t.fieldEmail}</label>
                    <input
                      type="email"
                      required
                      placeholder={t.emailPlaceholder}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full border-b-2 border-outline-variant focus:border-secondary outline-none py-3 px-1 transition-all bg-transparent font-body-md text-primary"
                    />
                  </div>
                  <div className="relative flex flex-col gap-1">
                    <label className="text-xs font-bold text-outline uppercase tracking-wider">{t.fieldCity}</label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full border-b-2 border-outline-variant focus:border-secondary outline-none py-3 px-1 transition-all bg-transparent font-body-md text-primary bg-white"
                    >
                      <option value="Riyadh">{t.cityRiyadh}</option>
                      <option value="Jeddah">{t.cityJeddah}</option>
                      <option value="Dammam / Al Khobar">{t.cityDammam}</option>
                      <option value="Other">{t.cityOther}</option>
                    </select>
                  </div>
                </div>

                {/* Selected service buttons */}
                <div className="relative flex flex-col gap-1">
                  <label className="text-xs font-bold text-outline uppercase tracking-wider">{t.fieldService}</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {servicesList.map((srv, idx) => {
                      const translationsSrv = {
                        'New Construction': t.srvNew,
                        'Maintenance': t.srvMaint,
                        'Renovation': t.srvReno,
                        'Consultation': t.srvConsult
                      };
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setFormData({ ...formData, service: srv })}
                          className={`px-4 py-2 rounded-full border text-xs md:text-sm font-semibold transition-all active:scale-95 cursor-pointer ${
                            formData.service === srv
                              ? 'bg-secondary-container border-secondary text-primary font-bold shadow'
                              : 'border-outline-variant text-on-surface-variant hover:bg-surface-container'
                          }`}
                        >
                          {translationsSrv[srv]}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="relative flex flex-col gap-1">
                  <label className="text-xs font-bold text-outline uppercase tracking-wider">{t.fieldMessage}</label>
                  <textarea
                    required
                    placeholder={t.messagePlaceholder}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows="4"
                    className="w-full border-b-2 border-outline-variant focus:border-secondary outline-none py-3 px-1 transition-all bg-transparent resize-none font-body-md text-primary"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status !== 'idle'}
                  className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:scale-95 transition-all text-white flex items-center justify-center gap-2 cursor-pointer ${
                    status === 'success'
                      ? 'bg-green-600'
                      : status === 'sending'
                      ? 'bg-primary/75 cursor-not-allowed'
                      : 'bg-primary hover:bg-primary-container'
                  }`}
                >
                  {status === 'success' && (
                    <>
                      <span className="material-symbols-outlined">check_circle</span>
                      {t.btnSuccess}
                    </>
                  )}
                  {status === 'sending' && (
                    <>
                      <span className="material-symbols-outlined animate-spin">progress_activity</span>
                      {t.btnSending}
                    </>
                  )}
                  {status === 'idle' && (
                    <>
                      <span className="material-symbols-outlined">send</span>
                      {t.btnSubmit}
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-5 space-y-6">
              {/* Glassmorphism support details */}
              <div className="glass-card rounded-3xl p-8 shadow-md space-y-6 border border-outline-variant/10">
                <h3 className="font-headline-md text-xl md:text-2xl font-bold text-primary mb-4">{t.sidebarTitle}</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-secondary/10 p-3 rounded-full text-secondary">
                      <span className="material-symbols-outlined text-2xl">call</span>
                    </div>
                    <div>
                      <p className="text-xs text-outline uppercase font-bold tracking-widest mb-1">{t.callLabel}</p>
                      <a className="font-headline-md text-primary hover:text-secondary transition-colors text-lg md:text-xl font-bold" href={`tel:${t.callNum}`}>
                        {t.callNum}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 p-3 rounded-full text-green-700">
                      <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
                    </div>
                    <div>
                      <p className="text-xs text-outline uppercase font-bold tracking-widest mb-1">{t.whatsappLabel}</p>
                      <a className="font-headline-md text-primary hover:text-green-600 transition-colors text-lg md:text-xl font-bold" href="https://wa.me/966571467576" target="_blank" rel="noopener noreferrer">
                        {t.whatsappChat}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-tertiary/10 p-3 rounded-full text-tertiary">
                      <span className="material-symbols-outlined text-2xl">mail</span>
                    </div>
                    <div>
                      <p className="text-xs text-outline uppercase font-bold tracking-widest mb-1">{t.emailLabel}</p>
                      <a className="font-body-lg text-primary font-bold hover:text-secondary transition-colors text-base break-all" href={`mailto:${t.emailAdd}`}>
                        {t.emailAdd}
                      </a>
                    </div>
                  </div>
                </div>

                <hr className="my-6 border-outline-variant/30" />
                
                <div className="flex justify-between items-center bg-primary text-white p-5 rounded-2xl shadow-inner border border-white/5">
                  <div>
                    <p className="text-xs opacity-80 uppercase font-bold tracking-widest mb-1">{t.hoursLabel}</p>
                    <p className="font-semibold text-sm md:text-base">{t.hoursVal}</p>
                  </div>
                  <span className="material-symbols-outlined text-tertiary-fixed text-4xl">schedule</span>
                </div>
              </div>

              {/* Location cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-surface-container-high p-6 rounded-2xl hover:bg-secondary-fixed transition-colors group cursor-pointer shadow-sm border border-outline-variant/10">
                  <h4 className="font-bold text-primary mb-1 text-base md:text-lg">{t.branchRiyadh}</h4>
                  <p className="text-sm text-on-surface-variant group-hover:text-primary leading-relaxed">{t.addressRiyadh}</p>
                </div>
                <div className="bg-surface-container-high p-6 rounded-2xl hover:bg-secondary-fixed transition-colors group cursor-pointer shadow-sm border border-outline-variant/10">
                  <h4 className="font-bold text-primary mb-1 text-base md:text-lg">{t.branchJeddah}</h4>
                  <p className="text-sm text-on-surface-variant group-hover:text-primary leading-relaxed">{t.addressJeddah}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mt-stack-lg mb-stack-lg">
          <div className="rounded-3xl overflow-hidden shadow-xl border border-outline-variant/20 h-[450px] relative">
            <div className="absolute top-6 left-6 right-6 md:right-auto z-10 glass-card p-6 rounded-2xl max-w-sm shadow-xl border-l-4 border-secondary">
              <h3 className="font-headline-md text-xl font-bold text-primary mb-2">{t.presenceTitle}</h3>
              <p className="text-sm text-on-surface-variant mb-4 leading-relaxed">{t.presenceDesc}</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-primary font-bold text-sm">
                  <span className="material-symbols-outlined text-secondary text-base" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                  {t.cityRiyadh}
                </li>
                <li className="flex items-center gap-2 text-primary font-bold text-sm">
                  <span className="material-symbols-outlined text-secondary text-base" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                  {t.cityJeddah}
                </li>
                <li className="flex items-center gap-2 text-primary font-bold text-sm">
                  <span className="material-symbols-outlined text-secondary text-base" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                  {t.cityDammam}
                </li>
              </ul>
            </div>
            
            {/* Map Grayscale Image Placeholder */}
            <div className="w-full h-full bg-surface-container bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-700" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBo1cWP0q_vwsSOnjYAIgp53x-G4WmqObYYq3cLvq822Dq3LRaYzcJ9hPWrwAW9TzgqLXoyX5BQOpERYZSdP-zxzooxpV4nhN7Z2pGhYGEgWWBStJ78MMqE5wU1DFGs_evgpLtUbMD9qGOB0SapopjIE2nYV1vR6hMK8C1jAMrrNtGQGjrxA4K9ZtVfQLvbNxoMjMRzJojrgzlPpJKJsWMccOIZdz_M5L5oULR6CDNpYBdZkYoWEyK08FMdGjM6np58RR0JXePQb6BJ')" }}>
            </div>
          </div>
        </section>

        {/* Bottom stats counter banner */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter text-center border-t border-outline-variant/30 pt-8">
            <div className="p-6">
              <p className="font-display-lg text-3xl md:text-5xl font-extrabold text-primary mb-2">500+</p>
              <p className="text-xs md:text-sm text-tertiary uppercase font-bold tracking-widest">{t.statBuilt}</p>
            </div>
            <div className="p-6 border-y md:border-y-0 md:border-x border-outline-variant/30">
              <p className="font-display-lg text-3xl md:text-5xl font-extrabold text-primary mb-2">15</p>
              <p className="text-xs md:text-sm text-tertiary uppercase font-bold tracking-widest">{t.statExp}</p>
            </div>
            <div className="p-6">
              <p className="font-display-lg text-3xl md:text-5xl font-extrabold text-primary mb-2">100%</p>
              <p className="text-xs md:text-sm text-tertiary uppercase font-bold tracking-widest">{t.statGuarantee}</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
