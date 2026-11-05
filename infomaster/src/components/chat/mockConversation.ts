/**
 * Textos del chat. Lo que no viene del RAG está aislado aquí.
 *
 * `CANNED_REPLY` ya no es la respuesta por defecto: ahora es el fallback para
 * cuando el backend no contesta (el Space gratuito duerme tras inactividad).
 */
import { BRAND } from '../../data/brand'

export type ChatMessage = {
  id: string
  author: 'ai' | 'user'
  text: string
}

export const ASSISTANT_NAME = `Asistente ${BRAND.short}`

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'ai-welcome',
    author: 'ai',
    text: `¡Hola! Soy el asistente de ${BRAND.name}. Dime qué tema te interesa o a qué se dedica tu empresa y busco en el catálogo.`,
  },
]

/**
 * Sugerencias que el catálogo puede responder de verdad.
 *
 * Ojo: preguntas como "¿cuánto crédito me queda?" NO tienen respuesta aquí —
 * el crédito de FUNDAE es por empresa y no está en el Excel del catálogo.
 * Y los precios se derivan siempre al equipo, a propósito.
 */
export const SUGGESTIONS = [
  '¿Tenéis cursos de prevención de riesgos?',
  'Cursos de informática de menos de 100 horas',
  '¿Qué familias de cursos ofrecéis?',
]

/** Fallback cuando el servicio RAG no responde. */
export const CANNED_REPLY =
  `Ahora mismo no consigo consultar el catálogo. Escríbenos a ${BRAND.email} y te atendemos enseguida.`
