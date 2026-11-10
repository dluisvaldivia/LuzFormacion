import { useId, useState, type FormEvent } from 'react'
import { LuCircleCheck } from 'react-icons/lu'
import { useSearchParams } from 'react-router'
import { Button } from '../components/ui/Button'
import { Field, INPUT } from '../components/ui/Field'
import { ArrowRightIcon, MailIcon, PinIcon } from '../components/ui/Icon'
import { PageHeader } from '../components/ui/PageHeader'
import { CONTACT } from '../data/nav'

export function Contacto() {
  const [params] = useSearchParams()
  const curso = params.get('curso')
  const messageId = useId()
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [mensaje, setMensaje] = useState(curso ? `Me interesa: ${curso}.` : '')
  const [enviado, setEnviado] = useState(false)

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setEnviado(true)
  }

  return (
    <PageHeader title="Hablemos" intro="Dinos qué necesitas. Te respondemos sin compromiso.">
      <div className="mt-12 grid gap-12 border-t border-ink pt-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          {enviado ? (
            <p
              role="status"
              className="flex items-center gap-3 font-heading text-2xl font-semibold"
            >
              <LuCircleCheck aria-hidden="true" size={28} className="shrink-0 text-brand-red-deep" />
              Gracias, {nombre}. Te escribimos pronto.
            </p>
          ) : (
            <form onSubmit={onSubmit} aria-label="Contacto" className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Nombre"
                value={nombre}
                onChange={setNombre}
                required
                autoComplete="name"
              />
              <Field
                label="Email"
                type="email"
                value={email}
                onChange={setEmail}
                required
                autoComplete="email"
              />
              <div className="sm:col-span-2">
                <label htmlFor={messageId} className="text-sm text-ink">
                  Mensaje
                </label>
                <textarea
                  id={messageId}
                  rows={4}
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  className={`${INPUT} py-3`}
                />
              </div>
              <div className="sm:col-span-2">
                <Button type="submit" size="lg" className="w-full sm:w-auto">
                  Enviar
                  <ArrowRightIcon className="size-4" />
                </Button>
              </div>
            </form>
          )}
        </div>

        <ul className="space-y-6 lg:col-span-4 lg:col-start-9">
          <li className="flex gap-3">
            <PinIcon className="mt-0.5 size-5 shrink-0 text-brand-red-deep" />
            <div>
              <p className="font-heading font-semibold">{CONTACT.company}</p>
              <p className="text-ink-muted">{CONTACT.address}</p>
            </div>
          </li>
          <li className="flex gap-3">
            <MailIcon className="mt-0.5 size-5 shrink-0 text-brand-red-deep" />
            <p className="font-heading font-semibold break-all">{CONTACT.email}</p>
          </li>
        </ul>
      </div>
    </PageHeader>
  )
}
