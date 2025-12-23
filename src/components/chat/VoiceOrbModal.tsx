import { memo, useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VoicePoweredOrb } from "@/components/ui/voice-powered-orb";
import { cn } from "@/lib/utils";

interface VoiceOrbModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResult: (transcript: string) => void;
  onError?: (error: string) => void;
}

// Type declarations for Web Speech API
interface SpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string;
  readonly message: string;
}

interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: ((this: SpeechRecognitionInstance, ev: Event) => void) | null;
  onresult: ((this: SpeechRecognitionInstance, ev: SpeechRecognitionEvent) => void) | null;
  onerror: ((this: SpeechRecognitionInstance, ev: SpeechRecognitionErrorEvent) => void) | null;
  onend: ((this: SpeechRecognitionInstance, ev: Event) => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognitionInstance;
}

export const VoiceOrbModal = memo(function VoiceOrbModal({
  isOpen,
  onClose,
  onResult,
  onError,
}: VoiceOrbModalProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [voiceDetected, setVoiceDetected] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  
  // Detect mobile devices - skip orb's microphone visualization to avoid conflicts
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  // Initialize speech recognition
  useEffect(() => {
    if (!isOpen) return;

    const windowWithSpeech = window as unknown as {
      SpeechRecognition?: SpeechRecognitionConstructor;
      webkitSpeechRecognition?: SpeechRecognitionConstructor;
    };

    const SpeechRecognitionAPI = windowWithSpeech.SpeechRecognition || windowWithSpeech.webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      onError?.("Voice input not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript("");
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = "";
      let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript;
        } else {
          interimTranscript += result[0].transcript;
        }
      }

      setTranscript(finalTranscript || interimTranscript);

      // If we have a final result, submit it
      if (finalTranscript) {
        onResult(finalTranscript.trim());
        onClose();
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);
      if (event.error !== 'aborted' && event.error !== 'no-speech') {
        onError?.(event.error);
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    // Start listening immediately when modal opens
    try {
      recognition.start();
    } catch (error) {
      console.error('Failed to start recognition:', error);
    }

    return () => {
      try {
        recognition.stop();
      } catch {
        // Ignore errors when stopping
      }
      recognitionRef.current = null;
    };
  }, [isOpen, onResult, onClose, onError]);

  const handleClose = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Ignore
      }
    }
    onClose();
  }, [onClose]);

  const handleVoiceDetected = useCallback((detected: boolean) => {
    setVoiceDetected(detected);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-background/80 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative flex flex-col items-center gap-6 p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-0 right-0 h-10 w-10 rounded-full bg-muted/50"
              onClick={handleClose}
            >
              <X className="w-5 h-5" />
            </Button>

            {/* Voice Orb */}
            <VoicePoweredOrb
              className="w-64 h-64 md:w-80 md:h-80"
              enableVoiceControl={isListening}
              voiceSensitivity={2.0}
              maxRotationSpeed={1.5}
              maxHoverIntensity={1.0}
              onVoiceDetected={handleVoiceDetected}
              skipMicrophoneVisualization={isMobile}
            />

            {/* Status text */}
            <div className="text-center space-y-2">
              <p className={cn(
                "text-lg font-medium transition-colors",
                voiceDetected ? "text-primary" : "text-foreground"
              )}>
                {isListening ? "Listening..." : "Initializing..."}
              </p>
              {transcript && (
                <p className="text-sm text-muted-foreground max-w-xs">
                  "{transcript}"
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                Speak clearly, then pause to send
              </p>
            </div>

            {/* Cancel button */}
            <Button
              variant="outline"
              className="gap-2"
              onClick={handleClose}
            >
              <MicOff className="w-4 h-4" />
              Cancel
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});
