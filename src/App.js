import React, { useState, useRef } from "react";
import "./App.css";
import { Canvas, useFrame } from "@react-three/fiber";

/* 3D Torus component written using react-three-fiber */

function Torus() {
  const torusRef = useRef();
  const boxRef = useRef(); /* hitbox */
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  /* Event handlers for interaction */

  const handleMouseDown = (event) => {
    setIsDragging(true);
  };

  const handleMouseMove = (event) => {
    if (isDragging) {
      setRotation((prevRotation) => ({
        x: prevRotation.x + event.movementY * 0.01,
        y: prevRotation.y + event.movementX * 0.01,
      }));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseOut = () => {
    setIsDragging(false);
  };

  /* If no input, idly rotate and update rotation, else rotate with mouse */

  useFrame(() => {
    if (torusRef.current) {
      if (!isDragging) {
        torusRef.current.rotation.y += 0.004;
        torusRef.current.rotation.x += 0.002;
        setRotation((prevRotation) => ({
          x: prevRotation.x + 0.002,
          y: prevRotation.y + 0.004,
        }));
      } else {
        torusRef.current.rotation.x = rotation.x;
        torusRef.current.rotation.y = rotation.y;
      }
    }
  });

  return (
    <>
      <mesh ref={torusRef} castShadow receiveShadow>
        <torusGeometry args={[2, 0.6, 16, 100]} />
        <meshStandardMaterial color={0x00cdfe} />
      </mesh>
      <mesh
        ref={boxRef}
        visible={false} // Make the box invisible
        onPointerDown={handleMouseDown}
        onPointerMove={handleMouseMove}
        onPointerUp={handleMouseUp}
        onPointerOut={handleMouseOut}
      >
        {/* Adjust the size of the box to properly enclose the torus */}
        <boxGeometry args={[7, 4, 5]} />
        <meshStandardMaterial transparent opacity={0} />
      </mesh>
    </>
  );
}

/* Main app */

function App() {
  return (
    <div className="App">
      <div className="content">
        <p className="team-torus">Team Torus</p>
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
        <p className="coming-soon">Coming Soon!</p>
      </div>
      <div className="footer">
        <p className="university">@ university of maryland</p>
        <a
          href="https://www.instagram.com/teamtorusumd/"
          className="instagram-link"
        >
          <p className="instagram">instagram</p>
        </a>
      </div>
    </div>
  );
}

export default App;
