import React from "react";
import "./App.css";
import { Canvas, useFrame } from "@react-three/fiber";

function Torus() {
  const torusRef = React.useRef();

  useFrame(() => {
    if (torusRef.current) {
      torusRef.current.rotation.y += 0.02;
      torusRef.current.rotation.x += 0.01;
    }
  });

  return (
    <mesh ref={torusRef}>
      <torusGeometry args={[5, 2, 16, 100]} />
      <meshBasicMaterial color={0x0000ff} />
    </mesh>
  );
}

function App() {
  return (
    <div className="App">
      <header className="header">
        <div className="header-text">
          <h1 className="team-torus">Team Torus</h1>
          <p className="coming-soon">Coming Soon</p>
        </div>
      </header>
      <div className="torus-container">
        <Canvas>
          <ambientLight />
          <Torus />
        </Canvas>
      </div>
    </div>
  );
}

export default App;
