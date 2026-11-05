import { Link } from 'react-router'
import { UpcomingCourses } from '../components/courses/UpcomingCourses'
import { ArrowRightIcon } from '../components/ui/Icon'
import { PageHeader } from '../components/ui/PageHeader'
import { Photo } from '../components/ui/Photo'
import { contactHref } from '../data/nav'
import type { PhotoSlot } from '../data/photos'

const AREAS: { slot: PhotoSlot; nombre: string }[] = [
  { slot: 'construccion', nombre: 'Construcción' },
  { slot: 'mecanica', nombre: 'Mecánica' },
  { slot: 'prevencion', nombre: 'Prevención' },
  { slot: 'hosteleria', nombre: 'Hostelería' },
  { slot: 'logistica', nombre: 'Logística' },
  { slot: 'oficina', nombre: 'Oficina' },
]

export function Cursos() {
  return (
    <>
      <PageHeader title="Cursos" intro="Presenciales, online o mixtos. Útiles desde el primer día.">
        <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10">
          {AREAS.map(({ slot, nombre }) => (
            <li key={slot}>
              <Link to={contactHref(nombre)} className="group block">
                <span className="block overflow-hidden">
                  <Photo
                    slot={slot}
                    ratio={3 / 2}
                    sizes="(max-width: 1023px) 46vw, 30vw"
                    className="transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                </span>
                <span className="mt-3 flex items-center justify-between gap-2 font-heading text-lg font-semibold sm:text-xl">
                  {nombre}
                  <ArrowRightIcon className="size-4 text-brand-red-deep transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </PageHeader>
      <UpcomingCourses />
    </>
  )
}
