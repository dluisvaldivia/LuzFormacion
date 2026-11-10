/**
 * Lo que aportamos, en el orden en que se lee en la portada.
 * `nota` pinta un distintivo junto al título: uno, como mucho dos.
 */
export type ValueProp = {
  id: string
  titulo: string
  texto: string
  nota?: string
  enlace?: { texto: string; href: string }
}

export const VALOR_PRINCIPAL = {
  cierre: 'Calculamos tu crédito y lo gestionamos de principio a fin.',
} as const

/** El crédito en cuatro pasos. El último (`aviso`) es la urgencia. */
export type CreditStep = { id: string; titulo: string; texto: string; aviso?: boolean }

export const PASOS_CREDITO: CreditStep[] = [
  { id: 'credito', titulo: 'Tienes un crédito', texto: 'Cada empresa, cada año.' },
  { id: 'adelanto', titulo: 'Adelantas el curso', texto: 'La empresa lo paga.' },
  { id: 'recuperas', titulo: 'Lo recuperas', texto: 'Se descuenta de la Seguridad Social.' },
  { id: 'fin-de-ano', titulo: 'Antes de fin de año', texto: 'Si no se usa, se pierde.', aviso: true },
]

export const VALUE_PROPS: ValueProp[] = [
  { id: 'tutores', titulo: 'Tutores en activo', texto: 'Expertos que corrigen y resuelven dudas.' },
  { id: 'fundae', titulo: 'Cero papeleo', texto: 'Tramitamos FUNDAE. Tu empresa solo firma.' },
  {
    id: 'pif',
    titulo: 'Permiso Individual de Formación',
    texto: 'Hasta 200 horas retribuidas al año.',
  },
  { id: 'campus', titulo: 'Campus 24/7 y diploma', texto: 'A cualquier hora, con diploma acreditativo.' },
  {
    id: 'modalidades',
    titulo: 'Presencial, online o mixta',
    texto: 'Grupos con fecha o a medida.',
    enlace: { texto: 'Próximos cursos', href: '/cursos#proximos-cursos' },
  },
]
