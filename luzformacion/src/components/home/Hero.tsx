import { LuBadgeEuro, LuFileCheck, LuMonitorPlay } from 'react-icons/lu'
import { LinkButton } from '../ui/Button'
import { ArrowRightIcon } from '../ui/Icon'
import { LogoMark } from '../ui/Square'
import { HeroMosaic } from './HeroMosaic'

const HECHOS = [
  { icon: LuBadgeEuro, texto: 'Coste cero' },
  { icon: LuFileCheck, texto: 'Sin papeleo' },
  { icon: LuMonitorPlay, texto: 'Presencial u online' },
]

export function Hero() {
  return (
    <section>
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pt-12 pb-16 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pt-16 lg:pb-24">
        <div className="lg:col-span-7 lg:pr-8 xl:col-span-6 xl:pr-0">
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

        {/* En xl el mosaico crece a la mitad: acorta el hueco con el titular. */}
        <div className="lg:col-span-5 xl:col-span-6">
          <HeroMosaic />
        </div>
      </div>
    </section>
  )
}
