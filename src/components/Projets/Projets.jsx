import './Projets.scss'
import Loader from 'react-loaders'

const Projets = () => {
  return (
    <>
      <div className="container cv">
        <div className="text-zone">
          <h1>Projets</h1>
          <h2>Projet 1</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
            tenetur fugiat culpa quis dolor officiis nisi ducimus deserunt
            suscipit laudantium vitae facere quos numquam quas, nesciunt et
            libero consequuntur laboriosam!
          </p>
          <h2>Projet 2</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
            tenetur fugiat culpa quis dolor officiis nisi ducimus deserunt
            suscipit laudantium vitae facere quos numquam quas, nesciunt et
            libero consequuntur laboriosam!
          </p>
          <h2>Projet 3</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
            tenetur fugiat culpa quis dolor officiis nisi ducimus deserunt
            suscipit laudantium vitae facere quos numquam quas, nesciunt et
            libero consequuntur laboriosam!
          </p>
        </div>
      </div>
      <Loader type="pacman" />
    </>
  )
}
export default Projets
