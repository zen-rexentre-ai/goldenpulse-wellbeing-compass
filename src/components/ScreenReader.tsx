
import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useLanguage } from './LanguageProvider';

interface ScreenReaderProps {
  text: string;
  className?: string;
}

const ScreenReader: React.FC<ScreenReaderProps> = ({ text, className = '' }) => {
  const { language, t } = useLanguage();
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  // Map language codes to voice language codes
  const languageVoiceMappings: Record<string, string> = {
    'en': 'en-US',
    'ta': 'ta-IN',
    'kn': 'kn-IN',
    'te': 'te-IN',
    'hi': 'hi-IN',
  };

  const speakText = () => {
    // Stop any ongoing speech
    window.speechSynthesis.cancel();
    
    // Create new speech synthesis utterance
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = languageVoiceMappings[language] || 'en-US';
    
    // Set voice if available for language
    const voices = window.speechSynthesis.getVoices();
    const languageVoice = voices.find(voice => voice.lang.includes(languageVoiceMappings[language]));
    if (languageVoice) {
      utterance.voice = languageVoice;
    }
    
    // Handling events
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    // Speak the text
    window.speechSynthesis.speak(utterance);
  };
  
  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className={className} 
          onClick={isSpeaking ? stopSpeaking : speakText}
          aria-label={t("screen_reader_button")}
        >
          <Volume2 className={`h-5 w-5 ${isSpeaking ? 'text-primary animate-pulse' : ''}`} />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        {t("read_aloud")}
      </TooltipContent>
    </Tooltip>
  );
};

export default ScreenReader;
