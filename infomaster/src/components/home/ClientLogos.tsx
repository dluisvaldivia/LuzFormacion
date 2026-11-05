import { CLIENTS } from '../../data/clients'

export function ClientLogos() {
  return (
    <section aria-labelledby="clientes-title" className="border-y border-line bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-8 lg:flex-row lg:items-center lg:gap-10 lg:px-8">
        <h2 id="clientes-title" className="shrink-0 font-heading text-base font-semibold">
          Confían en nosotros
        </h2>
        <ul className="grid flex-1 grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:flex lg:flex-wrap lg:justify-between">
          {CLIENTS.map(({ name, icon: Icon }) => (
            <li
              key={name}
              className="flex items-center gap-2 font-heading text-sm font-bold tracking-[-0.01em] text-ink-muted [font-stretch:112%]"
            >
              <Icon aria-hidden="true" size={18} className="shrink-0" />
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
