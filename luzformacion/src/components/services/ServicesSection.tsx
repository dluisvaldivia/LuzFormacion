import { useId, useState } from 'react'
import { SectionHeading } from '../ui/SectionHeading'
import { SegmentedTabs } from '../ui/SegmentedTabs'
import { ForCompanies } from './ForCompanies'
import { ForWorkers } from './ForWorkers'

type Audience = 'empresa' | 'trabajador'

const TABS: { value: Audience; label: string }[] = [
  { value: 'empresa', label: 'Soy empresa' },
  { value: 'trabajador', label: 'Soy trabajador' },
]

/**
 * El mismo servicio con dos puertas: la empresa que quiere formar a su
 * plantilla y el trabajador que quiere un curso. Pestañas ARIA con flechas.
 */
export function ServicesSection({ defaultAudience = 'empresa' }: { defaultAudience?: Audience }) {
  const [active, setActive] = useState<Audience>(defaultAudience)
  const id = useId()

  return (
    <section id="servicios" aria-labelledby="servicios-title" className="scroll-mt-24 py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading id="servicios-title" title="Para empresas y trabajadores" />

        <SegmentedTabs tabs={TABS} active={active} onChange={setActive} label="¿Quién eres?" id={id} />

        <div
          role="tabpanel"
          id={`${id}-panel`}
          aria-labelledby={`${id}-tab-${active}`}
          className="mt-8"
        >
          {active === 'empresa' ? <ForCompanies /> : <ForWorkers />}
        </div>
      </div>
    </section>
  )
}
