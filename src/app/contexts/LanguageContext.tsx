import { createContext, useContext, useState, ReactNode } from "react";

type Language = "nl" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  nl: {
    // Header
    "nav.about": "Over ons",
    "nav.services": "Aanpak",
    "nav.contact": "Contact",
    "header.cta": "Plan een verkennend gesprek",
    
    // Hero
    "hero.badge": "AI Governance in de zorg",
    "hero.title": "Bestuurlijke grip op AI-risico's",
    "hero.subtitle": "Deteqt levert bestuurlijk onderbouwde AI-risicorapportages die eindigen in concrete besluitpunten voor de Raad van Bestuur. Geen toolverkoop, geen implementatiebureau — wel een aantoonbaar en verdedigbaar governance-document.",
    "hero.context": "Wat het rapport oplevert",
    "hero.contextsubtitle": "Een AI Governance Assessment resulteert in een concreet bestuursdocument met de volgende onderdelen:",
    "hero.bullet1": "Volledig AI-register inclusief shadow-AI en leverancierslandschap",
    "hero.bullet2": "Bestuurlijke risicoclassificatie per systeem met financiële scenario-inschatting",
    "hero.bullet3": "Governance-volwassenheidsscore en compliance-analyse (AVG, EU AI Act, NIS2)",
    "hero.bullet4": "Concrete prioriteiten en besluitpunten voor de Raad met boardpresentatie",
    "hero.cta": "Plan een verkennend gesprek",
    "hero.cta.secondary": "Bekijk aanpak",
    "hero.cta.microcopy": "Vrijblijvend gesprek • 20 minuten • Binnen 2 werkdagen reactie",
    
    // For Who
    "forwho.badge": "Voor wie",
    "forwho.title": "Voor bestuur en management in de zorg",
    "forwho.subtitle": "Of u nu één AI-toepassing wilt beoordelen of organisatiebreed beleid wilt ontwikkelen — bestuurlijke grip op AI vereist onafhankelijke analyse en heldere verantwoordelijkheidsverdeling.",
    "forwho.card1.title": "Bestuur en compliance",
    "forwho.card1.subtitle": "RvB, RvT, FG/DPO, compliance",
    "forwho.card1.point1": "Inzicht in privacy-, aansprakelijkheids- en nalevingsrisico's van AI-systemen",
    "forwho.card1.point2": "Governance-structuur en audit-geschikte documentatie voor toezicht",
    "forwho.card1.point3": "Onafhankelijke beoordeling van AI-toepassingen en leveranciers",
    "forwho.card2.title": "Management en afdelingshoofden",
    "forwho.card2.subtitle": "Directie, afdelingsleiding, operationeel management",
    "forwho.card2.point1": "Duidelijkheid over verantwoordelijkheden bij AI-gebruik binnen de organisatie",
    "forwho.card2.point2": "Praktische kaders voor afstemming tussen zorg, IT en compliance",
    "forwho.card2.point3": "Inzicht in organisatorische consequenties van AI-risico's",
    
    // Common Risks
    "risks.badge": "Voorbeeldrisico's",
    "risks.title": "Veelvoorkomende AI-risico's in de zorg",
    "risks.subtitle": "Deze risico's komen we regelmatig tegen bij AI-toepassingen in de zorg. Ze illustreren waarom bestuurlijke borging noodzakelijk is.",
    "risks.risk1.title": "Gespreksopnames in externe tools",
    "risks.risk1.description": "Audio met patiëntgegevens die buiten de eigen systemen wordt verwerkt",
    "risks.risk2.title": "Onheldere juridische grondslag",
    "risks.risk2.description": "Onduidelijkheid over toestemming en verwerkingsgrondslag",
    "risks.risk3.title": "Dataopslag buiten de EU",
    "risks.risk3.description": "Onduidelijkheid over subverwerkers en datalocaties",
    "risks.risk4.title": "Fouten in AI-gegenereerde teksten",
    "risks.risk4.description": "Onjuistheden of hallucinaties in samenvattingen en notities",
    "risks.risk5.title": "Ontbrekende audit trail",
    "risks.risk5.description": "Geen logging of controleerbaarheid van verwerking",
    "risks.risk6.title": "Onduidelijke verantwoordelijkheid",
    "risks.risk6.description": "Geen heldere toewijzing van rollen bij incidenten",
    
    // Our Approach
    "approach.badge": "Werkwijze",
    "approach.title": "Hoe we organisaties begeleiden",
    "approach.subtitle": "Onze aanpak bestaat uit vier stappen, met concrete deliverables en heldere afstemming.",
    "approach.step1.title": "Intake en afbakening",
    "approach.step1.point1": "Welke AI-toepassing wordt overwogen of ingezet (transcriptie, samenvatting, verslaglegging)",
    "approach.step1.point2": "Welke data wordt verwerkt (audio, tekst, bijzondere persoonsgegevens)",
    "approach.step1.point3": "In welke context (GGZ, polikliniek, multidisciplinair overleg)",
    "approach.step2.title": "Risico- en compliance-analyse",
    "approach.step2.point1": "AVG-toets en uitvoering DPIA",
    "approach.step2.point2": "AI Act-impact (hoog-risico-classificatie en verplichtingen)",
    "approach.step2.point3": "Beveiligingsanalyse en dataflows (waar gaan audio en tekst naartoe)",
    "approach.step3.title": "Leveranciers- en ketenonderzoek",
    "approach.step3.point1": "Onderzoek naar cloud-infrastructuur en third parties",
    "approach.step3.point2": "Beoordeling contractuele afspraken, logging, bewaartermijnen",
    "approach.step3.point3": "Opstellen eisenlijst en maatregelen",
    "approach.step4.title": "Advies en governance",
    "approach.step4.point1": "Beleid, rollen en besluitvormingsstructuur",
    "approach.step4.point2": "Implementatieplan met controlepunten",
    "approach.step4.point3": "Documentatie voor audit en toezicht",
    
    // What You Get
    "whatyouget.badge": "Wat het rapport oplevert",
    "whatyouget.title": "Concrete bestuursbesluiten en inzicht",
    "whatyouget.subtitle": "Het AI Governance Assessment resulteert in een bestuurlijk onderbouwd document dat u kunt gebruiken voor besluitvorming en verantwoording richting toezicht.",
    "whatyouget.item1": "Volledig AI-register inclusief shadow-AI en leverancierslandschap",
    "whatyouget.item2": "Bestuurlijke risicoclassificatie per systeem met financiële scenario-inschatting",
    "whatyouget.item3": "Governance-volwassenheidsscore en compliance-analyse (AVG, EU AI Act, NIS2)",
    "whatyouget.item4": "Concrete prioriteiten en besluitpunten voor de Raad van Bestuur",
    "whatyouget.item5": "Boardpresentatie met expliciete besluitvorming",
    
    // Trust Signals
    "trust.independent": "Onafhankelijk",
    "trust.compliance": "Juridisch gefundeerd",
    "trust.healthcare": "Zorgspecifiek",
    
    // CTA
    "cta.title": "Heeft u vragen over AI in uw organisatie?",
    "cta.subtitle": "We denken graag met u mee over de juridische en governance-vraagstukken rond AI in medische verslaglegging.",
    "cta.button": "Neem contact op",
    "cta.info": "Vrijblijvend gesprek • 20 minuten",
    
    // Footer
    "footer.description": "Compliance-first AI-begeleiding voor medische professionals en zorginstellingen.",
    "footer.menu": "Menu",
    "footer.services": "Diensten",
    "footer.contact": "Contact",
    "footer.location": "Locatie",
    "footer.about": "Over ons",
    "footer.approach": "Onze aanpak",
    "footer.copyright": "© 2025 Deteqt. Alle rechten voorbehouden.",
    
    // Booking
    "booking.title": "Plan uw verkennend gesprek",
    "booking.subtitle": "Vul uw gegevens in en kies een tijdstip dat u uitkomt.",
    "booking.name": "Naam",
    "booking.namePlaceholder": "Uw volledige naam",
    "booking.email": "E-mailadres",
    "booking.emailPlaceholder": "naam@voorbeeld.nl",
    "booking.phone": "Telefoonnummer",
    "booking.phonePlaceholder": "+31 6 12345678",
    "booking.organization": "Organisatie/Praktijk",
    "booking.organizationPlaceholder": "Uw organisatie of praktijk",
    "booking.message": "Waar kunnen wij u mee helpen?",
    "booking.messagePlaceholder": "Bijv: We overwegen AI-transcriptie in onze GGZ-praktijk...",
    "booking.continue": "Verder naar tijdstip",
    "booking.preferredDate": "Gewenste datum",
    "booking.preferredTime": "Gewenste tijd",
    "booking.back": "Terug",
    "booking.submit": "Bevestig afspraak",
    "booking.success.title": "Afspraak aangevraagd!",
    "booking.success.message": "Bedankt voor uw aanvraag. U ontvangt binnen 2 werkdagen een bevestigingsmail.",
    "booking.success.info": "We nemen snel contact met u op om de afspraak te bevestigen.",
    "booking.form.name": "Naam",
    "booking.form.email": "E-mailadres",
    "booking.form.phone": "Telefoonnummer",
    "booking.form.company": "Organisatie/Praktijk",
    "booking.form.message": "Waar kunnen wij u mee helpen?",
    "booking.timeslot.title": "Kies een tijdstip",
    
    // Pricing
    "pricing.badge": "Onze dienstverlening",
    "pricing.title": "Hoe wij zorginstellingen ondersteunen",
    "pricing.subtitle": "Deteqt biedt consultancy voor veilig gebruik van AI en persoonsgegevens in de medische sector. We werken in duidelijke stappen, afgestemd op uw organisatie.",
    "pricing.examples": "",
    "pricing.mostchosen": "Meest gekozen",
    "pricing.period": "",
    "pricing.popular": "",
    "pricing.cta.primary": "Start met een risico-analyse",
    "pricing.cta.plus": "Beschikbaar na Safe Start",
    "pricing.cta.secondary": "Contacteer ons",
    "pricing.footer": "Alle opdrachten zijn afgestemd op de grootte en context van uw organisatie.",
    
    // New Pricing Structure - Main Offering
    "pricing.main.badge": "INVESTERING",
    "pricing.main.title": "AI Governance Assessment",
    "pricing.main.subtitle": "Zes weken durend traject voor bestuurlijke grip op AI-gebruik binnen zorgorganisaties.",
    "pricing.main.price": "Vaste trajectprijs: €4.000 – €6.000",
    "pricing.main.priceNote": "(excl. btw)",
    "pricing.main.clarification.title": "De exacte prijs wordt vooraf vastgesteld op basis van:",
    "pricing.main.clarification.1": "Aantal AI-toepassingen",
    "pricing.main.clarification.2": "Complexiteit van het leverancierslandschap",
    "pricing.main.clarification.3": "Aantal locaties",
    "pricing.main.included.title": "Wat is inbegrepen",
    "pricing.main.included.1": "AI-landschapsinventarisatie",
    "pricing.main.included.2": "Governance- en compliance-analyse (AVG / EU AI Act / NIS2)",
    "pricing.main.included.3": "Indicatieve risicoscore",
    "pricing.main.included.4": "Scenario-gebaseerde financiële inschatting",
    "pricing.main.included.5": "Concrete bestuursbesluiten",
    "pricing.main.included.6": "Boardpresentatie",
    "pricing.main.cta": "Plan een verkennend gesprek",
    
    // Optional Entry Variant
    "pricing.scan.title": "AI Governance Scan",
    "pricing.scan.subtitle": "Compacte analyse van één AI-toepassing.",
    "pricing.scan.price": "€2.500 – €3.000",
    "pricing.scan.priceNote": "(excl. btw)",
    "pricing.scan.clarification": "Geschikt voor organisaties die willen starten met een eerste beoordeling.",
    "pricing.scan.cta": "Vraag informatie aan"
  },
  en: {
    // Header
    "nav.about": "About Us",
    "nav.services": "Approach",
    "nav.contact": "Contact",
    "header.cta": "Schedule Exploratory Call",
    
    // Hero
    "hero.badge": "AI Governance in Healthcare",
    "hero.title": "Governance of AI in Healthcare Organizations",
    "hero.subtitle": "Deteqt supports executives, compliance officers, and management in responsibly deploying AI systems in healthcare. We provide independent risk analysis, legal assurance, and governance advice for AI applications involving personal data.",
    "hero.context": "Illustrative Case: AI Transcription and Medical Documentation",
    "hero.contextsubtitle": "The following issues illustrate how Deteqt achieves governance of AI use within concrete healthcare processes:",
    "hero.bullet1": "Risk analysis of AI applications with personal data (e.g., conversation recordings, transcriptions)",
    "hero.bullet2": "GDPR and AI Act compliance assurance (DPIA, governance, vendor assessment)",
    "hero.bullet3": "Formalization of responsibilities and decision-making structure",
    "hero.bullet4": "Audit-ready documentation and implementation guidelines",
    "hero.cta": "Schedule Exploratory Call",
    "hero.cta.secondary": "View our approach",
    "hero.cta.microcopy": "No obligation • 20 minutes • Response within 2 working days",
    
    // For Who
    "forwho.badge": "For Whom",
    "forwho.title": "For executives and compliance officers in healthcare",
    "forwho.subtitle": "Whether you're evaluating a single AI application or developing organization-wide AI policy — governance of AI requires independent analysis and legal assurance.",
    "forwho.card1.title": "Healthcare organizations",
    "forwho.card1.subtitle": "Management, IT, FG/DPO, compliance",
    "forwho.card1.point1": "Insight into privacy, liability, and compliance risks of AI systems",
    "forwho.card1.point2": "Governance structure and audit-ready documentation for supervision",
    "forwho.card1.point3": "Independent assessment of AI applications and vendors",
    "forwho.card2.title": "Medical professionals",
    "forwho.card2.subtitle": "Providers, department heads, medical staff",
    "forwho.card2.point1": "Clarity on what is allowed/not allowed with AI in patient care",
    "forwho.card2.point2": "Practical guidelines for responsible implementation",
    "forwho.card2.point3": "Clarity on responsibilities and quality assurance",
    
    // Common Risks
    "risks.badge": "Example Risks",
    "risks.title": "Common AI risks in healthcare",
    "risks.subtitle": "These risks are regularly encountered with AI applications in healthcare. They illustrate why governance of AI is necessary.",
    "risks.risk1.title": "Conversation recordings in external tools",
    "risks.risk1.description": "Audio with patient data processed outside your systems",
    "risks.risk2.title": "Unclear legal basis",
    "risks.risk2.description": "Ambiguity about consent and processing basis",
    "risks.risk3.title": "Data storage outside EU",
    "risks.risk3.description": "Uncertainty about subprocessors and data locations",
    "risks.risk4.title": "Errors in AI-generated texts",
    "risks.risk4.description": "Inaccuracies or hallucinations in summaries and notes",
    "risks.risk5.title": "Missing audit trail",
    "risks.risk5.description": "No logging or traceability of processing",
    "risks.risk6.title": "Unclear responsibility",
    "risks.risk6.description": "No clear assignment of roles in incidents",
    
    // Our Approach
    "approach.badge": "Our Approach",
    "approach.title": "How we guide organizations",
    "approach.subtitle": "Our approach consists of four steps, with concrete deliverables and clear alignment.",
    "approach.step1.title": "Intake and scope",
    "approach.step1.point1": "Which AI application is being considered or used (transcription, summary, documentation)",
    "approach.step1.point2": "Which data is being processed (audio, text, special personal data)",
    "approach.step1.point3": "In which context (mental health, outpatient, multidisciplinary team)",
    "approach.step2.title": "Risk & compliance analysis",
    "approach.step2.point1": "GDPR test and DPIA execution",
    "approach.step2.point2": "AI Act impact (high-risk classification and obligations)",
    "approach.step2.point3": "Security analysis and dataflows (where does audio and text go)",
    "approach.step3.title": "Vendor & chain research",
    "approach.step3.point1": "Research into cloud infrastructure and third parties",
    "approach.step3.point2": "Evaluation of contractual agreements, logging, retention periods",
    "approach.step3.point3": "Establishing requirements and measures",
    "approach.step4.title": "Advice & governance",
    "approach.step4.point1": "Policy, roles, decision-making structure",
    "approach.step4.point2": "Implementation plan with checkpoints",
    "approach.step4.point3": "Documentation for audit and supervision",
    
    // What You Get
    "whatyouget.badge": "Deliverables",
    "whatyouget.title": "Concrete results",
    "whatyouget.subtitle": "At the end, you receive a set of documents and advice that you can use for decision-making, implementation, and accountability.",
    "whatyouget.item1": "Risk & compliance report (executive summary + technical appendix)",
    "whatyouget.item2": "DPIA substantiation and checklist",
    "whatyouget.item3": "Requirements list for vendors (security, privacy, governance)",
    "whatyouget.item4": "Implementation advice with practical checkpoints",
    "whatyouget.item5": "Documentation set for audit and supervision",
    
    // Trust Signals
    "trust.independent": "Independent",
    "trust.compliance": "Legally founded",
    "trust.healthcare": "Healthcare-focused",
    
    // CTA
    "cta.title": "Questions about AI in your organization?",
    "cta.subtitle": "We are happy to think with you about the legal and governance issues surrounding AI in medical documentation.",
    "cta.button": "Schedule Exploratory Call",
    "cta.info": "No obligation • 20 minutes",
    
    // Footer
    "footer.description": "Compliance-first AI guidance for medical professionals and healthcare institutions.",
    "footer.menu": "Menu",
    "footer.services": "Services",
    "footer.contact": "Contact",
    "footer.location": "Location",
    "footer.about": "About us",
    "footer.approach": "Our approach",
    "footer.copyright": "© 2025 Deteqt. All rights reserved.",
    
    // Booking
    "booking.title": "Schedule Your Exploratory Call",
    "booking.subtitle": "Fill in your details and choose a time that suits you.",
    "booking.name": "Name",
    "booking.namePlaceholder": "Your full name",
    "booking.email": "Email",
    "booking.emailPlaceholder": "name@example.com",
    "booking.phone": "Phone",
    "booking.phonePlaceholder": "+31 6 12345678",
    "booking.organization": "Organization/Practice",
    "booking.organizationPlaceholder": "Your organization or practice",
    "booking.message": "How can we help you?",
    "booking.messagePlaceholder": "E.g.: We're considering AI transcription in our mental health practice...",
    "booking.continue": "Continue to time slot",
    "booking.preferredDate": "Preferred Date",
    "booking.preferredTime": "Preferred Time",
    "booking.back": "Back",
    "booking.submit": "Confirm Appointment",
    "booking.success.title": "Appointment requested!",
    "booking.success.message": "Thank you for your request. You will receive a confirmation email within 2 working days.",
    "booking.success.info": "We will contact you soon to confirm the appointment.",
    "booking.form.name": "Name",
    "booking.form.email": "Email Address",
    "booking.form.phone": "Phone Number",
    "booking.form.company": "Organization/Practice",
    "booking.form.message": "How can we help you?",
    "booking.timeslot.title": "Choose a time slot",
    
    // Pricing
    "pricing.badge": "Our Services",
    "pricing.title": "How we support healthcare organizations",
    "pricing.subtitle": "Deteqt provides consultancy for safe use of AI and personal data in the medical sector. We work in clear steps, tailored to your organization.",
    "pricing.examples": "",
    "pricing.mostchosen": "Best start",
    "pricing.period": "",
    "pricing.popular": "",
    "pricing.cta.primary": "Start with a risk analysis",
    "pricing.cta.plus": "Available after Safe Start",
    "pricing.cta.secondary": "Contact us",
    "pricing.footer": "All engagements are custom-made and tailored to the size and context of your organization.",
    
    // New Pricing Structure - Main Offering
    "pricing.main.badge": "INVESTMENT",
    "pricing.main.title": "AI Governance Assessment",
    "pricing.main.subtitle": "Six-week engagement for executive control of AI use within healthcare organizations.",
    "pricing.main.price": "Fixed project price: €4,000 – €6,000",
    "pricing.main.priceNote": "(excl. VAT)",
    "pricing.main.clarification.title": "The exact price is established in advance based on:",
    "pricing.main.clarification.1": "Number of AI applications",
    "pricing.main.clarification.2": "Complexity of the vendor landscape",
    "pricing.main.clarification.3": "Number of locations",
    "pricing.main.included.title": "What is included",
    "pricing.main.included.1": "AI landscape inventory",
    "pricing.main.included.2": "Governance and compliance analysis (GDPR / EU AI Act / NIS2)",
    "pricing.main.included.3": "Indicative risk score",
    "pricing.main.included.4": "Scenario-based financial assessment",
    "pricing.main.included.5": "Concrete board decisions",
    "pricing.main.included.6": "Board presentation",
    "pricing.main.cta": "Schedule exploratory call",
    
    // Optional Entry Variant
    "pricing.scan.title": "AI Governance Scan",
    "pricing.scan.subtitle": "Compact analysis of one AI application.",
    "pricing.scan.price": "€2,500 – €3,000",
    "pricing.scan.priceNote": "(excl. VAT)",
    "pricing.scan.clarification": "Suitable for organizations that want to start with an initial assessment.",
    "pricing.scan.cta": "Request information"
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("nl");

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.nl] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}