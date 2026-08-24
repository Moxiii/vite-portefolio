const CV = new URL('../assets/Cv/CV Lapouge Maxime.pdf', import.meta.url).href

const links = {
  home: '/',
  about: '/about',
  cv: '/cv',
  login: '/login',
  admin: '/admin',
  dashboard: '/dashboard',
  download: {
    cv: CV,
  },
  externalLinks: {
    linkedin: 'https://www.linkedin.com/in/maxime-lapouge69/',
    github: 'https://github.com/Moxiii',
  },
}
export default links
