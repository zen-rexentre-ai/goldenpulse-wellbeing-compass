
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  linkToHome?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '', linkToHome = true }) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-14',
    lg: 'h-20',
  };

  const logo = (
    <div className={`flex items-center ${className}`}>
      <img
        src="/lovable-uploads/403b98c5-738b-4a99-81ff-3de32a701b77.png"
        alt="GoldenPulse.ai Logo"
        className={`${sizeClasses[size]} w-auto`}
      />
    </div>
  );

  // If linkToHome is true, wrap the logo in a Link component
  if (linkToHome) {
    return <Link to="/">{logo}</Link>;
  }
  
  // Otherwise, just return the logo
  return logo;
};

export default Logo;
