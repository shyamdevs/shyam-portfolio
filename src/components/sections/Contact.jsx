import { FiMapPin, FiMail } from 'react-icons/fi'
import SectionHeading from '../ui/SectionHeading.jsx'
import ContactForm from '../ui/ContactForm.jsx'
import Reveal from '../ui/Reveal.jsx'

export default function Contact() {
  return (
    <section id="contact" className="relative py-28 md:py-36 overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-olive/10 blur-[130px]" />
      </div>

      <div className="container-luxe grid lg:grid-cols-[0.9fr_1.1fr] gap-16 items-start">
        <div>
          <SectionHeading
            eyebrow="Let's Connect"
            title={
              <>
                Let's build something
                <br />
                <span className="italic text-olive">amazing together.</span>
              </>
            }
            description="I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision."
          />

          <Reveal delay={0.2}>
            <div className="mt-10 space-y-4">
              <a href="mailto:shyamsharma729785@gmail.com" data-cursor-hover className="flex items-center gap-3 text-ink-soft hover:text-olive transition-colors">
                <FiMail /> shyamsharma729785@gmail.com
              </a>
              <p className="flex items-center gap-3 text-ink-soft">
                <FiMapPin /> Jaipur, Rajasthan, India
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  )
}
