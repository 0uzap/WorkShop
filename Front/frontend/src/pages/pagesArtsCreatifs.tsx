// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Background from "../Background.jsx";
// import GreekFrise from "../components/GreekFrise.jsx";
// import {
//   Palette,
//   Lock,
//   Unlock,
//   CheckCircle,
//   XCircle,
//   ArrowRight,
// } from "lucide-react";

// const PageArtsCreatifs = () => {
//   const navigate = useNavigate();
//   const [answers, setAnswers] = useState({});
//   const [hints, setHints] = useState({});
//   const [validatedAnswers, setValidatedAnswers] = useState({});
//   const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
//   const [showTransition, setShowTransition] = useState(false);

//   const puzzles = [
//     {
//       id: "muses",
//       title: "Les Inspiratrices Divines",
//       question:
//         "Neuf sœurs m'entourent et inspirent poètes, peintres et danseurs. Qui sommes-nous ?",
//       answer: "les muses",
//       alternativeAnswers: ["muses"],
//       hint: "Filles de Zeus et Mnémosyne",
//       type: "text",
//     },
//     {
//       id: "dionysos",
//       title: "Le Dieu de la Fête",
//       question: "Rébus : Dio (Jojo's) + Nid d'oiseaux + Z (la lettre) + des os",
//       answer: "dionysos",
//       hint: "Dieu du vin et de la fête",
//       type: "rebus",
//       visual: ["🎮 Dio", "🪹 Nid", "Z", "🦴 Os"],
//     },
//     {
//       id: "intrus",
//       title: "L'Art et la Sculpture",
//       question:
//         "Trouve l'intrus : Venus de Milo • Discobole • Athéna Parthénos • Coupe d'Arcésilas",
//       answer: "coupe d'arcésilas",
//       alternativeAnswers: ["coupe d'arcesilas", "coupe"],
//       hint: "Un seul n'est pas une sculpture",
//       type: "choice",
//     },
//   ];

//   const currentPuzzle = puzzles[currentPuzzleIndex];

//   const normalizeAnswer = (answer) => {
//     return answer
//       .toLowerCase()
//       .trim()
//       .replace(/[^a-zàâäéèêëïîôùûüÿœæç]/gi, "");
//   };

//   const checkAnswer = (userAnswer, correctAnswer, alternativeAnswers = []) => {
//     const normalized = normalizeAnswer(userAnswer);
//     const correct = normalizeAnswer(correctAnswer);
//     const alternatives = alternativeAnswers.map((a) => normalizeAnswer(a));

//     return normalized === correct || alternatives.includes(normalized);
//   };

//   const handleSubmit = () => {
//     const userAnswer = answers[currentPuzzle.id] || "";

//     if (
//       checkAnswer(
//         userAnswer,
//         currentPuzzle.answer,
//         currentPuzzle.alternativeAnswers
//       )
//     ) {
//       setValidatedAnswers({ ...validatedAnswers, [currentPuzzle.id]: true });

//       setTimeout(() => {
//         if (currentPuzzleIndex < puzzles.length - 1) {
//           setCurrentPuzzleIndex(currentPuzzleIndex + 1);
//         } else {
//           setShowTransition(true);
//           setTimeout(() => {
//             navigate("/commerce-industrie");
//           }, 2000);
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
//     setHints({ ...hints, [currentPuzzle.id]: !hints[currentPuzzle.id] });
//   };

//   return (
//     <Background>
//       <GreekFrise position="top" />
//       <GreekFrise position="bottom" />

//       <div className="relative z-10 w-full max-w-4xl">
//         {/* Header */}
//         <header>
//           <div className="text-center mb-8">
//             {/* si tu utilises le plugin typographie, garde not-prose pour éviter ses styles */}
//             <div className="flex items-center justify-center gap-3 mb-4 not-prose">
//               <Palette size={50} className="text-[#8B7355] relative top-1" />
//               <h1 className="heroTitle text-[65px] font-bold text-[#5C4033] leading-[1]">
//                 Arts Créatifs
//               </h1>
//               <Palette size={50} className="text-[#8B7355] relative top-1" />
//             </div>
//             <p className="text-[#8B7355] text-[20px] ">
//               Les Muses vous guident vers l'inspiration divine
//             </p>
//           </div>
//         </header>

