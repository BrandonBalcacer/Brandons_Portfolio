"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useEffect, useRef } from "react";
import * as THREE from "three";

function Surface() {
  const mesh = useRef<THREE.Mesh>(null);
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX / window.innerWidth - 0.5;
      target.current.y = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    const r = mesh.current.rotation;
    r.x = -0.45 + Math.sin(t * 0.18) * 0.04 + target.current.y * 0.12;
    r.z = -0.55 + Math.cos(t * 0.14) * 0.04 + target.current.x * 0.18;
  });

  return (
    <mesh ref={mesh} position={[1.3, -0.5, 0]} rotation={[-0.45, 0, -0.55]}>
      <torusGeometry args={[3.4, 1.1, 96, 256]} />
      <meshStandardMaterial
        color="#0a0a0a"
        metalness={0.65}
        roughness={0.38}
      />
    </mesh>
  );
}

function Figure() {
  return (
    <mesh position={[0.4, -1.55, 0.6]}>
      <capsuleGeometry args={[0.045, 0.16, 4, 8]} />
      <meshBasicMaterial color="#000000" />
    </mesh>
  );
}

function Particles() {
  const points = useRef<THREE.Points>(null);
  const positions = useRef<Float32Array | null>(null);
  if (!positions.current) {
    const arr = new Float32Array(400 * 3);
    for (let i = 0; i < 400; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 5;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4 - 1;
    }
    positions.current = arr;
  }

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions.current, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.012}
        color="#7fa6ff"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.04} />
      <directionalLight
        position={[-3, 5, 3]}
        intensity={3.5}
        color="#cfe0ff"
      />
      <pointLight
        position={[3, -1, 2]}
        intensity={1.2}
        color="#3b82f6"
        distance={6}
      />
      <Particles />
      <Surface />
      <Figure />
      <EffectComposer>
        <Bloom
          intensity={0.7}
          luminanceThreshold={0.45}
          luminanceSmoothing={0.5}
          mipmapBlur
        />
      </EffectComposer>
    </Canvas>
  );
}
