"use client";

import { useCallback, useEffect, useRef } from "react";

export interface SpeechOptions {
  rate?: number; // Velocidade (0.1 a 10)
  pitch?: number; // Tom (0 a 2)
  volume?: number; // Volume (0 a 1)
  lang?: string; // Idioma
}

export function useSpeech(enabled: boolean = false) {
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const isInitialized = useRef(false);

  // Verificar se browser suporta Speech Synthesis
  const isSupported = typeof window !== "undefined" && "speechSynthesis" in window;

  // Inicializar Speech Synthesis
  useEffect(() => {
    if (!isSupported || isInitialized.current) return;

    // Inicializar a síntese de voz
    if (window.speechSynthesis) {
      // Força o carregamento das vozes
      window.speechSynthesis.getVoices();
      isInitialized.current = true;
    }
  }, [isSupported]);

  // Parar qualquer fala em andamento
  const stop = useCallback(() => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
  }, [isSupported]);

  // Função principal para falar texto
  const speak = useCallback(
    (text: string, options: SpeechOptions = {}) => {
      if (!isSupported || !enabled || !text.trim()) return;

      // Parar qualquer fala anterior
      stop();

      // Criar nova utterance
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = options.lang || "pt-BR";
      utterance.rate = options.rate || 1.0;
      utterance.pitch = options.pitch || 1.0;
      utterance.volume = options.volume || 1.0;

      utteranceRef.current = utterance;

      // Falar
      window.speechSynthesis.speak(utterance);
    },
    [enabled, isSupported, stop]
  );

  // Função para extrair texto de um elemento
  const speakElement = useCallback(
    (element: HTMLElement | null, options?: SpeechOptions) => {
      if (!element || !enabled) return;

      // Priorizar aria-label
      const ariaLabel = element.getAttribute("aria-label");
      if (ariaLabel) {
        speak(ariaLabel, options);
        return;
      }

      // Depois title
      const title = element.getAttribute("title");
      if (title) {
        speak(title, options);
        return;
      }

      // Depois placeholder (para inputs)
      if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
        const placeholder = element.placeholder;
        const value = element.value;
        if (value) {
          speak(`Campo preenchido com: ${value}`, options);
          return;
        }
        if (placeholder) {
          speak(placeholder, options);
          return;
        }
      }

      // Por último, texto visível
      const text = element.textContent?.trim();
      if (text) {
        // Limitar tamanho para não falar textos muito longos
        const maxLength = 200;
        const truncatedText = text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
        speak(truncatedText, options);
      }
    },
    [enabled, speak]
  );

  // Função para anunciar contexto (ex: "Modal aberto", "Menu expandido")
  const announce = useCallback(
    (message: string, options?: SpeechOptions) => {
      if (!enabled) return;
      speak(message, options);
    },
    [enabled, speak]
  );

  // Pausar fala
  const pause = useCallback(() => {
    if (!isSupported) return;
    window.speechSynthesis.pause();
  }, [isSupported]);

  // Resumir fala pausada
  const resume = useCallback(() => {
    if (!isSupported) return;
    window.speechSynthesis.resume();
  }, [isSupported]);

  // Verificar se está falando
  const isSpeaking = useCallback(() => {
    if (!isSupported) return false;
    return window.speechSynthesis.speaking;
  }, [isSupported]);

  // Limpar ao desmontar
  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return {
    speak,
    speakElement,
    announce,
    stop,
    pause,
    resume,
    isSpeaking,
    isSupported,
  };
}

// Hook para integrar com navegação por teclado
export function useSpeechNavigation(enabled: boolean = false) {
  const { speakElement, announce, isSupported } = useSpeech(enabled);

  // Falar elemento ao receber foco
  useEffect(() => {
    if (!enabled || !isSupported) return;

    const handleFocus = (e: FocusEvent) => {
      const target = e.target as HTMLElement;

      // Pequeno delay para garantir que o elemento está pronto
      setTimeout(() => {
        speakElement(target);
      }, 100);
    };

    document.addEventListener("focusin", handleFocus, true);
    return () => {
      document.removeEventListener("focusin", handleFocus, true);
    };
  }, [enabled, isSupported, speakElement]);

  return {
    speakElement,
    announce,
    isSupported,
  };
}
