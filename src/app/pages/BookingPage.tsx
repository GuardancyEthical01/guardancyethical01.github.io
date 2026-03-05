import { useState } from "react";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Check, Clock, Shield, FileCheck, ChevronRight, ChevronLeft, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

interface FormData {
  name: string;
  role: string;
  organization: string;
  email: string;
  phone: string;
  topics: string[];
  context: string;
  preferredSlot: string;
}

export default function BookingPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    role: "",
    organization: "",
    email: "",
    phone: "",
    topics: [],
    context: "",
    preferredSlot: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTopicToggle = (topic: string) => {
    const currentTopics = formData.topics;
    if (currentTopics.includes(topic)) {
      setFormData({
        ...formData,
        topics: currentTopics.filter(t => t !== topic),
      });
    } else if (currentTopics.length < 2) {
      setFormData({
        ...formData,
        topics: [...currentTopics, topic],
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setValidationErrors([]);

    // Validatie
    const errors: string[] = [];
    if (!formData.name.trim()) errors.push("Naam is verplicht.");
    if (!formData.email.trim()) errors.push("E-mail is verplicht.");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.push("Voer een geldig e-mailadres in.");
    if (!formData.organization.trim()) errors.push("Organisatie is verplicht.");
    if (formData.topics.length === 0) errors.push("Selecteer minimaal 1 onderwerp.");
    if (!formData.preferredSlot) errors.push("Kies een tijdslot.");

    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    // Bereid de toelichting voor met onderwerpen
    const topicLabels = formData.topics.map(topicId => {
      const topic = topics.find(t => t.id === topicId);
      return topic?.label || topicId;
    });

    const fullMessage = [
      formData.role ? `Functie: ${formData.role}` : null,
      formData.phone ? `Telefoon: ${formData.phone}` : null,
      `Onderwerpen: ${topicLabels.join(", ")}`,
      formData.context ? `Toelichting: ${formData.context}` : null,
    ].filter(Boolean).join("\n");

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          organisation: formData.organization,
          message: fullMessage,
          date: formData.preferredSlot,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Er ging iets mis bij het versturen.");
      }

      setIsSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Er ging iets mis. Probeer het opnieuw.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceedStep1 = formData.name && formData.organization && formData.email;
  const canProceedStep2 = formData.topics.length > 0;
  const canSubmit = formData.preferredSlot;

  const topics = [
    { id: "assessment", label: "Beoordeling van een specifieke AI-toepassing" },
    { id: "governance", label: "Organisatiebreed AI-beleid / governance" },
    { id: "compliance", label: "DPIA / compliance-vraagstuk" },
    { id: "vendor", label: "Leveranciersbeoordeling" },
    { id: "exploration", label: "Oriëntatie / verkenning" },
  ];

  const timeSlots = [
    { date: "Dinsdag 4 feb", time: "10:00 - 10:30", timezone: "CET" },
    { date: "Woensdag 5 feb", time: "14:00 - 14:30", timezone: "CET" },
    { date: "Donderdag 6 feb", time: "09:30 - 10:00", timezone: "CET" },
    { date: "Donderdag 6 feb", time: "15:00 - 15:30", timezone: "CET" },
    { date: "Vrijdag 7 feb", time: "11:00 - 11:30", timezone: "CET" },
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full text-center">
          <div className="w-20 h-20 bg-[var(--accent-blue-light)] rounded-full flex items-center justify-center mx-auto mb-8 border-2 border-[var(--accent-blue)]">
            <Check className="w-10 h-10 text-[var(--accent-blue)]" strokeWidth={2.5} />
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold text-[var(--foreground)] mb-6">
            Gesprek ingepland
          </h1>
          <p className="text-[var(--muted-foreground)] text-lg md:text-xl leading-relaxed mb-12">
            U ontvangt binnen enkele minuten een bevestiging met agenda-uitnodiging en een korte samenvatting op <strong>{formData.email}</strong>.
          </p>
          <div className="p-8 bg-[var(--surface)] rounded-[var(--radius-md)] border border-[var(--border)] text-left mb-12">
            <p className="text-[var(--muted-foreground)] leading-relaxed">
              Heeft u vragen? Neem contact op via{" "}
              <a href="mailto:info@deteqt.com" className="text-[var(--accent-blue)] hover:underline font-medium">
                info@deteqt.com
              </a>{" "}
              of{" "}
              <a href="tel:+31657337256" className="text-[var(--accent-blue)] hover:underline font-medium">
                +31 6 57337256
              </a>.
            </p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="px-8 py-4 bg-[var(--foreground)] text-white rounded-[var(--radius-sm)] font-medium hover:opacity-90 transition-opacity duration-150"
          >
            Terug naar home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left: Main Form */}
        <div className="flex-1 flex flex-col">
          {/* Header with Progress */}
          <div className="px-6 md:px-12 lg:px-16 pt-8 md:pt-12 pb-8 border-b border-[var(--border-light)] bg-white sticky top-0 z-10">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => navigate('/')}
                  className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors flex items-center gap-2 text-sm font-medium"
                >
                  <X className="w-4 h-4" />
                  <span className="hidden sm:inline">Sluiten</span>
                </button>
                <p className="text-sm text-[var(--muted-foreground)] font-medium">
                  Stap {step} van 3
                </p>
              </div>
              <div className="flex gap-2">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                      s <= step ? 'bg-[var(--accent-blue)]' : 'bg-[var(--border-light)]'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="flex-1 px-6 md:px-12 lg:px-16 py-12 md:py-16 lg:py-20 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              <form onSubmit={handleSubmit}>
                {/* Step 1: Context & Intentie */}
                {step === 1 && (
                  <div className="space-y-12">
                    <div className="space-y-6">
                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[var(--foreground)] leading-tight">
                        Plan een verkennend gesprek over AI-governance
                      </h1>
                      <p className="text-[var(--muted-foreground)] text-xl md:text-2xl leading-relaxed max-w-3xl">
                        Een kort gesprek om te bepalen of en hoe Deteqt kan ondersteunen bij bestuurlijke besluitvorming rond AI.
                      </p>
                    </div>

                    <div className="space-y-8 max-w-2xl">
                      <div className="space-y-3">
                        <Label htmlFor="name" className="text-[var(--foreground)] text-base">
                          Naam <span className="text-[var(--accent-blue)]">*</span>
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          placeholder="Dr. A. van Bergen"
                          className="h-14 text-base"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="role" className="text-[var(--foreground)] text-base">
                          Functie <span className="text-[var(--muted-foreground)] text-sm font-normal">(optioneel, maar aanbevolen)</span>
                        </Label>
                        <Input
                          id="role"
                          name="role"
                          value={formData.role}
                          onChange={handleInputChange}
                          placeholder="Functionaris Gegevensbescherming"
                          className="h-14 text-base"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="organization" className="text-[var(--foreground)] text-base">
                          Organisatie <span className="text-[var(--accent-blue)]">*</span>
                        </Label>
                        <Input
                          id="organization"
                          name="organization"
                          value={formData.organization}
                          onChange={handleInputChange}
                          required
                          placeholder="Zorggroep De Meent"
                          className="h-14 text-base"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <Label htmlFor="email" className="text-[var(--foreground)] text-base">
                            E-mail <span className="text-[var(--accent-blue)]">*</span>
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder="a.vanbergen@organisatie.nl"
                            className="h-14 text-base"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="phone" className="text-[var(--foreground)] text-base">
                            Telefoon <span className="text-[var(--muted-foreground)] text-sm font-normal">(voor eventuele vragen)</span>
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+31 6 1234 5678"
                            className="h-14 text-base"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-8">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        disabled={!canProceedStep1}
                        className="px-10 py-5 bg-[var(--foreground)] text-white rounded-[var(--radius-sm)] font-medium hover:opacity-90 transition-opacity duration-150 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-3 text-lg"
                      >
                        Ga verder
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Hulpvraag */}
                {step === 2 && (
                  <div className="space-y-12">
                    <div className="space-y-6">
                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[var(--foreground)] leading-tight">
                        Waar kunnen we u mee helpen?
                      </h1>
                      <p className="text-[var(--muted-foreground)] text-xl md:text-2xl leading-relaxed max-w-3xl">
                        Selecteer maximaal 2 onderwerpen die u wilt bespreken.
                      </p>
                    </div>

                    <div className="space-y-4 max-w-3xl">
                      {topics.map((topic) => {
                        const isSelected = formData.topics.includes(topic.id);
                        const isDisabled = !isSelected && formData.topics.length >= 2;
                        
                        return (
                          <button
                            key={topic.id}
                            type="button"
                            onClick={() => handleTopicToggle(topic.id)}
                            disabled={isDisabled}
                            className={`w-full p-8 rounded-[var(--radius-md)] border-2 text-left transition-all duration-150 ${
                              isSelected
                                ? 'border-[var(--accent-blue)] bg-[var(--accent-blue-light)]'
                                : 'border-[var(--border)] bg-white hover:border-[var(--accent-blue)]/30'
                            } ${isDisabled ? 'opacity-40 cursor-not-allowed' : ''}`}
                          >
                            <div className="flex items-start gap-5">
                              <div className={`w-7 h-7 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                                isSelected 
                                  ? 'bg-[var(--accent-blue)] border-[var(--accent-blue)]' 
                                  : 'border-[var(--border)]'
                              }`}>
                                {isSelected && <Check className="w-5 h-5 text-white" strokeWidth={3} />}
                              </div>
                              <span className="text-[var(--foreground)] leading-relaxed text-lg">{topic.label}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="space-y-3 max-w-2xl">
                      <Label htmlFor="context" className="text-[var(--foreground)] text-base">
                        Korte toelichting <span className="text-[var(--muted-foreground)] text-sm font-normal">(optioneel, max 300 tekens)</span>
                      </Label>
                      <Textarea
                        id="context"
                        name="context"
                        value={formData.context}
                        onChange={handleInputChange}
                        rows={5}
                        maxLength={300}
                        placeholder="Bijvoorbeeld: We overwegen de inzet van een AI-chatbot voor triagegesprekken en willen de verantwoordelijkheden in kaart brengen."
                        className="resize-none text-base"
                      />
                      <p className="text-sm text-[var(--muted-foreground)]">
                        {formData.context.length}/300 tekens
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-8">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-10 py-5 bg-white border border-[var(--border)] text-[var(--foreground)] rounded-[var(--radius-sm)] font-medium hover:bg-[var(--surface)] transition-colors duration-150 flex items-center justify-center gap-3 text-lg"
                      >
                        <ChevronLeft className="w-5 h-5" />
                        Terug
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        disabled={!canProceedStep2}
                        className="flex-1 px-10 py-5 bg-[var(--foreground)] text-white rounded-[var(--radius-sm)] font-medium hover:opacity-90 transition-opacity duration-150 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg"
                      >
                        Ga verder
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Tijd & Bevestiging */}
                {step === 3 && (
                  <div className="space-y-12">
                    <div className="space-y-6">
                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[var(--foreground)] leading-tight">
                        Kies een moment
                      </h1>
                      <p className="text-[var(--muted-foreground)] text-xl md:text-2xl leading-relaxed max-w-3xl">
                        Selecteer een beschikbaar tijdslot voor het gesprek.
                      </p>
                    </div>

                    <div className="space-y-4 max-w-3xl">
                      {timeSlots.map((slot, index) => {
                        const isSelected = formData.preferredSlot === `${slot.date} ${slot.time}`;
                        
                        return (
                          <button
                            key={index}
                            type="button"
                            onClick={() => setFormData({ ...formData, preferredSlot: `${slot.date} ${slot.time}` })}
                            className={`w-full p-8 rounded-[var(--radius-md)] border-2 text-left transition-all duration-150 ${
                              isSelected
                                ? 'border-[var(--accent-blue)] bg-[var(--accent-blue-light)]'
                                : 'border-[var(--border)] bg-white hover:border-[var(--accent-blue)]/30'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-semibold text-[var(--foreground)] mb-2 text-lg">{slot.date}</p>
                                <p className="text-[var(--muted-foreground)]">{slot.time} <span className="text-sm">({slot.timezone})</span></p>
                              </div>
                              <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                                isSelected 
                                  ? 'bg-[var(--accent-blue)] border-[var(--accent-blue)]' 
                                  : 'border-[var(--border)]'
                              }`}>
                                {isSelected && <Check className="w-5 h-5 text-white" strokeWidth={3} />}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="p-8 bg-[var(--accent-blue-light)] rounded-[var(--radius-md)] border border-[var(--accent-blue)]/20 max-w-3xl">
                      <p className="text-[var(--foreground)] leading-relaxed text-lg">
                        Na bevestiging ontvangt u een korte samenvatting en agenda-uitnodiging.
                      </p>
                    </div>

                    {validationErrors.length > 0 && (
                      <div className="p-6 bg-red-50 border border-red-200 rounded-[var(--radius-md)] max-w-3xl">
                        <p className="font-semibold text-red-800 mb-2">Controleer de volgende velden:</p>
                        <ul className="list-disc list-inside text-red-700 space-y-1">
                          {validationErrors.map((err, i) => (
                            <li key={i}>{err}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {submitError && (
                      <div className="p-6 bg-red-50 border border-red-200 rounded-[var(--radius-md)] max-w-3xl">
                        <p className="text-red-800 font-medium">{submitError}</p>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4 pt-8">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        disabled={isSubmitting}
                        className="px-10 py-5 bg-white border border-[var(--border)] text-[var(--foreground)] rounded-[var(--radius-sm)] font-medium hover:bg-[var(--surface)] transition-colors duration-150 disabled:opacity-40 flex items-center justify-center gap-3 text-lg"
                      >
                        <ChevronLeft className="w-5 h-5" />
                        Terug
                      </button>
                      <button
                        type="submit"
                        disabled={!canSubmit || isSubmitting}
                        className="flex-1 px-10 py-5 bg-[var(--foreground)] text-white rounded-[var(--radius-sm)] font-medium hover:opacity-90 transition-opacity duration-150 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg"
                      >
                        {isSubmitting ? "Versturen..." : "Bevestig gesprek"}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Right: Info Panel (Desktop only) */}
        <div className="hidden lg:block w-[460px] bg-[var(--surface)] border-l border-[var(--border-light)]">
          <div className="sticky top-0 h-screen flex items-center p-16">
            <div className="space-y-12">
              <div>
                <h2 className="font-semibold text-[var(--foreground)] mb-8 text-2xl">
                  Wat kunt u verwachten?
                </h2>
                <div className="space-y-8">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-full bg-white border border-[var(--border)] flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-[var(--accent-blue)]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[var(--foreground)] mb-2 text-lg">30 minuten</p>
                      <p className="text-[var(--muted-foreground)] leading-relaxed">
                        Een gericht gesprek, afgestemd op uw vraagstuk
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-full bg-white border border-[var(--border)] flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-[var(--accent-blue)]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[var(--foreground)] mb-2 text-lg">Geen verplichtingen</p>
                      <p className="text-[var(--muted-foreground)] leading-relaxed">
                        Dit is geen verkoopcall, maar een verkenning
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-full bg-white border border-[var(--border)] flex items-center justify-center flex-shrink-0">
                      <FileCheck className="w-6 h-6 text-[var(--accent-blue)]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[var(--foreground)] mb-2 text-lg">Governance-gericht</p>
                      <p className="text-[var(--muted-foreground)] leading-relaxed">
                        Focus op bestuur, compliance en verantwoordelijkheden
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-[var(--border-light)]">
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                  Uw gegevens worden uitsluitend gebruikt voor dit gesprek. Vendor-onafhankelijk. Geen commerciële verplichtingen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
