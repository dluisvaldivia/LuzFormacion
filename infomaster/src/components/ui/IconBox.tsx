import type { IconType } from 'react-icons'

/** Cuadro de icono con filete: el cuadrado de la marca, con contenido. */
export function IconBox({ icon: Icon }: { icon: IconType }) {
  return (
    <span
      aria-hidden="true"
      className="flex size-11 shrink-0 items-center justify-center border border-ink text-ink"
    >
      <Icon size={22} strokeWidth={1.75} strokeLinecap="square" strokeLinejoin="miter" />
    </span>
  )
}
