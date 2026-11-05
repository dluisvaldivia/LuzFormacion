import { photoProps, type PhotoCrop, type PhotoSlot } from '../../data/photos'

type Props = {
  slot: PhotoSlot
  /** Ancho/alto: la foto llega ya recortada del CDN. */
  ratio: number
  /** Qué lado conservar al recortar; por defecto, el centro. */
  crop?: PhotoCrop
  sizes: string
  priority?: boolean
  className?: string
}

const WIDTHS = [480, 800, 1200]

/** Foto de Unsplash con su hueco reservado: nunca mueve el layout al cargar. */
export function Photo({ slot, ratio, crop, sizes, priority = false, className }: Props) {
  return (
    <img
      {...photoProps(slot, WIDTHS, ratio, crop)}
      sizes={sizes}
      width={1200}
      height={Math.round(1200 / ratio)}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      style={{ aspectRatio: ratio }}
      className={['block w-full bg-cream-deep object-cover', className].filter(Boolean).join(' ')}
    />
  )
}
