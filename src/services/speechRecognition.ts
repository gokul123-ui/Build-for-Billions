import { Language } from '../types';

// Declare SpeechRecognition interface for TypeScript
declare global {
  interface Window {
    SpeechRecognition?: any;
    webkitSpeechRecognition?: any;
  }
}

export function isSpeechRecognitionSupported(): boolean {
  return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
}

export function getLocaleForLanguage(lang: Language): string {
  switch (lang) {
    case 'ta':
      return 'ta-IN';
    case 'hi':
      return 'hi-IN';
    case 'en':
    default:
      return 'en-IN';
  }
}

let activeRecognitionInstance: any = null;

export function startSpeechRecognition(
  lang: Language,
  onResult: (transcript: string) => void,
  onError: (errorMsg: string) => void,
  onEnd: () => void
): () => void {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    onError("Speech recognition is not supported in this browser.");
    onEnd();
    return () => {};
  }

  if (activeRecognitionInstance) {
    try {
      activeRecognitionInstance.stop();
    } catch (e) {
      // ignore
    }
  }

  const recognition = new SpeechRecognition();
  activeRecognitionInstance = recognition;

  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = getLocaleForLanguage(lang);

  recognition.onresult = (event: any) => {
    let finalTranscript = '';
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
      } else {
        finalTranscript += event.results[i][0].transcript;
      }
    }
    if (finalTranscript) {
      onResult(finalTranscript);
    }
  };

  recognition.onerror = (event: any) => {
    console.warn("Speech recognition error:", event.error);
    if (event.error === 'not-allowed') {
      onError("Microphone permission denied.");
    } else if (event.error === 'no-speech') {
      onError("No speech detected. Please try speaking again.");
    } else {
      onError(`Speech recognition error: ${event.error}`);
    }
    onEnd();
  };

  recognition.onend = () => {
    activeRecognitionInstance = null;
    onEnd();
  };

  try {
    recognition.start();
  } catch (err) {
    onError("Could not start microphone.");
    onEnd();
  }

  return () => {
    if (recognition) {
      try {
        recognition.stop();
      } catch (e) {
        // ignore
      }
    }
  };
}

export function stopSpeechRecognition(): void {
  if (activeRecognitionInstance) {
    try {
      activeRecognitionInstance.stop();
    } catch (e) {
      // ignore
    }
    activeRecognitionInstance = null;
  }
}
