
import React from 'react';
import { EmbossedCard } from '@/components/ui/card';
import { Mail, Phone, User, GraduationCap } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLanguage } from '@/components/LanguageProvider';
import ScreenReader from '@/components/ScreenReader';

const FoundersSection = () => {
  const isMobile = useIsMobile();
  const { t } = useLanguage();

  return (
    <EmbossedCard className="p-4 mb-3 w-full">
      <div className="flex justify-between items-center">
        <h3 className="text-center text-lg font-medium mb-3">{t("founders")}</h3>
        
      </div>
      <div className={`grid ${isMobile ? "grid-cols-1 gap-4" : "grid-cols-2 gap-2"} w-full`}>
        {/* Founder 1 */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-primary" />
            <span><b>Harinath Chakrapani</b></span>
          </div>
          <div className="flex items-center gap-2 text-sm">
             <span>
              <span className="text-golden-purple font-medium">MBA (IIT M), AMP (IIM B)</span>
             </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
           <span>IT Professional</span>
          </div>
        </div>
        
         
        {/* Separator for mobile view */}
        {<Separator className="my-3" />}
        
        {/* Founder 2 */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-primary" />
            <span><b>Mahadevan Ranganathan</b></span>
          </div>
          <div className="flex items-center gap-2 text-sm">
           <span className="text-golden-purple font-medium">Retired Top Executive</span>
          </div>
         </div>
      </div>
    </EmbossedCard>
  );
};

export default FoundersSection;
