import { useLanguage } from "../contexts/LanguageContext";
import { BookingDialog } from "./BookingDialog";

export function Hero() {
  const { t } = useLanguage();
  
  const scrollToDeliverables = () => {
    const element = document.getElementById('whatyouget');
    element?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <section className="relative min-h-[75vh] md:min-h-[70vh] flex items-center px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-[1100px] relative z-10 py-20 md:py-24">
        <div className="max-w-3xl">
          {/* Section label */}
          <div className="mb-5 md:mb-7">
            <span 
              className="text-[10px] font-medium tracking-wide uppercase"
              style={{ color: '#64748B', letterSpacing: '0.05em' }}
            >
              {t("hero.badge")}
            </span>
          </div>
          
          {/* H1 */}
          <h1 
            className="mb-6 md:mb-8 leading-tight"
            style={{
              fontSize: 'clamp(1.875rem, 4.5vw, 3rem)',
              fontWeight: 600,
              color: '#0F172A',
              letterSpacing: '-0.025em',
              lineHeight: 1.15,
            }}
          >
            {t("hero.title")}
          </h1>
          
          {/* Subtitle */}
          <p 
            className="mb-8 md:mb-10 max-w-2xl"
            style={{ 
              color: '#475569',
              fontSize: '15px',
              lineHeight: 1.7,
            }}
          >
            {t("hero.subtitle")}
          </p>

          {/* CTA's */}
          <div className="flex flex-col sm:flex-row gap-3 mb-10 md:mb-12">
            <BookingDialog>
              <button 
                className="px-7 py-3 text-white font-medium transition-colors duration-200"
                style={{ 
                  backgroundColor: '#0F172A',
                  borderRadius: '6px',
                  fontSize: '14px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#1E293B';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#0F172A';
                }}
              >
                {t("hero.cta")}
              </button>
            </BookingDialog>
            
            <button 
              onClick={scrollToDeliverables}
              className="px-7 py-3 font-medium transition-all duration-200"
              style={{ 
                backgroundColor: 'white',
                border: '1px solid #E2E8F0',
                color: '#334155',
                borderRadius: '6px',
                fontSize: '14px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F8FAFC';
                e.currentTarget.style.borderColor = '#CBD5E1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.borderColor = '#E2E8F0';
              }}
            >
              {t("hero.cta.secondary")}
            </button>
          </div>
        </div>

        {/* Divider */}
        <div 
          className="mt-20 md:mt-24 mb-12 md:mb-14 h-px max-w-5xl"
          style={{ backgroundColor: '#E2E8F0' }}
        />

        {/* Context section */}
        <div className="max-w-3xl">
          <div 
            className="text-[10px] font-medium tracking-wide uppercase mb-5 md:mb-6"
            style={{ color: '#64748B', letterSpacing: '0.05em' }}
          >
            {t("hero.context")}
          </div>
          
          <p 
            className="mb-7 md:mb-9 max-w-2xl"
            style={{ 
              color: '#475569',
              fontSize: '15px',
              lineHeight: 1.7,
            }}
          >
            {t("hero.contextsubtitle")}
          </p>

          {/* Structured list */}
          <div className="space-y-4 max-w-2xl">
            {[
              t("hero.bullet1"),
              t("hero.bullet2"),
              t("hero.bullet3"),
              t("hero.bullet4")
            ].map((bullet, index) => (
              <div key={index} className="flex items-start gap-3">
                <div 
                  className="w-1 h-1 rounded-full mt-2.5 flex-shrink-0"
                  style={{ backgroundColor: '#94A3B8' }}
                />
                <p 
                  style={{ 
                    color: '#334155',
                    fontSize: '15px',
                    lineHeight: 1.7,
                  }}
                >
                  {bullet}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}