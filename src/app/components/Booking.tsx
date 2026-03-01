import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { ArrowLeft, Calendar, Check } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

// Mock available time slots
const timeSlots = [
  { day: "Ma 16 dec", times: ["09:00", "10:30", "14:00", "15:30"] },
  { day: "Di 17 dec", times: ["09:00", "11:00", "13:30", "16:00"] },
  { day: "Wo 18 dec", times: ["10:00", "11:30", "14:00", "15:00"] },
  { day: "Do 19 dec", times: ["09:30", "11:00", "13:00", "16:30"] },
  { day: "Vr 20 dec", times: ["09:00", "10:00", "14:30", "15:30"] }
];

export function Booking() {
  const { t } = useLanguage();
  const [step, setStep] = useState<"form" | "timeslot" | "confirmed">("form");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: ""
  });
  const [selectedSlot, setSelectedSlot] = useState<{ day: string; time: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("timeslot");
  };

  const handleSlotSelect = (day: string, time: string) => {
    setSelectedSlot({ day, time });
  };

  const handleConfirm = () => {
    // Here you would normally send the booking data to a backend
    console.log("Booking confirmed:", { ...formData, ...selectedSlot });
    setStep("confirmed");
  };

  return (
    <section id="booking" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="container mx-auto max-w-4xl">
        {step === "form" && (
          <>
            <div className="text-center mb-12">
              <h2 className="mb-4 text-gray-900">{t("booking.title")}</h2>
              <p className="text-gray-600">{t("booking.subtitle")}</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">{t("booking.form.name")}</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="email">{t("booking.form.email")}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">{t("booking.form.phone")}</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="company">{t("booking.form.company")}</Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="message">{t("booking.form.message")}</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="mt-2"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full gap-2">
                  {t("booking.timeslot.title")}
                  <Calendar size={20} />
                </Button>
              </form>
            </div>
          </>
        )}

        {step === "timeslot" && (
          <>
            <div className="mb-8">
              <Button
                variant="ghost"
                onClick={() => setStep("form")}
                className="gap-2"
              >
                <ArrowLeft size={20} />
                {t("booking.back")}
              </Button>
            </div>

            <div className="text-center mb-12">
              <h2 className="mb-4 text-gray-900">{t("booking.timeslot.title")}</h2>
              <p className="text-gray-600">
                Hallo {formData.name}, kies een tijdstip dat u uitkomt
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="space-y-6">
                {timeSlots.map((slot, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                    <h3 className="mb-4 text-gray-900">{slot.day}</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {slot.times.map((time) => (
                        <button
                          key={time}
                          onClick={() => handleSlotSelect(slot.day, time)}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            selectedSlot?.day === slot.day && selectedSlot?.time === time
                              ? "border-blue-600 bg-blue-50 text-blue-600"
                              : "border-gray-200 hover:border-blue-300"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <Button
                size="lg"
                className="w-full mt-8"
                onClick={handleConfirm}
                disabled={!selectedSlot}
              >
                {t("booking.submit")}
              </Button>
            </div>
          </>
        )}

        {step === "confirmed" && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="mb-4 text-gray-900">Afspraak bevestigd!</h2>
            <p className="text-gray-600 mb-2">
              Bedankt {formData.name}. Uw adviesgesprek is gepland voor:
            </p>
            <p className="text-gray-900 mb-6">
              {selectedSlot?.day} om {selectedSlot?.time}
            </p>
            <p className="text-gray-600 mb-8">
              U ontvangt een bevestigingsmail op {formData.email}
            </p>
            <Button asChild>
              <a href="#">{t("booking.back")}</a>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}