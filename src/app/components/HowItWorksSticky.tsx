import { UserPlus, Settings, Rocket } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const steps = [
  {
    icon: UserPlus,
    stepKey: "howitworks.step1",
    titleKey: "howitworks.step1.title",
    descriptionKey: "howitworks.step1.description",
    color: "from-cyan-500 via-blue-500 to-indigo-600",
    bgGradient: "from-cyan-50 via-blue-50 to-indigo-50",
    accentColor: "bg-cyan-500",
    shadowColor: "shadow-cyan-500/20",
    number: "01"
  },
  {
    icon: Settings,
    stepKey: "howitworks.step2",
    titleKey: "howitworks.step2.title",
    descriptionKey: "howitworks.step2.description",
    color: "from-violet-500 via-purple-500 to-fuchsia-600",
    bgGradient: "from-violet-50 via-purple-50 to-fuchsia-50",
    accentColor: "bg-violet-500",
    shadowColor: "shadow-violet-500/20",
    number: "02"
  },
  {
    icon: Rocket,
    stepKey: "howitworks.step3",
    titleKey: "howitworks.step3.title",
    descriptionKey: "howitworks.step3.description",
    color: "from-emerald-500 via-teal-500 to-cyan-600",
    bgGradient: "from-emerald-50 via-teal-50 to-cyan-50",
    accentColor: "bg-emerald-500",
    shadowColor: "shadow-emerald-500/20",
    number: "03"
  }
];

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const { t } = useLanguage();
  const Icon = step.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Dynamic opacity with fade in/out
  const opacity = useTransform(
    scrollYProgress, 
    [0, 0.15, 0.5, 0.85, 1], 
    [1, 1, 1, 1, 0.5]
  );
  
  // Dramatic vertical movement - cards slide up and over each other
  const y = useTransform(
    scrollYProgress, 
    [0, 0.15, 0.5, 0.85, 1], 
    [120, 0, 0, 0, -100]
  );

  // Scale effect for depth
  const scale = useTransform(
    scrollYProgress,
    [0, 0.15, 0.5, 0.85, 1],
    [0.85, 1, 1, 1, 0.9]
  );

  // Subtle rotation for dynamic feel
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [8, 0, 0, -5]
  );

  // Content animations
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [1, 1, 1, 0.7]
  );

  const contentY = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 0, 0, -20]
  );

  return (
    <div ref={containerRef} className="relative" style={{ position: 'relative' }}>
      <motion.div
        ref={cardRef}
        style={{
          opacity,
          y,
          scale,
          rotateX,
          top: `${20 + index * 30}px`,
        }}
        className={`bg-gradient-to-br ${step.bgGradient} text-gray-900 rounded-3xl p-8 md:p-12 lg:p-16 min-h-[500px] shadow-2xl ${step.shadowColor} mb-12 border-2 border-white/50 backdrop-blur-sm sticky will-change-transform`}
      >
        <motion.div 
          style={{ opacity: contentOpacity, y: contentY }}
          className="max-w-6xl mx-auto"
        >
          <div className="space-y-8">
            <motion.div 
              className="inline-block px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium shadow-lg text-gray-900"
              whileHover={{ scale: 1.05 }}
            >
              {t(step.stepKey)}
            </motion.div>
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}>
              {t(step.titleKey)}
            </h2>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              {t(step.descriptionKey)}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function HowItWorksSticky() {
  const { t } = useLanguage();

  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 relative" style={{ position: 'relative' }}>
      <div className="container mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full mb-6">
            {t("howitworks.badge")}
          </div>
          <h2 className="mb-4 text-gray-900 text-4xl md:text-5xl">
            {t("howitworks.title")}
          </h2>
          <p className="text-gray-600 text-lg md:text-xl">
            {t("howitworks.subtitle")}
          </p>
        </motion.div>
      </div>

      <div className="container mx-auto relative" style={{ position: 'relative' }}>
        {steps.map((step, index) => (
          <StepCard key={index} step={step} index={index} />
        ))}
      </div>
    </section>
  );
}