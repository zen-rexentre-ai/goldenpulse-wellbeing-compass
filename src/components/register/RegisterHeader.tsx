
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';

const RegisterHeader: React.FC = () => {
  return (
    <div className="flex justify-center mb-6">
      <Link to="/">
        <Logo size="md" />
      </Link>
    </div>
  );
};

export default RegisterHeader;
