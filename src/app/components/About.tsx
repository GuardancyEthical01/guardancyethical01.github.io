import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";

export function About() {
  const principles = [
    {
      title: "Bestuurlijke grip",
      description: "AI-toepassingen raken besluitvorming, verantwoordelijkheid en toezicht. Deteqt brengt structuur in eigenaarschap, risicobeoordeling en periodieke herbeoordeling."
    },
    {
      title: "Juridisch verdedigbaar",
      description: "Onze analyses sluiten aan op AVG, EU AI Act en NIS2. Niet als vinklijst, maar als onderbouwde bestuurlijke afweging."
    },
    {
      title: "Volledig onafhankelijk",
      description: "Deteqt opereert zonder commerciële belangen bij softwareleveranciers. Adviezen zijn uitsluitend gericht op bestuurlijke verantwoordelijkheid en risicobeheersing."
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % principles.length);
    }, 9000);

    return () => clearInterval(interval);
  }, [principles.length, isPaused]);

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev - 1 + principles.length) % principles.length);
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % principles.length);
  };

  return (
    <section 
      id="about" 
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{ backgroundColor: '#F8FAFC' }}
    >
      <div className="container mx-auto relative z-10 max-w-[1200px]">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="mb-16 md:mb-24 max-w-3xl">
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
              Principes
            </div>
            <h2 
              style={{
                fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                fontWeight: 600,
                lineHeight: 1.2,
                color: '#0F172A',
                letterSpacing: '-0.02em',
                marginBottom: '16px',
              }}
            >
              Onafhankelijk advies voor zorginstellingen
            </h2>
            <p 
              style={{ 
                color: '#64748B', 
                fontSize: '15px',
                lineHeight: 1.65,
              }}
            >
              Deteqt helpt zorginstellingen om met vertrouwen AI-toepassingen te gebruiken. 
              Wij brengen risico's in kaart en geven duidelijkheid over verantwoordelijkheden, 
              zodat u zich kunt focussen op waar het om draait: goede zorg.
            </p>
          </div>

          {/* Carousel - Institutional design */}
          <div className="relative px-4 md:px-12">
            <div 
              className="relative"
              style={{ minHeight: '280px' }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {principles.map((principle, index) => {
                const position = (index - activeIndex + principles.length) % principles.length;
                
                return (
                  <motion.div
                    key={index}
                    className="absolute inset-0"
                    initial={false}
                    animate={{
                      x: position === 0 ? '0%' : position === 1 ? '110%' : '-110%',
                      opacity: position === 0 ? 1 : 0,
                      zIndex: position === 0 ? 10 : 0,
                    }}
                    transition={{
                      duration: 0.8,
                      ease: [0.22, 0.61, 0.36, 1],
                    }}
                  >
                    <div 
                      className="bg-white"
                      style={{
                        border: '1px solid #E2E8F0',
                        borderRadius: '8px',
                        padding: 'clamp(32px, 5vw, 56px)',
                      }}
                    >
                      {/* Title */}
                      <h3 
                        style={{
                          fontSize: 'clamp(1.375rem, 2.5vw, 1.75rem)',
                          fontWeight: 600,
                          lineHeight: 1.25,
                          color: '#0F172A',
                          letterSpacing: '-0.015em',
                          marginBottom: '20px',
                        }}
                      >
                        {principle.title}
                      </h3>
                      
                      {/* Description */}
                      <p 
                        style={{ 
                          color: '#475569', 
                          fontSize: '15px',
                          lineHeight: 1.7,
                        }}
                      >
                        {principle.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Navigation - Subtle */}
            <button
              onClick={goToPrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 transition-all duration-200 z-20"
              style={{
                backgroundColor: 'white',
                border: '1px solid #E2E8F0',
                borderRadius: '6px',
                padding: '8px',
                color: '#64748B',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F8FAFC';
                e.currentTarget.style.color = '#0F172A';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = '#64748B';
              }}
              aria-label="Vorig principe"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 transition-all duration-200 z-20"
              style={{
                backgroundColor: 'white',
                border: '1px solid #E2E8F0',
                borderRadius: '6px',
                padding: '8px',
                color: '#64748B',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F8FAFC';
                e.currentTarget.style.color = '#0F172A';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = '#64748B';
              }}
              aria-label="Volgend principe"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Progress indicators - Minimal */}
          <div className="flex justify-center gap-2 mt-10 md:mt-12">
            {principles.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className="transition-all duration-300"
                style={{
                  height: '2px',
                  width: index === activeIndex ? '32px' : '8px',
                  backgroundColor: index === activeIndex ? '#0F172A' : '#CBD5E1',
                  borderRadius: '2px',
                }}
                aria-label={`Ga naar principe ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}