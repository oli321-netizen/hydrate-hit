"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { CrystalMark } from "@/components/Brand";

const SplashCanvas = dynamic(
  () => import("@/components/SplashCanvas").then((mod) => mod.SplashCanvas),
  { ssr: false },
);

const KEY = "hh-splash-seen";

function isHomePath(path: string) {
  const p = path.replace(/\/$/, "") || "/";
  return p === "/";
}

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function isLowEnd() {
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
  };
  if (nav.connection?.saveData) return true;
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 2) return true;
  return false;
}

export function Splash() {
  const path = usePathname();
  const landedHome = isHomePath(path ?? "/");
  const landOnHome = useRef(landedHome);
  const [visible, setVisible] = useState(landedHome);
  const [fading, setFading] = useState(false);
  const [use3d, setUse3d] = useState(false);
  const closed = useRef(!landedHome);
  const ready = useRef(false);
  const started = useRef(0);

  const close = useCallback(() => {
    if (closed.current) return;
    closed.current = true;
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* private mode */
    }
    setFading(true);
    window.setTimeout(() => {
      setVisible(false);
      document.documentElement.classList.remove("hh-splash");
    }, 420);
  }, []);

  const markReady = useCallback(() => {
    ready.current = true;
  }, []);

  useEffect(() => {
    if (!landOnHome.current) {
      closed.current = true;
      document.documentElement.classList.remove("hh-splash");
      return;
    }

    try {
      if (sessionStorage.getItem(KEY)) {
        closed.current = true;
        setVisible(false);
        document.documentElement.classList.remove("hh-splash");
        return;
      }
    } catch {
      /* continue */
    }

    document.documentElement.classList.add("hh-splash");
    started.current = Date.now();

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const low = reduced || isLowEnd() || !hasWebGL();
    setUse3d(!low);
    if (low) ready.current = true;

    const min = reduced ? 1200 : 1700;
    const max = reduced ? 1500 : 2400;

    const tick = window.setInterval(() => {
      if (closed.current) {
        window.clearInterval(tick);
        return;
      }
      const elapsed = Date.now() - started.current;
      if (elapsed >= max || (ready.current && elapsed >= min)) close();
    }, 80);

    return () => window.clearInterval(tick);
  }, [close]);

  if (!visible) return null;

  return (
    <div
      className={`hh-splash-overlay ${fading ? "hh-splash-overlay--out" : ""}`}
      role="status"
      aria-live="polite"
      aria-hidden={fading}
    >
      <div className="flex w-full max-w-sm flex-col items-center px-6">
        <div className="relative mb-6 h-44 w-44 sm:h-52 sm:w-52">
          {use3d ? (
            <SplashCanvas onReady={markReady} onFail={markReady} />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <CrystalMark a="#1f6fe5" b="#d63d8c" className="h-20 w-20" />
            </div>
          )}
        </div>
        <p className="text-2xl font-extrabold tracking-tight text-[#18181b] sm:text-3xl">
          HYDRATE HIT
        </p>
        <p className="mt-3 flex items-center gap-3 text-sm text-[#3f3f46]">
          <span className="h-px w-8" style={{ background: "#d63d8c" }} />
          hydrates and hits
          <span className="h-px w-8" style={{ background: "#1f6fe5" }} />
        </p>
      </div>
    </div>
  );
}
