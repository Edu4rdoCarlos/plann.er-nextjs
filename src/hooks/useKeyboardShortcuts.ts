import { useEffect, useCallback } from 'react'

interface KeyboardShortcut {
  key: string
  ctrl?: boolean
  alt?: boolean
  shift?: boolean
  meta?: boolean
  callback: (event: KeyboardEvent) => void
  description: string
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Não processar atalhos quando estiver digitando em inputs
      const target = event.target as HTMLElement
      const isInput =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable

      for (const shortcut of shortcuts) {
        const keyMatches =
          event.key.toLowerCase() === shortcut.key.toLowerCase()
        const ctrlMatches = shortcut.ctrl ? event.ctrlKey : !event.ctrlKey
        const altMatches = shortcut.alt ? event.altKey : !event.altKey
        const shiftMatches = shortcut.shift ? event.shiftKey : !event.shiftKey
        const metaMatches = shortcut.meta ? event.metaKey : !event.metaKey

        // Permitir Escape mesmo em inputs
        if (shortcut.key === 'Escape' && keyMatches) {
          event.preventDefault()
          shortcut.callback(event)
          return
        }

        if (isInput && !shortcut.ctrl && !shortcut.alt && !shortcut.meta) {
          continue
        }

        if (
          keyMatches &&
          ctrlMatches &&
          altMatches &&
          shiftMatches &&
          metaMatches
        ) {
          event.preventDefault()
          shortcut.callback(event)
          return
        }
      }
    },
    [shortcuts],
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])
}

// Hook para atalhos globais da aplicação
export function useGlobalKeyboardShortcuts() {
  const shortcuts: KeyboardShortcut[] = [
    {
      key: '?',
      shift: true,
      callback: () => {
        // Abrir painel de ajuda de atalhos
        const event = new CustomEvent('toggle-shortcuts-help')
        window.dispatchEvent(event)
      },
      description: 'Exibir atalhos de teclado',
    },
    {
      key: 'k',
      ctrl: true,
      callback: () => {
        // Abrir busca rápida (se implementado)
        const searchInput = document.querySelector<HTMLInputElement>(
          '[data-keyboard-shortcut="search"]',
        )
        searchInput?.focus()
      },
      description: 'Busca rápida',
    },
  ]

  useKeyboardShortcuts(shortcuts)
}
