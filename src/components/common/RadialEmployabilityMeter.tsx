import React from 'react';

interface RadialMeterProps {
  score: number; // 0 to 100
  size?: number; // width & height in px, default 160
  strokeWidth?: number;
  label?: string;
  subLabel?: string;
}

export const RadialEmployabilityMeter: React.FC<RadialMeterProps> = ({
  score,
  size = 160,
  strokeWidth = 14,
  label = 'Employability Score',
  subLabel = 'State Benchmark: 72/100',
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(100, Math.max(0, score)) / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      {/* Outer tactile debossed circular trench container */}
      <div
        className="relative flex items-center justify-center rounded-full p-2"
        style={{
          width: size + 20,
          height: size + 20,
          background: '#E9DFFF',
          boxShadow: 'inset 4px 4px 8px rgba(50, 17, 111, 0.12), inset -4px -4px 8px rgba(255, 255, 255, 0.95)',
        }}
      >
        <svg width={size} height={size} className="transform -rotate-90">
          <defs>
            <linearGradient id="kineticGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7138E8" />
              <stop offset="50%" stopColor="#963DF5" />
              <stop offset="100%" stopColor="#E75ACF" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background track circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#DCD0FF"
            strokeWidth={strokeWidth}
            fill="transparent"
          />

          {/* Active progress conic stroke */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="url(#kineticGradient)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            style={{
              transition: 'stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        </svg>

        {/* Central hub floats above track as an extruded circular dial */}
        <div
          className="absolute flex flex-col items-center justify-center rounded-full"
          style={{
            width: size - strokeWidth * 2.5,
            height: size - strokeWidth * 2.5,
            backgroundColor: '#F3F0FF',
            boxShadow:
              '-6px -6px 12px rgba(255, 255, 255, 0.95), 6px 6px 14px rgba(113, 56, 232, 0.16), 2px 2px 4px rgba(50, 17, 111, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.85)',
          }}
        >
          <span className="font-extrabold text-3xl text-[#21163B] tracking-tight font-display">
            {score}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#7138E8]">
            / 100 PTS
          </span>
          <span className="mt-0.5 text-[9px] font-bold text-emerald-600 bg-emerald-100/80 px-1.5 py-0.5 rounded-full">
            {score >= 85 ? 'Verified High' : score >= 70 ? 'Industry Ready' : 'Emerging'}
          </span>
        </div>
      </div>

      {label && (
        <span className="mt-2.5 text-xs font-bold text-[#21163B] text-center font-display">
          {label}
        </span>
      )}
      {subLabel && (
        <span className="text-[11px] text-[#5F5675] text-center">
          {subLabel}
        </span>
      )}
    </div>
  );
};
