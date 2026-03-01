import { useLanguage } from "../contexts/LanguageContext";
import { ArrowDown } from "lucide-react";

const steps = [
  {
    number: "01",
    titleKey: "approach.step1.title",
    points: [
      "approach.step1.point1",
      "approach.step1.point2",
      "approach.step1.point3"
    ]
  },
  {
    number: "02",
    titleKey: "approach.step2.title",
    points: [
      "approach.step2.point1",
      "approach.step2.point2",
      "approach.step2.point3"
    ]
  },
  {
    number: "03",
    titleKey: "approach.step3.title",
    points: [
      "approach.step3.point1",
      "approach.step3.point2",
      "approach.step3.point3"
    ]
  },
  {
    number: "04",
    titleKey: "approach.step4.title",
    points: [
      "approach.step4.point1",
      "approach.step4.point2",
      "approach.step4.point3"
    ]
  }
];

export function OurApproach() {
  const { t } = useLanguage();
  
  return (
    <section id="approach" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#F8FAFC' }}>
      <div className="container mx-auto mb-16 md:mb-24 max-w-[1100px]">
        {/* Editorial header */}
        <div className="max-w-3xl">
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
            {t("approach.badge")}
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
            {t("approach.title")}
          </h2>
          
          <p 
            className="text-base md:text-lg leading-relaxed"
            style={{ color: '#475569' }}
          >
            {t("approach.subtitle")}
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-[900px]">
        {steps.map((step, index) => (
          <div key={index}>
            {/* Step Card */}
            <div 
              className="p-8 md:p-10"
              style={{
                background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
                border: '1px solid #E2E8F0',
                borderRadius: '16px',
                boxShadow: '0 4px 12px -2px rgba(0, 0, 0, 0.08)',
              }}
            >
              {/* Number badge */}
              <div 
                className="inline-flex items-center px-4 py-2 mb-5"
                style={{
                  background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  letterSpacing: '0.05em',
                }}
              >
                STAP {step.number}
              </div>

              {/* Title */}
              <h3 
                className="text-xl md:text-2xl font-semibold mb-6"
                style={{ 
                  color: '#0F172A',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.3,
                }}
              >
                {t(step.titleKey)}
              </h3>

              {/* Bullet Points */}
              <ul className="space-y-3">
                {step.points.map((pointKey, pointIndex) => (
                  <li 
                    key={pointIndex} 
                    className="flex items-start gap-3"
                  >
                    <div 
                      className="flex-shrink-0 mt-1"
                      style={{ 
                        width: '6px',
                        height: '6px',
                        backgroundColor: '#3B82F6',
                        borderRadius: '50%',
                      }}
                    />
                    <span 
                      className="leading-relaxed flex-1"
                      style={{ 
                        color: '#334155',
                        fontSize: '15px',
                        lineHeight: 1.7,
                      }}
                    >
                      {t(pointKey)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Arrow between steps */}
            {index < steps.length - 1 && (
              <div className="flex justify-center py-6">
                <ArrowDown 
                  style={{ 
                    width: '32px',
                    height: '32px',
                    color: '#3B82F6',
                    strokeWidth: 2.5
                  }} 
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
