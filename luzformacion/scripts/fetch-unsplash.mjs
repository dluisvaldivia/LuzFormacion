/**
 * Genera src/data/photos.json con las fotos elegidas de Unsplash.
 *
 * Uso: `npm run photos` (lee UNSPLASH_ACCESS_KEY de .env).
 * La clave solo se usa aquí: la web lee el JSON, así que ni el navegador ni el
 * CI la necesitan. Las condiciones de la API piden enlazar la imagen desde
 * Unsplash, registrar la descarga y citar al autor (ver el pie de página).
 *
 * Para cambiar una foto: pon otro `id` y vuelve a ejecutar. Cada foto gasta dos
 * peticiones, y la cuota de demo es baja: no lo lances en bucle.
 */
import { readFileSync, writeFileSync } from 'node:fs'

const SLOTS = {
  hero: { id: 'vBg0dxwfIYM', alt: 'Profesor explicando a un grupo de adultos en un aula luminosa' },
  empresas: { id: 'g1Kr4Ozfoac', alt: 'Tres compañeras de trabajo riendo alrededor de un portátil' },
  trabajadores: { id: 'hutmLbMs90o', alt: 'Trabajador con casco y chaleco naranja sobre un fondo amarillo' },
  tutores: { id: 'QLYH-AU2p60', alt: 'Mujer sonriente de pelo rizado trabajando con un portátil' },
  construccion: { id: '74tW4FXP4Hw', alt: 'Cuadrilla con ropa naranja en una obra' },
  mecanica: { id: 'XP8o9_Arwqg', alt: 'Mecánico revisando un coche en el taller' },
  oficina: { id: 'JaoVGh5aJ3E', alt: 'Dos compañeras trabajando con un portátil' },
  hosteleria: { id: 'y-XZf_TNRms', alt: 'Cocinero cortando verduras en una cocina profesional' },
  logistica: { id: '6tAIO3pxde4', alt: 'Carretilla elevadora naranja en un almacén' },
  prevencion: { id: '9OB46apMbC4', alt: 'Casco de seguridad rojo sobre el suelo de una obra' },
  idiomas: { id: 'iQPr1XkF5F0', alt: 'Mujer con libros de texto para estudiar idiomas' },
  informatica: { id: 'pjAH2Ax4uWk', alt: 'Persona trabajando frente a un ordenador' },
  finanzas: { id: 'LNnmSumlwO4', alt: 'Persona en un escritorio con calculadora y cuaderno' },
}

const KEY = process.env.UNSPLASH_ACCESS_KEY
if (!KEY) {
  console.error('Falta UNSPLASH_ACCESS_KEY. Ejecuta `npm run photos` con el .env creado.')
  process.exit(1)
}

const headers = { Authorization: `Client-ID ${KEY}` }
const REFERRAL = 'utm_source=luz_formacion&utm_medium=referral'

async function api(url) {
  const response = await fetch(url, { headers })
  if (!response.ok) throw new Error(`Unsplash respondió ${response.status} en ${new URL(url).pathname}`)
  return response.json()
}

// Solo se piden las fotos nuevas o cambiadas: cada una gasta dos peticiones de la cuota.
const OUT = new URL('../src/data/photos.json', import.meta.url)
let previous = {}
try {
  previous = JSON.parse(readFileSync(OUT, 'utf8'))
} catch {}

const photos = {}
for (const [slot, { id, alt }] of Object.entries(SLOTS)) {
  if (previous[slot]?.id === id && previous[slot]?.alt === alt) {
    photos[slot] = previous[slot]
    continue
  }
  const photo = await api(`https://api.unsplash.com/photos/${id}`)
  await api(photo.links.download_location)
  photos[slot] = {
    id,
    alt,
    url: photo.urls.raw,
    width: photo.width,
    height: photo.height,
    author: photo.user.name,
    authorUrl: `${photo.user.links.html}?${REFERRAL}`,
  }
  console.log(`${slot}: ${photo.user.name}`)
}

writeFileSync(OUT, `${JSON.stringify(photos, null, 2)}\n`)