//         <div class=" text-center">
//           <p>
//             {" "}
//             ici ca remonte si on rajoute l'image donc tranquille nomalement
//           </p>
//         </div>

//         {/* Progress Indicator */}
//         <div className="mb-8">
//           <div className="flex justify-center gap-2 mb-4">
//             {puzzles.map((_, index) => (
//               <div
//                 key={index}
//                 className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                   index < currentPuzzleIndex
//                     ? "bg-[#5C4033]"
//                     : index === currentPuzzleIndex
//                     ? "bg-[#8B7355] scale-125"
//                     : "bg-[#C4B5A0]"
//                 }`}
//               />
//             ))}
//           </div>
//           <p className="text-center text-[#8B7355] text-sm">
//             Énigme {currentPuzzleIndex + 1} sur {puzzles.length}
//           </p>
//         </div>

//         <div className="w-full flex items-center justify-center ">
//           <div className="border-2 border-[#8B7355]/40 rounded-2xl p-4">
//             {/* Main Puzzle Card - Même structure que PageSante */}
//             <section
//               aria-labelledby="puzzle-title"
//               className={`mx-auto w-[92vw] sm:w-[85vw] md:w-[70vw] lg:w-[42rem] max-w-[42rem] bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-[#8B7355]/20 overflow-hidden transition-all duration-300 ${
//                 validatedAnswers[currentPuzzle.id] === true
//                   ? "border-green-500 ring-1 ring-green-500/30"
//                   : validatedAnswers[currentPuzzle.id] === false
//                   ? "border-red-500 ring-1 ring-red-500/30"
//                   : "hover:shadow-2xl"
//               }`}
//             >
//               {/* Header */}
//               <div className="bg-gradient-to-r from-[#8B7355] to-[#A0826D] p-4">
//                 <div className="flex items-center justify-between gap-4">
//                   <h2
//                     id="puzzle-title"
//                     className="text-lg font-semibold text-white"
//                   >
//                     {currentPuzzle.title}
//                   </h2>
//                   {validatedAnswers[currentPuzzle.id] === true ? (
//                     <Unlock className="w-6 h-6 text-white" aria-hidden="true" />
//                   ) : (
//                     <Lock
//                       className="w-6 h-6 text-white/80"
//                       aria-hidden="true"
//                     />
//                   )}
//                 </div>
//               </div>

//               {/* Contenu */}
//               <form
//                 onSubmit={(e) => {
//                   e.preventDefault();
//                   handleSubmit();
//                 }}
//                 className="p-6 text-center text-xl"
//                 noValidate
//               >
//                 {/* Question (plus grande) */}
//                 <p className="text-[#5C4033] text-[19px] md:text-2xl leading-snug mb-4 font-semibold">
//                   {currentPuzzle.question}
//                 </p>

//                 {/* Rébus si besoin */}
//                 {currentPuzzle.type === "rebus" && currentPuzzle.visual && (
//                   <div className="flex flex-wrap gap-2 mb-4 justify-center bg-[#F5E6D3] rounded-xl p-3">
//                     {currentPuzzle.visual.map((item, idx) => (
//                       <div
//                         key={idx}
//                         className="text-xl font-bold text-[#5C4033] px-3 py-2 bg-white rounded-lg shadow"
//                       >
//                         {item}
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 {/* Input + Actions */}
//                 <div className="grid gap-2 mb-2">
//                   <label
//                     htmlFor={`answer-${currentPuzzle.id}`}
//                     className="sr-only "
//                   >
//                     Votre réponse
//                   </label>

