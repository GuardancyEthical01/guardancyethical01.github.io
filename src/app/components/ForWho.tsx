import { useLanguage } from "../contexts/LanguageContext";

export function ForWho() {
  const { t } = useLanguage();
  
  const audiences = [
    {
      titleKey: "forwho.card1.title",
      subtitleKey: "forwho.card1.subtitle",
      points: [
        "forwho.card1.point1",
        "forwho.card1.point2",
        "forwho.card1.point3"
      ]
    },
    {
      titleKey: "forwho.card2.title",
      subtitleKey: "forwho.card2.subtitle",
      points: [
        "forwho.card2.point1",
        "forwho.card2.point2",
        "forwho.card2.point3"
      ]
    }
  ];
  
  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container mx-auto max-w-[1100px]">
        {/* Editorial header */}
        <div className="mb-14 md:mb-20 max-w-3xl">
          <div 
            className="inline-flex items-center px-3 py-1.5 mb-6 md:mb-8 uppercase tracking-wide"
            style={{
              backgroundColor: '#FAFBFC',
              border: '1px solid #E2E8F0',
              borderRadius: '4px',
              fontSize: '10px',
              fontWeight: 500,
              color: '#64748B',
              letterSpacing: '0.05em',
            }}
          >
            {t("forwho.badge")}
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
            {t("forwho.title")}
          </h2>
          
          <p 
            className="text-base leading-relaxed"
            style={{ color: '#475569', fontSize: '15px', lineHeight: 1.7 }}
          >
            {t("forwho.subtitle")}
          </p>
        </div>

        {/* Structured sections - no cards, no icons */}
        <div className="space-y-12 md:space-y-16 max-w-4xl">
          {audiences.map((audience, index) => (
            <div key={index}>
              {/* Divider boven elke sectie (behalve eerste) */}
              {index > 0 && (
                <div 
                  className="h-px mb-12 md:mb-16"
                  style={{ backgroundColor: '#E2E8F0' }}
                />
              )}
              
              <div className="grid md:grid-cols-[200px_1fr] gap-6 md:gap-12">
                {/* Left: Title area */}
                <div>
                  <h3 
                    className="text-lg md:text-xl font-semibold mb-2"
                    style={{ 
                      color: '#0F172A',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {t(audience.titleKey)}
                  </h3>
                  <p 
                    className="text-xs md:text-sm"
                    style={{ color: '#64748B' }}
                  >
                    {t(audience.subtitleKey)}
                  </p>
                </div>
                
                {/* Right: Points */}
                <ul className="space-y-4 md:space-y-5">
                  {audience.points.map((pointKey, pointIndex) => (
                    <li key={pointIndex} className="flex items-start gap-3 md:gap-4">
                      <div 
                        className="w-1 h-1 rounded-full mt-2.5 flex-shrink-0"
                        style={{ backgroundColor: '#94A3B8' }}
                      />
                      <span 
                        className="leading-relaxed text-sm md:text-base"
                        style={{ color: '#334155' }}
                      >
                        {t(pointKey)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}