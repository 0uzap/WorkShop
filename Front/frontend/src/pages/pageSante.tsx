// import React, { useState } from "react";
// import Background from "../Background";
// import GreekFrise from "../components/GreekFrise";
// import GameTimer from "../components/GameTimer";

// import {
//   Heart,
//   Lock,
//   Unlock,
//   CheckCircle,
//   XCircle,
//   ArrowRight,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const PageSante = ({ onComplete }: { onComplete?: () => void }) => {
//   const navigate = useNavigate();
//   const [answers, setAnswers] = useState({});
//   const [hints, setHints] = useState({});
//   const [validatedAnswers, setValidatedAnswers] = useState({});
//   const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
//   const [showTransition, setShowTransition] = useState(false);
//   const [gameOver, setGameOver] = useState(false);
//   const puzzles = [
//     {
//       id: "hippocrate",
//       title: "Le Père de la Médecine",
//       question: "Trouve l'intru : Socrate • Platon • Hippocrate • Aristote",
//       answer: "hippocrate",
//       hint: "Un seul d'entre eux est médecin, pas philosophe",
//       type: "choice",
//     },
//     {
//       id: "serment",
//       question:
//         "On prête serment en mon nom, mais je ne suis ni temple ni tribunal. Qui suis-je ?",
//       answer: "hippocrate",
//       alternativeAnswers: ["serment d'hippocrate", "serment hippocrate"],
//       hint: "Les médecins prêtent ce serment",
//       type: "text",
//     },
//     {
//       id: "pharmacie",
//       question: "Rébus : Un phare + une masse (marteau) + une scie",
//       answer: "pharmacie",
//       hint: "Lieu où l'on trouve des remèdes",
//       type: "rebus",
//       visual: ["🚨 Phare", "🔨 Masse", "🪚 Scie"],
//     },
//   ];

//   const currentPuzzle = puzzles[currentPuzzleIndex];

//   const normalizeAnswer = (answer: string) => {
//     return answer
//       .toLowerCase()
//       .trim()
//       .replace(/[^a-zàâäéèêëïîôùûüÿœæç]/gi, "");
//   };

//   const checkAnswer = (
//     userAnswer: string,
//     correctAnswer: string,
//     alternativeAnswers: string[] = []
//   ) => {
//     const normalized = normalizeAnswer(userAnswer);
//     const correct = normalizeAnswer(correctAnswer);
//     const alternatives = alternativeAnswers.map((a) => normalizeAnswer(a));

//     return normalized === correct || alternatives.includes(normalized);
//   };

//   const handleSubmit = () => {
//     const userAnswer = answers[currentPuzzle.id as keyof typeof answers] || "";

//     if (
//       checkAnswer(
//         userAnswer,
//         currentPuzzle.answer,
//         currentPuzzle.alternativeAnswers
//       )
//     ) {
//       setValidatedAnswers({ ...validatedAnswers, [currentPuzzle.id]: true });

//       // Passer à l'énigme suivante après un délai
//       setTimeout(() => {
//         if (currentPuzzleIndex < puzzles.length - 1) {
//           setCurrentPuzzleIndex(currentPuzzleIndex + 1);
//         } else {
//           // Toutes les énigmes sont résolues
//           setShowTransition(true);
//           if (onComplete) {
//             setTimeout(() => {
//               onComplete();
//             }, 2000);
//           }
//         }
//       }, 1500);
//     } else {
//       setValidatedAnswers({ ...validatedAnswers, [currentPuzzle.id]: false });
//       setTimeout(() => {
//         setValidatedAnswers((prev) => ({
//           ...prev,
//           [currentPuzzle.id]: undefined,
//         }));
//       }, 2000);
//     }
//   };

//   const toggleHint = () => {
//     setHints({
//       ...hints,
//       [currentPuzzle.id]: !hints[currentPuzzle.id as keyof typeof hints],
//     });
//   };

//   return (
//     <>
//       <GameTimer onTimeUp={() => setGameOver(true)} />

