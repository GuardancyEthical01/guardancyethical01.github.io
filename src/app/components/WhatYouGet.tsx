import { useLanguage } from "../contexts/LanguageContext";

export function WhatYouGet() {
  const { t } = useLanguage();
  
  const items = [
    "whatyouget.item1",
    "whatyouget.item2",
    "whatyouget.item3",
    "whatyouget.item4",
    "whatyouget.item5"
  ];
  
  return (
    <section id="whatyouget" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container mx-auto max-w-[1100px]">
        {/* Editorial header */}
        <div className="mb-14 md:mb-20 max-w-3xl">
          <div 
            className="inline-flex items-center px-3 py-1.5 mb-6 md:mb-8 uppercase tracking-wide"
            style={{
              backgroundColor: 'white',
              border: '1px solid #E2E8F0',
              borderRadius: '4px',
              fontSize: '10px',
              fontWeight: 500,
              color: '#64748B',
              letterSpacing: '0.05em',
            }}
          >
            {t("whatyouget.badge")}
          </div>
          
          <h2 
            className="mb-6 md:mb-8"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
              fontWeight: 600,
              lineHeight: 1.2,
              color: '#0F172A',
              letterSpacing: '-0.02em',
            }}
          >
            {t("whatyouget.title")}
          </h2>
          
          <p 
            className="text-base leading-relaxed"
            style={{ color: '#475569', fontSize: '15px', lineHeight: 1.7 }}
          >
            {t("whatyouget.subtitle")}
          </p>
        </div>

        {/* Numbered deliverables - clean, structured */}
        <div className="space-y-6 md:space-y-8 max-w-4xl">
          {items.map((itemKey, index) => (
            <div 
              key={index} 
              className="flex gap-6 md:gap-8 pb-6 md:pb-8"
              style={{
                borderBottom: index < items.length - 1 ? '1px solid #E2E8F0' : 'none'
              }}
            >
              {/* Number */}
              <div 
                className="text-sm md:text-base font-semibold flex-shrink-0"
                style={{ 
                  color: '#3B82F6',
                  width: '2rem',
                }}
              >
                {String(index + 1).padStart(2, '0')}
              </div>
              
              {/* Content */}
              <p 
                className="leading-relaxed text-sm md:text-base flex-1"
                style={{ color: '#334155' }}
              >
                {t(itemKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}