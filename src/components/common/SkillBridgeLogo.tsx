import React from 'react';

interface SkillBridgeLogoProps {
  variant?: 'full' | 'icon';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
  onClick?: () => void;
}

export const SkillBridgeLogo: React.FC<SkillBridgeLogoProps> = ({
  variant = 'full',
  size = 'md',
  showTagline = true,
  className = '',
  onClick,
}) => {
  // Height definitions for proportional scaling
  const heightClasses = {
    xs: 'h-7',
    sm: 'h-9',
    md: 'h-11',
    lg: 'h-14',
    xl: 'h-18',
  };

  const iconSizes = {
    xs: 'w-7 h-7',
    sm: 'w-9 h-9',
    md: 'w-11 h-11',
    lg: 'w-14 h-14',
    xl: 'w-18 h-18',
  };

  if (variant === 'icon') {
    return (
      <div
        onClick={onClick}
        className={`inline-flex items-center justify-center shrink-0 ${onClick ? 'cursor-pointer' : ''} ${className}`}
        title="SkillBridge AI"
      >
        <img
          src="/skillbridge-icon.svg"
          alt="SkillBridge AI Icon"
          className={`${iconSizes[size]} object-contain drop-shadow-sm select-none transition-transform hover:scale-105`}
        />
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2 select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
      title="SkillBridge AI - Bridging Skills. Empowering Careers."
    >
      <img
        src="/skillbridge-logo.svg"
        alt="SkillBridge AI — Bridging Skills. Empowering Careers."
        className={`${heightClasses[size]} w-auto object-contain transition-transform hover:scale-[1.02]`}
      />
    </div>
  );
};
