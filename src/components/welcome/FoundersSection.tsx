
import React from 'react';
import { EmbossedCard } from '@/components/ui/card';
import { Mail, Phone, User, GraduationCap } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useIsMobile } from '@/hooks/use-mobile';

const FoundersSection = () => {
  const isMobile = useIsMobile();

  return (
    <EmbossedCard className="p-4 mb-3 w-full">
      <h3 className="text-center text-lg font-medium mb-3">Meet Our Founders</h3>
      <div className={`grid ${isMobile ? "grid-cols-1 gap-4" : "grid-cols-2 gap-2"} w-full`}>
        {/* Founder 1 */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-primary" />
            <span>Harinath Chakrapani</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <GraduationCap className="h-4 w-4 text-golden-purple" />
            <span>
              <span className="text-golden-purple font-medium">IIMB Alumni</span>
              <span className="mx-1">·</span>
              <span className="text-golden-dark">AMP-18</span>
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-primary" />
            <span>+91-9840178288</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-primary" />
            <span>harinath04@gmail.com</span>
          </div>
        </div>
        
        {/* Separator for desktop view */}
        {!isMobile && (
          <div className="flex justify-center">
            <Separator orientation="vertical" className="mx-2" />
          </div>
        )}
        
       
      </div>
    </EmbossedCard>
  );
};

export default FoundersSection;
