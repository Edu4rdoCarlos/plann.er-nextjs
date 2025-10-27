import { useEffect, useRef } from 'react'

const FOCUSABLE_ELEMENTS = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

export function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLDivElement>(null)
  const previouslyFocusedElement = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isActive || !containerRef.current) return

    // Salvar elemento com foco antes de abrir o modal
    previouslyFocusedElement.current = document.activeElement as HTMLElement

    const container = containerRef.current
    const focusableElements = Array.from(
      container.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS),
    )

    if (focusableElements.length === 0) return

    // Focar no primeiro elemento focável
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    // Pequeno delay para garantir que o DOM está pronto
    setTimeout(() => {
      firstElement?.focus()
    }, 0)

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      // Atualizar lista de elementos focáveis (pode ter mudado)
      const currentFocusableElements = Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS),
      )

      if (currentFocusableElements.length === 0) return

      const currentFirstElement = currentFocusableElements[0]
      const currentLastElement =
        currentFocusableElements[currentFocusableElements.length - 1]

      // Shift + Tab no primeiro elemento -> vai para o último
      if (e.shiftKey && document.activeElement === currentFirstElement) {
        e.preventDefault()
        currentLastElement?.focus()
      }
      // Tab no último elemento -> vai para o primeiro
      else if (!e.shiftKey && document.activeElement === currentLastElement) {
        e.preventDefault()
        currentFirstElement?.focus()
      }
    }

    container.addEventListener('keydown', handleTabKey)

    return () => {
      container.removeEventListener('keydown', handleTabKey)

      // Restaurar foco ao elemento anterior quando o modal fechar
      if (previouslyFocusedElement.current) {
        previouslyFocusedElement.current.focus()
      }
    }
  }, [isActive])

  return containerRef
}
