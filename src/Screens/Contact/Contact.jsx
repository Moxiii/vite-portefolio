import './Contact.scss'
import emailjs from '@emailjs/browser'
import { useRef } from 'react'
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
          alert('Message envoyé')
        },
        () => {
          alert('Message non envoyé')
        }
      )
  }
  return (
    <>
      <div className="container contact-page">
        <div className="text-zone">
          <h1>Contactez-moi</h1>
          <p>
            Je reste disponible pour toutes informations <br /> toutes demande
            de contact sera traité dans les 48h
          </p>
          <div className="contact-form">
            <form ref={refForm} onSubmit={sendEmail & clearInput}>
              <ul>
                <li className="half">
                  <input type="text" name="name" placeholder="name" required />
                </li>
                <li className="half">
                  <input type="text" name="email" placeholder="mail" required />
                </li>
                <li className="half">
                  <input
                    type="text"
                    name="subject"
                    placeholder="subject"
                    required
                  />
                </li>
                <li>
                  <textarea placeholder="message" name="message"></textarea>
                </li>
                <li>
                  <input type="submit" className="flat-button" />
                </li>
              </ul>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact
