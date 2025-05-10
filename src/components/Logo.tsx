
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`rounded-full bg-golden-purple p-2 ${sizeClasses[size]}`}>
        <svg
          className="h-full w-auto"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21"
            stroke="#FEC6A1"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3"
            stroke="#FDE1D3" 
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="12" cy="12" r="4" fill="#FFDEE2" />
        </svg>
      </div>
      <div className="font-bold">
        <span className="text-golden-purple block">Golden</span>
        <span className="text-golden-orange block -mt-1">Pulse</span>
      </div>
    </div>
  );
};

export default Logo;
