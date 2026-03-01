import { useLanguage } from "../contexts/LanguageContext";

export function CommonRisks() {
  const { t } = useLanguage();
  
  const risks = [
    {
      titleKey: "risks.risk1.title",
      descriptionKey: "risks.risk1.description"
    },
    {
      titleKey: "risks.risk2.title",
      descriptionKey: "risks.risk2.description"
    },
    {
      titleKey: "risks.risk3.title",
      descriptionKey: "risks.risk3.description"
    },
    {
      titleKey: "risks.risk4.title",
      descriptionKey: "risks.risk4.description"
    },
    {
      titleKey: "risks.risk5.title",
      descriptionKey: "risks.risk5.description"
    },
    {
      titleKey: "risks.risk6.title",
      descriptionKey: "risks.risk6.description"
    }
  ];
  
  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#F8FAFC' }}>
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
            {t("risks.badge")}
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
            {t("risks.title")}
          </h2>
          
          <p 
            style={{ 
              color: '#475569',
              fontSize: '15px',
              lineHeight: 1.7,
            }}
          >
            {t("risks.subtitle")}
          </p>
        </div>

        {/* Structured list */}
        <div className="grid md:grid-cols-2 gap-y-8 gap-x-10 md:gap-x-16 md:gap-y-10 max-w-4xl">
          {risks.map((risk, index) => (
            <div key={index}>
              <h3 
                className="mb-2"
                style={{ 
                  color: '#0F172A',
                  fontSize: '16px',
                  fontWeight: 600,
                  letterSpacing: '-0.01em',
                }}
              >
                {t(risk.titleKey)}
              </h3>
              <p 
                style={{ 
                  color: '#64748B',
                  fontSize: '15px',
                  lineHeight: 1.65,
                }}
              >
                {t(risk.descriptionKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}