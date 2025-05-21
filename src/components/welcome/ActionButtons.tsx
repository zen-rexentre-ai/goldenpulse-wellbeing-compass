
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ActionButtons = () => {
  return (
    <div className="grid gap-3">
      <Link to="/register">
        <Button className="w-full text-lg py-5 bg-[#FF7E00] hover:bg-[#E06E00] border-none" size="lg">
          Create Account
        </Button>
      </Link>
      
      <Link to="/login">
        <Button className="w-full text-lg py-5" variant="outline" size="lg">
          I Already Have an Account
        </Button>
      </Link>
    </div>
  );
};

export default ActionButtons;
