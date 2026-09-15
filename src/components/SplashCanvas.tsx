"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { asset } from "@/lib/site";

function SpinningTin({ map }: { map: THREE.Texture }) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.55;
  });

  return (
    <group ref={group} rotation={[-0.55, 0.35, 0.04]}>
      <mesh>
        <cylinderGeometry args={[1.05, 1.08, 0.4, 48, 1, true]} />
        <meshStandardMaterial color="#f4f4f5" roughness={0.32} metalness={0.08} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0.205, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.05, 48]} />
        <meshStandardMaterial map={map} roughness={0.42} metalness={0.04} />
      </mesh>
      <mesh position={[0, 0.208, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.05, 1.1, 48]} />
        <meshStandardMaterial color="#ececef" roughness={0.2} metalness={0.28} />
      </mesh>
      <mesh position={[1.05, 0.02, 0.7]} scale={0.32}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#1f6fe5" roughness={0.18} metalness={0.2} />
      </mesh>
    </group>
  );
}

function Scene({ onReady, onFail }: { onReady: () => void; onFail: () => void }) {
  const [map, setMap] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    let cancelled = false;
    const loader = new THREE.TextureLoader();
    loader.crossOrigin = "anonymous";
    loader.load(
      asset("/tins/blue-razz-lid.png"),
      (texture) => {
        if (cancelled) return;
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        setMap(texture);
        onReady();
      },
      undefined,
      () => {
        if (!cancelled) onFail();
      },
    );
    return () => {
      cancelled = true;
    };
  }, [onFail, onReady]);

  if (!map) return null;

  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[2, 5, 4]} intensity={1.5} />
      <directionalLight position={[-3, 2, 1]} intensity={0.45} color="#d63d8c" />
      <SpinningTin map={map} />
    </>
  );
}

export function SplashCanvas({ onReady, onFail }: { onReady: () => void; onFail: () => void }) {
  return (
    <Canvas
      camera={{ position: [0, 1.6, 3.4], fov: 32, near: 0.1, far: 30 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      dpr={[1, 1.25]}
      className="h-full w-full bg-transparent"
      style={{ background: "transparent" }}
      onCreated={({ gl, scene, camera }) => {
        gl.setClearColor(0x000000, 0);
        scene.background = null;
        camera.lookAt(0, 0, 0);
      }}
      aria-hidden
    >
      <Scene onReady={onReady} onFail={onFail} />
    </Canvas>
  );
}
