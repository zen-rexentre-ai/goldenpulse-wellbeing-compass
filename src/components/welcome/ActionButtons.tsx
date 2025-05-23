
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/LanguageProvider';

const ActionButtons = () => {
  const { t } = useLanguage();
  
  return (
    <div className="grid gap-3">
      <Link to="/register">
        <Button className="w-full text-lg py-5 bg-[#FF7E00] hover:bg-[#E06E00] border-none" size="lg">
          {t("create_account")}
        </Button>
      </Link>
      
      <Link to="/login">
        <Button className="w-full text-lg py-5" variant="outline" size="lg">
          {t("already_have_account")}
        </Button>
      </Link>
    </div>
  );
};

export default ActionButtons;
