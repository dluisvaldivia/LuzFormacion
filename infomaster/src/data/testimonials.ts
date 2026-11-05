import { headshotSrc } from './headshots'

export type Testimonial = {
  name: string
  role: string
  quote: string
  photo: string
}

/** Opiniones de ejemplo para la demo; el pie de página lo indica. */
export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Marta Gil',
    role: 'Administración',
    quote: 'Mejoré en mi trabajo y conseguí una promoción.',
    photo: headshotSrc('headshot-2', 400),
  },
  {
    name: 'Javier Ruiz',
    role: 'Logística',
    quote: 'Lo compaginé con mi jornada. El temario va al grano.',
    photo: headshotSrc('headshot-5', 400),
  },
  {
    name: 'Lucía Fernández',
    role: 'Atención al cliente',
    quote: 'Tramitaron la bonificación sin que yo hiciera papeleo.',
    photo: headshotSrc('headshot-3', 400),
  },
]
