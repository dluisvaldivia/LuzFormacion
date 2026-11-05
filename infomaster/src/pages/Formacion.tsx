import { ForCompanies } from '../components/services/ForCompanies'
import { ForWorkers } from '../components/services/ForWorkers'
import { CreditCalculator } from '../components/credit/CreditCalculator'
import { PageHeader } from '../components/ui/PageHeader'

export function Formacion() {
  return (
    <>
      <PageHeader
        title="Formación bonificada"
        intro="Calculamos tu crédito, tramitamos FUNDAE y nos ocupamos de los papeles."
      />

      <section
        id="calculadora"
        aria-labelledby="calculadora-title"
        className="mx-auto max-w-7xl scroll-mt-24 px-5 pb-20 lg:px-8 lg:pb-24"
      >
        <div className="border-t border-ink pt-6">
          <h2
            id="calculadora-title"
            className="mb-10 text-3xl leading-[1.05] font-bold tracking-[-0.02em] sm:text-4xl"
          >
            Calcula tu crédito
          </h2>
          <CreditCalculator />
        </div>
      </section>

      <section
        id="empresas"
        aria-labelledby="empresas-title"
        className="mx-auto max-w-7xl scroll-mt-24 px-5 pb-20 lg:px-8 lg:pb-24"
      >
        <div className="border-t border-ink pt-10">
          <ForCompanies headingLevel="h2" headingId="empresas-title" />
        </div>
      </section>

      <section
        id="trabajadores"
        aria-labelledby="trabajadores-title"
        className="mx-auto max-w-7xl scroll-mt-24 px-5 pb-20 lg:px-8 lg:pb-24"
      >
        <div className="border-t border-ink pt-10">
          <ForWorkers headingLevel="h2" headingId="trabajadores-title" />
        </div>
      </section>
    </>
  )
}
