import { useRef } from 'react'
import s from './Contact.module.scss'
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { lazy } from 'react'

const TiltCard = lazy(() => import('@components/Card/TiltCard/TiltCard.jsx'))
import links from '@const/_const.ts'
export default function Contact() {
  return (
    <section id="contact" className={s.contact}>
      <div className={s.contactHeader}>
        <h2>Me contacter</h2>

        <p>Une idée, un projet ou une opportunité ?</p>
        <span>Parlons-en.</span>
      </div>
      <div className={s.contactCards}>
        <TiltCard
          title="GitHub"
          icon={faGithub}
          href={links.externalLinks.github}
          external
        />

        <TiltCard
          title="LinkedIn"
          icon={faLinkedin}
          href={links.externalLinks.linkedin}
          external
        />

        <TiltCard
          title="Email"
          icon={faEnvelope}
          href="mailto:ton-email@example.com"
        />
      </div>
    </section>
  )
}