//                   {/* Input plus haut */}
//                   <input
//                     id={`answer-${currentPuzzle.id}`}
//                     type="text"
//                     value={answers[currentPuzzle.id] || ""}
//                     onChange={(e) =>
//                       setAnswers({
//                         ...answers,
//                         [currentPuzzle.id]: e.target.value,
//                       })
//                     }
//                     onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
//                     disabled={validatedAnswers[currentPuzzle.id] === true}
//                     placeholder="Votre réponse… (Entrée pour valider)"
//                     aria-invalid={validatedAnswers[currentPuzzle.id] === false}
//                     className={`w-full h-[35px] text-[20px] placeholder:text-xl px-5 rounded-xl border-2 bg-white focus:outline-none focus:ring-4 transition ${
//                       validatedAnswers[currentPuzzle.id] === true
//                         ? "border-green-500 bg-green-50 focus:ring-green-200"
//                         : validatedAnswers[currentPuzzle.id] === false
//                         ? "border-red-500 focus:ring-red-200"
//                         : "border-[#C4B5A0] focus:border-[#8B7355] focus:ring-[#8B7355]/20"
//                     }`}
//                   />

//                   {/* Actions sur une seule ligne : Valider = 2/3, Indice = 1/3 */}
//                   <div className="grid grid-cols-3 gap-2 items-stretch">
//                     <button
//                       type="submit"
//                       disabled={
//                         validatedAnswers[currentPuzzle.id] === true ||
//                         !(answers[currentPuzzle.id] || "").trim()
//                       }
//                       className="col-span-2 w-full h-[30px] text-[18px] md:text-lg px-4 bg-gradient-to-r from-[#8B7355] to-[#A0826D] text-white font-semibold rounded-xl hover:from-[#7A6248] hover:to-[#8B7355] focus:outline-none focus:ring-4 focus:ring-[#8B7355]/30 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
//                     >
//                       Valider
//                     </button>

//                     <button
//                       type="button"
//                       onClick={toggleHint}
//                       className="col-span-1 w-full h-[30px] text-[18px] md:text-lg px-4 bg-[#F5E6D3] text-[#5C4033] font-medium rounded-xl hover:bg-[#E8D4B8] focus:outline-none focus:ring-4 focus:ring-[#E8D4B8]/50 transition shadow-md"
//                       title="Afficher un indice"
//                       aria-controls={`hint-${currentPuzzle.id}`}
//                       aria-expanded={!!hints[currentPuzzle.id]}
//                     >
//                       💡 Indice
//                     </button>
//                   </div>
//                 </div>

//                 {/* Indice */}
//                 {hints[currentPuzzle.id] && (
//                   <div
//                     id={`hint-${currentPuzzle.id}`}
//                     className="p-4 bg-[#FFF8DC] border border-[#D4AF37]/40 rounded-lg mb-1"
//                   >
//                     <p className="text-[#8B7355] flex items-center gap-2 justify-center">
//                       <span className="text-xl">💡</span>
//                       <span className="font-medium">
//                         Indice : {currentPuzzle.hint}
//                       </span>
//                     </p>
//                   </div>
//                 )}

//                 {/* Messages */}
//                 <div aria-live="polite" className="mt-2 space-y-2">
//                   {validatedAnswers[currentPuzzle.id] === true && (
//                     <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 justify-center text-green-700">
//                       <CheckCircle className="w-5 h-5" aria-hidden="true" />
//                       <span className="font-semibold">
//                         Magnifique ! Vous avez trouvé !
//                       </span>
//                     </div>
//                   )}
//                   {validatedAnswers[currentPuzzle.id] === false && (
//                     <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 justify-center text-red-700">
//                       <XCircle className="w-5 h-5" aria-hidden="true" />
//                       <span>Ce n'est pas correct. Essayez encore…</span>
//                     </div>
//                   )}
//                 </div>
//               </form>
//             </section>

