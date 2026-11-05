import type { CSSProperties } from 'react'

/**
 * El cuadrado de la marca como único ornamento del sistema: viñetas, marcador
 * de navegación activa. El ángulo es el del logo.
 */
type Tone = 'red' | 'yellow' | 'ink'
type Angle = 0 | 4

const TONES: Record<Tone, string> = {
  red: 'bg-brand-red',
  yellow: 'bg-brand-yellow',
  ink: 'bg-ink',
}

const ANGLES: Record<Angle, string> = {
  0: '',
  4: 'rotate-[4deg]',
}

type Props = {
  tone?: Tone
  angle?: Angle
  className?: string
}

export function Square({ tone = 'red', angle = 0, className = 'size-2' }: Props) {
  return (
    <span
      aria-hidden="true"
      className={['inline-block shrink-0', TONES[tone], ANGLES[angle], className].join(' ')}
    />
  )
}

/**
 * Los dos cuadrados del logo: iguales, desplazados en diagonal, y su cruce en
 * rojo oscuro para que se lean como un cubo. El giro de 4° es el «casi» perfecto.
 */
const LOGO_SQUARES = [
  { x: 46, y: 14, size: 100, fill: '#F8D10F' }, // amarillo detrás
  { x: 14, y: 46, size: 100, fill: '#D93D2D' }, // rojo delante
  { x: 46, y: 46, size: 68, fill: '#8F2418' }, // cruce (brand-red-dark)
] as const

const LOGO_MARK_SIZE = 160
const LOGO_ANGLE = 4

export function LogoSquares({ animated = false }: { animated?: boolean }) {
  const motion = animated ? 'origin-center [transform-box:fill-box] animate-square-in' : undefined
  const center = LOGO_MARK_SIZE / 2
  // El giro fijo va en el <g>: con transform-box:fill-box, transform-origin
  // también desplaza el atributo transform del propio <rect> y lo saca de sitio.
  return (
    <g transform={`rotate(${LOGO_ANGLE} ${center} ${center})`}>
      {LOGO_SQUARES.map(({ x, y, size, fill }, index) => (
        <rect
          key={fill}
          x={x}
          y={y}
          width={size}
          height={size}
          fill={fill}
          className={motion}
          style={
            animated
              ? ({ '--undo': `${-LOGO_ANGLE * 6}deg`, animationDelay: `${index * 120}ms` } as CSSProperties)
              : undefined
          }
        />
      ))}
    </g>
  )
}

/**
 * El cubo del logo a cualquier escala, con la misma geometría.
 * `animated` hace el único gesto de movimiento del sitio: los cuadrados
 * entran girando hasta su sitio. Se anula con reduced-motion.
 */
export function LogoMark({
  className,
  animated = false,
}: {
  className?: string
  animated?: boolean
}) {
  return (
    <svg
      viewBox={`0 0 ${LOGO_MARK_SIZE} ${LOGO_MARK_SIZE}`}
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <LogoSquares animated={animated} />
    </svg>
  )
}
