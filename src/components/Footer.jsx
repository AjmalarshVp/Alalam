import React from 'react';

const translations = {
  en: {
    brandName: 'AL ALAM',
    brandDesc: 'Setting the benchmark for luxury pool maintenance and services in the Kingdom of Saudi Arabia. Pure, professional, perfect.',
    servicesTitle: 'Our Services',
    linksTitle: 'Quick Links',
    contactTitle: 'Contact Us',
    cleaning: 'Pool Cleaning',
    repair: 'Equipment Repair',
    testing: 'Water Testing',
    renovation: 'Tile Renovation',
    riyadh: 'Riyadh Services',
    jeddah: 'Jeddah Services',
    maintenance: 'Maintenance Plans',
    policy: 'Privacy Policy',
    address: 'Al Olaya District, Riyadh, KSA',
    phone: '+966 57 146 7576',
    email: 'care@alalampools.com',
    copyright: '© 2026 Al Alam Swimming Pools. All Rights Reserved.'
  },
  ar: {
    brandName: 'مسابح العالم',
    brandDesc: 'وضع معايير الجودة للعناية بالمسابح الفاخرة وصيانتها في المملكة العربية السعودية. نقاء، احترافية، مثالية.',
    servicesTitle: 'خدماتنا',
    linksTitle: 'روابط سريعة',
    contactTitle: 'اتصل بنا',
    cleaning: 'تنظيف المسابح',
    repair: 'إصلاح المعدات',
    testing: 'فحص المياه',
    renovation: 'تجديد البلاط',
    riyadh: 'خدمات الرياض',
    jeddah: 'خدمات جدة',
    maintenance: 'خطط الصيانة',
    policy: 'سياسة الخصوصية',
    address: 'حي العليا، الرياض، المملكة العربية السعودية',
    phone: '+966 57 146 7576',
    email: 'care@alalampools.com',
    copyright: '© 2026 مسابح العالم. جميع الحقوق محفوظة.'
  }
};

export default function Footer({ lang, setCurrentPage }) {
  const t = translations[lang];

  const handleLinkClick = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-primary dark:bg-primary-container text-white w-full border-t border-outline-variant/15 mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-stack-lg px-margin-mobile md:px-margin-desktop py-stack-lg max-w-container-max mx-auto">
        
        {/* Brand */}
        <div className="space-y-6">
          <div className="font-display-lg-mobile text-display-lg-mobile text-white font-extrabold tracking-tight">
            {t.brandName}
          </div>
          <p className="text-surface-variant text-sm leading-relaxed max-w-sm">
            {t.brandDesc}
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors" aria-label="Website">
              <span className="material-symbols-outlined text-lg">public</span>
            </a>
            <a 
              href="https://www.instagram.com/swimmingpools_riyad?igsh=emllOWJ1Y3ZjZGw5" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors text-white" 
              aria-label="Instagram"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            <a href={`mailto:${t.email}`} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors" aria-label="Email">
              <span className="material-symbols-outlined text-lg">mail</span>
            </a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-bold text-lg mb-6 border-b border-white/10 pb-2 inline-block">
            {t.servicesTitle}
          </h4>
          <ul className="space-y-4 text-sm text-surface-variant">
            <li>
              <button onClick={() => handleLinkClick('services')} className="hover:text-white transition-transform hover:translate-x-1 cursor-pointer text-left">
                {t.cleaning}
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick('services')} className="hover:text-white transition-transform hover:translate-x-1 cursor-pointer text-left">
                {t.repair}
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick('services')} className="hover:text-white transition-transform hover:translate-x-1 cursor-pointer text-left">
                {t.testing}
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick('services')} className="hover:text-white transition-transform hover:translate-x-1 cursor-pointer text-left">
                {t.renovation}
              </button>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-lg mb-6 border-b border-white/10 pb-2 inline-block">
            {t.linksTitle}
          </h4>
          <ul className="space-y-4 text-sm text-surface-variant">
            <li>
              <button onClick={() => handleLinkClick('services')} className="hover:text-white transition-transform hover:translate-x-1 cursor-pointer text-left">
                {t.riyadh}
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick('services')} className="hover:text-white transition-transform hover:translate-x-1 cursor-pointer text-left">
                {t.jeddah}
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick('services')} className="hover:text-white transition-transform hover:translate-x-1 cursor-pointer text-left">
                {t.maintenance}
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick('home')} className="hover:text-white transition-transform hover:translate-x-1 cursor-pointer text-left">
                {t.policy}
              </button>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-bold text-lg mb-6 border-b border-white/10 pb-2 inline-block">
            {t.contactTitle}
          </h4>
          <ul className="space-y-4 text-surface-variant text-sm">
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-secondary shrink-0">location_on</span>
              <span>{t.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary shrink-0">call</span>
              <a href={`tel:${t.phone}`} className="hover:text-white transition-colors">{t.phone}</a>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary shrink-0">mail</span>
              <a href={`mailto:${t.email}`} className="hover:text-white transition-colors break-all">{t.email}</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copy */}
      <div className="border-t border-white/10 py-8 text-center text-surface-variant text-xs">
        {t.copyright}
      </div>
    </footer>
  );
}
