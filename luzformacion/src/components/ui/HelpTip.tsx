import { useEffect, useId, useRef, useState, type ReactNode } from 'react'

type Props = {
  /** Qué explica, para el lector de pantalla: «Ayuda: {label}». */
  label: string
  children: ReactNode
}

/**
 * El «(?)» que aclara un término. Se abre al pulsar o con teclado (Enter/Espacio),
 * se cierra con Escape o al pulsar fuera. Sin hover: en móvil no existe.
 */
export function HelpTip({ label, children }: Props) {
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLSpanElement>(null)
  const panelId = useId()

  useEffect(() => {
    if (!open) return
    function onPointer(event: PointerEvent) {
      if (!root.current?.contains(event.target as Node)) setOpen(false)
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <span ref={root} className="relative ml-1.5 inline-block align-middle font-body">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label={`Ayuda: ${label}`}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex size-6 cursor-pointer items-center justify-center rounded-full border border-ink font-heading text-xs leading-none font-bold text-ink transition-colors duration-200 hover:bg-brand-yellow focus-visible:bg-brand-yellow aria-expanded:bg-brand-yellow"
      >
        ?
      </button>
      {open && (
        <span
          id={panelId}
          role="note"
          className="absolute top-full left-0 z-20 mt-2 block w-72 max-w-[calc(100vw-2.5rem)] border border-ink bg-cream p-4 text-sm leading-snug font-normal text-ink shadow-[4px_4px_0_0_var(--color-ink)]"
        >
          {children}
        </span>
      )}
    </span>
  )
}
