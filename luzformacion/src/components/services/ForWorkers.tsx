import { useId, useState, type FormEvent } from 'react'
import { LuBookOpen, LuBuilding2, LuCircleCheck, LuHandshake } from 'react-icons/lu'
import { Link } from 'react-router'
import { BRAND } from '../../data/brand'
import { CONVOCATORIAS } from '../../data/convocatorias'
import { Button } from '../ui/Button'
import { Field } from '../ui/Field'
import { ArrowRightIcon, MailIcon } from '../ui/Icon'
import { IconBox } from '../ui/IconBox'
import { Photo } from '../ui/Photo'

const PASOS = [
  { icon: LuBookOpen, titulo: 'Elige un curso' },
  { icon: LuBuilding2, titulo: 'Dinos tu empresa' },
  { icon: LuHandshake, titulo: 'Hablamos con ella' },
]

const CURSOS = [...new Set(CONVOCATORIAS.map((c) => c.curso))].sort((a, b) =>
  a.localeCompare(b, 'es'),
)

type Datos = { nombre: string; curso: string; empresa: string }

/** Email listo para que el trabajador se lo envíe a su responsable o a RRHH. */
function mailtoParaEmpresa({ nombre, curso }: Datos) {
  const asunto = `Solicitud de formación bonificada${curso ? `: ${curso}` : ''}`
  const cuerpo = [
    'Hola:',
    '',
    `Me gustaría realizar ${curso ? `el curso de ${curso}` : 'un curso de formación'}. Se puede bonificar con el crédito de formación que la empresa tiene cada año en FUNDAE, así que no supondría un coste.`,
    '',
    `${BRAND.name} se encarga de toda la gestión. Podéis contactar con ellos en ${BRAND.email}.`,
    '',
    'Gracias,',
    nombre || '',
  ].join('\n')
  return `mailto:?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`
}

type Props = {
  /** h2 cuando el bloque es una sección propia (Formación); h3 dentro del selector. */
  headingLevel?: 'h2' | 'h3'
  headingId?: string
}

export function ForWorkers({ headingLevel = 'h3', headingId }: Props) {
  const Heading = headingLevel
  const id = useId()
  const [datos, setDatos] = useState<Datos>({ nombre: '', curso: '', empresa: '' })
  const [enviado, setEnviado] = useState(false)

  function set(campo: keyof Datos) {
    return (value: string) => setDatos((d) => ({ ...d, [campo]: value }))
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setEnviado(true)
  }

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-8">
      <div className="lg:col-span-5">
        <Photo slot="trabajadores" ratio={5 / 4} sizes="(max-width: 1023px) 92vw, 40vw" />
      </div>

      <div className="lg:col-span-6 lg:col-start-7">
        <Heading
          id={headingId}
          className="text-3xl leading-[1.05] font-bold tracking-[-0.02em] sm:text-4xl"
        >
          ¿Quieres un curso? Se lo pedimos a tu empresa
        </Heading>
        <p className="mt-4 text-lg text-ink-muted text-pretty">
          Gratis para ti, coste cero para ella.{' '}
          <Link
            to="/#pif"
            className="text-brand-red-deep underline underline-offset-4 hover:text-brand-red-dark"
          >
            ¿Conoces el PIF?
          </Link>
        </p>

        <ol className="mt-6 grid gap-4 sm:grid-cols-3">
          {PASOS.map(({ icon, titulo }) => (
            <li key={titulo} className="flex items-center gap-3">
              <IconBox icon={icon} />
              <p className="font-heading leading-tight font-semibold">{titulo}</p>
            </li>
          ))}
        </ol>

        {enviado ? (
          <p
            role="status"
            className="mt-8 flex items-center gap-3 border-y border-ink py-5 font-heading text-lg font-semibold"
          >
            <LuCircleCheck aria-hidden="true" size={24} className="shrink-0 text-brand-red-deep" />
            Recibido, {datos.nombre}. Hablamos con {datos.empresa}.
          </p>
        ) : (
          <form
            onSubmit={onSubmit}
            className="mt-8 border-t border-line pt-6"
            aria-label="Pide tu curso"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Tu nombre"
                value={datos.nombre}
                onChange={set('nombre')}
                required
                autoComplete="given-name"
              />
              <Field
                label="Tu empresa"
                value={datos.empresa}
                onChange={set('empresa')}
                required
                autoComplete="organization"
              />
              <div className="sm:col-span-2">
                <Field
                  label="Curso"
                  hint="Opcional"
                  value={datos.curso}
                  onChange={set('curso')}
                  list={`${id}-cursos`}
                  autoComplete="off"
                />
                <datalist id={`${id}-cursos`}>
                  {CURSOS.map((curso) => (
                    <option key={curso} value={curso} />
                  ))}
                </datalist>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button type="submit" variant="primary" size="lg">
                Pedir mi curso
                <ArrowRightIcon className="size-4" />
              </Button>
              <a
                href={mailtoParaEmpresa(datos)}
                className="inline-flex min-h-11 items-center justify-center gap-2 border border-ink px-7 py-3.5 font-heading font-semibold text-ink transition-colors duration-200 hover:bg-ink hover:text-cream"
              >
                Prefiero pedírselo yo
                <MailIcon className="size-4" />
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
