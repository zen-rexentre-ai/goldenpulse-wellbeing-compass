
import React, { useState } from 'react';
import { EmbossedCard } from '@/components/ui/card';
import { Mail, Phone, User, GraduationCap, QrCode } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { toast } from '@/hooks/use-toast';

const FoundersSection = () => {
  const isMobile = useIsMobile();
  const [qrCodeError, setQrCodeError] = useState(false);
  
  const handleImageError = () => {
    setQrCodeError(true);
    toast({
      title: "Image Loading Issue",
      description: "Using fallback QR code display.",
      variant: "destructive",
    });
  };

  return (
    <EmbossedCard className="p-4 mb-3 w-full">
      <h3 className="text-center text-lg font-medium mb-3">Meet Our Founder</h3>
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
        
        {/* QR Code Section */}
        <div className="flex justify-center items-center">
          <div className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow w-32 h-32">
            {qrCodeError ? (
              <div className="w-full h-full flex flex-col items-center justify-center text-center p-2">
                <QrCode className="h-16 w-16 text-primary mb-2" />
                <span className="text-xs">GoldenPulse.ai</span>
              </div>
            ) : (
              <AspectRatio ratio={1/1} className="w-full">
                <img 
                  src="/lovable-uploads/24569b38-feb1-45d0-afdb-859e860a4197.png"
                  alt="QR Code for GoldenPulse.ai"
                  className="w-full h-full object-contain"
                  onError={handleImageError}
                  loading="eager"
                />
              </AspectRatio>
            )}
          </div>
        </div>
      </div>
    </EmbossedCard>
  );
};

export default FoundersSection;
