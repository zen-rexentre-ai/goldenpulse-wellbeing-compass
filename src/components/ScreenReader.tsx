
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
  
  // Enhanced language voice mappings with better fallbacks
  const languageVoiceMappings: Record<string, string[]> = {
    'en': ['en-US', 'en-GB', 'en-AU'],
    'ta': ['ta-IN', 'ta-LK', 'hi-IN', 'en-IN'],
    'kn': ['kn-IN', 'hi-IN', 'en-IN'],
    'te': ['te-IN', 'hi-IN', 'en-IN'],
    'hi': ['hi-IN', 'en-IN'],
  };

  const speakText = () => {
    // Stop any ongoing speech
    window.speechSynthesis.cancel();
    
    // Create new speech synthesis utterance
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Get available voices
    const voices = window.speechSynthesis.getVoices();
    const preferredLanguages = languageVoiceMappings[language] || ['en-US'];
    
    // Find the best matching voice
    let selectedVoice = null;
    for (const langCode of preferredLanguages) {
      selectedVoice = voices.find(voice => 
        voice.lang.toLowerCase().includes(langCode.toLowerCase())
      );
      if (selectedVoice) break;
    }
    
    // Set the voice and language
    if (selectedVoice) {
      utterance.voice = selectedVoice;
      utterance.lang = selectedVoice.lang;
    } else {
      utterance.lang = preferredLanguages[0];
    }
    
    // Set speech rate and pitch for better clarity
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    
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
