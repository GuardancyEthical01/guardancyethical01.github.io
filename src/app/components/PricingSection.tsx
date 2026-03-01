import { BookingDialog } from "./BookingDialog";
import { FileText } from "lucide-react";

export function PricingSection() {
  return (
    <section 
      id="traject" 
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: '#F8FAFC' }}
    >
      <div className="container mx-auto max-w-[1200px]">
        {/* Section Header */}
        <div className="text-center mb-16">
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
            Het traject
          </div>
          <h2 
            style={{
              fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
              fontWeight: 600,
              lineHeight: 1.2,
              color: '#0F172A',
              letterSpacing: '-0.02em',
              marginBottom: '12px',
            }}
          >
            AI Governance Assessment
          </h2>
          <p 
            style={{ 
              color: '#64748B', 
              fontSize: '15px',
              lineHeight: 1.6,
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            Bestuurlijk onderbouwd AI-risicorapport in zes weken
          </p>
        </div>

        {/* Single Trajectory Card */}
        <div className="max-w-[420px] mx-auto">
          <div
            className="bg-white flex flex-col"
            style={{
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.04)',
              overflow: 'hidden',
            }}
          >
            {/* Card Header */}
            <div className="px-6 pt-8 pb-6">
              <div 
                style={{
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  color: '#64748B',
                  marginBottom: '8px',
                }}
              >
                BESTUURLIJK AI-RISICORAPPORT
              </div>
              <h3 
                style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  color: '#0F172A',
                  letterSpacing: '-0.01em',
                  marginBottom: '8px',
                }}
              >
                AI Governance Assessment
              </h3>
              <p 
                style={{
                  color: '#64748B',
                  fontSize: '13px',
                  lineHeight: 1.5,
                }}
              >
                Een onderbouwd bestuursdocument dat eindigt in concrete besluitpunten voor de Raad van Bestuur.
              </p>
            </div>

            {/* Icon Section */}
            <div 
              className="px-6 py-4 flex items-center gap-2"
              style={{
                backgroundColor: '#F8FAFC',
                borderTop: '1px solid #F1F5F9',
                borderBottom: '1px solid #F1F5F9',
              }}
            >
              <FileText 
                size={16} 
                style={{ color: '#3B82F6' }} 
              />
              <div>
                <div 
                  style={{
                    fontSize: '9px',
                    fontWeight: 600,
                    color: '#64748B',
                    letterSpacing: '0.05em',
                  }}
                >
                  DOORLOOPTIJD
                </div>
                <div 
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#0F172A',
                  }}
                >
                  6 weken
                </div>
              </div>
            </div>

            {/* What You Receive */}
            <div className="px-6 py-6 flex-1">
              <div 
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.03em',
                  color: '#64748B',
                  marginBottom: '14px',
                  textTransform: 'uppercase',
                }}
              >
                Inhoud van het rapport
              </div>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2.5">
                  <div 
                    style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      backgroundColor: '#3B82F6',
                      flexShrink: 0,
                      marginTop: '7px',
                    }}
                  />
                  <span 
                    style={{ 
                      color: '#334155', 
                      fontSize: '13px',
                      lineHeight: 1.5,
                    }}
                  >
                    Volledig AI-register, inclusief shadow-AI en leveranciers
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div 
                    style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      backgroundColor: '#3B82F6',
                      flexShrink: 0,
                      marginTop: '7px',
                    }}
                  />
                  <span 
                    style={{ 
                      color: '#334155', 
                      fontSize: '13px',
                      lineHeight: 1.5,
                    }}
                  >
                    Risicoclassificatie per systeem met prioritering
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div 
                    style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      backgroundColor: '#3B82F6',
                      flexShrink: 0,
                      marginTop: '7px',
                    }}
                  />
                  <span 
                    style={{ 
                      color: '#334155', 
                      fontSize: '13px',
                      lineHeight: 1.5,
                    }}
                  >
                    Financiële blootstellingsinschatting op basis van scenario's
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div 
                    style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      backgroundColor: '#3B82F6',
                      flexShrink: 0,
                      marginTop: '7px',
                    }}
                  />
                  <span 
                    style={{ 
                      color: '#334155', 
                      fontSize: '13px',
                      lineHeight: 1.5,
                    }}
                  >
                    Governance-volwassenheidsanalyse per domein
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div 
                    style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      backgroundColor: '#3B82F6',
                      flexShrink: 0,
                      marginTop: '7px',
                    }}
                  />
                  <span 
                    style={{ 
                      color: '#334155', 
                      fontSize: '13px',
                      lineHeight: 1.5,
                    }}
                  >
                    Concrete besluitpunten en prioriteiten voor de Raad
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div 
                    style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      backgroundColor: '#3B82F6',
                      flexShrink: 0,
                      marginTop: '7px',
                    }}
                  />
                  <span 
                    style={{ 
                      color: '#334155', 
                      fontSize: '13px',
                      lineHeight: 1.5,
                    }}
                  >
                    Boardpresentatie gericht op expliciete besluitvorming
                  </span>
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div className="px-6 pb-6 mt-auto">
              <BookingDialog>
                <button 
                  className="w-full transition-all duration-200"
                  style={{ 
                    padding: '10px 20px',
                    backgroundColor: 'transparent',
                    color: '#0F172A',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#F8FAFC';
                    e.currentTarget.style.borderColor = '#CBD5E1';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.borderColor = '#E2E8F0';
                  }}
                >
                  Plan een verkennend gesprek
                </button>
              </BookingDialog>
            </div>
          </div>
        </div>

        {/* Trust indicator */}
        <div 
          className="text-center mt-8"
          style={{ 
            color: '#64748B', 
            fontSize: '13px',
            fontWeight: 500,
          }}
        >
          Onafhankelijke analyse · Bestuurlijk onderbouwd · Gericht op besluitvorming
        </div>
      </div>
    </section>
  );
}