import { useState, useCallback, useEffect, useRef } from "react";

interface UseSpeechOptions {
  onResult?: (transcript: string) => void;
  onError?: (error: string) => void;
}

interface SpeechState {
  isListening: boolean;
  isSpeaking: boolean;
  isSupported: boolean;
  isTTSSupported: boolean;
}

export function useSpeech({ onResult, onError }: UseSpeechOptions = {}) {
  const [state, setState] = useState<SpeechState>({
    isListening: false,
    isSpeaking: false,
    isSupported: false,
    isTTSSupported: false,
  });

  const recognitionRef = useRef<any>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Check browser support on mount
  useEffect(() => {
    const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const isSupported = !!SpeechRecognitionAPI;
    const isTTSSupported = 'speechSynthesis' in window;

    setState(prev => ({ ...prev, isSupported, isTTSSupported }));

    if (isSupported) {
      const recognition = new SpeechRecognitionAPI();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onResult?.(transcript);
        setState(prev => ({ ...prev, isListening: false }));
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        if (event.error !== 'aborted') {
          onError?.(event.error);
        }
        setState(prev => ({ ...prev, isListening: false }));
      };

      recognition.onend = () => {
        setState(prev => ({ ...prev, isListening: false }));
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [onResult, onError]);

  const startListening = useCallback(() => {
    if (!recognitionRef.current || state.isListening) return;

    try {
      // Stop any ongoing speech first
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setState(prev => ({ ...prev, isSpeaking: false }));

      recognitionRef.current.start();
      setState(prev => ({ ...prev, isListening: true }));
    } catch (error) {
      console.error('Failed to start speech recognition:', error);
      onError?.('Failed to start voice input');
    }
  }, [state.isListening, onError]);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return;

    try {
      recognitionRef.current.stop();
      setState(prev => ({ ...prev, isListening: false }));
    } catch (error) {
      console.error('Failed to stop speech recognition:', error);
    }
  }, []);

  const speak = useCallback((text: string) => {
    if (!window.speechSynthesis || !text) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Try to use a natural-sounding voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => 
      v.name.includes('Google') || 
      v.name.includes('Samantha') || 
      v.name.includes('Daniel') ||
      v.lang.startsWith('en')
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => {
      setState(prev => ({ ...prev, isSpeaking: true }));
    };

    utterance.onend = () => {
      setState(prev => ({ ...prev, isSpeaking: false }));
    };

    utterance.onerror = () => {
      setState(prev => ({ ...prev, isSpeaking: false }));
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, []);

  const stopSpeaking = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setState(prev => ({ ...prev, isSpeaking: false }));
    }
  }, []);

  return {
    ...state,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
  };
}
