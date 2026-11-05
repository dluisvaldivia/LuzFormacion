import type { IconType } from 'react-icons'
import {
  LuBanknote,
  LuCalendarClock,
  LuFileCheck,
  LuGraduationCap,
  LuHourglass,
  LuLayoutGrid,
  LuMonitorPlay,
  LuReceiptText,
  LuWallet,
} from 'react-icons/lu'
import { Link } from 'react-router'
import {
  PASOS_CREDITO,
  VALOR_PRINCIPAL,
  VALUE_PROPS,
  type CreditStep,
  type ValueProp,
} from '../../data/valueProps'
import { LinkButton } from '../ui/Button'
import { ArrowRightIcon, ExternalIcon } from '../ui/Icon'

const STEP_ICONS: Record<string, IconType> = {
  credito: LuWallet,
  adelanto: LuBanknote,
  recuperas: LuReceiptText,
  'fin-de-ano': LuHourglass,
}

const PROP_ICONS: Record<string, IconType> = {
  tutores: LuGraduationCap,
  fundae: LuFileCheck,
  pif: LuCalendarClock,
  campus: LuMonitorPlay,
  modalidades: LuLayoutGrid,
}

/**
 * Por qué Infomaster: el argumento del coste cero en grande, el mecanismo del
 * crédito en cuatro pasos y, debajo, el resto como filas de tabla. Asimetría a
 * propósito: no son nueve cosas iguales.
 */
export function ValueProps() {
  return (
    <section aria-labelledby="valor-title" className="pt-20 lg:pt-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-8 border-t border-ink pt-8 lg:grid-cols-12 lg:gap-8 lg:pt-10">
          <h2
            id="valor-title"
            className="text-[clamp(2.75rem,7vw,5.25rem)] leading-[0.95] font-bold tracking-[-0.035em] [font-stretch:125%] lg:col-span-7"
          >
            Formación a coste{' '}
            {/* Amarillo = resaltado: el sistema lo reserva para esto. */}
            <mark className="bg-brand-yellow px-[0.06em] text-ink">cero</mark>
          </h2>

          <div className="lg:col-span-5 lg:pt-3">
            <p className="max-w-[44ch] text-xl leading-snug font-semibold text-ink text-pretty">
              {VALOR_PRINCIPAL.cierre}
            </p>
            <LinkButton to="/formacion#calculadora" variant="primary" size="lg" className="mt-8">
              Calcula tu crédito
              <ArrowRightIcon className="size-4" />
            </LinkButton>
          </div>
        </div>

        <CreditFlow />

        <h3 className="sr-only">Qué más incluye</h3>
        <ul className="mt-16 border-y border-line lg:mt-20">
          {VALUE_PROPS.map((prop) => (
            <ValueRow key={prop.id} prop={prop} />
          ))}
        </ul>
      </div>
    </section>
  )
}

/** Cuadro de icono con filete: el cuadrado de la marca, con contenido. */
function IconBox({ icon: Icon }: { icon: IconType }) {
  return (
    <span
      aria-hidden="true"
      className="flex size-11 shrink-0 items-center justify-center border border-ink text-ink"
    >
      <Icon size={22} strokeWidth={1.75} strokeLinecap="square" strokeLinejoin="miter" />
    </span>
  )
}

function CreditFlow() {
  return (
    <ol
      aria-label="Cómo funciona el crédito de formación"
      className="mt-14 grid gap-px border-y border-ink bg-line sm:grid-cols-2 lg:mt-16 lg:grid-cols-4"
    >
      {PASOS_CREDITO.map((step) => (
        <CreditCell key={step.id} step={step} />
      ))}
    </ol>
  )
}

function CreditCell({ step }: { step: CreditStep }) {
  return (
    <li
      className={[
        'flex gap-4 p-6 sm:flex-col sm:gap-8 lg:p-7',
        step.aviso ? 'bg-brand-yellow text-ink' : 'bg-cream',
      ].join(' ')}
    >
      <IconBox icon={STEP_ICONS[step.id]} />
      <div>
        <h3 className="text-lg leading-tight font-bold tracking-[-0.015em]">{step.titulo}</h3>
        <p className="mt-2 max-w-[28ch] leading-snug text-pretty text-ink">{step.texto}</p>
      </div>
    </li>
  )
}

function ValueRow({ prop }: { prop: ValueProp }) {
  const destacada = Boolean(prop.nota)
  return (
    <li
      id={prop.id}
      className={[
        'grid scroll-mt-24 gap-4 px-4 py-7 not-first:border-t not-first:border-line lg:grid-cols-12 lg:gap-8 lg:px-6 lg:py-9',
        destacada ? 'bg-brand-yellow text-ink' : '',
      ].join(' ')}
    >
      <div className="flex items-start gap-4 lg:col-span-5">
        <IconBox icon={PROP_ICONS[prop.id]} />
        <div>
          <h4 className="text-xl leading-tight font-bold tracking-[-0.015em] sm:text-2xl">
            {prop.titulo}
          </h4>
          {prop.nota && (
            <span className="mt-2 inline-block bg-ink px-2 py-0.5 font-heading text-xs font-semibold text-brand-yellow">
              {prop.nota}
            </span>
          )}
        </div>
      </div>

      <div className="lg:col-span-7">
        <p
          className={[
            'max-w-[60ch] leading-relaxed text-pretty',
            destacada ? 'text-ink' : 'text-ink-muted',
          ].join(' ')}
        >
          {prop.texto}
        </p>
        {prop.enlace && <RowLink {...prop.enlace} />}
      </div>
    </li>
  )
}

const LINK =
  'mt-3 inline-flex min-h-11 items-center gap-1.5 font-heading text-sm font-semibold ' +
  'text-brand-red-deep underline underline-offset-4 hover:text-brand-red-dark'

function RowLink({ texto, href, externo }: NonNullable<ValueProp['enlace']>) {
  if (externo) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={LINK}>
        {texto}
        <ExternalIcon className="size-3.5" />
        <span className="sr-only">(se abre en una pestaña nueva)</span>
      </a>
    )
  }
  return (
    <Link to={href} className={LINK}>
      {texto}
      <ArrowRightIcon className="size-3.5" />
    </Link>
  )
}
