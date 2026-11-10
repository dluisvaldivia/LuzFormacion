import { useId, useRef, useState, type ReactNode } from 'react'
import { LuChevronDown } from 'react-icons/lu'
import { Button, LinkButton } from '../ui/Button'
import { ArrowRightIcon } from '../ui/Icon'
import { HelpTip } from '../ui/HelpTip'
import { Square } from '../ui/Square'
import {
  FP_RATE,
  MIN_CREDIT,
  calculateCredit,
  formatEuro,
  type CreditInput,
  type CreditResult,
} from './creditRules'

const STEPS = ['Introducción', 'Datos de la empresa', 'Resultado'] as const
type Step = 0 | 1 | 2

type QuotaMode = 'salary' | 'quota'
type Errors = Partial<Record<'isNew' | 'newWorkers' | 'headcount' | 'amount' | 'erteWorkers', string>>

/** Admite el formato español: «12.500,50» → 12500.5 */
function parseAmount(raw: string) {
  const clean = raw.replace(/[\s€]/g, '').replace(/\./g, '').replace(',', '.')
  if (clean === '') return NaN
  return Number(clean)
}

function parseCount(raw: string) {
  const n = parseAmount(raw)
  return Number.isInteger(n) ? n : NaN
}

export function CreditCalculator() {
  const [step, setStep] = useState<Step>(0)
  const [isNew, setIsNew] = useState<boolean | null>(null)
  const [newWorkers, setNewWorkers] = useState('')
  const [headcount, setHeadcount] = useState('')
  const [quotaMode, setQuotaMode] = useState<QuotaMode>('salary')
  const [amount, setAmount] = useState('')
  const [hasErte, setHasErte] = useState(false)
  const [erteWorkers, setErteWorkers] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [result, setResult] = useState<CreditResult | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  function goTo(next: Step) {
    setStep(next)
    // el foco acompaña al cambio de paso, para teclado y lector de pantalla
    requestAnimationFrame(() => panelRef.current?.focus({ preventScroll: true }))
    panelRef.current?.closest('section')?.scrollIntoView({ block: 'start', behavior: 'smooth' })
  }

  function submit() {
    const errs: Errors = {}
    let input: CreditInput | null = null
    const erte = hasErte ? parseCount(erteWorkers) : 0
    if (hasErte && !(erte > 0)) errs.erteWorkers = 'Indica cuántas personas en ERTE vas a formar.'

    if (isNew === null) {
      errs.isNew = 'Elige una opción.'
    } else if (isNew) {
      const n = parseCount(newWorkers)
      if (!(n > 0)) errs.newWorkers = 'Introduce un número entero mayor que 0.'
      else input = { kind: 'new', newWorkers: n, erteWorkers: erte }
    } else {
      const h = parseCount(headcount)
      const a = parseAmount(amount)
      if (!(h > 0)) errs.headcount = 'Introduce un número entero mayor que 0.'
      if (!(a > 0)) errs.amount = 'Introduce un importe mayor que 0.'
      if (h > 0 && a > 0) {
        const fpQuota = quotaMode === 'salary' ? a * FP_RATE : a
        input = { kind: 'existing', headcount: h, fpQuota, erteWorkers: erte }
      }
    }

    setErrors(errs)
    if (Object.keys(errs).length > 0 || !input) return
    setResult(calculateCredit(input))
    goTo(2)
  }

  function restart() {
    setIsNew(null)
    setNewWorkers('')
    setHeadcount('')
    setAmount('')
    setHasErte(false)
    setErteWorkers('')
    setErrors({})
    setResult(null)
    goTo(0)
  }

  return (
    <div>
      <div
        ref={panelRef}
        tabIndex={-1}
        aria-labelledby="calc-step-title"
        className="outline-none"
      >
        <h3 id="calc-step-title" className="sr-only">
          Paso {step + 1} de 3: {STEPS[step]}
        </h3>

        {step === 0 && <Intro onNext={() => goTo(1)} />}

        {step === 1 && (
          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault()
              submit()
            }}
          >
            <div className="divide-y divide-line border-y border-ink">
              <Field
                legend="¿Es una empresa de nueva creación?"
                hint="Creada este año o el anterior, sin un año completo de cotización."
                help="Si la empresa aún no ha cotizado un año entero, no hay cuota anterior en la que basar el cálculo: el crédito se calcula por persona incorporada, con un mínimo garantizado de 420 €."
                error={errors.isNew}
              >
                <Choice
                  name="isNew"
                  value={isNew === null ? '' : isNew ? 'si' : 'no'}
                  onChange={(v) => setIsNew(v === 'si')}
                  options={[
                    { value: 'si', label: 'Sí' },
                    { value: 'no', label: 'No' },
                  ]}
                />
              </Field>

              {isNew === true && (
                <Field
                  legend="Personas incorporadas"
                  help="El recibo de liquidación de cotizaciones (RLC, antes TC1) es el documento mensual de la Seguridad Social con las personas que cotizan. Usa el del primer mes en que la empresa tuvo plantilla."
                  error={errors.newWorkers}
                  asGroup={false}
                >
                  <NumberInput
                    label="Nº de personas en el primer recibo de liquidación de cotizaciones"
                    value={newWorkers}
                    onChange={setNewWorkers}
                    error={errors.newWorkers}
                    placeholder="Ej. 4"
                  />
                </Field>
              )}

              {isNew === false && (
                <>
                  <Field
                    legend="Plantilla media"
                    help="Es la media de personas contratadas durante todo el año anterior, no la plantilla de hoy. Determina el porcentaje de la cuota que puedes bonificar: 100 % de 1 a 9 personas, 75 % de 10 a 49, 60 % de 50 a 249 y 50 % de 250 o más."
                    error={errors.headcount}
                    asGroup={false}
                  >
                    <NumberInput
                      label="Nº medio de personas en plantilla durante el año anterior"
                      value={headcount}
                      onChange={setHeadcount}
                      error={errors.headcount}
                      placeholder="Ej. 12"
                    />
                  </Field>

                  <Field
                    legend="¿Qué dato tienes a mano?"
                    hint="La cuota de formación profesional aparece en los boletines de cotización (RLC). Si no la tienes, la estimamos con la masa salarial."
                    help={
                      <>
                        <strong className="font-semibold">Masa salarial bruta:</strong> la suma de
                        los salarios brutos que la empresa pagó el año anterior. Aplicamos el 0,70 %
                        para estimar la cuota.
                        <br />
                        <strong className="font-semibold">Cuota de FP ingresada:</strong> lo que la
                        empresa y su plantilla ya pagaron a la Seguridad Social por formación
                        profesional (0,60 % la empresa + 0,10 % la persona trabajadora). Es el dato
                        más exacto.
                      </>
                    }
                    error={errors.amount}
                  >
                    <Choice
                      name="quotaMode"
                      value={quotaMode}
                      onChange={(v) => setQuotaMode(v as QuotaMode)}
                      options={[
                        { value: 'salary', label: 'Masa salarial bruta' },
                        { value: 'quota', label: 'Cuota de FP ingresada' },
                      ]}
                    />
                    <div className="mt-5">
                      <NumberInput
                        label={
                          quotaMode === 'salary'
                            ? 'Suma de salarios brutos del año anterior (€)'
                            : 'Cuota de formación profesional del año anterior (€)'
                        }
                        value={amount}
                        onChange={setAmount}
                        error={errors.amount}
                        placeholder={quotaMode === 'salary' ? 'Ej. 300.000' : 'Ej. 2.100'}
                        decimal
                      />
                    </div>
                  </Field>
                </>
              )}

              <Field
                legend="¿Hay personas en ERTE o Mecanismo RED?"
                hint="Si las formas durante la medida, el crédito se incrementa."
                help="ERTE es un Expediente de Regulación Temporal de Empleo (suspensión o reducción de jornada). El Mecanismo RED es su versión de flexibilidad para sectores o crisis. Por cada persona afectada que formes, FUNDAE suma un importe extra (entre 320 y 425 € según el tamaño de la plantilla)."
                error={errors.erteWorkers}
              >
                <Choice
                  name="erte"
                  value={hasErte ? 'si' : 'no'}
                  onChange={(v) => setHasErte(v === 'si')}
                  options={[
                    { value: 'si', label: 'Sí' },
                    { value: 'no', label: 'No' },
                  ]}
                />
                {hasErte && (
                  <div className="mt-5">
                    <NumberInput
                      label="Nº de personas en ERTE que recibirán formación"
                      value={erteWorkers}
                      onChange={setErteWorkers}
                      error={errors.erteWorkers}
                      placeholder="Ej. 2"
                    />
                  </div>
                )}
              </Field>
            </div>

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button variant="outline" onClick={() => goTo(0)}>
                Anterior
              </Button>
              <Button type="submit" variant="primary">
                Calcular crédito
                <ArrowRightIcon className="size-4" />
              </Button>
            </div>
          </form>
        )}

        {step === 2 && result && (
          <Result result={result} onBack={() => goTo(1)} onRestart={restart} />
        )}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */

