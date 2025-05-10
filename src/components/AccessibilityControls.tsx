
import React from 'react';
import { Button } from '@/components/ui/button';
import { useTheme } from './ThemeProvider';
import { Slider } from '@/components/ui/slider';

export const AccessibilityControls: React.FC = () => {
  const { theme, setTheme, fontSize, setFontSize } = useTheme();

  const handleFontSizeChange = (value: number[]) => {
    setFontSize(value[0]);
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-secondary rounded-lg shadow-md">
      <h3 className="text-xl font-semibold">Accessibility Settings</h3>
      
      <div>
        <h4 className="text-lg font-medium mb-2">Color Mode</h4>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => setTheme('light')}
            className={`px-4 py-2 ${theme === 'light' ? 'bg-primary' : 'bg-muted'}`}
            aria-label="Light Mode"
          >
            Standard
          </Button>
          
          <Button
            onClick={() => setTheme('gold')}
            className={`px-4 py-2 ${theme === 'gold' ? 'bg-primary' : 'bg-muted'}`}
            aria-label="Gold High Contrast Mode"
          >
            Gold
          </Button>
          
          <Button
            onClick={() => setTheme('teal')}
            className={`px-4 py-2 ${theme === 'teal' ? 'bg-primary' : 'bg-muted'}`}
            aria-label="Teal High Contrast Mode"
          >
            Teal
          </Button>
          
          <Button
            onClick={() => setTheme('dark')}
            className={`px-4 py-2 ${theme === 'dark' ? 'bg-primary' : 'bg-muted'}`}
            aria-label="Dark Mode"
          >
            Dark
          </Button>
        </div>
      </div>
      
      <div>
        <h4 className="text-lg font-medium mb-2">Text Size: {fontSize}px</h4>
        <Slider
          defaultValue={[fontSize]}
          min={18}
          max={24}
          step={1}
          onValueChange={handleFontSizeChange}
          className="w-full"
          aria-label="Adjust Text Size"
        />
      </div>
    </div>
  );
};
