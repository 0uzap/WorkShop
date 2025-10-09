import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Background from "../Background.jsx";
import GreekFrise from "../components/GreekFrise.js";
import { Leaf, Lock, Unlock, CheckCircle, XCircle } from "lucide-react";

// 🖼️ Image d'arrière-plan
import environnement from "../assets/environnement.webp";

// composant de pop-up
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

const FRIEZE_HEIGHT = 56;

const PageEnvironnement: React.FC = () => {
  const navigate = useNavigate();

  /** States */
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [hints, setHints] = useState<Record<string, boolean>>({});
  const [validatedAnswers, setValidatedAnswers] = useState<
    Record<string, boolean | undefined>
  >({});
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState<number>(0);
  const [isPuzzleOpen, setIsPuzzleOpen] = useState<boolean>(false);
  const [showFinalSuccess, setShowFinalSuccess] = useState<boolean>(false);

  /** Données des énigmes */
  const puzzles: Puzzle[] = [
    {
      id: "olivier",
      title: "L'Arbre Sacré",
      question:
        "Arbre argenté et cadeau d'Athéna, je nourris les athlètes et éclaire les maisons. Qui suis-je ?",
      answer: "olivier",
      alternativeAnswers: ["l'olivier", "un olivier"],
      hint: "Arbre sacré d'Athéna",
      type: "text",
    },
    {
      id: "echo",
      title: "La Nymphe Maudite",
      question: "Rébus : une haie (buisson) + Potassium) + de l'eau",
      answer: "écho",
      alternativeAnswers: ["echo", "l'écho"],
      hint: "Nymphe condamnée à répéter",
      type: "rebus",
      visual: ["🌳", "K", "💧"],
    },
  ];

  const currentPuzzle = puzzles[currentPuzzleIndex];

  /** Utils */
  const normalizeAnswer = (answer: string): string =>
    (answer ?? "").toLowerCase().trim().replace(/[^a-zàâäéèêëïîôùûüÿœæç]/gi, "");

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

    if (checkAnswer(userAnswer, currentPuzzle.answer, currentPuzzle.alternativeAnswers)) {
      setValidatedAnswers((prev) => ({ ...prev, [currentPuzzle.id]: true }));

      setTimeout(() => {
        if (currentPuzzleIndex < puzzles.length - 1) {
          setCurrentPuzzleIndex((i) => i + 1);
        } else {
          setShowFinalSuccess(true);
        }
      }, 1500);
    } else {
      setValidatedAnswers((prev) => ({ ...prev, [currentPuzzle.id]: false }));
      setTimeout(() => {
        setValidatedAnswers((prev) => ({ ...prev, [currentPuzzle.id]: undefined }));
      }, 2000);
    }
  };

  const toggleHint = (): void =>
    setHints((prev) => ({ ...prev, [currentPuzzle.id]: !prev[currentPuzzle.id] }));

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

  const handleFinalComplete = (): void => {
    navigate("/victory");
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

  /** Rendu principal */
  return (
    <Background>
      <GreekFrise position="top" tilesPerViewport={6.5} height={FRIEZE_HEIGHT} />
      <GreekFrise position="bottom" tilesPerViewport={6.5} height={FRIEZE_HEIGHT} />

      <div className="relative z-10 w-full max-w-5xl">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Leaf size={50} className="text-[#8B7355] relative top-1" />
            <h1 className="heroTitle text-[65px] font-bold text-[#5C4033] leading-[1]">
              Environnement
            </h1>
            <Leaf size={50} className="text-[#8B7355] relative top-1" />
          </div>
          <p className="text-[#8B7355] text-[20px]">
            La nature et les mystères de la Grèce
          </p>
        </header>

        {/* 🖼️ Image principale avec zones cliquables */}
        <div className="w-full flex justify-center mb-8">
          <div className="relative inline-block">
            <img
              src={environnement}
              alt="Paysage environnement grec"
              className="
                block mx-auto h-auto
                max-h-[82vh]
                max-w-[min(100vw-48px,1300px)]
                object-contain rounded-xl shadow
              "
            />

            {/* zone 1 → Olivier */}
            <button
              onClick={() => openPuzzleAt(0)}
              className="absolute bg-transparent rounded-md cursor-default border-hidden"
              style={{ left: "74.32%", top: "31%", width: "3%", height: "15%" }}
              aria-label="Ouvrir énigme Olivier"
            />

            {/* zone 2 → Écho */}
            <button
              onClick={() => openPuzzleAt(1)}
              className="absolute bg-transparent rounded-md cursor-default border-hidden"
              style={{ left: "40%", top: "30%", width: "5%", height: "5%" }}
              aria-label="Ouvrir énigme Écho"
            />

            <div className="absolute bottom-3 left-3 bg-black/70 text-white px-3 py-2 rounded-lg text-sm">
              Cliquez sur les zones invisibles de l’image pour ouvrir une énigme.
            </div>
          </div>
        </div>

        {/* Progression */}
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
            Énigme {currentPuzzleIndex + 1} sur {puzzles.length} – Dernière étape !
          </p>
        </div>
      </div>

      {/* 🪟 Pop-up d'énigme */}
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
                  ? "border-green-600 shadow-green-500/20"
                  : validatedAnswers[currentPuzzle.id] === false
                  ? "border-red-500 ring-1 ring-red-500/30"
                  : "hover:shadow-2xl"
              }`}
          >
            {/* En-tête */}
            <div className="bg-gradient-to-r from-[#8B7355] to-[#A0826D] p-4">
              <div className="flex items-center justify-between gap-4">
                <h2 id="puzzle-title" className="text-lg font-semibold text-white">
                  {currentPuzzle.title}
                </h2>
                {validatedAnswers[currentPuzzle.id] === true ? (
                  <Unlock className="w-6 h-6 text-white" />
                ) : (
                  <Lock className="w-6 h-6 text-white/80" />
                )}
              </div>
            </div>

            {/* Corps */}
            <form onSubmit={onFormSubmit} className="p-6 text-center text-xl" noValidate>
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
                    setAnswers({ ...answers, [currentPuzzle.id]: e.target.value })
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
                    <span className="font-medium">Indice : {currentPuzzle.hint}</span>
                  </p>
                </div>
              )}

              <div aria-live="polite" className="mt-2 space-y-2">
                {validatedAnswers[currentPuzzle.id] === true && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 justify-center text-green-700">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">
                      Bravo ! La nature vous révèle ses secrets !
                    </span>
                  </div>
                )}
                {validatedAnswers[currentPuzzle.id] === false && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 justify-center text-red-700">
                    <XCircle className="w-5 h-5" />
                    <span>Pas encore, réessayez…</span>
                  </div>
                )}
              </div>
            </form>
          </section>
        </DialogContent>
      </Dialog>

      {/* 🌿 Écran final de victoire */}
      {showFinalSuccess && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-[#F5E6D3] to-white rounded-3xl p-8 max-w-md text-center border-4 border-[#D4AF37] shadow-2xl">
            <div className="text-7xl mb-4 animate-bounce">🏆</div>
            <h2 className="text-4xl font-bold text-[#5C4033] mb-4">
              Victoire Olympienne !
            </h2>
            <div className="text-6xl mb-4">⚡</div>
            <p className="text-[#8B7355] mb-6 text-lg">
              Félicitations ! Vous avez résolu toutes les énigmes !
              Les dieux de l'Olympe vous accueillent parmi les héros
              de la Grèce antique.
            </p>
            <div className="flex gap-2 justify-center mb-6">
              <span className="text-3xl">🏛️</span>
              <span className="text-3xl">⚔️</span>
              <span className="text-3xl">🦉</span>
              <span className="text-3xl">🌿</span>
              <span className="text-3xl">🏺</span>
            </div>
            <button
              onClick={handleFinalComplete}
              className="px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-[#5C4033] font-bold text-lg rounded-xl hover:from-[#FFD700] hover:to-[#D4AF37] transition-all shadow-xl"
            >
              Terminer l&apos;Aventure
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
        .shake { animation: shake 0.3s ease-in-out; }
        .heroTitle { margin: 0; padding: 0; line-height: 1; }
      `}</style>
    </Background>
  );
};

export default PageEnvironnement;
