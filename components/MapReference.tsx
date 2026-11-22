/**
 * Alleen de schoolkaart — geen klikbare overlay. Symbolen staan al op de afbeelding.
 */
interface MapReferenceProps {
  mapSrc: string;
  mapAlt: string;
}

export default function MapReference({ mapSrc, mapAlt }: MapReferenceProps) {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-2">
      <p className="text-center text-sm text-slate-600 px-2">
        Gebruik de <strong>vierkanten met cijfers</strong>,{" "}
        <strong>cirkels met letters</strong>, <strong>ruiten met Romeinse cijfers</strong> en{" "}
        <strong>driehoeken met hoofdletters</strong> die op deze kaart staan.
      </p>
      <div className="rounded-2xl shadow-2xl overflow-hidden border-4 border-slate-800 bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={mapSrc}
          alt={mapAlt}
          className="w-full h-auto block select-none"
          draggable={false}
        />
      </div>
    </div>
  );
}