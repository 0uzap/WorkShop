import React, { useMemo, useState, useEffect } from "react";
import Background from "../Background";
import GreekFrise from "../components/GreekFrise";
import GameTimer from "../components/GameTimer";
import Chat from "../components/Chat.jsx";
import {
  Heart,
  Lock,
  Unlock,
  CheckCircle,
  XCircle,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";


import sermentImage from "../assets/serment.png";
import { Dialog, DialogContent } from "../components/dialog";


type PuzzleType = "text" | "rebus" | "choice";

interface Puzzle {
  id: string;
  title: string;
  question: string;
  answer: string;
  alternativeAnswers?: string[];
  hint: string;
  type: PuzzleType;
  visual?: string[];
}

interface PageSanteProps {
  onComplete?: () => void;
}

const FRIEZE_HEIGHT = 56;

const PageSante: React.FC<PageSanteProps> = ({ onComplete }) => {
  const navigate = useNavigate();

  // User & session
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<string>('');

  // Puzzle states
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [hints, setHints] = useState<Record<string, boolean>>({});
  const [validatedAnswers, setValidatedAnswers] = useState<
    Record<string, boolean | undefined>
  >({});
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState<number>(0);

  // UI states
  const [isPuzzleOpen, setIsPuzzleOpen] = useState<boolean>(false);
  const [showTransition, setShowTransition] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);

  // Puzzles data
  const puzzles: Puzzle[] = [
    {
      id: "hippocrate",
      title: "Le Père de la Médecine",
      question: "Trouve l'intru : Socrate • Platon • Hippocrate • Aristote",
      answer: "hippocrate",
      hint: "Un seul d'entre eux est médecin, pas philosophe",
      type: "choice",
    },
    {
      id: "serment",
      title: "Le Serment",
      question:
        "On prête serment en mon nom, mais je ne suis ni temple ni tribunal. Qui suis-je ?",
      answer: "hippocrate",
      alternativeAnswers: ["serment d'hippocrate", "serment hippocrate"],
      hint: "Les médecins prêtent ce serment",
      type: "text",
    },
    {
      id: "pharmacie",
      title: "Le Lieu des Remèdes",
      question: "Rébus : Un phare + une masse (marteau) + une scie",
      answer: "pharmacie",
      hint: "Lieu où l'on trouve des remèdes",
      type: "rebus",
      visual: ["🚨 Phare", "🔨 Masse", "🪚 Scie"],
    },
  ];

  const currentPuzzle = puzzles[currentPuzzleIndex];

  // Load user data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    console.log('Stored user:', storedUser);
    
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        const username = userData.username || userData.name || 'Anonyme';
        console.log('Setting currentUser to:', username);
        setCurrentUser(username);
        
        if (userData.session_id) {
          console.log('Setting sessionId to:', userData.session_id);
          setSessionId(userData.session_id);
        } else {
          console.log("Aucune session trouvée dans les données utilisateur");
        }
      } catch (e) {
        console.log('Setting currentUser to storedUser string:', storedUser);
        setCurrentUser(storedUser);
      }
    } else {
      console.log("Aucun utilisateur trouvé dans localStorage");
    }
  }, []);

  /** Utils */
  const normalizeAnswer = (answer: string): string =>
    (answer ?? "")
      .toLowerCase()
      .trim()
      .replace(/[^a-zàâäéèêëïîôùûüÿœæç]/gi, "");

  const checkAnswer = (
    userAnswer: string,
    correctAnswer: string,
    alternativeAnswers: string[] = []
  ): boolean => {
    const normalized = normalizeAnswer(userAnswer);
    const correct = normalizeAnswer(correctAnswer);
    const alternatives = alternativeAnswers.map((a) => normalizeAnswer(a));
    return normalized === correct || alternatives.includes(normalized);
  };

  /** Handlers */
  const handleSubmit = (): void => {
    const userAnswer = answers[currentPuzzle.id] || "";

    if (
      checkAnswer(
        userAnswer,
        currentPuzzle.answer,
        currentPuzzle.alternativeAnswers
      )
    ) {
      setValidatedAnswers((prev) => {
        const next = { ...prev, [currentPuzzle.id]: true };

        // Check if all puzzles are solved
        const allSolved = puzzles.every((p) => next[p.id] === true);
        if (allSolved) {
          setTimeout(() => {
            setShowTransition(true);
            if (onComplete) {
              setTimeout(() => onComplete(), 2000);
            }
          }, 600);
        }

        return next;
      });

      // Close popup after success animation
      setTimeout(() => setIsPuzzleOpen(false), 1000);
    } else {
      setValidatedAnswers((prev) => ({ ...prev, [currentPuzzle.id]: false }));
      setTimeout(() => {
        setValidatedAnswers((prev) => ({
          ...prev,
          [currentPuzzle.id]: undefined,
        }));
      }, 1500);
    }
  };

  const toggleHint = (): void =>
    setHints((prev) => ({
      ...prev,
      [currentPuzzle.id]: !prev[currentPuzzle.id],
    }));

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit();
  };

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
  };

  const openPuzzleAt = (index: number) => {
    setCurrentPuzzleIndex(index);
    setIsPuzzleOpen(true);
  };

  const solvedIds = useMemo(
    () =>
      new Set(
        Object.entries(validatedAnswers)
          .filter(([, v]) => v)
          .map(([k]) => k)
      ),
    [validatedAnswers]
  );

  return (
    <>
      <GameTimer onTimeUp={() => setGameOver(true)} />

      <Background>
        <GreekFrise
          position="top"
          tilesPerViewport={6.5}
          height={FRIEZE_HEIGHT}
        />
        <GreekFrise
          position="bottom"
          tilesPerViewport={6.5}
          height={FRIEZE_HEIGHT}
        />

        {/* Game Over Overlay */}
        {gameOver && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 text-center max-w-md shadow-2xl">
              <div className="text-6xl mb-4">⏰</div>
              <h2 className="text-3xl font-bold text-[#5C4033] mb-4">
                Temps écoulé !
              </h2>
              <p className="text-[#8B7355] mb-6">
                Les dieux ne vous ont pas accordé assez de temps...
                L'Olympe reste fermé pour cette fois.
              </p>
              <button
                onClick={() => {
                  localStorage.removeItem("gameStartTime");
                  localStorage.removeItem("user");
                  navigate("/hub");
                }}
                className="px-6 py-3 bg-gradient-to-r from-[#8B7355] to-[#A0826D] text-white font-bold rounded-xl hover:from-[#7A6248] hover:to-[#8B7355] transition-all"
              >
                Réessayer
              </button>
            </div>
          </div>
        )}

        <div className="relative z-10 w-full max-w-5xl">
          {/* Header */}
          <header className="text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Heart size={50} className="text-[#8B7355] relative top-1" />
              <h1 className="heroTitle text-[65px] font-bold text-[#5C4033] leading-[1]">
                Santé & Médecine
              </h1>
              <Heart size={50} className="text-[#8B7355] relative top-1" />
            </div>
            <p className="text-[#8B7355] text-[20px]">
              Les secrets d'Asclépios vous attendent
            </p>
          </header>

          {/* 🖼️ Image with clickable zones */}
          <div className="w-full flex justify-center mb-8">
            <div className="relative inline-block">
              <img
                src={sermentImage}
                alt="Scène antique avec Hippocrate"
                className="
                  block mx-auto h-auto
                  max-h-[70vh]
                  max-w-[min(100vw-64px,1100px)]
                  object-contain rounded-xl shadow
                "
              />

              {/* Zone 1 — Hippocrate → Puzzle 0 */}
              <button
                onClick={() => openPuzzleAt(0)}
                className="absolute bg-transparent border-2 border-transparent hover:border-yellow-400/50 rounded-lg cursor-pointer transition"
                style={{ left: "23%", top: "44%", width: "12%", height: "25%" }}
                aria-label="Ouvrir l'énigme Hippocrate"
              />

              {/* Zone 2 — Personnes → Puzzle 1 */}
              <button
                onClick={() => openPuzzleAt(1)}
                className="absolute bg-transparent border-2 border-transparent hover:border-yellow-400/50 rounded-lg cursor-pointer transition"
                style={{ left: "70%", top: "40%", width: "18%", height: "30%" }}
                aria-label="Ouvrir l'énigme Serment"
              />

              {/* Zone 3 — Statue → Puzzle 2 */}
              <button
                onClick={() => openPuzzleAt(2)}
                className="absolute bg-transparent border-2 border-transparent hover:border-yellow-400/50 rounded-lg cursor-pointer transition"
                style={{ left: "40%", top: "2%", width: "40%", height: "8%" }}
                aria-label="Ouvrir l'énigme Pharmacie"
              />

              {/* Help text */}
              <div className="absolute bottom-3 left-3 bg-black/70 text-white px-3 py-2 rounded-lg text-sm">
                Cliquez sur les zones de l'image pour ouvrir une énigme.
              </div>
            </div>
          </div>

          {/* Progress indicator */}
          <div className="mb-8">
            <div className="flex justify-center gap-2 mb-4">
              {puzzles.map((p, index) => (
                <div
                  key={p.id}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    solvedIds.has(p.id)
                      ? "bg-[#5C4033]"
                      : index === currentPuzzleIndex
                      ? "bg-[#8B7355] scale-125"
                      : "bg-[#C4B5A0]"
                  }`}
                />
              ))}
            </div>
            <p className="text-center text-[#8B7355] text-sm">
              Énigme {currentPuzzleIndex + 1} sur {puzzles.length}
            </p>
          </div>
        </div>

        {/* Transition Overlay */}
        {showTransition && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 text-center max-w-md shadow-2xl">
              <div className="text-6xl mb-4">⚕️</div>
              <h2 className="text-3xl font-bold text-[#5C4033] mb-4">
                Bravo !
              </h2>
              <p className="text-[#8B7355] mb-6">
                Vous avez maîtrisé les secrets de la médecine antique !
                Passons maintenant aux Arts Créatifs...
              </p>
              <div className="flex justify-center">
                <ArrowRight className="w-8 h-8 text-[#8B7355] animate-pulse" />
              </div>
            </div>
          </div>
        )}

        {/* Chat Component */}
        <Chat
          sessionId={sessionId || 'debug-session'}
          currentUser={currentUser || 'Anonyme'}
          anchor="br"
          frise={FRIEZE_HEIGHT}
        />
      </Background>

      {/* Puzzle Dialog */}
      <Dialog open={isPuzzleOpen} onOpenChange={setIsPuzzleOpen}>
        <DialogContent
          className="
            w-[92vw] sm:w-[42rem] max-w-[42rem]
            p-0 bg-transparent border-none shadow-none
            my-[calc(2*var(--frieze,56px))] sm:my-[72px]
            max-h-[calc(100vh-144px)] overflow-y-auto
          "
        >
          <section
            aria-labelledby="puzzle-title"
            className={`bg-[#DDD1BC] mx-auto bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-[#8B7355]/20 overflow-hidden transition-all duration-300
              ${
                validatedAnswers[currentPuzzle.id] === true
                  ? "border-green-500 ring-1 ring-green-500/30"
                  : validatedAnswers[currentPuzzle.id] === false
                  ? "border-red-500 ring-1 ring-red-500/30 shake"
                  : "hover:shadow-2xl"
              }`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#8B7355] to-[#A0826D] p-4">
              <div className="flex items-center justify-between gap-4">
                <h2
                  id="puzzle-title"
                  className="text-lg font-semibold text-white"
                >
                  {currentPuzzle.title}
                </h2>
                {validatedAnswers[currentPuzzle.id] === true ? (
                  <Unlock className="w-6 h-6 text-white" />
                ) : (
                  <Lock className="w-6 h-6 text-white/80" />
                )}
              </div>
            </div>

            {/* Body */}
            <form
              onSubmit={onFormSubmit}
              className="p-6 text-center text-xl"
              noValidate
            >
              <div className="bg-[#DDD1BC] rounded-lg px-4 py-3 mb-4">
                <p className="text-[#5C4033] text-[19px] md:text-2xl leading-snug font-semibold">
                  {currentPuzzle.question}
                </p>
              </div>

              {currentPuzzle.type === "rebus" && currentPuzzle.visual && (
                <div className="flex flex-wrap gap-2 mb-4 justify-center bg-[#F5E6D3] rounded-xl p-3">
                  {currentPuzzle.visual.map((item, idx) => (
                    <div
                      key={idx}
                      className="text-xl font-bold text-[#5C4033] px-3 py-2 bg-white rounded-lg shadow"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}

              <div className="grid gap-2 mb-2">
                <input
                  id={`answer-${currentPuzzle.id}`}
                  type="text"
                  value={answers[currentPuzzle.id] || ""}
                  onChange={(e) =>
                    setAnswers({
                      ...answers,
                      [currentPuzzle.id]: e.target.value,
                    })
                  }
                  onKeyDown={onInputKeyDown}
                  disabled={validatedAnswers[currentPuzzle.id] === true}
                  placeholder="Votre réponse… (Entrée pour valider)"
                  className={`w-full h-[35px] text-[20px] placeholder:text-xl px-5 rounded-xl border-2 bg-white focus:outline-none focus:ring-4 transition
                    ${
                      validatedAnswers[currentPuzzle.id] === true
                        ? "border-green-500 bg-green-50 focus:ring-green-200"
                        : validatedAnswers[currentPuzzle.id] === false
                        ? "border-red-500 focus:ring-red-200"
                        : "border-[#C4B5A0] focus:border-[#8B7355] focus:ring-[#8B7355]/20"
                    }`}
                />

                <div className="grid grid-cols-3 gap-2 items-stretch">
                  <button
                    type="submit"
                    disabled={
                      validatedAnswers[currentPuzzle.id] === true ||
                      !(answers[currentPuzzle.id] || "").trim()
                    }
                    className="col-span-2 w-full h-[30px] text-[18px] md:text-lg px-4 bg-gradient-to-r from-[#8B7355] to-[#A0826D] text-white font-semibold rounded-xl hover:from-[#7A6248] hover:to-[#8B7355] focus:outline-none focus:ring-4 focus:ring-[#8B7355]/30 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    Valider
                  </button>

                  <button
                    type="button"
                    onClick={toggleHint}
                    className="col-span-1 w-full h-[30px] text-[18px] md:text-lg px-4 bg-[#F5E6D3] text-[#5C4033] font-medium rounded-xl hover:bg-[#E8D4B8] focus:outline-none focus:ring-4 focus:ring-[#E8D4B8]/50 transition shadow-md"
                  >
                    💡 Indice
                  </button>
                </div>
              </div>

              {hints[currentPuzzle.id] && (
                <div className="p-4 bg-[#FFF8DC] border border-[#D4AF37]/40 rounded-lg mb-1">
                  <p className="text-[#8B7355] flex items-center gap-2 justify-center">
                    <span className="text-xl">💡</span>
                    <span className="font-medium">
                      Indice : {currentPuzzle.hint}
                    </span>
                  </p>
                </div>
              )}

              <div aria-live="polite" className="mt-2 space-y-2">
                {validatedAnswers[currentPuzzle.id] === true && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 justify-center text-green-700">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">
                      Excellent ! L'énigme est résolue !
                    </span>
                  </div>
                )}
                {validatedAnswers[currentPuzzle.id] === false && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 justify-center text-red-700">
                    <XCircle className="w-5 h-5" />
                    <span>Ce n'est pas la bonne réponse. Réessayez…</span>
                  </div>
                )}
              </div>
            </form>
          </section>
        </DialogContent>
      </Dialog>

      <style>{`
        @keyframes shake { 
          0%, 100% { transform: translateX(0); } 
          25% { transform: translateX(-5px); } 
          75% { transform: translateX(5px); } 
        }
        .shake { animation: shake 0.3s ease-in-out; }
        .heroTitle { margin: 0; padding: 0; line-height: 1; }
      `}</style>
    </>
  );
};

export default PageSante;