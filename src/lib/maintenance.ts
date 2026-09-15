/** Server-only maintenance flags. Read at request time (not NEXT_PUBLIC). */

export type MaintenanceState = {
  enabled: boolean;
  message: string;
  eta: string;
  lockdown: boolean;
};

function isOn(value: string | undefined) {
  const v = value?.trim().toLowerCase();
  return v === "1" || v === "true" || v === "yes" || v === "on";
}

export function parseMaintenanceEnv(
  env: Record<string, string | undefined> = process.env,
): MaintenanceState {
  const enabled = isOn(env.MAINTENANCE_BANNER);
  const eta = (env.MAINTENANCE_ETA ?? "").trim();
  const override = (env.MAINTENANCE_MESSAGE ?? "").trim();
  const message = override
    ? override
    : eta
      ? `We're updating the site — back in ${eta}.`
      : "We're updating the site — back soon.";

  return {
    enabled,
    message,
    eta,
    lockdown: enabled && isOn(env.MAINTENANCE_LOCKDOWN),
  };
}

export function getMaintenanceState(): MaintenanceState {
  return parseMaintenanceEnv(process.env);
}
