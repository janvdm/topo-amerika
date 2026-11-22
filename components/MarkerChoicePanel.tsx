"use client";

import type { Location } from "@/data/locations";
import { motion, AnimatePresence } from "framer-motion";

function kindPhrase(kind: Location["kind"]): string {
  switch (kind) {
    case "country":
      return "het land/gebied ";
    case "city":
      return "de plaats ";
    case "water":
      return "het water ";
    case "mountain":
      return "het gebergte ";
    default:
      return "";
  }
}

interface MarkerChoicePanelProps {
  target: Location;
  options: Location[];
  onPick: (loc: Location) => void;
  disabled: boolean;
  questionIndex: number;
  total: number;
  correctCount: number;
  wrongCount: number;
  currentGrade: string;
}

export default function MarkerChoicePanel({
  target,
  options,
  onPick,
  disabled,
  questionIndex,
  total,
  correctCount,
  wrongCount,
  currentGrade,
}: MarkerChoicePanelProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 border-b-8 border-blue-600 mb-6 md:mb-8">
      <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
        <span className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-widest">
          Vraag {questionIndex + 1} van {total}
        </span>
        <div className="flex flex-wrap gap-2 md:gap-3">
          <span className="bg-green-100 text-green-700 px-2 md:px-3 py-1 rounded-full font-bold text-xs md:text-sm">
            ✓ {correctCount}
          </span>
          <span className="bg-red-100 text-red-700 px-2 md:px-3 py-1 rounded-full font-bold text-xs md:text-sm">
            ✗ {wrongCount}
          </span>
          <span className="bg-blue-100 text-blue-700 px-3 md:px-4 py-1 rounded-full font-bold text-xs md:text-sm">
            Cijfer: {currentGrade}
          </span>
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={target.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          className="text-center mb-6"
        >
          <h2 className="text-xl md:text-2xl font-black text-slate-800 mb-2">
            Welk <span className="text-blue-600">symbool op de kaart</span> hoort bij{" "}
            {kindPhrase(target.kind)}
            <span className="text-blue-600 underline decoration-wavy">{target.name}</span>?
          </h2>
          <p className="text-slate-500 text-sm md:text-base">
            Kies het juiste cijfer, letter of Romeins cijfer dat op je kaart bij dit antwoord hoort.
          </p>
        </motion.div>
      </AnimatePresence>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            disabled={disabled}
            onClick={() => onPick(opt)}
            aria-label={`Symbool ${opt.marker}: ${opt.name}`}
            className="min-h-[4.5rem] flex items-center justify-center rounded-2xl border-2 border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-400 font-black text-2xl sm:text-3xl text-slate-900 font-mono tabular-nums transition-colors disabled:opacity-50 disabled:pointer-events-none"
          >
            {opt.marker}
          </button>
        ))}
      </div>
    </div>
  );
}