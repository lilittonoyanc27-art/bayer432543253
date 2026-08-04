// Audio TTS service for Spanish pronunciation and sentence reading

let cachedVoices: SpeechSynthesisVoice[] = [];

function getSpanishVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return null;
  }
  if (cachedVoices.length === 0) {
    cachedVoices = window.speechSynthesis.getVoices();
  }
  
  // Prefer Spanish (Spain es-ES or Latin America es-MX)
  const esVoice = cachedVoices.find(
    v => v.lang.startsWith('es-ES') || v.lang.startsWith('es-MX') || v.lang.startsWith('es')
  );
  return esVoice || null;
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoices = window.speechSynthesis.getVoices();
  };
}

export function speakSpanishText(text: string, rate: number = 0.9): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported');
      resolve(false);
      return;
    }

    // Cancel any previous speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = rate; // slightly slower for language learners
    utterance.pitch = 1.0;

    const voice = getSpanishVoice();
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onend = () => {
      resolve(true);
    };

    utterance.onerror = (err) => {
      console.error('Speech synthesis error:', err);
      resolve(false);
    };

    window.speechSynthesis.speak(utterance);
  });
}

export function stopSpanishSpeech(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
