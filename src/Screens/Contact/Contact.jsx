import emailjs from '@emailjs/browser'
import { useRef } from 'react'
import './Contact.scss'
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
          <div className="contact-form">
            <form ref={refForm} onSubmit={(e)=>{
              e.preventDefault();
              sendEmail();
              clearInput();
            }}>
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
