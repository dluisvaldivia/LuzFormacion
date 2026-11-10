import type { ReactNode } from 'react'

type Props = {
  title: string
  intro?: string
  children?: ReactNode
}

export function PageHeader({ title, intro, children }: Props) {
  return (
    <section className="mx-auto max-w-7xl px-5 pt-14 pb-14 lg:px-8 lg:pt-20 lg:pb-16">
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
        <h1 className="text-[clamp(2.75rem,7vw,5rem)] leading-[0.95] font-bold tracking-[-0.035em] [font-stretch:125%] lg:col-span-8">
          {title}
        </h1>
        {intro && (
          <p className="max-w-[36ch] text-lg leading-snug text-ink-muted text-pretty lg:col-span-4 lg:self-end">
            {intro}
          </p>
        )}
      </div>
      {children}
    </section>
  )
}
