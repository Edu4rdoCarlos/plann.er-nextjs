"use client";

import { useCallback, useEffect, useRef } from "react";
import { Locale } from "@/src/i18n/request";

// Cache para mensagens de tradução
const translationCache: Record<Locale, any> = {} as Record<Locale, any>;

// Função helper para obter tradução
const getTranslation = async (
  locale: Locale,
  key: string,
  params?: Record<string, string>
): Promise<string> => {
  try {
    // Carregar mensagens se ainda não estiverem em cache
    if (!translationCache[locale]) {
      const messages = (await import(`../../messages/${locale}.json`)).default;
      translationCache[locale] = messages;
    }

    const messages = translationCache[locale];
    const [namespace, ...keyParts] = key.split(".");
    let value = messages[namespace];

    for (const part of keyParts) {
      value = value?.[part];
    }

    if (typeof value !== "string") {
      return key; // Retornar a chave se não encontrar a tradução
    }

    // Substituir parâmetros
    if (params) {
      return Object.entries(params).reduce(
        (text, [paramKey, paramValue]) =>
          text.replace(`{${paramKey}}`, paramValue),
        value
      );
    }

    return value;
  } catch (error) {
    console.warn(`Translation not found for key: ${key}`, error);
    return key;
  }
};

export interface SpeechOptions {
  rate?: number; // Velocidade (0.1 a 10)
  pitch?: number; // Tom (0 a 2)
  volume?: number; // Volume (0 a 1)
  lang?: string; // Idioma
}

const localeToSpeechLang: Record<Locale, string> = {
  pt: "pt-BR",
  en: "en-US",
  es: "es-ES",
};

export function useSpeech(enabled: boolean = false, locale: Locale = "pt") {
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const isInitialized = useRef(false);

  const isSupported =
    typeof window !== "undefined" && "speechSynthesis" in window;

  // Função para obter uma voz apropriada para o locale
  const getVoiceForLocale = useCallback(
    (targetLocale: Locale): SpeechSynthesisVoice | null => {
      if (!isSupported || !window.speechSynthesis) return null;

      const voices = window.speechSynthesis.getVoices();
      const targetLang = localeToSpeechLang[targetLocale];

      let voice = voices.find((v) => v.lang === targetLang);

      if (!voice) {
        const langPrefix = targetLang.split("-")[0];
        voice = voices.find((v) => v.lang.startsWith(langPrefix));
      }

      return voice || voices.find((v) => v.default) || voices[0] || null;
    },
    [isSupported]
  );

  // Inicializar Speech Synthesis
  useEffect(() => {
    if (!isSupported || isInitialized.current) return;

    // Inicializar a síntese de voz
    if (window.speechSynthesis) {
      // Força o carregamento das vozes
      // Alguns navegadores carregam as vozes de forma assíncrona
      const loadVoices = () => {
        window.speechSynthesis.getVoices();
      };

      loadVoices();

      // Alguns navegadores precisam de um evento para carregar as vozes
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }

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
      utterance.lang = options.lang || localeToSpeechLang[locale];
      utterance.rate = options.rate || 1.0;
      utterance.pitch = options.pitch || 1.0;
      utterance.volume = options.volume || 1.0;

      // Tentar selecionar uma voz apropriada para o idioma
      const voice = getVoiceForLocale(locale);
      if (voice) {
        utterance.voice = voice;
      }

      utteranceRef.current = utterance;

      // Falar
      window.speechSynthesis.speak(utterance);
    },
    [enabled, isSupported, stop, locale, getVoiceForLocale]
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
      if (
        element instanceof HTMLInputElement ||
        element instanceof HTMLTextAreaElement
      ) {
        const placeholder = element.placeholder;
        const value = element.value;
        if (value) {
          // Carregar tradução de forma assíncrona
          getTranslation(locale, "accessibility.fieldFilledWith", {
            value,
          }).then((translatedText) => {
            speak(translatedText, options);
          });
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
        const truncatedText =
          text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
        speak(truncatedText, options);
      }
    },
    [enabled, speak, locale]
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

  // Parar qualquer fala em andamento quando o locale mudar
  useEffect(() => {
    if (isSupported) {
      stop();
    }
  }, [locale, isSupported, stop]);

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
export function useSpeechNavigation(
  enabled: boolean = false,
  locale: Locale = "pt"
) {
  const { speakElement, announce, isSupported, stop } = useSpeech(
    enabled,
    locale
  );

  // Parar qualquer fala em andamento quando o locale mudar
  useEffect(() => {
    stop();
  }, [locale, stop]);

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
  }, [enabled, isSupported, speakElement, locale]);

  return {
    speakElement,
    announce,
    isSupported,
  };
}
