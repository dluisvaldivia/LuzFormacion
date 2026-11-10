# Luz Formación

Rediseño de la web de Luz Formación, empresa de formación para empresas con sede en Málaga.

**Web en vivo: https://dluisvaldivia.github.io/LuzFormacion/**

[![CI/CD](https://github.com/dluisvaldivia/LuzFormacion/actions/workflows/ci.yml/badge.svg)](https://github.com/dluisvaldivia/LuzFormacion/actions/workflows/ci.yml)

## Qué hay en el repo

| Carpeta | Contenido |
| --- | --- |
| [`luzformacion/`](luzformacion/) | La web: Vite + React 19 + TypeScript + Tailwind CSS v4 |
| [`rag/`](rag/) | Servicio RAG (Python) que alimenta el chat con el catálogo de cursos |
| [`.github/workflows/`](.github/workflows/) | CI/CD: lint, build y despliegue en GitHub Pages |

## Desarrollo local

Requiere Node 22.

```bash
cd luzformacion
npm install
npm run dev       # servidor de desarrollo
npm run lint      # oxlint
npm run build     # tsc + build de producción en dist/
npm run preview   # sirve el build
```

El chat necesita el servicio RAG. Copia `luzformacion/.env.example` a `luzformacion/.env.local` y apunta `VITE_RAG_URL` al servicio. Las instrucciones para arrancarlo están en [`rag/README.md`](rag/README.md).

## Contenido de la web

| Ruta | Qué muestra |
| --- | --- |
| `/` | Portada: formación a coste cero, servicios para empresas y trabajadores, próximos cursos presenciales |
| `/formacion` | Formación bonificada: empresas, trabajadores y, al final, la calculadora de crédito FUNDAE |
| `/cursos` | Pestañas «Cursos online» (áreas: construcción, mecánica, prevención, hostelería, logística, oficina, idiomas, informática, finanzas) y «Cursos presenciales» (fechas) |
| `/contacto` | Formulario de contacto |

La página [`Nosotros`](luzformacion/src/pages/Nosotros.tsx) está en el código, pero oculta: sin ruta ni enlace en el menú. Para mostrarla, restaura la ruta en `App.tsx` y la entrada en `data/nav.ts`.

### Fotos (Unsplash)

Las fotos se definen en [`scripts/fetch-unsplash.mjs`](luzformacion/scripts/fetch-unsplash.mjs) y se guardan en `src/data/photos.json`. Para añadir o cambiar una, edita su `id` y ejecuta `npm run photos` (requiere `UNSPLASH_ACCESS_KEY` en `luzformacion/.env`; solo se piden las fotos nuevas o cambiadas). Los autores se citan solos en el pie de página.

## CI/CD

El workflow [`ci.yml`](.github/workflows/ci.yml) se ejecuta en cada push y pull request:

1. `npm ci`, `npm run lint` y `npm run build`.
2. Solo en `main`: publica `luzformacion/dist` en GitHub Pages.

Para el despliegue, la app se compila con `BASE_PATH=/LuzFormacion/` porque Pages la sirve en esa subruta. Además, se copia `index.html` a `404.html` para que al recargar una ruta interna (por ejemplo, `/cursos`) cargue igualmente la app.

Para activar el chat en la web publicada, crea la variable de repositorio `VITE_RAG_URL` en *Settings → Secrets and variables → Actions → Variables* con la URL pública del servicio RAG.

## Licencia

Ver [LICENSE](LICENSE).
