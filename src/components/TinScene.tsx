"use client";

import {
  Component,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { FLAVOURS, type Flavour } from "@/lib/products";
import { flavourSlugRef } from "@/components/Providers";
import { asset, SITE_NAME } from "@/lib/site";

class WebGLGuard extends Component<
  { children: ReactNode; onError: () => void },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

function useLidMaps(onFail: () => void) {
  const [maps, setMaps] = useState<Record<string, THREE.Texture> | null>(null);

  useEffect(() => {
    let cancelled = false;
    const loader = new THREE.TextureLoader();
    loader.crossOrigin = "anonymous";

    Promise.all(
      FLAVOURS.map(
        (flavour) =>
          new Promise<[string, THREE.Texture]>((resolve, reject) => {
            loader.load(
              asset(flavour.lidSrc),
              (texture) => resolve([flavour.slug, texture]),
              undefined,
              () => reject(new Error(`lid ${flavour.slug}`)),
            );
          }),
      ),
    )
      .then((entries) => {
        if (cancelled) return;
        const next: Record<string, THREE.Texture> = {};
        for (const [slug, texture] of entries) {
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.anisotropy = 8;
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
          texture.needsUpdate = true;
          next[slug] = texture;
        }
        setMaps(next);
      })
      .catch(() => {
        if (!cancelled) onFail();
      });

    return () => {
      cancelled = true;
    };
  }, [onFail]);

  return maps;
}

function Crystal({ flavour }: { flavour: Flavour }) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += delta * 0.4;
    mesh.current.rotation.x += delta * 0.12;
  });

  return (
    <mesh ref={mesh} position={[1.05, 0.05, 0.95]} scale={0.38} castShadow>
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

function Tin({
  flavour,
  maps,
}: {
  flavour: Flavour;
  maps: Record<string, THREE.Texture>;
}) {
  const group = useRef<THREE.Group>(null);
  const lidMat = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = Math.sin(t * 0.32) * 0.2 + 0.16;
    group.current.position.y = Math.sin(t * 0.9) * 0.025;

    const slug = flavourSlugRef.current;
    const mat = lidMat.current;
    const tex = maps[slug] ?? maps[flavour.slug] ?? maps["blue-razz"];
    if (mat && tex && mat.map !== tex) {
      mat.map = tex;
      mat.needsUpdate = true;
    }
  });

  const lidMap = maps[flavour.slug] ?? maps["blue-razz"];

  return (
    <group ref={group} position={[0, -0.12, 0]}>
      {/* Open-ended wall — default cylinder caps were covering the lid map. */}
      <mesh castShadow>
        <cylinderGeometry args={[1.16, 1.2, 0.46, 96, 1, true]} />
        <meshPhysicalMaterial
          color="#f7f7f8"
          roughness={0.28}
          metalness={0.08}
          clearcoat={0.55}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[0, 0.232, 0]} rotation={[-Math.PI / 2, 0, 0]} castShadow>
        <circleGeometry args={[1.155, 96]} />
        <meshStandardMaterial
          ref={lidMat}
          key={flavour.slug}
          map={lidMap}
          roughness={0.42}
          metalness={0.03}
        />
      </mesh>
      <mesh position={[0, 0.236, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.155, 1.22, 96]} />
        <meshPhysicalMaterial color="#ececef" roughness={0.18} metalness={0.32} />
      </mesh>
      <mesh position={[0, -0.232, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.2, 96]} />
        <meshStandardMaterial color="#e4e4e7" roughness={0.5} metalness={0.06} />
      </mesh>
    </group>
  );
}

function Scene({ flavour, onFail }: { flavour: Flavour; onFail: () => void }) {
  const maps = useLidMaps(onFail);
  if (!maps) return null;

  return (
    <>
      <ambientLight intensity={1.15} />
      <directionalLight position={[2.2, 7.5, 4]} intensity={1.85} castShadow />
      <directionalLight position={[-4, 2.4, 2]} intensity={0.55} color={flavour.toneA} />
      <spotLight position={[0, 6.5, 3]} intensity={0.7} angle={0.55} penumbra={0.85} />
      <Tin flavour={flavour} maps={maps} />
      <Crystal flavour={flavour} />
      <ContactShadows position={[0, -1.05, 0]} opacity={0.26} scale={8} blur={2.4} far={2.4} />
    </>
  );
}

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export function TinScene({ flavour }: { flavour: Flavour }) {
  const [failed, setFailed] = useState(false);
  const onFail = useCallback(() => setFailed(true), []);

  useEffect(() => {
    if (!supportsWebGL()) setFailed(true);
  }, []);

  if (failed) return null;

  return (
    <WebGLGuard onError={onFail}>
      <Canvas
        camera={{ position: [0, 2.85, 3.15], fov: 28, near: 0.1, far: 40 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.75]}
        className="h-full w-full bg-transparent"
        style={{ background: "transparent" }}
        onCreated={({ gl, scene, camera }) => {
          gl.setClearColor(0x000000, 0);
          scene.background = null;
          camera.lookAt(0, 0.05, 0);
        }}
        onPointerMissed={undefined}
        aria-label={`${flavour.name} ${SITE_NAME} tin`}
      >
        <Suspense fallback={null}>
          <Scene flavour={flavour} onFail={onFail} />
        </Suspense>
      </Canvas>
    </WebGLGuard>
  );
}
