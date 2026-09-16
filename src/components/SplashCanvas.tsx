"use client";

import {
  Component,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { asset } from "@/lib/site";

const BLUE = "#1F6FE5";
const PINK = "#D63D8C";
const INK = "#18181b";
const ZINC = "#f4f5f7";

class SplashGuard extends Component<
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

function applyMap(texture: THREE.Texture, mipmaps = false) {
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = mipmaps;
  texture.minFilter = mipmaps ? THREE.LinearMipmapLinearFilter : THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

function makeCanvasTexture(
  width: number,
  height: number,
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void,
) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  draw(ctx, width, height);
  return applyMap(new THREE.CanvasTexture(canvas));
}

function drawWrap(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = ZINC;
  ctx.fillRect(0, 0, w, h);

  const panels = 2;
  const pw = w / panels;
  const top = Math.round(h * 0.3);
  const bot = Math.round(h * 0.12);

  for (let i = 0; i < panels; i++) {
    const x = i * pw;
    ctx.fillStyle = BLUE;
    ctx.fillRect(x, 0, pw / 2, top);
    ctx.fillStyle = PINK;
    ctx.fillRect(x + pw / 2, 0, pw / 2, top);
    ctx.fillStyle = PINK;
    ctx.fillRect(x, h - bot, pw / 2, bot);
    ctx.fillStyle = BLUE;
    ctx.fillRect(x + pw / 2, h - bot, pw / 2, bot);

    ctx.fillStyle = INK;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `800 ${Math.round(h * 0.26)}px "Arial Black","Helvetica Neue",Arial,sans-serif`;
    ctx.fillText("FLUXHIT", x + pw / 2, h * 0.48);

    const labelY = h * 0.72;
    ctx.font = `800 ${Math.round(h * 0.18)}px "Arial Black","Helvetica Neue",Arial,sans-serif`;
    const blueW = ctx.measureText("BLUE").width;
    const gap = Math.round(h * 0.06);
    const razzW = ctx.measureText("RAZZ").width;
    let tx = x + pw / 2 - (blueW + gap + razzW) / 2;
    ctx.textAlign = "left";
    ctx.fillStyle = BLUE;
    ctx.fillText("BLUE", tx, labelY);
    tx += blueW + gap;
    ctx.fillStyle = PINK;
    ctx.fillText("RAZZ", tx, labelY);
  }
}

function drawFallbackLid(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const cx = w / 2;
  const cy = h / 2;
  const r = w / 2 - 2;

  ctx.clearRect(0, 0, w, h);
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = "#fafafa";
  ctx.fill();

  ctx.fillStyle = INK;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `800 ${Math.round(w * 0.11)}px "Arial Black","Helvetica Neue",Arial,sans-serif`;
  ctx.fillText("FLUXHIT", cx, cy - w * 0.12);

  ctx.font = `800 ${Math.round(w * 0.09)}px "Arial Black","Helvetica Neue",Arial,sans-serif`;
  const blueW = ctx.measureText("BLUE").width;
  const gap = Math.round(w * 0.025);
  const razzW = ctx.measureText("RAZZ").width;
  const tx = cx - (blueW + gap + razzW) / 2;
  ctx.textAlign = "left";
  ctx.fillStyle = BLUE;
  ctx.fillText("BLUE", tx, cy + w * 0.02);
  ctx.fillStyle = PINK;
  ctx.fillText("RAZZ", tx + blueW + gap, cy + w * 0.02);

  ctx.beginPath();
  ctx.moveTo(cx - w * 0.16, cy + w * 0.1);
  ctx.lineTo(cx - w * 0.03, cy + w * 0.1);
  ctx.strokeStyle = PINK;
  ctx.lineWidth = Math.max(2, w * 0.006);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx + w * 0.03, cy + w * 0.1);
  ctx.lineTo(cx + w * 0.16, cy + w * 0.1);
  ctx.strokeStyle = BLUE;
  ctx.stroke();

  ctx.fillStyle = "#3f3f46";
  ctx.font = `600 ${Math.round(w * 0.035)}px "Helvetica Neue",Arial,sans-serif`;
  ctx.textAlign = "center";
  ctx.fillText("smooth hit · light electrolytes", cx, cy + w * 0.16);

  ctx.fillStyle = BLUE;
  ctx.beginPath();
  ctx.moveTo(cx + w * 0.12, cy + w * 0.28);
  ctx.lineTo(cx + w * 0.32, cy + w * 0.18);
  ctx.lineTo(cx + w * 0.28, cy + w * 0.38);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = PINK;
  ctx.beginPath();
  ctx.moveTo(cx + w * 0.32, cy + w * 0.18);
  ctx.lineTo(cx + w * 0.38, cy + w * 0.3);
  ctx.lineTo(cx + w * 0.28, cy + w * 0.38);
  ctx.closePath();
  ctx.fill();
}

