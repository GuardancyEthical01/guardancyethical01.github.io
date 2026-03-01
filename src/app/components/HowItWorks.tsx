import { UserPlus, Settings, Rocket } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { motion } from "motion/react";

const steps = [
  {
    icon: UserPlus,
    stepKey: "howitworks.step1",
    titleKey: "howitworks.step1.title",
    descriptionKey: "howitworks.step1.description"
  },
  {
    icon: Settings,
    stepKey: "howitworks.step2",
    titleKey: "howitworks.step2.title",
    descriptionKey: "howitworks.step2.description"
  },
  {
    icon: Rocket,
    stepKey: "howitworks.step3",
    titleKey: "howitworks.step3.title",
    descriptionKey: "howitworks.step3.description"
  }
];

export function HowItWorks() {
  const { t } = useLanguage();

  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-purple-50 text-purple-600 rounded-full mb-4">
            {t("howitworks.badge")}
          </div>
          <h2 className="mb-4 text-gray-900">
            {t("howitworks.title")}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t("howitworks.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection lines for desktop */}
          <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-blue-200"></div>

          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-center">
                    <div className="text-blue-600 mb-2">{t(item.stepKey)}</div>
                    <h3 className="mb-3 text-gray-900">{t(item.titleKey)}</h3>
                    <p className="text-gray-600">{t(item.descriptionKey)}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}