function Intro({ onNext }: { onNext: () => void }) {
  return (
    <div>
      <p className="max-w-[60ch] text-lg leading-relaxed text-pretty">
        Unas pocas preguntas y te damos una cifra aproximada, con el detalle del cálculo.
      </p>

      <details open className="group mt-8 border-t border-ink pt-4">
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-heading font-semibold [&::-webkit-details-marker]:hidden">
          Lo que no tiene en cuenta
          <LuChevronDown
            aria-hidden="true"
            size={20}
            className="shrink-0 transition-transform duration-200 group-open:rotate-180"
          />
        </summary>
        <ul className="mt-4 divide-y divide-line border-y border-line">
          {[
            [
              'Verificación de cuota y plantilla.',
              'FUNDAE valida estos datos con la Tesorería General de la Seguridad Social; hasta entonces la cifra oficial puede variar.',
            ],
            [
              'Reserva de crédito.',
              'Las empresas de menos de 50 personas pueden acumular el crédito no usado de los dos ejercicios anteriores.',
            ],
            [
              'Grupos empresariales.',
              'Cada empresa del grupo puede disponer como máximo del 100 % de su cuota, si el grupo tiene crédito disponible.',
            ],
          ].map(([title, text]) => (
            <li key={title} className="flex gap-4 py-3.5 text-ink-muted">
              <Square tone="yellow" className="mt-2 size-2" />
              <p>
                <strong className="font-semibold text-ink">{title}</strong> {text}
              </p>
            </li>
          ))}
        </ul>
      </details>

      <div className="mt-8 flex justify-end">
        <Button variant="primary" onClick={onNext}>
          Empezar
          <ArrowRightIcon className="size-4" />
        </Button>
      </div>
    </div>
  )
}

