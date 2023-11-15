import React from "react";
import "./App.css";
import { Canvas, useFrame } from "@react-three/fiber";

function Torus() {
  const torusRef = React.useRef();

  useFrame(() => {
    if (torusRef.current) {
      torusRef.current.rotation.y += 0.002;
      torusRef.current.rotation.x += 0.001;
    }
  });

  return (
    <mesh ref={torusRef} castShadow receiveShadow>
      <torusGeometry args={[2, 0.6, 16, 100]} />
      <meshStandardMaterial color={0x00cdfe} />
    </mesh>
  );
}

function App() {
  return (
    <div className="App">
      <p className="team-torus">Team Torus</p>{" "}
      <div className="torus-container">
        <Canvas shadows>
          <ambientLight />
          <directionalLight
            position={[5, 5, 5]}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-bias={-0.0005}
          />
          <Torus />
        </Canvas>
      </div>
      <p className="coming-soon">Coming Soon</p>
    </div>
  );
}

export default App;
