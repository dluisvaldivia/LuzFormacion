import { Link } from 'react-router'
import { BRAND } from '../../data/brand'
import { CONTACT, NAV_ITEMS } from '../../data/nav'
import { PHOTO_CREDITS } from '../../data/photos'
import { Logo } from '../ui/Logo'
import { MailIcon, PinIcon } from '../ui/Icon'
import { LogoMark } from '../ui/Square'

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-cream">
      {/* El cubo del logo a escala de cartel, recortado por el borde. */}
      <LogoMark className="pointer-events-none absolute -right-20 -bottom-24 h-[24rem] w-auto max-md:hidden" />

      <div className="relative mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr] md:pr-56">
          <div>
            <Logo tone="light" className="h-16 w-auto" />
            <p className="mt-5 max-w-[28ch] text-cream/75">Formación bonificada, sin papeleo.</p>
          </div>

          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <PinIcon className="mt-0.5 size-4 shrink-0 text-brand-yellow" />
              <span className="text-cream/75">{CONTACT.address}</span>
            </li>
            <li className="flex items-start gap-3">
              <MailIcon className="mt-0.5 size-4 shrink-0 text-brand-yellow" />
              <span className="break-all text-cream/75">{CONTACT.email}</span>
            </li>
          </ul>

          <nav aria-label="Pie de página">
            <ul className="space-y-3 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-cream/75 transition-colors hover:text-brand-yellow"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 space-y-2 border-t border-cream/25 pt-6 text-xs text-cream/70 md:mr-56">
          <p>
            © {new Date().getFullYear()} {BRAND.name}. Sitio de demostración. Empresas y opiniones
            ficticias.
          </p>
          <p>
            Fotos de{' '}
            {PHOTO_CREDITS.map(({ author, url }, index) => (
              <span key={author}>
                {index > 0 && ', '}
                <a href={url} className="underline hover:text-brand-yellow">
                  {author}
                </a>
              </span>
            ))}{' '}
            en{' '}
            <a
              href="https://unsplash.com/?utm_source=luz_formacion&utm_medium=referral"
              className="underline hover:text-brand-yellow"
            >
              Unsplash
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}
