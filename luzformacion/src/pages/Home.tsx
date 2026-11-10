import { Hero } from '../components/home/Hero'
import { ClosingCta, ValueProps } from '../components/home/ValueProps'
import { ServicesSection } from '../components/services/ServicesSection'
import { ClientLogos } from '../components/home/ClientLogos'
import { Testimonials } from '../components/home/Testimonials'
import { UpcomingCourses } from '../components/courses/UpcomingCourses'

export function Home() {
  return (
    <>
      <Hero />
      <ClientLogos />
      <ValueProps />
      <ServicesSection />
      <UpcomingCourses limit={3} />
      <Testimonials />
      <ClosingCta />
    </>
  )
}
