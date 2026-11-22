"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, RefreshCw, Trophy } from "lucide-react";
import StartScreen, { type GameMode } from "@/components/StartScreen";
import MapReference from "@/components/MapReference";
import MarkerChoicePanel from "@/components/MarkerChoicePanel";
import McqPanel from "@/components/McqPanel";
import type { Continent, Location } from "@/data/locations";
import { CONTINENT_META, getLocationsForContinent } from "@/data/locations";
import { buildMcqOptions } from "@/lib/mcq";
import {
  playClickSound,
  playCorrectSound,
  playVictorySound,
  playWrongSound,
} from "@/lib/sounds";

type Phase = "start" | "playing" | "finished";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function GameApp() {
  const [phase, setPhase] = useState<Phase>("start");
  const [continent, setContinent] = useState<Continent | null>(null);
  const [mode, setMode] = useState<GameMode>("pickMarker");
  const [questions, setQuestions] = useState<Location[]>([]);
  const [index, setIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [mcqOptions, setMcqOptions] = useState<Location[]>([]);
  const [showLegend, setShowLegend] = useState(false);

  const continentMeta = continent ? CONTINENT_META[continent] : null;

  useEffect(() => {
    if (!showLegend) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowLegend(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showLegend]);

  const total = questions.length;
  const current = questions[index];

  const calculateGrade = useCallback(() => {
    if (total === 0) return 1;
    const base = (correctCount / total) * 10;
    const penalty = Math.min(wrongCount * 0.2, 2);
    return Math.max(1, Math.min(10, Math.round((base - penalty) * 10) / 10));
  }, [correctCount, wrongCount, total]);

  const currentGrade = useMemo(() => {
    const answered = correctCount + wrongCount;
    if (answered === 0) return "-";
    const base = (correctCount / answered) * 10;
    const penalty = Math.min(wrongCount * 0.2, 2);
    const g = Math.max(1, Math.min(10, base - penalty));
    return (Math.round(g * 10) / 10).toFixed(1);
  }, [correctCount, wrongCount]);

  const startGame = useCallback(
    (m: GameMode) => {
      if (!continent) return;
      const q = shuffle([...getLocationsForContinent(continent)]);
      setMode(m);
      setQuestions(q);
      setIndex(0);
      setCorrectCount(0);
      setWrongCount(0);
      setFeedback(null);
      setPhase("playing");
      if (q[0]) setMcqOptions(buildMcqOptions(q[0], q));
      else setMcqOptions([]);
    },
    [continent],
  );

  const goNext = useCallback(() => {
    setFeedback(null);
    if (index >= total - 1) {
      setPhase("finished");
      playVictorySound();
      return;
    }
    const next = index + 1;
    setIndex(next);
    if (questions[next])
      setMcqOptions(buildMcqOptions(questions[next], questions));
  }, [index, questions, total]);

  const handlePick = useCallback(
    (picked: Location) => {
      if (phase !== "playing" || feedback || !current) return;
      if (picked.id === current.id) {
        setFeedback("correct");
        setCorrectCount((c) => c + 1);
        playCorrectSound();
        setTimeout(goNext, 1800);
      } else {
        setFeedback("wrong");
        setWrongCount((w) => w + 1);
        playWrongSound();
        setTimeout(() => setFeedback(null), 1800);
      }
    },
    [phase, feedback, current, goNext],
  );

  const resetAll = useCallback(() => {
    setPhase("start");
    setContinent(null);
    setQuestions([]);
    setFeedback(null);
  }, []);

  const finalGrade = phase === "finished" ? calculateGrade() : 0;
  const gradeColor = finalGrade >= 5.5 ? "text-green-600" : "text-red-600";
  const gradeBorder =
    finalGrade >= 5.5 ? "border-green-500" : "border-red-500";

  function gradeLabel(g: number) {
    if (g < 5.5) return { label: "Onvoldoende", color: "text-red-600", bg: "bg-red-100" };
    if (g < 6.5) return { label: "Matig", color: "text-orange-600", bg: "bg-orange-100" };
    if (g < 7.5) return { label: "Voldoende", color: "text-yellow-600", bg: "bg-yellow-100" };
    if (g < 8.5) return { label: "Goed", color: "text-green-600", bg: "bg-green-100" };
    return { label: "Zeer goed", color: "text-emerald-600", bg: "bg-emerald-100" };
  }

  const gl = phase === "finished" ? gradeLabel(finalGrade) : null;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto px-0 sm:px-2">
        <header className="text-center mb-6 md:mb-8">
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-2 tracking-tighter">
            THIJS <span className="text-blue-600">TOPO</span>{" "}
            <span className="text-slate-600">Amerika</span>
          </h1>
          <p className="text-slate-500 font-medium text-sm md:text-base">
            {continentMeta
              ? `Oefen voor je proefwerk — ${continentMeta.label}`
              : "Noord-Amerika en Zuid-Amerika"}
          </p>
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setShowLegend(true);
            }}
            className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-900"
          >
            <BookOpen className="w-4 h-4" />
            Legenda bekijken
          </button>
        </header>

        <AnimatePresence mode="wait">
          {phase === "start" && (
            <motion.div key="start" exit={{ opacity: 0 }}>
              <StartScreen
                continent={continent}
                onChooseContinent={setContinent}
                onBackToContinent={() => setContinent(null)}
                onChooseMode={startGame}
              />
            </motion.div>
          )}

          {phase === "playing" && current && continentMeta && (
            <motion.div
              key="play"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative space-y-6 md:space-y-8"
            >
              <MapReference
                mapSrc={continentMeta.mapSrc}
                mapAlt={continentMeta.mapAlt}
              />
              {mode === "pickMarker" && (
                <MarkerChoicePanel
                  target={current}
                  options={mcqOptions}
                  onPick={handlePick}
                  disabled={!!feedback}
                  questionIndex={index}
                  total={total}
                  correctCount={correctCount}
                  wrongCount={wrongCount}
                  currentGrade={currentGrade}
                />
              )}
              {mode === "pickName" && (
                <McqPanel
                  target={current}
                  options={mcqOptions}
                  onPick={handlePick}
                  disabled={!!feedback}
                  questionIndex={index}
                  total={total}
                  correctCount={correctCount}
                  wrongCount={wrongCount}
                  currentGrade={currentGrade}
                />
              )}

              <AnimatePresence>
                {feedback && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none z-50 bg-black/20"
                  >
                    <span className="text-7xl md:text-9xl mb-2 drop-shadow-lg">
                      {feedback === "correct" ? "🎉" : "😅"}
                    </span>
                    <span
                      className={`text-4xl md:text-6xl font-black px-6 py-3 rounded-3xl shadow-2xl text-white ${
                        feedback === "correct" ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {feedback === "correct" ? "GOED!" : "FOUT!"}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {phase === "finished" && (
            <motion.div
              key="end"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center border-4 ${gradeBorder}`}
            >
              <Trophy
                className={`w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 ${
                  finalGrade >= 5.5 ? "text-yellow-400" : "text-slate-400"
                }`}
              />
              <h2 className="text-3xl md:text-4xl font-black mb-2">
                {finalGrade >= 5.5 ? "GEFELICITEERD!" : "BLIJVEN OEFENEN!"}
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Je hebt alle {total} vragen gehad
                {continentMeta ? ` voor ${continentMeta.label}` : ""}.
              </p>
              <div className="bg-slate-50 rounded-2xl p-6 md:p-8 mb-8">
                <div className="text-xs text-slate-500 uppercase font-bold mb-1">
                  Jouw cijfer
                </div>
                <div className={`text-6xl md:text-7xl font-black ${gradeColor}`}>
                  {finalGrade.toFixed(1)}
                </div>
                {gl && (
                  <div
                    className={`inline-block mt-3 px-4 py-1 rounded-full font-bold ${gl.color} ${gl.bg}`}
                  >
                    {gl.label}
                  </div>
                )}
                <div className="mt-4 text-slate-500 text-sm">
                  {correctCount} van {total} goed · {wrongCount} fout
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    if (continent) startGame(mode);
                  }}
                  className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black text-lg transition-transform hover:scale-[1.02]"
                >
                  <RefreshCw className="w-6 h-6" />
                  NOG EEN KEER
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    resetAll();
                  }}
                  className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-2xl font-black text-lg transition-transform hover:scale-[1.02]"
                >
                  Ander continent
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {showLegend && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Legenda"
          onClick={() => setShowLegend(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-md shadow-2xl p-6 relative"
            onClick={(e) => e.stopPropagation()}
            role="presentation"
          >
            <button
              type="button"
              className="absolute top-2 right-2 font-bold text-slate-500 hover:text-slate-800 px-2"
              onClick={() => setShowLegend(false)}
            >
              Sluiten
            </button>
            <h3 className="text-xl font-black text-slate-900 mb-4 mt-2">
              Symbolen op de schoolkaart
            </h3>
            <ul className="text-left space-y-2 text-slate-700 font-medium">
              <li>
                <strong>Vierkant met cijfer</strong> — land of gebied
              </li>
              <li>
                <strong>Cirkel met kleine letter</strong> — stad of plaats
              </li>
              <li>
                <strong>Ruit met Romeins cijfer</strong> — water
              </li>
              <li>
                <strong>Driehoek met hoofdletter</strong> — gebergte
              </li>
            </ul>
            <p className="mt-4 text-sm text-slate-500">
              De volledige lijst met namen staat links onder op je papieren kaart.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}