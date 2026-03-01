import { useLanguage } from "../contexts/LanguageContext";
import { BookingDialog } from "./BookingDialog";

export function CTA() {
  const { t } = useLanguage();

  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ backgroundColor: '#0F172A' }}>
      
      <div className="container mx-auto max-w-[1100px] relative z-10">
        <div className="text-center text-white max-w-3xl mx-auto">
          <h2 
            className="mb-8 md:mb-10 text-white"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
              fontWeight: 600,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}
          >
            {t("cta.title")}
          </h2>
          <p 
            className="mb-10 md:mb-12 leading-relaxed"
            style={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '15px',
              lineHeight: 1.7,
            }}
          >
            {t("cta.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6 md:mb-8">
            <BookingDialog>
              <button 
                className="w-full sm:w-auto px-7 py-3 bg-white font-medium transition-all duration-200"
                style={{
                  color: '#0F172A',
                  borderRadius: '6px',
                  fontSize: '14px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F8FAFC';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                }}
              >
                {t("cta.button")}
              </button>
            </BookingDialog>
          </div>
          <p 
            className="text-xs md:text-sm"
            style={{ color: 'rgba(255, 255, 255, 0.5)' }}
          >
            {t("cta.info")}
          </p>
        </div>
      </div>
    </section>
  );
}