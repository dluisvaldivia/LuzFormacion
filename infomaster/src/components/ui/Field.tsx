import { useId } from 'react'

type Props = {
  label: string
  hint?: string
  value: string
  onChange: (value: string) => void
  type?: 'text' | 'email'
  required?: boolean
  autoComplete?: string
  list?: string
}

export const INPUT =
  'mt-2 block min-h-11 w-full border border-ink bg-white px-4 text-base ' +
  'focus:outline-2 focus:outline-offset-0 focus:outline-brand-red-deep'

export function Field({ label, hint, value, onChange, type = 'text', ...input }: Props) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline justify-between text-sm text-ink">
        {label}
        {hint && <span className="text-ink-muted">{hint}</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={INPUT}
        {...input}
      />
    </div>
  )
}
