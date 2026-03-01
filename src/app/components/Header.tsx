import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { BookingDialog } from "./BookingDialog";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoImage from "@/assets/bb89508b60817191402e5aabf04254b672ab3625.png";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Update scrolled state (voor achtergrond effect)
          setScrolled(currentScrollY > 20);
          
          // Enterprise scroll behaviour: Hide on down, show on up
          if (currentScrollY < 50) {
            // Altijd zichtbaar bovenaan pagina
            setVisible(true);
          } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
            // Scrolling down & past 100px → Hide
            setVisible(false);
          } else if (currentScrollY < lastScrollY.current) {
            // Scrolling up → Show immediately
            setVisible(true);
          }
          
          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        
        ticking.current = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (sectionId: string) => {
    if (!isHomePage) {
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

  const headerClassName = scrolled 
    ? 'fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/98 backdrop-blur-sm border-b' 
    : 'fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-sm border-b';

  return (
    <header 
      className={headerClassName}
      style={{
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        borderBottomColor: scrolled ? 'rgba(0, 0, 0, 0.08)' : 'rgba(0, 0, 0, 0.04)',
      }}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px]">
        {/* Mobile: Compact h-14 - Desktop: h-16 */}
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="flex items-center transition-opacity duration-150"
              style={{ 
                opacity: 1,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.85';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
            >
              <img 
                src={logoImage} 
                alt="Deteqt" 
                style={{ 
                  height: '32px',
                  width: 'auto',
                  display: 'block',
                  objectFit: 'contain',
                  opacity: 0.75,
                }}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-7">
            <a 
              href="#about" 
              className="font-medium transition-colors duration-150"
              style={{ 
                color: '#64748B',
                fontSize: '14px',
              }}
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('about');
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#0F172A';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#64748B';
              }}
            >
              {t("nav.about")}
            </a>
            
            <a 
              href="#approach" 
              className="font-medium transition-colors duration-150"
              style={{ 
                color: '#64748B',
                fontSize: '14px',
              }}
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('approach');
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#0F172A';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#64748B';
              }}
            >
              {t("nav.services")}
            </a>

            <a 
              href="#contact" 
              className="font-medium transition-colors duration-150"
              style={{ 
                color: '#64748B',
                fontSize: '14px',
              }}
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('contact');
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#0F172A';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#64748B';
              }}
            >
              {t("nav.contact")}
            </a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <BookingDialog>
              <button 
                className="px-6 py-2 text-white font-medium transition-colors duration-150"
                style={{ 
                  backgroundColor: '#0F172A',
                  borderRadius: '6px',
                  fontSize: '14px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#1E293B';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#0F172A';
                }}
              >
                {t("header.cta")}
              </button>
            </BookingDialog>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 transition-colors"
            style={{ color: '#0F172A' }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#334155';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#0F172A';
            }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div 
            className="md:hidden py-3 space-y-3"
            style={{ 
              borderTop: '1px solid rgba(0, 0, 0, 0.06)'
            }}
          >
            <a
              href="#about"
              className="block font-medium py-1 transition-colors"
              style={{ 
                color: '#64748B',
                fontSize: '14px',
              }}
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('about');
                setMobileMenuOpen(false);
              }}
            >
              {t("nav.about")}
            </a>
            
            <a
              href="#approach"
              className="block font-medium py-1 transition-colors"
              style={{ 
                color: '#64748B',
                fontSize: '14px',
              }}
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('approach');
                setMobileMenuOpen(false);
              }}
            >
              {t("nav.services")}
            </a>

            <a
              href="#contact"
              className="block font-medium py-1 transition-colors"
              style={{ 
                color: '#64748B',
                fontSize: '14px',
              }}
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('contact');
                setMobileMenuOpen(false);
              }}
            >
              {t("nav.contact")}
            </a>
            <div className="pt-2">
              <BookingDialog>
                <button 
                  className="w-full px-5 py-2.5 text-white font-medium"
                  style={{ 
                    backgroundColor: '#0F172A',
                    borderRadius: '6px',
                    fontSize: '14px',
                  }}
                >
                  {t("header.cta")}
                </button>
              </BookingDialog>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
