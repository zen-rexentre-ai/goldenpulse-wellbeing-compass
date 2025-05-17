
import React, { useState } from 'react';
import { EmbossedCard } from '@/components/ui/card';
import { QrCode } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const QrCodeSection = () => {
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
    <EmbossedCard className="p-4 mb-3 w-full overflow-hidden">
      <div className="bg-gradient-to-br from-golden-pink to-golden-peach p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <QrCode className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-bold text-golden-dark">Visit GoldenPulse.ai</h3>
          </div>
          <p className="text-sm md:text-base">
            Scan this QR code to access additional resources, latest updates, 
            and community events on our website.
          </p>
        </div>
        
        <div className="w-32 h-32 md:w-40 md:h-40 bg-white p-2 rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
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
    </EmbossedCard>
  );
};

export default QrCodeSection;
