import s from './HeroBanner.module.scss'

export default function Herobanner() {
  const mainTechnologies = ['Java', 'Spring Boot', 'JavaScript', 'React']

  return (
    <section className={s.heroContainer}>
      <h1>Développeur web</h1>

      <span>Je conçois des applications modernes et performantes</span>

      <p>Développeur passionné par les nouvelles technologies</p>

      <div className={s.mainTechnologies}>
        {mainTechnologies.map((technology) => (
          <span key={technology}>{technology}</span>
        ))}
      </div>
    </section>
  )
}
