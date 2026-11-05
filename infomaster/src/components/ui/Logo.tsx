import { BRAND } from '../../data/brand'
import { LogoSquares } from './Square'

type Props = {
  className?: string
  /** `light` para fondos oscuros (footer en tinta). */
  tone?: 'dark' | 'light'
}

/** Cubo a la izquierda y wordmark LUZ / formación a la derecha. */
export function Logo({ className, tone = 'dark' }: Props) {
  const text = tone === 'light' ? '#FAF7EF' : '#1A1614'

  return (
    <svg viewBox="0 0 356 160" role="img" aria-label={BRAND.name} className={className}>
      <LogoSquares />
      <text
        x="172"
        y="86"
        fontFamily="Archivo, sans-serif"
        fontSize="78"
        fontWeight="800"
        textLength="178"
        lengthAdjust="spacingAndGlyphs"
        fill={text}
      >
        LUZ
      </text>
      <text
        x="173"
        y="130"
        fontFamily="Archivo, sans-serif"
        fontSize="40"
        fontWeight="600"
        textLength="176"
        lengthAdjust="spacingAndGlyphs"
        fill={text}
      >
        formación
      </text>
    </svg>
  )
}
