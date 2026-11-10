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
import { ArrowRightIcon } from '../ui/Icon'
import { IconBox } from '../ui/IconBox'
import { Photo } from '../ui/Photo'

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
 * El cubo del logo (dos cuadrados desplazados y su cruce) en trazo fino sobre
 * amarillo, repetido en baldosa de 80×80. SVG en data URI: sin petición extra.
 */
const CUBES_TILE = 80
const CUBES_PATTERN = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${CUBES_TILE}" height="${CUBES_TILE}" viewBox="0 0 ${CUBES_TILE} ${CUBES_TILE}">` +
    '<rect width="100%" height="100%" fill="#F8D10F"/>' +
    '<rect x="23" y="23" width="34" height="34" fill="#E3B800"/>' +
    '<g fill="none" stroke="#1a1614" stroke-width="1">' +
    '<rect x="23.5" y="7.5" width="50" height="50"/>' +
    '<rect x="7.5" y="23.5" width="50" height="50"/>' +
    '<rect x="23.5" y="23.5" width="34" height="34"/></g></svg>',
)}")`

/** El coste cero en grande, el crédito en cuatro pasos y lo demás junto a una foto. */
export function ValueProps() {
  return (
    <section aria-labelledby="valor-title" className="relative isolate pt-20 pb-20 lg:pt-28 lg:pb-28">
      {/* Solo el fondo al 6%: el texto queda a opacidad completa. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.06]"
        style={{ backgroundImage: CUBES_PATTERN, backgroundSize: `${CUBES_TILE}px ${CUBES_TILE}px` }}
      />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-8">
          <h2
            id="valor-title"
            className="text-[clamp(2.75rem,7vw,5.25rem)] leading-[0.95] font-bold tracking-[-0.035em] [font-stretch:125%] lg:col-span-7"
          >
            {/* Subrayado tipo rotulador: banda roja en el tercio inferior del texto. */}
            <span className="[-webkit-box-decoration-break:clone] bg-[linear-gradient(transparent_64%,var(--color-brand-red)_64%_94%,transparent_94%)] [box-decoration-break:clone]">
              Formación a coste
            </span>{' '}
            {/* Amarillo = resaltado: el sistema lo reserva para esto. */}
            <mark className="bg-brand-yellow px-[0.06em] text-ink">cero</mark>
          </h2>

          <div className="lg:col-span-5">
            <p className="max-w-[34ch] text-xl leading-snug font-semibold text-ink text-pretty">
              {VALOR_PRINCIPAL.cierre}
            </p>
          </div>
        </div>

        <ol
          aria-label="Cómo funciona el crédito de formación"
          className="mt-12 grid gap-px border-y border-ink bg-line sm:grid-cols-2 lg:mt-14 lg:grid-cols-4"
        >
          {PASOS_CREDITO.map((step) => (
            <CreditCell key={step.id} step={step} />
          ))}
        </ol>

        <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="lg:col-span-5">
            <Photo slot="tutores" ratio={5 / 4} sizes="(max-width: 1023px) 92vw, 40vw" />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <h3 className="text-3xl leading-[1.05] font-bold tracking-[-0.02em] sm:text-4xl">
              Todo incluido
            </h3>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {VALUE_PROPS.map((prop) => (
                <ValueRow key={prop.id} prop={prop} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function CreditCell({ step }: { step: CreditStep }) {
  return (
    <li
      className={[
        'flex items-center gap-4 p-5 sm:flex-col sm:items-start sm:gap-6 lg:p-6',
        step.aviso ? 'bg-brand-yellow text-ink' : 'bg-cream',
      ].join(' ')}
    >
      <IconBox icon={STEP_ICONS[step.id]} />
      <div>
        <h3 className="text-lg leading-tight font-bold tracking-[-0.015em]">{step.titulo}</h3>
        <p className="mt-1 leading-snug text-pretty text-ink">{step.texto}</p>
      </div>
    </li>
  )
}

function ValueRow({ prop }: { prop: ValueProp }) {
  return (
    <li id={prop.id} className="flex scroll-mt-24 items-center gap-4 py-4">
      <IconBox icon={PROP_ICONS[prop.id]} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h4 className="text-lg leading-tight font-bold tracking-[-0.015em]">{prop.titulo}</h4>
          {prop.nota && (
            <span className="bg-brand-yellow px-2 py-0.5 font-heading text-xs font-semibold text-ink">
              {prop.nota}
            </span>
          )}
        </div>
        <p className="mt-0.5 text-ink-muted text-pretty">{prop.texto}</p>
      </div>
      {prop.enlace && (
        <Link
          to={prop.enlace.href}
          aria-label={prop.enlace.texto}
          title={prop.enlace.texto}
          className="inline-flex size-11 shrink-0 items-center justify-center bg-brand-yellow text-ink transition-colors hover:bg-ink hover:text-brand-yellow"
        >
          <ArrowRightIcon className="size-5" />
        </Link>
      )}
    </li>
  )
}

/** Cierre de la portada: la misma acción del hero, cuando ya se ha convencido. */
export function ClosingCta() {
  return (
    <section className="bg-brand-yellow">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-14 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-16">
        <h2 className="text-[clamp(2.25rem,5vw,3.75rem)] leading-[1] font-bold tracking-[-0.03em] [font-stretch:125%]">
          ¿Cuánto crédito tienes?
        </h2>
        <LinkButton to="/formacion#calculadora" variant="primary" size="lg" className="shrink-0">
          Calcúlalo en un minuto
          <ArrowRightIcon className="size-4" />
        </LinkButton>
      </div>
    </section>
  )
}
