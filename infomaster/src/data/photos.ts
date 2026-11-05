import data from './photos.json'

/** Fotos de Unsplash elegidas en scripts/fetch-unsplash.mjs (`npm run photos`). */
export type PhotoSlot = keyof typeof data
export type Photo = (typeof data)[PhotoSlot]

export type PhotoCrop = 'left' | 'right' | 'top' | 'bottom'

export const PHOTOS = data

function sized(photo: Photo, width: number, ratio?: number, crop?: PhotoCrop) {
  const params = new URLSearchParams({ w: String(width), q: '72', auto: 'format', fit: 'crop' })
  if (ratio) params.set('h', String(Math.round(width / ratio)))
  if (crop) params.set('crop', crop)
  return `${photo.url}&${params}`
}

/** `src` y `srcSet` listos para un <img>; `ratio` (ancho/alto) recorta en el CDN. */
export function photoProps(slot: PhotoSlot, widths: number[], ratio?: number, crop?: PhotoCrop) {
  const photo = PHOTOS[slot]
  return {
    src: sized(photo, widths[0], ratio, crop),
    srcSet: widths.map((w) => `${sized(photo, w, ratio, crop)} ${w}w`).join(', '),
    alt: photo.alt,
  }
}

/** Autores sin repetir, para el crédito del pie de página. */
export const PHOTO_CREDITS = [
  ...new Map(Object.values(PHOTOS).map((p) => [p.author, p.authorUrl])).entries(),
].map(([author, url]) => ({ author, url }))
