
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import WellnessModuleSection from './WellnessModuleSection';
import CommunityModuleSection from './CommunityModuleSection';

interface ModulePopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  moduleType: 'wellness' | 'community';
}

const ModulePopup: React.FC<ModulePopupProps> = ({ open, onOpenChange, moduleType }) => {
  const title = moduleType === 'wellness' ? 'Personal Wellness Features' : 'Engagement';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">{title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {moduleType === 'wellness' ? (
            <WellnessModuleSection showAsCard={false} compact={true} />
          ) : (
            <CommunityModuleSection showAsCard={false} compact={true} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModulePopup;
