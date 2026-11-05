import { LuBadgeEuro, LuFileCheck, LuMonitorPlay } from 'react-icons/lu'
import { LinkButton } from '../ui/Button'
import { ArrowRightIcon } from '../ui/Icon'
import { Photo } from '../ui/Photo'
import { LogoMark } from '../ui/Square'

const HECHOS = [
  { icon: LuBadgeEuro, texto: 'Coste cero' },
  { icon: LuFileCheck, texto: 'Sin papeleo' },
  { icon: LuMonitorPlay, texto: 'Presencial u online' },
]

export function Hero() {
  return (
    <section>
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pt-12 pb-16 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pt-16 lg:pb-24">
        <div className="lg:col-span-7 lg:pr-8">
          <h1 className="text-[clamp(2.75rem,13.5vw,6rem)] leading-[0.95] font-bold tracking-[-0.035em] [font-stretch:125%]">
            <span className="flex items-center gap-[0.18em]">
              Sigue
              {/* El cubo del logo, en la línea del titular. */}
              <LogoMark animated className="h-[0.86em] w-auto shrink-0" />
            </span>
            creciendo
          </h1>

          <p className="mt-8 max-w-[30ch] text-xl leading-snug text-ink text-pretty sm:text-2xl">
            Cursos bonificados para tu equipo. Tu crédito lo gestionamos nosotros.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <LinkButton to="/formacion#calculadora" variant="primary" size="lg">
              Calcula tu crédito
              <ArrowRightIcon className="size-4" />
            </LinkButton>
            <LinkButton to="/cursos" variant="outline" size="lg">
              Ver cursos
            </LinkButton>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-line pt-6">
            {HECHOS.map(({ icon: Icon, texto }) => (
              <li key={texto} className="flex items-center gap-2 font-heading font-semibold">
                <Icon aria-hidden="true" size={20} className="text-brand-red-deep" />
                {texto}
              </li>
            ))}
          </ul>
        </div>

        {/* La foto entre los dos cuadrados repite la composición del logo. */}
        <div className="relative mx-3 lg:col-span-5 lg:mx-0 lg:mr-3">
          <span aria-hidden="true" className="absolute -top-3 -right-3 size-2/5 bg-brand-yellow" />
          <Photo
            slot="hero"
            ratio={1}
            crop="left"
            priority
            sizes="(max-width: 1023px) 92vw, 40vw"
            className="relative"
          />
          <span aria-hidden="true" className="absolute -bottom-3 -left-3 size-1/4 bg-brand-red" />
        </div>
      </div>
    </section>
  )
}
