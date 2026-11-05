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
import { writeFileSync } from 'node:fs'

const SLOTS = {
  hero: { id: 'vBg0dxwfIYM', alt: 'Profesor explicando a un grupo de adultos en un aula luminosa' },
  empresas: { id: 'g1Kr4Ozfoac', alt: 'Tres compañeras de trabajo riendo alrededor de un portátil' },
  trabajadores: { id: 'hutmLbMs90o', alt: 'Trabajador con casco y chaleco naranja sobre un fondo amarillo' },
  tutores: { id: 'cPyO3GEYjZ4', alt: 'Formadora explicando junto a una pizarra' },
  construccion: { id: '74tW4FXP4Hw', alt: 'Cuadrilla con ropa naranja en una obra' },
  mecanica: { id: 'XP8o9_Arwqg', alt: 'Mecánico revisando un coche en el taller' },
  oficina: { id: 'JaoVGh5aJ3E', alt: 'Dos compañeras trabajando con un portátil' },
  hosteleria: { id: 'y-XZf_TNRms', alt: 'Cocinero cortando verduras en una cocina profesional' },
  logistica: { id: '6tAIO3pxde4', alt: 'Carretilla elevadora naranja en un almacén' },
  prevencion: { id: '9OB46apMbC4', alt: 'Casco de seguridad rojo sobre el suelo de una obra' },
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

const photos = {}
for (const [slot, { id, alt }] of Object.entries(SLOTS)) {
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

writeFileSync(new URL('../src/data/photos.json', import.meta.url), `${JSON.stringify(photos, null, 2)}\n`)
