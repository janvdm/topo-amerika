export type Continent = "noord" | "zuid";

export type LocationKind = "country" | "city" | "water" | "mountain";

export interface Location {
  id: string;
  name: string;
  kind: LocationKind;
  continent: Continent;
  /** Label op de schoolkaart */
  marker: string;
}

export const LOCATIONS: Location[] = [
  // —— Zuid-Amerika: landen/gebieden (cijfers) ——
  { id: "z-abc", name: "ABC-eilanden", kind: "country", continent: "zuid", marker: "1" },
  { id: "z-sint-maarten", name: "Sint Maarten", kind: "country", continent: "zuid", marker: "2" },
  { id: "z-suriname", name: "Suriname", kind: "country", continent: "zuid", marker: "3" },
  { id: "z-ecuador", name: "Ecuador", kind: "country", continent: "zuid", marker: "5" },
  { id: "z-brazilie", name: "Brazilië", kind: "country", continent: "zuid", marker: "6" },
  { id: "z-peru", name: "Peru", kind: "country", continent: "zuid", marker: "7" },
  { id: "z-cuba", name: "Cuba", kind: "country", continent: "zuid", marker: "8" },
  { id: "z-argentinie", name: "Argentinië", kind: "country", continent: "zuid", marker: "9" },
  { id: "z-chili", name: "Chili", kind: "country", continent: "zuid", marker: "10" },
  { id: "z-vuurland", name: "Vuurland", kind: "country", continent: "zuid", marker: "12" },
  { id: "z-venezuela", name: "Venezuela", kind: "country", continent: "zuid", marker: "13" },
  { id: "z-colombia", name: "Colombia", kind: "country", continent: "zuid", marker: "14" },
  { id: "z-bolivia", name: "Bolivia", kind: "country", continent: "zuid", marker: "15" },
  { id: "z-uruguay", name: "Uruguay", kind: "country", continent: "zuid", marker: "16" },

  { id: "z-paramaribo", name: "Paramaribo", kind: "city", continent: "zuid", marker: "a" },
  { id: "z-brasilia", name: "Brasília", kind: "city", continent: "zuid", marker: "b" },
  { id: "z-rio", name: "Rio de Janeiro", kind: "city", continent: "zuid", marker: "c" },
  { id: "z-machu", name: "Machu Picchu", kind: "city", continent: "zuid", marker: "d" },
  { id: "z-havana", name: "Havana", kind: "city", continent: "zuid", marker: "e" },
  { id: "z-buenos-aires", name: "Buenos Aires", kind: "city", continent: "zuid", marker: "f" },
  { id: "z-santiago", name: "Santiago", kind: "city", continent: "zuid", marker: "g" },
  { id: "z-montevideo", name: "Montevideo", kind: "city", continent: "zuid", marker: "h" },
  { id: "z-bogota", name: "Bogotá", kind: "city", continent: "zuid", marker: "i" },
  { id: "z-la-paz", name: "La Paz", kind: "city", continent: "zuid", marker: "j" },

  { id: "z-caribisch", name: "Caribische Zee", kind: "water", continent: "zuid", marker: "I" },
  { id: "z-panama", name: "Panamakanaal", kind: "water", continent: "zuid", marker: "II" },
  { id: "z-amazone", name: "Amazone", kind: "water", continent: "zuid", marker: "III" },

  { id: "z-andes", name: "Andesgebergte", kind: "mountain", continent: "zuid", marker: "A" },

  // —— Noord-Amerika: landen/gebieden (cijfers) ——
  { id: "n-californie", name: "Californië", kind: "country", continent: "noord", marker: "1" },
  { id: "n-arizona", name: "Arizona", kind: "country", continent: "noord", marker: "2" },
  { id: "n-florida", name: "Florida", kind: "country", continent: "noord", marker: "3" },
  { id: "n-alaska", name: "Alaska", kind: "country", continent: "noord", marker: "4" },
  { id: "n-texas", name: "Texas", kind: "country", continent: "noord", marker: "5" },
  { id: "n-canada", name: "Canada", kind: "country", continent: "noord", marker: "6" },
  { id: "n-mexico", name: "Mexico", kind: "country", continent: "noord", marker: "7" },
  { id: "n-yucatan", name: "Yucatán", kind: "country", continent: "noord", marker: "8" },

  { id: "n-ny", name: "New York", kind: "city", continent: "noord", marker: "a" },
  { id: "n-sf", name: "San Francisco", kind: "city", continent: "noord", marker: "b" },
  { id: "n-la", name: "Los Angeles", kind: "city", continent: "noord", marker: "c" },
  { id: "n-orlando", name: "Orlando", kind: "city", continent: "noord", marker: "d" },
  { id: "n-miami", name: "Miami", kind: "city", continent: "noord", marker: "e" },
  { id: "n-washington", name: "Washington", kind: "city", continent: "noord", marker: "f" },
  { id: "n-nola", name: "New Orleans", kind: "city", continent: "noord", marker: "g" },
  { id: "n-vegas", name: "Las Vegas", kind: "city", continent: "noord", marker: "h" },
  { id: "n-houston", name: "Houston", kind: "city", continent: "noord", marker: "i" },
  { id: "n-detroit", name: "Detroit", kind: "city", continent: "noord", marker: "j" },
  { id: "n-mexico-stad", name: "Mexico-stad", kind: "city", continent: "noord", marker: "k" },
  { id: "n-ottawa", name: "Ottawa", kind: "city", continent: "noord", marker: "l" },

  { id: "n-mississippi", name: "Mississippi", kind: "water", continent: "noord", marker: "I" },
  { id: "n-golf", name: "Golf van Mexico", kind: "water", continent: "noord", marker: "II" },

  { id: "n-rocky", name: "Rocky Mountains", kind: "mountain", continent: "noord", marker: "A" },
];

const byId = new Map(LOCATIONS.map((l) => [l.id, l]));

export function getLocation(id: string): Location | undefined {
  return byId.get(id);
}

export function getLocationsForContinent(continent: Continent): Location[] {
  return LOCATIONS.filter((l) => l.continent === continent);
}

export function getLocationsByKind(
  kind: LocationKind,
  continent: Continent,
): Location[] {
  return LOCATIONS.filter((l) => l.kind === kind && l.continent === continent);
}

export const CONTINENT_META: Record<
  Continent,
  { label: string; mapSrc: string; mapAlt: string }
> = {
  noord: {
    label: "Noord-Amerika",
    mapSrc: "/map-noord.jpg",
    mapAlt: "Topografiekaart Noord-Amerika",
  },
  zuid: {
    label: "Zuid-Amerika",
    mapSrc: "/map-zuid.jpg",
    mapAlt: "Topografiekaart Zuid-Amerika",
  },
};