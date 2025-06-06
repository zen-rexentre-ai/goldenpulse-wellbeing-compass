
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/components/LanguageProvider';

const GoldenJourneyCard = () => {
  const { t } = useLanguage();
  
  return (
    <Card className="w-full">
      <CardContent className="p-4 space-y-3">
        <h3 className="text-xl font-bold text-center">{t("golden_journey")}</h3>
        
        <div className="space-y-2 text-sm">
          <p className="font-semibold text-primary text-center">
            {t("good_health_key")}
          </p>
          <p>{t("golden_journey_desc_1")}</p>
          <p>{t("golden_journey_desc_2")}</p>
          <p className="font-medium">{t("golden_journey_desc_3")}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoldenJourneyCard;