//       <Background>
//         <GreekFrise position="top" height={40} opacity={0.8} tileWidth={100} />
//         <GreekFrise
//           position="bottom"
//           height={40}
//           opacity={0.8}
//           tileWidth={100}
//         />

//         {gameOver && (
//           <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
//             <div className="bg-white rounded-3xl p-8 text-center max-w-md">
//               <div className="text-6xl mb-4">⏰</div>
//               <h2 className="text-3xl font-bold text-[#5C4033] mb-4">
//                 Temps écoulé !
//               </h2>
//               <p className="text-[#8B7355] mb-6">
//                 Les dieux ne vous ont pas accordé assez de temps... L'Olympe
//                 reste fermé pour cette fois.
//               </p>
//               <button
//                 onClick={() => {
//                   localStorage.removeItem("gameStartTime");
//                   localStorage.removeItem("user");
//                   navigate("/hub");
//                 }}
//                 className="px-6 py-3 bg-gradient-to-r from-[#8B7355] to-[#A0826D] text-white font-bold rounded-xl hover:from-[#7A6248] hover:to-[#8B7355] transition-all"
//               >
//                 Réessayer
//               </button>
//             </div>
//           </div>
//         )}

//         <div className="relative z-10 w-full max-w-4xl">
//           {/* Header */}
//           <header>
//             <div className="text-center mb-8">
//               <div className="flex items-center justify-center gap-3 mb-4">
//                 <Heart className="w-8 h-8 text-[#8B7355]" />
//                 <h1 className="text-4xl md:text-5xl font-bold text-[#5C4033]">
//                   Santé & Médecine
//                 </h1>
//                 <Heart className="w-8 h-8 text-[#8B7355]" />
//               </div>
//               <p className="text-[#8B7355] text-lg">
//                 Les secrets d'Asclépios vous attendent
//               </p>
//             </div>
//           </header>

//           {/* Progress Indicator */}
//           <div className="mb-8">
//             <div className="flex justify-center gap-2 mb-4">
//               {puzzles.map((_, index) => (
//                 <div
//                   key={index}
//                   className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                     index < currentPuzzleIndex
//                       ? "bg-[#5C4033]"
//                       : index === currentPuzzleIndex
//                       ? "bg-[#8B7355] scale-125"
//                       : "bg-[#C4B5A0]"
//                   }`}
//                 />
//               ))}
//             </div>
//             <p className="text-center text-[#8B7355] text-sm">
//               Énigme {currentPuzzleIndex + 1} sur {puzzles.length}
//             </p>
//           </div>

//           <div className="w-full flex items-center justify-center">
//             {/* Main Puzzle Card */}
//             <div
//               className={`bg-white/80 backdrop-blur rounded-2xl shadow-xl border-2 border-[#8B7355]/20 overflow-hidden transition-all duration-500 ${
//                 validatedAnswers[
//                   currentPuzzle.id as keyof typeof validatedAnswers
//                 ] === true
//                   ? "border-green-600 shadow-green-600/20"
//                   : validatedAnswers[
//                       currentPuzzle.id as keyof typeof validatedAnswers
//                     ] === false
//                   ? "border-red-600 shake"
//                   : ""
//               }`}
//             >
//               {/* Card Header */}
//               <div className="bg-gradient-to-r from-[#8B7355] to-[#A0826D] p-4">
//                 <div className="flex items-center justify-between gap-4">
//                   <h2 className="text-lg font-bold text-white">
//                     {currentPuzzle.title}
//                   </h2>
//                   {validatedAnswers[
//                     currentPuzzle.id as keyof typeof validatedAnswers
//                   ] === true ? (
//                     <Unlock className="w-6 h-6 text-white" />
//                   ) : (
//                     <Lock className="w-6 h-6 text-white/60" />
//                   )}
//                 </div>
//               </div>

//               {/* Card Body aka la question */}

