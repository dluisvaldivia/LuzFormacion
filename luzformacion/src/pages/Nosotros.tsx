import { LuHandshake, LuMapPin, LuRoute } from 'react-icons/lu'
import { IconBox } from '../components/ui/IconBox'
import { PageHeader } from '../components/ui/PageHeader'
import { Photo } from '../components/ui/Photo'

const HECHOS = [
  { icon: LuHandshake, titulo: 'Un solo contacto', texto: 'Una persona lleva tu formación.' },
  { icon: LuRoute, titulo: 'De principio a fin', texto: 'Del curso a la bonificación.' },
  { icon: LuMapPin, titulo: 'Desde Málaga', texto: 'Cerca de ti, también online.' },
]

export function Nosotros() {
  return (
    <>
      <PageHeader title="Formar es fácil" intro="Te acompañamos para que solo pienses en aprender." />
      <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8 lg:pb-24">
        <Photo slot="empresas" ratio={21 / 9} sizes="92vw" priority />
        <ul className="mt-10 grid gap-8 sm:grid-cols-3">
          {HECHOS.map(({ icon, titulo, texto }) => (
            <li key={titulo} className="flex gap-4">
              <IconBox icon={icon} />
              <div>
                <p className="font-heading text-lg leading-tight font-semibold">{titulo}</p>
                <p className="mt-1 leading-snug text-ink-muted">{texto}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
