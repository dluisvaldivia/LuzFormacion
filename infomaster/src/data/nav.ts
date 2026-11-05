import { BRAND } from './brand'

export type NavItem = {
  label: string
  to: string
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Inicio', to: '/' },
  { label: 'Formación', to: '/formacion' },
  { label: 'Cursos', to: '/cursos' },
  { label: 'Nosotros', to: '/nosotros' },
  { label: 'Contacto', to: '/contacto' },
]

/** Datos ficticios de la demo: sin teléfono para no llamar a nadie real. */
export const CONTACT = {
  company: BRAND.name,
  address: BRAND.address,
  email: BRAND.email,
} as const

/** El formulario de contacto, con el curso ya escrito si viene de una ficha. */
export function contactHref(curso?: string) {
  return curso ? `/contacto?curso=${encodeURIComponent(curso)}` : '/contacto'
}
