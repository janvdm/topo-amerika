"use client";

import { Hash, ListChecks, Globe2, Play, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import type { Continent } from "@/data/locations";
import { CONTINENT_META } from "@/data/locations";
import { playClickSound } from "@/lib/sounds";

export type GameMode = "pickMarker" | "pickName";

interface StartScreenProps {
  continent: Continent | null;
  onChooseContinent: (c: Continent) => void;
  onBackToContinent: () => void;
  onChooseMode: (mode: GameMode) => void;
}

export default function StartScreen({
  continent,
  onChooseContinent,
  onBackToContinent,
  onChooseMode,
}: StartScreenProps) {
  if (!continent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center border-4 border-slate-900 max-w-lg mx-auto"
      >
        <div className="bg-emerald-100 w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <Globe2 className="w-10 h-10 md:w-12 md:h-12 text-emerald-700" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-slate-900">
          Kies je continent
        </h2>
        <p className="text-slate-600 mb-8 text-base md:text-lg">
          Eerst Noord-Amerika of Zuid-Amerika — daarna oefen je met de symbolen op die kaart.
        </p>
        <div className="flex flex-col gap-4">
          <button
            type="button"
            onClick={() => {
              playClickSound();
              onChooseContinent("noord");
            }}
            className="flex items-center justify-center gap-3 bg-sky-600 hover:bg-sky-700 text-white px-8 py-4 rounded-2xl font-black text-lg transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-sky-200"
          >
            Noord-Amerika
          </button>
          <button
            type="button"
            onClick={() => {
              playClickSound();
              onChooseContinent("zuid");
            }}
            className="flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-2xl font-black text-lg transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-emerald-200"
          >
            Zuid-Amerika
          </button>
        </div>
      </motion.div>
    );
  }

  const meta = CONTINENT_META[continent];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center border-4 border-slate-900 max-w-lg mx-auto"
    >
      <button
        type="button"
        onClick={() => {
          playClickSound();
          onBackToContinent();
        }}
        className="inline-flex items-center gap-1 text-sm font-bold text-slate-500 hover:text-slate-800 mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Ander continent
      </button>
      <div className="bg-blue-100 w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mx-auto mb-6">
        <Play className="w-10 h-10 md:w-12 md:h-12 text-blue-600 fill-current" />
      </div>
      <h2 className="text-2xl md:text-3xl font-bold mb-2 text-slate-900">{meta.label}</h2>
      <p className="text-slate-600 mb-8 text-base md:text-lg">
        Oefen met de symbolen op je schoolkaart — geen klikken op de kaart zelf.
      </p>
      <div className="flex flex-col gap-4">
        <button
          type="button"
          onClick={() => {
            playClickSound();
            onChooseMode("pickMarker");
          }}
          className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black text-lg transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-200"
        >
          <Hash className="w-6 h-6 shrink-0" />
          Naam → symbool op de kaart
        </button>
        <button
          type="button"
          onClick={() => {
            playClickSound();
            onChooseMode("pickName");
          }}
          className="flex items-center justify-center gap-3 bg-slate-800 hover:bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-lg transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
        >
          <ListChecks className="w-6 h-6 shrink-0" />
          Symbool op de kaart → naam
        </button>
      </div>
    </motion.div>
  );
}