//             {showTransition && (
//               <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
//                 <div className="bg-white rounded-3xl p-8 text-center max-w-md shadow-2xl">
//                   <div className="text-6xl mb-4">🎨</div>
//                   <h2 className="text-3xl font-bold text-[#5C4033] mb-4">
//                     Brillant !
//                   </h2>
//                   <p className="text-[#8B7355] mb-6">
//                     Les Muses sont fières de vous ! Direction le Commerce &
//                     l'Industrie...
//                   </p>
//                   <div className="flex justify-center">
//                     <ArrowRight className="w-8 h-8 text-[#8B7355] animate-pulse" />
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes shake {
//           0%,
//           100% {
//             transform: translateX(0);
//           }
//           25% {
//             transform: translateX(-5px);
//           }
//           75% {
//             transform: translateX(5px);
//           }
//         }
//         .shake {
//           animation: shake 0.3s ease-in-out;
//         }
//         .heroTitle {
//           margin: 0 !important;
//           padding: 0 !important;
//           line-height: 1 !important; /* serre encore plus si besoin */
//         }
//       `}</style>
//     </Background>
//   );
// };

// export default PageArtsCreatifs;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Background from "../Background.jsx";
import GreekFrise from "../components/GreekFrise.js";
import {
  Palette,
  Lock,
  Unlock,
  CheckCircle,
  XCircle,
  ArrowRight,
} from "lucide-react";

/** Modèle de données */
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

/** composant principal */
const PageArtsCreatifs: React.FC = () => {
  const navigate = useNavigate();

  /** States typés */
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [hints, setHints] = useState<Record<string, boolean>>({});
  const [validatedAnswers, setValidatedAnswers] = useState<
    Record<string, boolean | undefined>
  >({});
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState<number>(0);
  const [showTransition, setShowTransition] = useState<boolean>(false);

  /** Données */
  const puzzles: Puzzle[] = [
    {
      id: "muses",
      title: "Les Inspiratrices Divines",
      question:
        "Neuf sœurs m'entourent et inspirent poètes, peintres et danseurs. Qui sommes-nous ?",
      answer: "les muses",
      alternativeAnswers: ["muses"],
      hint: "Filles de Zeus et Mnémosyne",
      type: "text",
    },
    {
      id: "dionysos",
      title: "Le Dieu de la Fête",
      question: "Rébus : Dio (Jojo's) + Nid d'oiseaux + Z (la lettre) + des os",
      answer: "dionysos",
      hint: "Dieu du vin et de la fête",
      type: "rebus",
      visual: ["🎮 Dio", "🪹 Nid", "Z", "🦴 Os"],
    },
    {
      id: "intrus",
      title: "L'Art et la Sculpture",
      question:
        "Trouve l'intrus : Venus de Milo • Discobole • Athéna Parthénos • Coupe d'Arcésilas",
      answer: "coupe d'arcésilas",
      alternativeAnswers: ["coupe d'arcesilas", "coupe"],
      hint: "Un seul n'est pas une sculpture",
      type: "choice",
    },
  ];

  const currentPuzzle = puzzles[currentPuzzleIndex];

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
      setValidatedAnswers((prev) => ({ ...prev, [currentPuzzle.id]: true }));

      setTimeout(() => {
        if (currentPuzzleIndex < puzzles.length - 1) {
          setCurrentPuzzleIndex((i) => i + 1);
        } else {
          setShowTransition(true);
          setTimeout(() => {
            navigate("/commerce-industrie");
          }, 2000);
        }
      }, 1500);
    } else {
      setValidatedAnswers((prev) => ({ ...prev, [currentPuzzle.id]: false }));
      setTimeout(() => {
        setValidatedAnswers((prev) => ({
          ...prev,
          [currentPuzzle.id]: undefined,
        }));
      }, 2000);
    }
  };

  const toggleHint = (): void => {
    setHints((prev) => ({
      ...prev,
      [currentPuzzle.id]: !prev[currentPuzzle.id],
    }));
  };

  /** Events typés */
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit();
  };

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
  };

  /** rendu */
  return (
    <Background>
      <GreekFrise position="top" tilesPerViewport={6.5} height={56} />
      <GreekFrise position="bottom" tilesPerViewport={6.5} height={56} />

      <div className="relative z-10 w-full max-w-4xl">
        {/* Header */}
        <header>
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4 not-prose">
              <Palette size={50} className="text-[#8B7355] relative top-1" />
              <h1 className="heroTitle text-[65px] font-bold text-[#5C4033] leading-[1]">
                Arts Créatifs
              </h1>
              <Palette size={50} className="text-[#8B7355] relative top-1" />
            </div>
            <p className="text-[#8B7355] text-[20px] ">
              Les Muses vous guident vers l'inspiration divine
            </p>
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

        {/* Card */}
        <div className="w-full flex items-center justify-center ">
          <div className="border-2 border-[#8B7355]/40 rounded-2xl p-4">
            <section
              aria-labelledby="puzzle-title"
              className={`mx-auto w-[92vw] sm:w-[85vw] md:w-[70vw] lg:w-[42rem] max-w-[42rem] bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-[#8B7355]/20 overflow-hidden transition-all duration-300 ${
                validatedAnswers[currentPuzzle.id] === true
                  ? "border-green-500 ring-1 ring-green-500/30"
                  : validatedAnswers[currentPuzzle.id] === false
                  ? "border-red-500 ring-1 ring-red-500/30"
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
                    <Unlock className="w-6 h-6 text-white" aria-hidden />
                  ) : (
                    <Lock className="w-6 h-6 text-white/80" aria-hidden />
                  )}
                </div>
              </div>

              {/* Contenu */}
              <form
                onSubmit={onFormSubmit}
                className="p-6 text-center text-xl"
                noValidate
              >
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

                {/* Input + Actions */}
                <div className="grid gap-2 mb-2">
                  <label
                    htmlFor={`answer-${currentPuzzle.id}`}
                    className="sr-only "
                  >
                    Votre réponse
                  </label>

                  <input
                    id={`answer-${currentPuzzle.id}`}
                    type="text"
                    value={answers[currentPuzzle.id] || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setAnswers({
                        ...answers,
                        [currentPuzzle.id]: e.target.value,
                      })
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
                      <span className="font-medium">
                        Indice : {currentPuzzle.hint}
                      </span>
                    </p>
                  </div>
                )}

                {/* Messages */}
                <div aria-live="polite" className="mt-2 space-y-2">
                  {validatedAnswers[currentPuzzle.id] === true && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 justify-center text-green-700">
                      <CheckCircle className="w-5 h-5" aria-hidden />
                      <span className="font-semibold">
                        Magnifique ! Vous avez trouvé !
                      </span>
                    </div>
                  )}
                  {validatedAnswers[currentPuzzle.id] === false && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 justify-center text-red-700">
                      <XCircle className="w-5 h-5" aria-hidden />
                      <span>Ce n'est pas correct. Essayez encore…</span>
                    </div>
                  )}
                </div>
              </form>
            </section>

            {/* Transition */}
            {showTransition && (
              <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                <div className="bg-white rounded-3xl p-8 text-center max-w-md shadow-2xl">
                  <div className="text-6xl mb-4">🎨</div>
                  <h2 className="text-3xl font-bold text-[#5C4033] mb-4">
                    Brillant !
                  </h2>
                  <p className="text-[#8B7355] mb-6">
                    Les Muses sont fières de vous ! Direction le Commerce &
                    l&apos;Industrie...
                  </p>
                  <div className="flex justify-center">
                    <ArrowRight className="w-8 h-8 text-[#8B7355] animate-pulse" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .shake { animation: shake 0.3s ease-in-out; }
        .heroTitle { margin: 0; padding: 0; line-height: 1; }
      `}</style>
    </Background>
  );
};

export default PageArtsCreatifs;
