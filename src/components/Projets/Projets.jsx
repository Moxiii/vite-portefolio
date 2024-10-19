import './Projets.scss'
import Loader from 'react-loaders'
import {useState , useEffect}  from 'react';
import {useParams} from 'react-router-dom'
const Projets = () => {
  const {id} = useParams();
  const [projet,setProjet] = useState(null);
  useEffect(() => {
    fetch('/Json/projects.json')
      .then((response)=>response.json())
      .then((data)=>{
        const foundProjet = data.find((p)=>p.id === parseInt(id))
        setProjet(foundProjet)
      })
      .catch((error)=> console.error('erreur de chargement du Json : ' , error))
  }, [id])
  if (!projet) return <Loader type="pacman" />
  return (
    <>
      <div className="container projet">
        <div className="text-zone">
          <h1>{projet.title}</h1>
          <p>{projet.presentation}</p>
          <div className="img">
            {projet.img
              .filter((image) => typeof image === 'string') // Ne garde que les chaînes de caractères (donc pas les objets comme mock)
              .map((image, index) => (
                <img src={image} key={index} alt={`Projet ${projet.title} img ${index}`} />
              ))}
          </div>
          <div className="links">
            <p>Les liens utiles du projets : </p>
            {Object.entries(projet.links[0]).map(([label, url]) => (
              <a href={url} key={label} target="_blank" rel="noreferrer">
                {label} <br />
              </a>

            ))}
          </div>
        </div>
      </div>
      <Loader type="pacman" />
    </>
  );
}
export default Projets
