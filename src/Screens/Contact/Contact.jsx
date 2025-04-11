import emailjs from '@emailjs/browser'
import { useRef } from 'react'
import './Contact.scss'
import ReactGA from 'react-ga'
const TRACK_ID = "GTM-MQXDT7ZH"
ReactGA.initialize(TRACK_ID);
const Contact = () => {


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

          <div className="contact-form">
            <form ref={refForm} onSubmit={(e) => {
              e.preventDefault();
              sendEmail();
              clearInput();
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

export default Contact
