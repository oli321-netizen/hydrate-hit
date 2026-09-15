import { NextResponse } from "next/server";
import { getMaintenanceState } from "@/lib/maintenance";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

const NO_STORE = {
  "Cache-Control": "private, no-store, max-age=0, must-revalidate",
};

/** Live maintenance banner flags from server env (Railway restart picks these up). */
export async function GET() {
  const state = getMaintenanceState();
  if (!state.enabled) {
    return NextResponse.json(
      { enabled: false, lockdown: false },
      { headers: NO_STORE },
    );
  }
  return NextResponse.json(state, { headers: NO_STORE });
}