//               <p className="text-[#5C4033] text-lg mb-6 font-medium">
//                 {currentPuzzle.question}
//               </p>

//               {/* Visual hints for rebus */}
//               {currentPuzzle.type === "rebus" && currentPuzzle.visual && (
//                 <div className="flex flex-wrap gap-2 mb-4 justify-center bg-[#F5E6D3] rounded-xl p-4">
//                   {currentPuzzle.visual.map((item, idx) => (
//                     <div
//                       key={idx}
//                       className="text-xl font-bold text-[#5C4033] px-3 py-2 bg-white rounded-lg shadow-md"
//                     >
//                       {item}
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* Answer Input */}
//               <div className="flex gap-2 mb-2">
//                 <input
//                   type="text"
//                   value={
//                     answers[currentPuzzle.id as keyof typeof answers] || ""
//                   }
//                   onChange={(e) =>
//                     setAnswers({
//                       ...answers,
//                       [currentPuzzle.id]: e.target.value,
//                     })
//                   }
//                   onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
//                   disabled={
//                     validatedAnswers[
//                       currentPuzzle.id as keyof typeof validatedAnswers
//                     ] === true
//                   }
//                   placeholder="Votre réponse..."
//                   className={`w-full h-[35px] text-[20px] placeholder:text-xl border-2 bg-white focus:outline-none focus:ring-4 transition ${
//                     validatedAnswers[
//                       currentPuzzle.id as keyof typeof validatedAnswers
//                     ] === true
//                       ? "border-green-500 bg-green-50"
//                       : "border-[#C4B5A0] focus:ring-[#8B7355]/30 focus:border-[#8B7355]"
//                   }`}
//                 />

//                 <button
//                   onClick={handleSubmit}
//                   disabled={
//                     validatedAnswers[
//                       currentPuzzle.id as keyof typeof validatedAnswers
//                     ] === true
//                   }
//                   className="px-6 py-3 bg-gradient-to-r from-[#8B7355] to-[#A0826D] text-white font-bold rounded-xl hover:from-[#7A6248] hover:to-[#8B7355] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
//                 >
//                   Valider
//                 </button>

//                 <button
//                   onClick={toggleHint}
//                   className="px-4 py-3 bg-[#F5E6D3] text-[#5C4033] rounded-xl hover:bg-[#E8D4B8] transition-all shadow-md"
//                   title="Indice"
//                 >
//                   💡
//                 </button>
//               </div>

//               {/* Hint Display */}
//               {hints[currentPuzzle.id as keyof typeof hints] && (
//                 <div className="p-4 bg-[#FFF8DC] border-2 border-[#D4AF37]/30 rounded-lg">
//                   <p className="text-[#8B7355] flex items-center gap-2">
//                     <span className="text-xl">💡</span>
//                     <span className="font-medium">
//                       Indice : {currentPuzzle.hint}
//                     </span>
//                   </p>
//                 </div>
//               )}

//               {/* Feedback Messages */}
//               {validatedAnswers[
//                 currentPuzzle.id as keyof typeof validatedAnswers
//               ] === true && (
//                 <div className="mt-4 p-3 bg-green-100 rounded-lg flex items-center gap-2 text-green-700">
//                   <CheckCircle className="w-5 h-5" />
//                   <span className="font-semibold">
//                     Excellent ! L'énigme est résolue !
//                   </span>
//                 </div>
//               )}
//               {validatedAnswers[
//                 currentPuzzle.id as keyof typeof validatedAnswers
//               ] === false && (
//                 <div className="mt-4 p-3 bg-red-100 rounded-lg flex items-center gap-2 text-red-700">
//                   <XCircle className="w-5 h-5" />
//                   <span>Ce n'est pas la bonne réponse. Réessayez...</span>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Transition Overlay */}
//           {showTransition && (
//             <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
//               <div className="bg-white rounded-3xl p-8 text-center max-w-md shadow-2xl">
//                 <div className="text-6xl mb-4">⚕️</div>
//                 <h2 className="text-3xl font-bold text-[#5C4033] mb-4">
//                   Bravo !
//                 </h2>
//                 <p className="text-[#8B7355] mb-6">
//                   Vous avez maîtrisé les secrets de la médecine antique !
//                   Passons maintenant aux Arts Créatifs...
//                 </p>
//                 <div className="flex justify-center">
//                   <ArrowRight className="w-8 h-8 text-[#8B7355] animate-pulse" />
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

       
//       </Background>
//     </>
//   );
// };

