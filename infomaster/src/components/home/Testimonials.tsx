import { TESTIMONIALS } from '../../data/testimonials'
import { SectionHeading } from '../ui/SectionHeading'

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <SectionHeading title="Lo que dicen nuestros alumnos" />

      <ul className="grid gap-10 md:grid-cols-3 md:gap-8">
        {TESTIMONIALS.map((item) => (
          <li key={item.name} className="flex flex-col">
            <blockquote className="flex-1 text-2xl leading-snug font-semibold tracking-[-0.01em] text-ink text-pretty">
              {item.quote}
            </blockquote>
            <div className="mt-6 flex items-center gap-4">
              <img
                src={item.photo}
                alt=""
                width={64}
                height={64}
                loading="lazy"
                decoding="async"
                className="size-16 object-cover"
              />
              <div>
                <p className="font-heading font-semibold">{item.name}</p>
                <p className="text-sm text-ink-muted">{item.role}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
