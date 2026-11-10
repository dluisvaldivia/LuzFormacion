import { publicUrl } from '../lib/publicUrl'

/**
 * Derivados WebP generados por scripts/make-headshots.py desde
 * src/assets/headshots/ (los originales se conservan ahí sin tocar). Cada
 * entrada tiene versión 400 y 800 px cuadrada, con la cabeza centrada.
 */
export type Headshot = {
  slug: string
  alt: string
}

export const HEADSHOTS: Headshot[] = [
  { slug: 'headshot-1', alt: 'Alumno sonriente de un curso de Luz Formación' },
  { slug: 'headshot-2', alt: 'Alumna sonriente en su puesto de trabajo' },
  { slug: 'headshot-3', alt: 'Profesional sonriente tras completar su formación' },
  { slug: 'headshot-4', alt: 'Alumna sonriente de un curso bonificado' },
  { slug: 'headshot-5', alt: 'Trabajador sonriente con casco en su entorno laboral' },
  { slug: 'headshot-6', alt: 'Profesional sonriente formado con Luz Formación' },
  { slug: 'headshot-7', alt: 'Trabajador sonriente de un curso de logística' },
]

/** Súbelo al regenerar los WebP: public/ no lleva hash y el navegador los cachea. */
const VERSION = 3

export function headshotSrc(slug: string, width: 400 | 800) {
  return `${publicUrl(`images/headshots/${slug}-${width}.webp`)}?v=${VERSION}`
}