// export default PageSante;

import React, { useState } from "react";
import Background from "../Background";
import GreekFrise from "../components/GreekFrise";
import GameTimer from "../components/GameTimer";
import { Heart, Lock, Unlock, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

/** Types */
type PuzzleType = "text" | "rebus" | "choice";

interface Puzzle {
  id: string;
  title?: string;
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

const PageSante: React.FC<PageSanteProps> = ({ onComplete }) => {
  const navigate = useNavigate();

  // States typés
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [hints, setHints] = useState<Record<string, boolean>>({});
  const [validatedAnswers, setValidatedAnswers] = useState<Record<string, boolean | undefined>>({});
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState<number>(0);
  const [showTransition, setShowTransition] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);

  // Data
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
      question: "On prête serment en mon nom, mais je ne suis ni temple ni tribunal. Qui suis-je ?",
      answer: "hippocrate",
      alternativeAnswers: ["serment d'hippocrate", "serment hippocrate"],
      hint: "Les médecins prêtent ce serment",
      type: "text",
    },
    {
      id: "pharmacie",
      question: "Rébus : Un phare + une masse (marteau) + une scie",
      answer: "pharmacie",
      hint: "Lieu où l'on trouve des remèdes",
      type: "rebus",
      visual: ["🚨 Phare", "🔨 Masse", "🪚 Scie"],
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
          setShowTransition(true);
          if (onComplete) {
            setTimeout(() => onComplete(), 2000);
          }
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

  /** Events */
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit();
  };

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <>
      <GameTimer onTimeUp={() => setGameOver(true)} />

      <Background>
        <GreekFrise position="top" tilesPerViewport={6.5} height={56} />
        <GreekFrise position="bottom" tilesPerViewport={6.5} height={56} />

        {/* Game Over Overlay */}
        {gameOver && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 text-center max-w-md shadow-2xl">
              <div className="text-6xl mb-4">⏰</div>
              <h2 className="text-3xl font-bold text-[#5C4033] mb-4">Temps écoulé !</h2>
              <p className="text-[#8B7355] mb-6">
                Les dieux ne vous ont pas accordé assez de temps... L'Olympe reste fermé pour cette fois.
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

        <div className="relative z-10 w-full max-w-4xl">
          {/* Header */}
          <header>
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4 not-prose">
                <Heart size={50} className="text-[#8B7355] relative top-1" />
                <h1 className="heroTitle text-[65px] font-bold text-[#5C4033] leading-[1]">Santé & Médecine</h1>
                <Heart size={50} className="text-[#8B7355] relative top-1" />
              </div>
              <p className="text-[#8B7355] text-[20px]">Les secrets d'Asclépios vous attendent</p>
            </div>
          </header>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex justify-center gap-2 mb-4">
              {puzzles.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index < currentPuzzleIndex
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

          {/* Card wrapper */}
          <div className="w-full flex items-center justify-center">
            <section
              aria-labelledby="puzzle-title"
              className={`mx-auto w-[92vw] sm:w-[85vw] md:w-[70vw] lg:w-[42rem] max-w-[42rem] bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-[#8B7355]/20 overflow-hidden transition-all duration-300 ${
                validatedAnswers[currentPuzzle.id] === true
                  ? "border-green-500 ring-1 ring-green-500/30"
                  : validatedAnswers[currentPuzzle.id] === false
                  ? "border-red-500 ring-1 ring-red-500/30 shake"
                  : "hover:shadow-2xl"
              }`}
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-[#8B7355] to-[#A0826D] p-4">
                <div className="flex items-center justify-between gap-4">
                  <h2 id="puzzle-title" className="text-lg font-semibold text-white">
                    {currentPuzzle.title ?? "Énigme"}
                  </h2>
                  {validatedAnswers[currentPuzzle.id] === true ? (
                    <Unlock className="w-6 h-6 text-white" aria-hidden />
                  ) : (
                    <Lock className="w-6 h-6 text-white/80" aria-hidden />
                  )}
                </div>
              </div>

              {/* Card Body */}
              <form onSubmit={onFormSubmit} className="p-6 text-center text-xl" noValidate>
                {/* Question */}
                <p className="text-[#5C4033] text-[19px] md:text-2xl leading-snug mb-4 font-semibold">
                  {currentPuzzle.question}
                </p>

                {/* Rébus si besoin */}
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

                {/* Input + actions */}
                <div className="grid gap-2 mb-2">
                  <label htmlFor={`answer-${currentPuzzle.id}`} className="sr-only">
                    Votre réponse
                  </label>

                  <input
                    id={`answer-${currentPuzzle.id}`}
                    type="text"
                    value={answers[currentPuzzle.id] || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setAnswers({ ...answers, [currentPuzzle.id]: e.target.value })
                    }
                    onKeyDown={onInputKeyDown}
                    disabled={validatedAnswers[currentPuzzle.id] === true}
                    placeholder="Votre réponse… (Entrée pour valider)"
                    aria-invalid={validatedAnswers[currentPuzzle.id] === false}
                    className={`w-full h-[35px] text-[20px] placeholder:text-xl px-5 rounded-xl border-2 bg-white focus:outline-none focus:ring-4 transition ${
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
                      title="Afficher un indice"
                      aria-controls={`hint-${currentPuzzle.id}`}
                      aria-expanded={!!hints[currentPuzzle.id]}
                    >
                      💡 Indice
                    </button>
                  </div>
                </div>

                {/* Indice */}
                {hints[currentPuzzle.id] && (
                  <div
                    id={`hint-${currentPuzzle.id}`}
                    className="p-4 bg-[#FFF8DC] border border-[#D4AF37]/40 rounded-lg mb-1"
                  >
                    <p className="text-[#8B7355] flex items-center gap-2 justify-center">
                      <span className="text-xl">💡</span>
                      <span className="font-medium">Indice : {currentPuzzle.hint}</span>
                    </p>
                  </div>
                )}

                {/* Messages */}
                <div aria-live="polite" className="mt-2 space-y-2">
                  {validatedAnswers[currentPuzzle.id] === true && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 justify-center text-green-700">
                      <CheckCircle className="w-5 h-5" aria-hidden />
                      <span className="font-semibold">Excellent ! L'énigme est résolue !</span>
                    </div>
                  )}
                  {validatedAnswers[currentPuzzle.id] === false && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 justify-center text-red-700">
                      <XCircle className="w-5 h-5" aria-hidden />
                      <span>Ce n'est pas la bonne réponse. Réessayez…</span>
                    </div>
                  )}
                </div>
              </form>
            </section>
          </div>

          {/* Transition Overlay */}
          {showTransition && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
              <div className="bg-white rounded-3xl p-8 text-center max-w-md shadow-2xl">
                <div className="text-6xl mb-4">⚕️</div>
                <h2 className="text-3xl font-bold text-[#5C4033] mb-4">Bravo !</h2>
                <p className="text-[#8B7355] mb-6">
                  Vous avez maîtrisé les secrets de la médecine antique ! Passons maintenant aux Arts Créatifs...
                </p>
                <div className="flex justify-center">
                  <ArrowRight className="w-8 h-8 text-[#8B7355] animate-pulse" />
                </div>
              </div>
            </div>
          )}
        </div>
      </Background>

      {/* Styles locaux */}
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
