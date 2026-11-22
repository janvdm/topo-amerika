"use client";

import type { Location } from "@/data/locations";
import { motion, AnimatePresence } from "framer-motion";

interface McqPanelProps {
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

export default function McqPanel({
  target,
  options,
  onPick,
  disabled,
  questionIndex,
  total,
  correctCount,
  wrongCount,
  currentGrade,
}: McqPanelProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 border-b-8 border-amber-600 mb-6 md:mb-8">
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
          <span className="bg-amber-100 text-amber-800 px-3 md:px-4 py-1 rounded-full font-bold text-xs md:text-sm">
            Cijfer: {currentGrade}
          </span>
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={questionIndex}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          className="text-center mb-6"
        >
          <p className="text-slate-600 text-sm font-semibold mb-3 uppercase tracking-wide">
            Zoek dit symbool op je kaart
          </p>
          <div
            className="inline-flex items-center justify-center min-w-[5rem] px-6 py-4 rounded-2xl bg-amber-100 border-4 border-amber-400 shadow-inner mb-4"
            aria-hidden
          >
            <span className="font-black text-5xl sm:text-6xl text-amber-950 font-mono tabular-nums leading-none">
              {target.marker}
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-slate-800 mb-2">
            Wat hoort hierbij?
          </h2>
          <p className="text-slate-500 text-sm md:text-base">
            Kies de juiste naam (land, plaats, water of gebergte).
          </p>
        </motion.div>
      </AnimatePresence>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            disabled={disabled}
            onClick={() => onPick(opt)}
            className="text-left px-4 py-3 rounded-xl border-2 border-slate-200 bg-slate-50 hover:bg-amber-50 hover:border-amber-400 font-bold text-slate-800 transition-colors disabled:opacity-50 disabled:pointer-events-none"
          >
            {opt.name}
          </button>
        ))}
      </div>
    </div>
  );
}