function Result({
  result,
  onBack,
  onRestart,
}: {
  result: CreditResult
  onBack: () => void
  onRestart: () => void
}) {
  return (
    <div>
      <div className="border-t border-ink pt-6" aria-live="polite">
        <p className="font-heading text-base font-semibold">
          Crédito aproximado para este año
          <HelpTip label="Crédito aproximado">
            Es el importe que tu empresa puede dedicar a formación y recuperar como bonificación en
            sus cotizaciones a la Seguridad Social. Es una cifra orientativa.
          </HelpTip>
        </p>
        <p className="mt-2 text-[clamp(3.25rem,9vw,6rem)] leading-none font-bold tracking-[-0.035em] [font-stretch:125%] tabular-nums">
          {formatEuro(result.total)}
        </p>
        {result.erte > 0 && (
          <p className="mt-3 text-ink-muted">
            {formatEuro(result.base)} de crédito ordinario + {formatEuro(result.erte)} por formar a
            personas en ERTE.
          </p>
        )}
      </div>

      <div className="mt-10 grid gap-8 border-t border-ink pt-6 md:grid-cols-2">
        <div>
          <h4 className="text-lg font-bold">Cálculo</h4>
          <dl className="mt-4 divide-y divide-line border-y border-line">
            {result.lines.map((line) => (
              <div key={line.label} className="flex items-baseline justify-between gap-4 py-3">
                <dt className="text-ink-muted">{line.label}</dt>
                <dd className="font-heading font-semibold whitespace-nowrap tabular-nums">
                  {formatEuro(line.value)}
                </dd>
              </div>
            ))}
            <div className="flex items-baseline justify-between gap-4 py-3">
              <dt className="font-heading font-semibold">Total</dt>
              <dd className="font-heading font-bold whitespace-nowrap text-brand-red-deep tabular-nums">
                {formatEuro(result.total)}
              </dd>
            </div>
          </dl>
        </div>

        <div>
          <h4 className="text-lg font-bold">Detalles del cálculo</h4>
          <ul className="mt-4 space-y-3 text-ink-muted">
            {result.notes.map((note) => (
              <li key={note} className="flex gap-3">
                <Square tone="yellow" className="mt-2 size-2" />
                <p className="text-pretty">{note}</p>
              </li>
            ))}
            <li className="flex gap-3">
              <Square tone="yellow" className="mt-2 size-2" />
              <p className="text-pretty">
                Cifra orientativa. El importe oficial lo publica FUNDAE una vez validados los datos de
                cotización.
              </p>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-10 grid gap-6 border-t border-ink bg-brand-yellow p-6 sm:p-8 lg:grid-cols-12 lg:items-center">
        <p className="font-heading text-xl leading-snug font-bold text-ink lg:col-span-7">
          {result.total >= MIN_CREDIT
            ? `Con ${formatEuro(result.total)} puedes formar a tu equipo sin coste. Nosotros lo tramitamos.`
            : 'Nosotros revisamos tu caso y tramitamos la bonificación.'}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
          <LinkButton to="/contacto" variant="primary">
            Solicita información
            <ArrowRightIcon className="size-4" />
          </LinkButton>
        </div>
      </div>

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
        <div className="flex flex-col-reverse gap-3 sm:flex-row">
          <Button variant="outline" onClick={onBack}>
            Anterior
          </Button>
          <Button variant="outline" onClick={onRestart}>
            Volver a calcular
          </Button>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */

function Field({
  legend,
  hint,
  help,
  error,
  asGroup = true,
  children,
}: {
  legend: string
  hint?: string
  /** Aclaración desplegable con un «?» junto al título: para términos técnicos. */
  help?: ReactNode
  error?: string
  /** false cuando el campo es un único input con su propio label */
  asGroup?: boolean
  children: ReactNode
}) {
  const hintId = useId()
  const inner = (
    <>
      {hint && (
        <p id={hintId} className="mt-1 max-w-[60ch] text-sm text-ink-muted text-pretty">
          {hint}
        </p>
      )}
      <div className="mt-4">{children}</div>
      {asGroup && error && <ErrorText>{error}</ErrorText>}
    </>
  )

  if (!asGroup) {
    return (
      <div className="py-6">
        <p className="font-heading text-base font-semibold">
          {legend}
          {help && <HelpTip label={legend}>{help}</HelpTip>}
        </p>
        {inner}
      </div>
    )
  }
  return (
    <fieldset className="py-6" aria-describedby={hint ? hintId : undefined}>
      <legend className="float-left w-full font-heading text-base font-semibold">
        {legend}
        {help && <HelpTip label={legend}>{help}</HelpTip>}
      </legend>
      <div className="clear-both">{inner}</div>
    </fieldset>
  )
}

function Choice({
  name,
  value,
  onChange,
  options,
}: {
  name: string
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <div className="flex flex-wrap">
      {options.map((opt, i) => (
        <label
          key={opt.value}
          className={[
            'relative flex min-h-11 cursor-pointer items-center gap-2.5 border border-ink px-5 text-sm font-semibold transition-colors',
            'hover:bg-cream-deep has-checked:bg-ink has-checked:text-cream',
            'has-focus-visible:outline-2 has-focus-visible:outline-offset-3 has-focus-visible:outline-brand-red-deep',
            i > 0 ? '-ml-px' : '',
          ].join(' ')}
        >
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            className="sr-only"
          />
          <span
            aria-hidden="true"
            className={[
              'size-2.5 border',
              value === opt.value ? 'border-brand-yellow bg-brand-yellow' : 'border-current',
            ].join(' ')}
          />
          {opt.label}
        </label>
      ))}
    </div>
  )
}

function NumberInput({
  label,
  value,
  onChange,
  error,
  placeholder,
  decimal = false,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  error?: string
  placeholder?: string
  decimal?: boolean
}) {
  const id = useId()
  const errorId = `${id}-error`
  return (
    <div>
      <label htmlFor={id} className="block text-sm text-ink">
        {label}
      </label>
      <input
        id={id}
        type="text"
        inputMode={decimal ? 'decimal' : 'numeric'}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={[
          'mt-2 block min-h-11 w-full max-w-xs border bg-white px-4 font-heading text-lg tabular-nums',
          'placeholder:text-ink-muted/60 focus:outline-2 focus:outline-offset-0 focus:outline-brand-red-deep',
          error ? 'border-brand-red-deep' : 'border-ink',
        ].join(' ')}
      />
      {error && <ErrorText id={errorId}>{error}</ErrorText>}
    </div>
  )
}

function ErrorText({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <p id={id} role="alert" className="mt-2 text-sm font-semibold text-brand-red-deep">
      {children}
    </p>
  )
}