function SpinningTin({
  lid,
  wrap,
  onReady,
}: {
  lid: THREE.Texture;
  wrap: THREE.Texture;
  onReady: () => void;
}) {
  const group = useRef<THREE.Group>(null);
  const signaled = useRef(false);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.55;
    if (!signaled.current) {
      signaled.current = true;
      onReady();
    }
  });

  return (
    <group ref={group} position={[0, -0.04, 0]} rotation={[0.3, 0.38, 0.03]}>
      <mesh>
        <cylinderGeometry args={[1.08, 1.12, 0.42, 48, 1, true]} />
        <meshStandardMaterial
          map={wrap}
          roughness={0.3}
          metalness={0.08}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[0, 0.214, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.075, 48]} />
        <meshStandardMaterial
          key={lid.uuid}
          map={lid}
          roughness={0.42}
          metalness={0.04}
        />
      </mesh>
      <mesh position={[0, 0.218, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.075, 1.14, 48]} />
        <meshStandardMaterial color="#ececef" roughness={0.2} metalness={0.28} />
      </mesh>
      <mesh position={[0, -0.214, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.12, 48]} />
        <meshStandardMaterial color="#e4e4e7" roughness={0.5} metalness={0.06} />
      </mesh>
      <mesh position={[1.08, 0.04, 0.72]} scale={0.3}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color={BLUE} roughness={0.18} metalness={0.2} />
      </mesh>
    </group>
  );
}

function Scene({ onReady, onFail }: { onReady: () => void; onFail: () => void }) {
  const [brand] = useState(() => {
    const wrap = makeCanvasTexture(1024, 160, drawWrap);
    const lid = makeCanvasTexture(512, 512, drawFallbackLid);
    if (!wrap || !lid) return null;
    return { wrap, lid };
  });
  const [pngLid, setPngLid] = useState<THREE.Texture | null>(null);
  const [pngWrap, setPngWrap] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    if (!brand) {
      onFail();
      return;
    }

    let cancelled = false;
    let png: THREE.Texture | null = null;
    let wrapPng: THREE.Texture | null = null;
    const loader = new THREE.TextureLoader();
    loader.crossOrigin = "anonymous";
    loader.load(
      asset("/tins/blue-razz-lid.png"),
      (texture) => {
        if (cancelled) {
          texture.dispose();
          return;
        }
        applyMap(texture, true);
        // Zoom past the PNG's transparent corners so the wordmark fills the lid.
        texture.repeat.set(0.9, 0.9);
        texture.offset.set(0.05, 0.05);
        png = texture;
        setPngLid(texture);
      },
      undefined,
      () => {
        /* canvas lid already branded */
      },
    );
    loader.load(
      asset("/tins/blue-razz-side.png"),
      (texture) => {
        if (cancelled) {
          texture.dispose();
          return;
        }
        applyMap(texture, true);
        wrapPng = texture;
        setPngWrap(texture);
      },
      undefined,
      () => {
        /* canvas wrap already branded */
      },
    );

    return () => {
      cancelled = true;
      png?.dispose();
      wrapPng?.dispose();
      brand.wrap.dispose();
      brand.lid.dispose();
    };
  }, [brand, onFail]);

  if (!brand) return null;

  return (
    <>
      <ambientLight intensity={1.15} />
      <directionalLight position={[2.2, 7.2, 3.4]} intensity={1.65} />
      <directionalLight position={[-3.4, 2.2, 1.6]} intensity={0.5} color={PINK} />
      <SpinningTin lid={pngLid ?? brand.lid} wrap={pngWrap ?? brand.wrap} onReady={onReady} />
    </>
  );
}

export function SplashCanvas({ onReady, onFail }: { onReady: () => void; onFail: () => void }) {
  return (
    <SplashGuard onError={onFail}>
      <Canvas
        camera={{ position: [0, 2.05, 3.55], fov: 34, near: 0.1, far: 30 }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        dpr={[1, 1.25]}
        className="h-full w-full bg-transparent"
        style={{ background: "transparent" }}
        onCreated={({ gl, scene, camera }) => {
          gl.setClearColor(0x000000, 0);
          scene.background = null;
          camera.lookAt(0, 0.02, 0);
        }}
        aria-hidden
      >
        <Scene onReady={onReady} onFail={onFail} />
      </Canvas>
    </SplashGuard>
  );
}
