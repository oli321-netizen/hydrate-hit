"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { FLAVOURS, type Flavour } from "@/lib/products";

function Crystal({ flavour }: { flavour: Flavour }) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += delta * 0.4;
    mesh.current.rotation.x += delta * 0.12;
  });

  return (
    <mesh ref={mesh} position={[1.15, -0.05, 0.85]} scale={0.42} castShadow>
      <icosahedronGeometry args={[1, 0]} />
      <meshPhysicalMaterial
        color={flavour.crystal[0]}
        roughness={0.12}
        metalness={0.18}
        clearcoat={1}
        iridescence={0.7}
        iridescenceIOR={1.4}
        sheen={0.4}
        sheenColor={new THREE.Color(flavour.crystal[1])}
      />
    </mesh>
  );
}

function Tin({ flavour }: { flavour: Flavour }) {
  const group = useRef<THREE.Group>(null);
  const urls = useMemo(() => FLAVOURS.map((item) => item.lidSrc), []);
  const textures = useTexture(urls) as THREE.Texture[];

  textures.forEach((texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    texture.needsUpdate = true;
  });

  const map = textures[FLAVOURS.findIndex((item) => item.slug === flavour.slug)] ?? textures[2];

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = Math.sin(t * 0.35) * 0.18 + 0.22;
    group.current.position.y = Math.sin(t * 0.9) * 0.04;
  });

  return (
    <group ref={group} rotation={[-0.42, 0.28, 0.06]}>
      <mesh castShadow>
        <cylinderGeometry args={[1.2, 1.24, 0.5, 80]} />
        <meshPhysicalMaterial
          color="#f4f4f5"
          roughness={0.22}
          metalness={0.12}
          clearcoat={0.7}
          clearcoatRoughness={0.2}
        />
      </mesh>
      <mesh position={[0, 0.255, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.18, 80]} />
        <meshPhysicalMaterial map={map} roughness={0.38} metalness={0.04} />
      </mesh>
      <mesh position={[0, 0.258, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.18, 1.24, 80]} />
        <meshPhysicalMaterial color="#ececef" roughness={0.15} metalness={0.35} />
      </mesh>
      <mesh position={[0, -0.255, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.22, 80]} />
        <meshPhysicalMaterial color="#e4e4e7" roughness={0.4} metalness={0.08} />
      </mesh>
    </group>
  );
}

function Scene({ flavour }: { flavour: Flavour }) {
  return (
    <>
      <color attach="background" args={["#f3f4f6"]} />
      <ambientLight intensity={0.85} />
      <directionalLight position={[4, 6, 3]} intensity={1.35} castShadow />
      <directionalLight position={[-3, 2, -2]} intensity={0.45} color={flavour.toneA} />
      <spotLight position={[0, 6, 2]} intensity={0.6} angle={0.5} penumbra={0.8} />
      <Tin flavour={flavour} />
      <Crystal flavour={flavour} />
      <ContactShadows
        position={[0, -1.15, 0]}
        opacity={0.28}
        scale={8}
        blur={2.4}
        far={2.4}
      />
    </>
  );
}

export function TinScene({ flavour }: { flavour: Flavour }) {
  return (
    <Canvas
      camera={{ position: [0, 0.55, 4.2], fov: 32 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.75]}
      className="h-full w-full"
      aria-label={`${flavour.name} tin`}
    >
      <Suspense fallback={null}>
        <Scene flavour={flavour} />
      </Suspense>
    </Canvas>
  );
}
