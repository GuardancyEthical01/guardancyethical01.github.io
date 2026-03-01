import { Check, ArrowRight, LucideIcon } from "lucide-react";
import { Button } from "./ui/button";
import { BookingDialog } from "./BookingDialog";
import { useState } from "react";

interface PricingCardProps {
  name: string;
  description: string;
  price: string;
  period?: string;
  priceNote?: string;
  microcopy?: string;
  ctaText: string;
  icon: LucideIcon;
  color: string;
  bgGradient: string;
  borderColor: string;
  features: string[];
  popular: boolean;
  isHovered: boolean;
  isInactive: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

export function PricingCard({
  name,
  description,
  price,
  period,
  priceNote,
  microcopy,
  ctaText,
  icon: Icon,
  color,
  bgGradient,
  borderColor,
  features,
  popular,
  isHovered,
  isInactive,
  onHoverStart,
  onHoverEnd,
}: PricingCardProps) {
  return (
    <div
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      className={`
        relative bg-gradient-to-br ${bgGradient} 
        rounded-3xl border-2 ${borderColor} overflow-hidden
        transition-all duration-200 ease-out
        ${isHovered ? 'pricing-card-hovered' : ''}
        ${isInactive ? 'pricing-card-inactive' : ''}
        ${popular && !isHovered ? 'pricing-card-popular' : ''}
      `}
      style={{
        transform: isHovered ? 'translateY(-5px) scale(1.02)' : 'translateY(0) scale(1)',
      }}
    >
      {popular && (
        <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-purple-800 text-white px-4 py-1 text-sm font-semibold rounded-bl-2xl z-10">
          Populair
        </div>
      )}

      <div className="p-8">
        {/* Icon */}
        <div 
          className={`w-14 h-14 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center mb-6 shadow-lg transition-opacity duration-200 ease-out`}
          style={{
            opacity: isInactive ? 0.85 : 1,
          }}
        >
          <Icon className="w-7 h-7 text-white" />
        </div>

        {/* Tier name and description */}
        <h3 className="mb-2 text-gray-900 text-xl">{name}</h3>
        <p className="text-gray-600 mb-5 text-xs leading-relaxed min-h-[2.5rem]">
          {description}
        </p>

        {/* Price */}
        <div className="mb-5">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-gray-900">
              {price}
            </span>
            {period && period !== "" && (
              <span className="text-gray-600 text-sm">{period}</span>
            )}
          </div>
          {priceNote && (
            <p className="text-gray-500 text-xs mt-1">
              {priceNote}
            </p>
          )}
          {microcopy && (
            <p className="text-gray-500 text-xs mt-1">
              {microcopy}
            </p>
          )}
        </div>

        {/* CTA Button */}
        <BookingDialog>
          <Button
            className={`w-full mb-6 gap-2 text-sm ${
              popular
                ? 'bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900'
                : 'bg-gray-900 hover:bg-gray-800'
            }`}
            size="default"
          >
            {ctaText}
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

        {/* Features */}
        <ul className="space-y-3">
          {features.map((feature, featureIndex) => (
            <li key={featureIndex} className="flex items-start gap-2.5">
              <div 
                className={`w-4 h-4 rounded-full bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0 mt-0.5 transition-opacity duration-200 ease-out`}
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
  );
}
