import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faDocker,
  faGitAlt,
  faJava,
  faJsSquare,
  faPython,
  faReact,
} from '@fortawesome/free-brands-svg-icons'
import {
  faKeyboard,
  faMotorcycle,
  faCar,
  faShirt,
  faMusic,
} from '@fortawesome/free-solid-svg-icons'
import './About.scss'
import { lazy } from 'react'

const TiltCard = lazy(() => import('@components/Card/TiltCard/TiltCard.jsx'))
const QuestionMark3D = lazy(
  () => import('@components/three/QuestionMark/QuestionMark.jsx')
)

import { useBreakPoint } from '@hook/IsDesktop/useBreakPoint.js'

export default function About() {
  const { isMobile } = useBreakPoint()
  const technlogies = [
    'Java',
    'React',
    'Docker',
    'python',
    'Git',
    'javascript',
    'spring boot',
    'lenis',
    'gsap',
    'MongoDB',
    'traefik',
    'keycloack',
    'Linux',
  ]
  const interests = [
    {
      title: 'Clavier custom',
      content: 'Création de claviers custom (Neo65 / Neo Ergo)',
      icon: faKeyboard,
    },
    {
      title: 'Sport automobile',
      content: 'Suivi de la scène WRC, F1, etc.',
      icon: faCar,
    },
    {
      title: 'Moto',
      content: 'Passage du permis A2 en cours',
      icon: faMotorcycle,
    },
    {
      title: 'Mode de seconde main',
      content: (
        <div>
          <p>Fan de vêtements vintage.</p>
          <p>Utilisation de Vinted et achats en friperie.</p>
        </div>
      ),
      icon: faShirt,
    },
    {
      title: 'Musique',
      content: (
        <div>
          <p>Écoute et découverte de multiples styles musicaux.</p>
        </div>
      ),
      icon: faMusic,
    },
  ]

  return (
    <div className="container about-page">
      <section className="about-introduction">
        <div className="text-zone">
          <h1>A propos de moi</h1>
          <h2>Qui je suis ?</h2>
          <p>
            Jeune homme passionné d&apos;informatique depuis tout petit,
            j&apos;ai grandi avec une manette de NES dans les mains.
          </p>
          <p>
            Aujourd&apos;hui je suis en Bachelor Concepteur Développeur
            d&apos;application a Epitech pour continuer dans la voie de
            l&apos;informatique
          </p>
          <p>
            Je suis actuellement en recherche d&apos;alternance pour continuer
            mon parcour scolaire !
          </p>
        </div>
      </section>
      <section className="learning">
        <div className="text-zone">
          <h2>Comment j'apprend ?</h2>
          <p>
            Ma curiosité me pousse a chercher par moi meme , je suis également
            la fomation de Mr Bruno simon Three.js journey
          </p>
          <p>
            je construit des projets puvant mettre utile au quotidients en plus
            de continuer mon autoformation à côté de mon travail à temps plein
          </p>
        </div>
      </section>
      <section className="technologies">
        <div className="text-zone">
          <h2>Mon environement technique</h2>
          <div className="tech-cloud">
            {technlogies.map((technology) => (
              <div className="tech-item" key={technology}>
                <span>{technology}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="projects">
        <div className="text-zone">
          <h2> Ce que je construit</h2>
          <p>
            Je préfère apprendre en construisant des projets concrets. Certains
            répondent à un besoin personnel, d'autres me permettent simplement
            d'expérimenter une technologie ou une nouvelle approche.
          </p>
          <p>
            Comme mon site de veille pour stocker toute mes ressources texte /
            videos / docs sous forme de liens et de pouvoir arreter de chercher
            dans mes dossier firefox{' '}
          </p>
          <p>
            Mais aussi en parrallelle je me construit un homelab , mon vieux PC
            ne prendra pas ca retraite , pour stocker mon code avec GITEA et
            pouvoir avoir un IDE sur n&apos;importe quel plateforme .
          </p>
          <p>
            Ce homelab me servira comme playground pour Docker et traeffik ,
            pour faire de la CI/CD sur mon serveur kimsufi , de serveur de
            decodage videos pour un jour reprendre les streams sur twitch , le
            deploiement et l'administration de services
          </p>
        </div>
      </section>

      <section className="passion">
        <div className="text-zone">
          <h2>Mais aussi passionné par :</h2>
          {!isMobile ? (
            <div className="card-container">
              {interests.map((interest, index) => (
                <TiltCard key={index} title={interest.title} />
              ))}
            </div>
          ) : (
            <div className="mobile-card-container">
              {interests.map((interest, index) => (
                <div
                  key={index}
                  className={`interest-row ${index % 2 === 0 ? 'right' : 'left'}`}
                >
                  <div className="interest-text">
                    <h3>{interest.title}</h3>
                    <p>{interest.content}</p>
                  </div>
                  <div className="card">
                    <div className="header">
                      <FontAwesomeIcon
                        className="card-icon"
                        icon={interest.icon}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <section className="futur">
        <div className="text-zone">
          <h2> Le futur ? </h2>
          {!isMobile && <QuestionMark3D />}
          <span>Qu&apos;en est t&apos;il de l&apos;avenir</span>
          <p>J'ai plein (trop) d&apos;idées :</p>
          <ul>
            <li>
              Appronfodir le WebGL notament three.js (À moi les Awwwards dans
              quelques années! )
            </li>
            <li>Continuer a me former sur le web design</li>
            <li>Appronfodir le DevOps</li>
            <li>
              Continuer mon Homelab pour en faire un vrai playground de dev et
              de test en tout genre
            </li>
            <li>
              Continuer d&apos;améliorer mon portefolio et de partir dans de
              nouvel aventure dans toute sorte de projets
            </li>
          </ul>
          <p>
            Ce portfolio fait lui-même partie de cette démarche d'apprentissage.
            <br />
            Il a connu moult versions, plus ou moins présentables, et continue
            d'évoluer au fil de mes découvertes.
          </p>
          <p>Je continue d'apprendre de jour en jour , push apres push </p>
        </div>
      </section>
    </div>
  )
}
