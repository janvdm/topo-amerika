import type { Location } from "@/data/locations";
import { getLocationsByKind } from "@/data/locations";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Vier opties: juiste + drie distractoren (liefst zelfde soort, zelfde continent). */
export function buildMcqOptions(
  target: Location,
  pool: Location[],
): Location[] {
  const sameKind = getLocationsByKind(target.kind, target.continent).filter(
    (l) => l.id !== target.id,
  );
  const picked = shuffle(sameKind).slice(0, 3);
  const need = 3 - picked.length;
  if (need > 0) {
    const rest = shuffle(
      pool.filter((l) => l.id !== target.id && !picked.includes(l)),
    );
    picked.push(...rest.slice(0, need));
  }
  return shuffle([target, ...picked]);
}