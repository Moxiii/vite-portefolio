import { Canvas, useFrame } from '@react-three/fiber'
import { Text3D } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'

function RotatingQuestionMark() {
  const [position, setPosition] = useState([0, 0, 0])
  const questionMarkRef = useRef(null)
  const rotationVelocity = useRef({
    x: 0,
    y: 0,
  })
  useEffect(() => {
    if (questionMarkRef.current) {
      const width = questionMarkRef.current.geometry.boundingBox?.max.x || 0
      setPosition([-(width / 2), -3, 5])
    }
  }, [])

  useFrame((_, delta) => {
    if (!questionMarkRef.current) return
    questionMarkRef.current.rotation.y += delta * 0.7
    questionMarkRef.current.rotation.x += rotationVelocity.current.x
    questionMarkRef.current.rotation.y += rotationVelocity.current.y
  })

  return (
    <Text3D
      ref={questionMarkRef}
      font="/fonts/DM_Sans_Regular.json"
      size={5}
      height={0.2}
      curveSegments={12}
      bevelEnabled
      bevelThickness={0.02}
      bevelSize={0.02}
      bevelOffset={0}
      bevelSegments={5}
      position={position}
    >
      ?
      <meshStandardMaterial color="#cf87ff" />
    </Text3D>
  )
}

export default function QuestionMark3D() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0, -3], fov: 100 }}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <directionalLight intensity={1.2} position={[0, 0, 5]} />
        <ambientLight intensity={2} />
        <RotatingQuestionMark />
      </Canvas>
    </div>
  )
}
