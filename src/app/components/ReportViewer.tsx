import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

// Import actual report pages
import reportCover from "@/assets/f643c3da6b7aa8a57d967f17e20a07e8bd4c5d65.png";
import reportPage1 from "@/assets/53b3229998dc0c506b001661074efc0f928518ed.png";
import reportPage2 from "@/assets/721af6deac7673a0e364b3ff2820b7035757c301.png";
import reportPage3 from "@/assets/0282462547ebc09e1afd8009466e70a91a32241a.png";
import reportPage4 from "@/assets/0d562f8850c3be15ba096aa45a553ef4a0098385.png";
import reportPage5 from "@/assets/748a63664df1d2b999bb3c33b56ac8364ccb440f.png";
import reportPage6 from "@/assets/ef53a74872c4856b58b70675f2c63304d3eca1b9.png";
import reportPage7 from "@/assets/bf1d1b64fed84ae1eb4fcac001dc10b23de00bfb.png";
import reportPage8 from "@/assets/a70602e68a35933c96fc2bd59a775e9b02fcca96.png";
import reportPage9 from "@/assets/042feee244a4fd1326d16c17781323c3ff4d0b48.png";
import reportPage10 from "@/assets/a2cf3bad601e70a8a5873a167cd6ac53b7e71d4f.png";

const reportPages = [
  reportCover,
  reportPage1,
  reportPage2,
  reportPage3,
  reportPage4,
  reportPage5,
  reportPage6,
  reportPage7,
  reportPage8,
  reportPage9,
  reportPage10,
];

const ReportPage = ({ pageNumber }: { pageNumber: number }) => {
  const imageSrc = reportPages[pageNumber - 1];

  if (!imageSrc) return null;

  return (
    <div className="w-full h-full bg-white flex items-center justify-center">
      <img
        src={imageSrc}
        alt={`Rapport pagina ${pageNumber}`}
        className="w-full h-full object-contain"
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      />
    </div>
  );
};

export function ReportViewer() {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const navigate = useNavigate();

  const totalPages = 11;

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setDirection(1);
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setDirection(-1);
      setCurrentPage(currentPage - 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    // Swipe threshold
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextPage();
      } else {
        prevPage();
      }
    }

    touchStartX.current = null;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevPage();
      if (e.key === "ArrowRight") nextPage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 40 : -40,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 40 : -40,
      opacity: 0,
    }),
  };

  return (
    <section
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <div className="container mx-auto max-w-[1200px]">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
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
            Voorbeeld
          </div>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
              fontWeight: 600,
              lineHeight: 1.2,
              color: "#0F172A",
              letterSpacing: "-0.02em",
              marginBottom: "12px",
            }}
          >
            Indicatieve bestuursrapportage
          </h2>
          <p
            className="text-base max-w-2xl mx-auto"
            style={{ color: "#64748B", fontSize: '15px', lineHeight: 1.6 }}
          >
            Voorbeeld van hoe een AI Governance Assessment wordt gepresenteerd.
          </p>
        </div>

        {/* Document Viewer */}
        <div className="relative mb-12 md:mb-16">
          <div
            className="relative bg-white overflow-hidden mx-auto"
            style={{
              maxWidth: "900px",
              border: "1px solid #E2E8F0",
              borderRadius: "8px",
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Navigation Arrows - Desktop Only */}
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 z-10 items-center justify-center bg-white/95 hover:bg-white disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200"
              style={{
                border: "1px solid #E2E8F0",
                borderRadius: "6px",
                width: '32px',
                height: '32px',
                color: '#64748B',
              }}
              onMouseEnter={(e) => {
                if (currentPage > 0) {
                  e.currentTarget.style.color = '#0F172A';
                  e.currentTarget.style.backgroundColor = '#F8FAFC';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#64748B';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
              }}
              aria-label="Vorige pagina"
            >
              <ChevronLeft size={16} />
            </button>

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages - 1}
              className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 z-10 items-center justify-center bg-white/95 hover:bg-white disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200"
              style={{
                border: "1px solid #E2E8F0",
                borderRadius: "6px",
                width: '32px',
                height: '32px',
                color: '#64748B',
              }}
              onMouseEnter={(e) => {
                if (currentPage < totalPages - 1) {
                  e.currentTarget.style.color = '#0F172A';
                  e.currentTarget.style.backgroundColor = '#F8FAFC';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#64748B';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
              }}
              aria-label="Volgende pagina"
            >
              <ChevronRight size={16} />
            </button>

            {/* Page Content */}
            <div className="relative w-full" style={{ aspectRatio: "210/297" }}>
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentPage}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "tween", duration: 0.3, ease: "easeInOut" },
                    opacity: { duration: 0.25 },
                  }}
                  className="absolute inset-0"
                >
                  <ReportPage pageNumber={currentPage + 1} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Page Indicator */}
            <div
              className="absolute bottom-3 right-3 md:bottom-4 md:right-4 px-2.5 py-1 bg-white/95"
              style={{
                color: "#64748B",
                border: "1px solid #E2E8F0",
                borderRadius: "2px",
                fontSize: '12px',
                fontWeight: 500,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {currentPage + 1} / {totalPages}
            </div>
          </div>

          {/* Mobile Page Dots */}
          <div className="flex md:hidden justify-center gap-1.5 mt-6">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentPage ? 1 : -1);
                  setCurrentPage(index);
                }}
                className="transition-all duration-300"
                style={{
                  height: '2px',
                  width: index === currentPage ? '24px' : '6px',
                  backgroundColor: index === currentPage ? '#0F172A' : '#CBD5E1',
                  borderRadius: '2px',
                }}
                aria-label={`Ga naar pagina ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p
            className="text-base mb-6"
            style={{ color: "#64748B", fontSize: '15px', lineHeight: 1.6 }}
          >
            Wilt u weten hoe dit er voor uw organisatie uitziet?
          </p>
          <button
            onClick={() => navigate("/booking")}
            className="px-7 py-2.5 text-white transition-all duration-200"
            style={{
              backgroundColor: "#0F172A",
              borderRadius: "5px",
              fontSize: "14px",
              fontWeight: 500,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#1E293B";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#0F172A";
            }}
          >
            Plan een verkennend gesprek
          </button>
        </div>
      </div>
    </section>
  );
}
