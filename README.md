# Thijs Topo — Noord- en Zuid-Amerika

Next.js-oefenspel voor het proefwerk topografie. Werkt hetzelfde als de Oost-Nederland-game: meerkeuzevragen op basis van symbolen op de schoolkaart (`public/map-noord.jpg` en `public/map-zuid.jpg`).

## Lokaal draaien

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Spelverloop

1. Kies **Noord-Amerika** of **Zuid-Amerika**.
2. Kies een modus:
   - **Naam → symbool** — je krijgt een naam en kiest het juiste symbool op de kaart.
   - **Symbool → naam** — je krijgt een symbool en kiest de juiste naam.
3. De kaart is alleen ter referentie; er zijn geen klikbare hotspots.

Alle vragen komen uit [`data/locations.ts`](data/locations.ts).