import { Check, ArrowRight, Shield, FileSearch } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import { BookingDialog } from "./BookingDialog";
import { useState } from "react";

const pricingTiers = [
  {
    name: "Safe Start",
    description: "Bestuurlijke intake en eerste risicoverkenning ter voorbereiding op besluitvorming over AI.",
    price: "Vanaf €3.000",
    period: "",
    priceNote: "* Voor één afgebakende AI-toepassing binnen één organisatorische context.",
    ctaText: "Plan een verkennend gesprek",
    icon: Shield,
    color: "from-blue-600 to-blue-800",
    bgGradient: "from-blue-50/50 to-white",
    borderColor: "border-blue-200",
    features: [
      "Afbakening van één AI-toepassing",
      "Bestuurlijke risico- en compliance-inschatting",
      "Indicatieve duiding van AVG en AI-verordening",
      "Helder advies: voorwaarden, vervolgstappen of stop",
    ],
    popular: false,
  },
  {
    name: "Safe Plus",
    description: "Doorlopende bestuurlijke borging na afronding van Safe Start.",
    price: "€1.500",
    period: "/ maand",
    microcopy: "Beschikbaar na afronding van Safe Start",
    ctaText: "Vervolg na Safe Start",
    icon: FileSearch,
    color: "from-purple-600 to-purple-800",
    bgGradient: "from-purple-50/50 to-white",
    borderColor: "border-purple-300",
    features: [
      "Periodieke herbeoordeling van AI-toepassingen",
      "Monitoring van wijzigingen en risico-impact",
      "Onderhoud van governance- en verantwoordingsdocumentatie",
      "Sparringpartner voor bestuur, FG/DPO en compliance",
    ],
    popular: true,
  },
  {
    name: "Safe Enterprise",
    description: "Voor organisaties met meerdere AI-toepassingen of organisatiebrede AI-inzet.",
    price: "Op aanvraag",
    period: "",
    ctaText: "Plan strategisch overleg",
    icon: Shield,
    color: "from-emerald-600 to-emerald-800",
    bgGradient: "from-emerald-50/50 to-white",
    borderColor: "border-emerald-200",
    features: [
      "Ontwerp van organisatiebrede AI-governance",
      "Bestuurlijke besluitvormings- en escalatiestructuur",
      "Ondersteuning bij audits en toezicht",
      "Vast aanspreekpunt voor bestuur en compliance",
    ],
    popular: false,
  },
];

export function Pricing() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-20"></div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full mb-4">
            Abonnementen
          </div>
          <h2 className="mb-4 text-gray-900">
            Kies het pakket dat bij u past
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Van initiële risicoanalyse tot doorlopende compliance-ondersteuning. 
            Vaste prijzen, geen verrassingen.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingTiers.map((tier, index) => {
            const Icon = tier.icon;
            const isHovered = hoveredIndex === index;
            const isFocused = hoveredIndex !== null;
            const isInactive = isFocused && !isHovered;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`${tier.popular ? 'md:scale-105' : ''}`}
              >
                <div
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`
                    relative bg-gradient-to-br ${tier.bgGradient} 
                    rounded-3xl border-2 ${tier.borderColor} overflow-hidden
                    transition-all duration-200 ease-out
                  `}
                  style={{
                    // Base shadow
                    boxShadow: tier.popular 
                      ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                      : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    
                    // Cursor-driven focus: Active card komt naar voren
                    transform: isHovered 
                      ? 'translateY(-5px) scale(1.02)' 
                      : 'translateY(0) scale(1)',
                    
                    // Enhanced shadow on hover
                    ...(isHovered && {
                      boxShadow: tier.popular
                        ? '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 12px 24px -8px rgba(0, 0, 0, 0.08)'
                        : '0 20px 25px -5px rgba(0, 0, 0, 0.12), 0 10px 10px -5px rgba(0, 0, 0, 0.06)',
                    }),
                    
                    // Reduced shadow for inactive cards (when another is hovered)
                    ...(isInactive && {
                      boxShadow: tier.popular
                        ? '0 10px 15px -3px rgba(0, 0, 0, 0.06), 0 4px 6px -2px rgba(0, 0, 0, 0.03)'
                        : '0 4px 6px -1px rgba(0, 0, 0, 0.06), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                    }),
                  }}
                >
                  {tier.popular && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-purple-800 text-white px-4 py-1 text-sm font-semibold rounded-bl-2xl">
                      Populair
                    </div>
                  )}

                  <div className="p-8">
                    {/* Icon */}
                    <div 
                      className={`w-14 h-14 bg-gradient-to-br ${tier.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg transition-opacity duration-200 ease-out`}
                      style={{
                        opacity: isInactive ? 0.85 : 1,
                      }}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Tier name and description - ALTIJD 100% leesbaar */}
                    <h3 className="mb-2 text-gray-900 text-xl">{tier.name}</h3>
                    <p className="text-gray-600 mb-5 text-xs leading-relaxed min-h-[2.5rem]">
                      {tier.description}
                    </p>

                    {/* Price - ALTIJD 100% leesbaar */}
                    <div className="mb-5">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-gray-900">
                          {tier.price}
                        </span>
                        {tier.period && tier.period !== "" && (
                          <span className="text-gray-600 text-sm">{tier.period}</span>
                        )}
                      </div>
                      {"priceNote" in tier && tier.priceNote && (
                        <p className="text-gray-500 text-xs mt-1">
                          {tier.priceNote}
                        </p>
                      )}
                      {"microcopy" in tier && tier.microcopy && (
                        <p className="text-gray-500 text-xs mt-1">
                          {tier.microcopy}
                        </p>
                      )}
                    </div>

                    {/* CTA Button */}
                    <BookingDialog>
                      <Button
                        className={`w-full mb-6 gap-2 text-sm ${
                          tier.popular
                            ? 'bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900'
                            : 'bg-gray-900 hover:bg-gray-800'
                        }`}
                        size="default"
                      >
                        {tier.ctaText}
                        <ArrowRight size={16} />
                      </Button>
                    </BookingDialog>

                    {/* Divider */}
                    <div 
                      className="border-t border-gray-200 mb-5 transition-opacity duration-200 ease-out"
                      style={{
                        opacity: isInactive ? 0.6 : 1,
                      }}
                    ></div>

                    {/* Features - ALTIJD 100% leesbaar */}
                    <ul className="space-y-3">
                      {tier.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-2.5">
                          <div 
                            className={`w-4 h-4 rounded-full bg-gradient-to-br ${tier.color} flex items-center justify-center flex-shrink-0 mt-0.5 transition-opacity duration-200 ease-out`}
                            style={{
                              opacity: isInactive ? 0.7 : 1,
                            }}
                          >
                            <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                          </div>
                          <span className="text-gray-700 text-xs leading-relaxed">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-gray-500 text-xs max-w-3xl mx-auto leading-relaxed">
            Alle prijzen zijn exclusief BTW. Abonnementen kunnen maandelijks opgezegd worden. 
            Neem contact op voor een vrijblijvend adviesgesprek over welk pakket het beste bij uw organisatie past.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
