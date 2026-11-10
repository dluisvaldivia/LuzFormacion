import { useRef, type KeyboardEvent } from 'react'
import { Square } from './Square'

type Tab<T extends string> = { value: T; label: string }

type Props<T extends string> = {
  tabs: readonly Tab<T>[]
  active: T
  onChange: (value: T) => void
  /** Etiqueta accesible del grupo de pestañas. */
  label: string
  /** Prefijo de ids para enlazar cada pestaña con su panel (`${id}-tab-x`, `${id}-panel`). */
  id: string
}

/**
 * Pestañas ARIA con flechas: la seleccionada va en tinta con un brillo amarillo
 * para que se lea como pulsable. El panel lo pinta quien lo usa.
 */
export function SegmentedTabs<T extends string>({ tabs, active, onChange, label, id }: Props<T>) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const keys: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: tabs.length - 1,
    }
    if (!(event.key in keys)) return
    event.preventDefault()
    const next = (keys[event.key] + tabs.length) % tabs.length
    onChange(tabs[next].value)
    tabRefs.current[next]?.focus()
  }

  return (
    <div role="tablist" aria-label={label} className="flex">
      {tabs.map((tab, i) => {
        const selected = active === tab.value
        return (
          <button
            key={tab.value}
            ref={(el) => {
              tabRefs.current[i] = el
            }}
            type="button"
            role="tab"
            id={`${id}-tab-${tab.value}`}
            aria-selected={selected}
            aria-controls={`${id}-panel`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(tab.value)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={[
              'flex min-h-12 flex-1 cursor-pointer items-center justify-center gap-3 border border-ink px-5 font-heading font-semibold transition-[color,background-color,box-shadow] duration-200 sm:flex-none sm:px-8 sm:text-lg',
              selected
                ? 'relative z-10 bg-ink text-cream shadow-[0_0_22px_3px_rgb(248_209_15/0.5)]'
                : 'text-ink hover:bg-cream-deep',
              i > 0 ? '-ml-px' : '',
            ].join(' ')}
          >
            <Square
              tone={selected ? 'yellow' : 'ink'}
              angle={selected ? 4 : 0}
              className="size-2.5 transition-transform duration-300"
            />
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
