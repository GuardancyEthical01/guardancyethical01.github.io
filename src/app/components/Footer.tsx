import { Linkedin } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useNavigate, useLocation } from "react-router-dom";

export function Footer() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="bg-[var(--foreground)] text-white/70 py-16 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-[1200px]">
        {/* Mobile: 2 cols, compacter - Desktop: 3 cols */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 mb-12 md:mb-24">
          {/* Menu Column */}
          <div>
            <h4 className="text-white mb-4 md:mb-8 font-semibold text-sm md:text-[var(--text-base)]">Menu</h4>
            <ul className="space-y-2 md:space-y-4">
              <li>
                <button onClick={() => handleNavigation('approach')} className="hover:text-white transition-colors duration-150 cursor-pointer text-xs md:text-[var(--text-small)]">
                  Onze aanpak
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('traject')} className="hover:text-white transition-colors duration-150 cursor-pointer text-xs md:text-[var(--text-small)]">
                  Het traject
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('about')} className="hover:text-white transition-colors duration-150 cursor-pointer text-xs md:text-[var(--text-small)]">
                  Over ons
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('contact')} className="hover:text-white transition-colors duration-150 cursor-pointer text-xs md:text-[var(--text-small)]">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-white mb-4 md:mb-8 font-semibold text-sm md:text-[var(--text-base)]">Contact</h4>
            <div className="space-y-2 md:space-y-4">
              <a href="tel:+31657337256" className="text-white hover:text-[var(--accent-blue)] transition-colors duration-150 block text-xs md:text-[var(--text-small)]">
                +31 6 57337256
              </a>
              <a href="mailto:info@deteqt.com" className="text-white hover:text-[var(--accent-blue)] transition-colors duration-150 block text-xs md:text-[var(--text-small)]">
                info@deteqt.com
              </a>
            </div>
            <div className="mt-4 md:mt-8">
              <a 
                href="https://linkedin.com/company/deteqtconsulting" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 md:w-10 md:h-10 rounded-[var(--radius-sm)] bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-150"
              >
                <Linkedin size={16} className="text-white md:w-[18px] md:h-[18px]" />
              </a>
            </div>
          </div>

          {/* Map Column - Mobile: Full width col-span-2 */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-white mb-4 md:mb-8 font-semibold text-sm md:text-[var(--text-base)]">Locatie</h4>
            <div className="w-full h-40 md:h-48 rounded-[var(--radius-md)] overflow-hidden bg-white/10 shadow-[var(--shadow-medium)]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2389.3726747841844!2d6.565897476926937!3d53.218364872233845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c9cd4f6f3e8b67%3A0x7e3f1c3d3e3e3e3e!2sWesterkade%2012A%2C%209718%20AR%20Groningen!5e0!3m2!1sen!2snl!4v1234567890123!5m2!1sen!2snl"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Deteqt Office Location"
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar - Mobile: Stack, kleiner - Desktop: Row */}
        <div className="pt-8 md:pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-wrap items-center gap-3 md:gap-4 text-[10px] md:text-[var(--text-small)]">
            <p className="text-white/50">© Deteqt 2025</p>
          </div>
          <div className="flex items-center gap-4 md:gap-6 text-[10px] md:text-[var(--text-small)]">
            <a href="#" className="text-white/50 hover:text-white transition-colors duration-150">
              Algemene voorwaarden
            </a>
            <a href="#" className="text-white/50 hover:text-white transition-colors duration-150">
              Privacy verklaring
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}