import type { IconType } from 'react-icons'
import { LuCalendarCheck, LuFileCheck, LuUsers, LuWrench } from 'react-icons/lu'
import { contactHref } from '../../data/nav'
import { LinkButton } from '../ui/Button'
import { ArrowRightIcon } from '../ui/Icon'
import { IconBox } from '../ui/IconBox'
import { Photo } from '../ui/Photo'

const SERVICIOS: { icon: IconType; titulo: string; texto: string }[] = [
  { icon: LuCalendarCheck, titulo: 'Plan anual', texto: 'Aprovecha el crédito antes de que caduque.' },
  { icon: LuUsers, titulo: 'Toda la plantilla', texto: 'Muchos alumnos, un solo contacto.' },
  { icon: LuWrench, titulo: 'Cursos a medida', texto: 'Tu temario y tu horario.' },
  { icon: LuFileCheck, titulo: 'FUNDAE tramitado', texto: 'Tu asesoría solo aplica el descuento.' },
]

type Props = {
  /** h2 cuando el bloque es una sección propia (Formación); h3 dentro del selector. */
  headingLevel?: 'h2' | 'h3'
  headingId?: string
}

export function ForCompanies({ headingLevel = 'h3', headingId }: Props) {
  const Heading = headingLevel
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-8">
      <div className="lg:col-span-5">
        <Photo slot="empresas" ratio={5 / 4} sizes="(max-width: 1023px) 92vw, 40vw" />
      </div>

      <div className="lg:col-span-6 lg:col-start-7">
        <Heading
          id={headingId}
          className="text-3xl leading-[1.05] font-bold tracking-[-0.02em] sm:text-4xl"
        >
          Tú eliges. Nosotros gestionamos.
        </Heading>

        <ul className="mt-8 grid gap-6 sm:grid-cols-2">
          {SERVICIOS.map(({ icon, titulo, texto }) => (
            <li key={titulo} className="flex gap-4">
              <IconBox icon={icon} />
              <div>
                <p className="font-heading text-lg leading-tight font-semibold">{titulo}</p>
                <p className="mt-1 leading-snug text-ink-muted text-pretty">{texto}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <LinkButton to="/formacion#calculadora" variant="primary">
            Calcula tu crédito
            <ArrowRightIcon className="size-4" />
          </LinkButton>
          <LinkButton to={contactHref()} variant="outline">
            Hablemos
          </LinkButton>
        </div>
      </div>
    </div>
  )
}
