import { publicUrl } from '../lib/publicUrl'

/** Derivados WebP de src/assets/headshots/, en 400 y 800 px cuadrados. */
export function headshotSrc(slug: string, width: 400 | 800) {
  return publicUrl(`images/headshots/${slug}-${width}.webp`)
}
