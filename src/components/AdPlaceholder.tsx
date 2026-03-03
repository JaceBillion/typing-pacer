import React from 'react';

interface AdPlaceholderProps {
  className?: string;
  format?: 'horizontal' | 'vertical' | 'rectangle' | 'skyscraper';
}

export default function AdPlaceholder({ className = '', format = 'horizontal' }: AdPlaceholderProps) {
  // Standard AdSense sizes
  const formatStyles = {
    horizontal: 'w-full max-w-4xl h-[90px]', // Standard leaderboard (728x90) or responsive
    vertical: 'w-[300px] h-[600px]', // Half page
    rectangle: 'w-[300px] h-[250px]', // Medium rectangle
    skyscraper: 'w-[160px] h-[600px]', // Wide skyscraper
  };

  return (
    <div className={`flex items-center justify-center bg-slate-ui/30 border-2 border-dashed border-white/10 rounded-xl mx-auto ${formatStyles[format]} ${className}`}>
      <span className="text-frosted-text/30 text-sm font-medium tracking-widest uppercase">Advertisement</span>
    </div>
  );
}
