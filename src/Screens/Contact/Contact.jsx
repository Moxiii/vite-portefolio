import emailjs from '@emailjs/browser'
import { useRef } from 'react'
import './Contact.scss'
import ReactGA from 'react-ga'
const TRACK_ID = "GTM-MQXDT7ZH"
import useIsDesktop from '../../Utils/isDesktop.js'
ReactGA.initialize(TRACK_ID);
import {faLinkedin, faGithub} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import links from '../../Utils/_const.js'
export default function Contact() {
const isDesktop = useIsDesktop();
  const refForm = useRef()
  const clearInput = () => {
    var form = document.querySelectorAll('form')
    form.reset()
  }
  const sendEmail = (e) => {
    e.preventDefault()
    emailjs
      .sendForm(
        'service_grqpcg8',
        'template_eq7kyaw',
        refForm.current,
        'kLjaD0rwsaIaJI6O5'
      )
      .then(
        () => {
          ReactGA.event({
            category:'User',
            action:'Send a mail',
          })
        },
        () => {
          alert('Message non envoyé')
        }
      )
  }
  return (
      <div className="container contact-page">
        <div className="text-zone">
          <div className="header">
            <h1>Contactez-moi</h1>
          </div>
          {!isDesktop && (
            <div className="contact-links-container">
              <a href={links.externalLinks.linkedin}>
                <div className="contact-item">
                  <p>
                    LinkedIn
                  </p>
                  <div className="contact-link">
                    <FontAwesomeIcon icon={faLinkedin} size="2x" color="#0077b5" />
                  </div>
                </div>
              </a>
              <a href={links.externalLinks.github}>
                <div className="contact-item">
                  <p>
                    Github
                  </p>
                  <div className="contact-link">
                    <FontAwesomeIcon icon={faGithub} size="2x" color="#333"/>
                  </div>
                </div>
              </a>
            </div>
          )}

          <div className="contact-form">
            <form ref={refForm} onSubmit={(e) => {
              e.preventDefault()
              sendEmail()
              clearInput()
            }}>
              <input className="feedback-body__email" type="email" placeholder="Email" />
              <input className="feedback-body__email" type="text" placeholder="Subject" />
              <textarea className="feedback-body__message" placeholder="Message" type="text"></textarea>
              <button className="feedback-body__submit">SEND</button>
            </form>
          </div>
        </div>
      </div>
)
}