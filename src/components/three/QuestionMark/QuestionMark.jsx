import { Canvas, useFrame } from "@react-three/fiber";
import { Text3D } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';


function RotatingQuestionMark() {
  const [position, setPosition] = useState([0, 0, 0]);
  const questionMarkRef = useRef(null);

  useEffect(() => {
    if (questionMarkRef.current) {
      const width = questionMarkRef.current.geometry.boundingBox?.max.x || 0;
      setPosition([-(width / 2), 0, 3]);
    }
  }, []);
const clock = new THREE.Clock();
  useFrame(() => {
    const elapsedTime = clock.getElapsedTime();
    if (questionMarkRef.current) {
      questionMarkRef.current.rotation.y = elapsedTime;
    }
  });

  return (
    <Text3D
      ref={questionMarkRef}
      font="/fonts/DM_Sans_Regular.json"
      size={3}
      height={.2}
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
  );
}

export default function QuestionMark3D({ text }) {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Canvas
        camera={{ position: [0, 0, -3], fov: 70 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        <directionalLight intensity={1.2} position={[0, 0, 5]} />
        <ambientLight intensity={2} />
        <RotatingQuestionMark />
      </Canvas>
      {text && (
        <div
          style={{
            height: "100%",
            width: "100%",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            fontSize: "2rem",
            zIndex: 10,
          }}
        >
          <p style={{marginTop:"10%" , fontSize:"1rem"}}>{text}</p>
        </div>
      )}
    </div>
  );
}
