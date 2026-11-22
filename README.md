# Thijs Topo — Noord- en Zuid-Amerika

Next.js-oefenspel voor het proefwerk topografie. Werkt hetzelfde als de Oost-Nederland-game: meerkeuzevragen op basis van symbolen op de schoolkaart (`public/map-noord.jpg` en `public/map-zuid.jpg`).

## Lokaal draaien

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Live

- Productie: [https://topo-amerika.vercel.app](https://topo-amerika.vercel.app)

## GitHub

Remote staat op `git@github.com:janvdm/topo-amerika.git`. Maak het lege repo eerst op GitHub, daarna:

```bash
git push -u origin main
```

## Vercel

Project is gekoppeld (`vercel link`). Opnieuw deployen:

```bash
npm run deploy        # productie
npm run deploy:preview
```

## Spelverloop

1. Kies **Noord-Amerika** of **Zuid-Amerika**.
2. Kies een modus:
   - **Naam → symbool** — je krijgt een naam en kiest het juiste symbool op de kaart.
   - **Symbool → naam** — je krijgt een symbool en kiest de juiste naam.
3. De kaart is alleen ter referentie; er zijn geen klikbare hotspots.

Alle vragen komen uit [`data/locations.ts`](data/locations.ts).