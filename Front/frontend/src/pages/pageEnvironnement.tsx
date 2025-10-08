// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Background from "../Background.jsx";
// import GreekFrise from "../components/GreekFrise.jsx";
// import { Leaf, Lock, Unlock, CheckCircle, XCircle, Trophy } from "lucide-react";

// const PageEnvironnement = () => {
//   const navigate = useNavigate();
//   const [answers, setAnswers] = useState({});
//   const [hints, setHints] = useState({});
//   const [validatedAnswers, setValidatedAnswers] = useState({});
//   const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
//   const [showFinalSuccess, setShowFinalSuccess] = useState(false);

//   const puzzles = [
//     {
//       id: "olivier",
//       title: "L'Arbre Sacré",
//       question:
//         "Arbre argenté et cadeau d'Athéna, je nourris les athlètes et éclaire les maisons. Qui suis-je ?",
//       answer: "olivier",
//       alternativeAnswers: ["l'olivier", "un olivier"],
//       hint: "Arbre sacré d'Athéna",
//       type: "text",
//     },
//     {
//       id: "echo",
//       title: "La Nymphe Maudite",
//       question: "Rébus : une haie (buisson) + K (ou potassium) + de l'eau",
//       answer: "écho",
//       alternativeAnswers: ["echo", "l'écho"],
//       hint: "Nymphe condamnée à répéter",
//       type: "rebus",
//       visual: ["🌳 Haie", "K", "💧 Eau"],
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
//           // C'est la fin de l'escape game !
//           setShowFinalSuccess(true);
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

//   const handleFinalComplete = () => {
//     // Ici vous pouvez rediriger vers une page de fin ou enregistrer le score
//     navigate("/victory"); // ou '/home' ou toute autre page
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
//             <div className="flex items-center justify-center gap-3 mb-4 not-prose">
//               <Leaf size={50} className="text-[#8B7355] relative top-1" />
//               <h1 className="heroTitle text-[65px] font-bold text-[#5C4033] relative top-1">
//                 Environnement
//               </h1>
//               <Leaf size={50} className="text-[#8B7355] relative top-1" />
//             </div>
//             <p className="text-[#8B7355] text-[20px]">
//               La nature et les mystères de la Grèce
//             </p>
//           </div>
//         </header>
//         {/* Progress indicator */}
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
//             Énigme {currentPuzzleIndex + 1} sur {puzzles.length} - Dernière
//             étape !
//           </p>
//         </div>
//         <div className="w-full flex items-center justify-center">
//           <div className="border-2 border-[#8B7355]/40 rounded-2xl p-4">
//             {/* Main puzzle card */}
//             <section
//               aria-labelledby="puzzle-title"
//               className={`mx-auto w-[92vw] sm:w-[85vw] md:w-[70vw] lg:w-[42rem] max-w-[45rem] bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-[#8B7355]/20 overflow-hidden transition-all duration-300 ${
//                 validatedAnswers[currentPuzzle.id] === true
//                   ? "border-green-600 shadow-green-500/20"
//                   : validatedAnswers[currentPuzzle.id] === false
//                   ? "border-red-500 ring-1 ring-red-500/30 shake"
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

//               {/* contenu  */}
//               <form
//                 onSubmit={(e) => {
//                   e.preventDefault();
//                   handleSubmit();
//                 }}
//                 className="p-6 text-center text-xl"
//                 noValidate
//               >
//                 {/* Question */}
//                 <p className="text-[#5C4033] text-[19px] md:text-2xl leading-snug mb-4 font-semibold">
//                   {currentPuzzle.question}
//                 </p>

//                 {/* Rébus si besoin */}
//                 {currentPuzzle.type === "rebus" && currentPuzzle.visual && (
//                   <div className="flex flex-wrap gap-2 mb-4 justify-center bg-[#F5E6D3] rounded-xl p-4">
//                     {currentPuzzle.visual.map((item, idx) => (
//                       <div
//                         key={idx}
//                         className="text-xl font-bold text-[#5C4033] px-3 py-2 bg-white rounded-lg shadow-md"
//                       >
//                         {item}
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 {/* input + Action */}

//                 <div className="grid gap-2 mb-2">
//                   <label
//                     htmlFor={`answer-${currentPuzzle.id}`}
//                     className="sr-only"
//                   >
//                     Votre Reponse
//                   </label>

//                   {/* Input*/}
//                   <input
//                     type="text"
//                     value={answers[currentPuzzle.id] || ""}
//                     onChange={(e) =>
//                       setAnswers({
//                         ...answers,
//                         [currentPuzzle.id]: e.target.value,
//                       })
//                     }
//                     onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
//                     disabled={validatedAnswers[currentPuzzle.id] === true}
//                     placeholder="Votre réponse..."
//                     className={`w-full h-[35px] text-[20px] placeholder:text-xl px-5 rounded-xl border-2 bg-white focus:outline-none focus:ring-4 transition ${
//                       validatedAnswers[currentPuzzle.id] === true
//                         ? "border-green-500 bg-green-50"
//                         : "border-[#C4B5A0] focus:ring-[#8B7355]/30 focus:border-[#8B7355]"
//                     }`}
//                   />

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
//                       onClick={toggleHint}
//                       className="col-span-1 w-full h-[30px] text-[18px] md:text-lg px-4 bg-[#F5E6D3] text-[#5C4033] font-medium rounded-xl hover:bg-[#E8D4B8] focus:outline-none focus:ring-4 focus:ring-[#E8D4B8]/50 transition shadow-md"
//                       title="Indice"
//                     >
//                       💡Indice
//                     </button>
//                   </div>
//                 </div>

//                 {/* Indice */}
//                 {hints[currentPuzzle.id] && (
//                   <div className="p-4 bg-[#FFF8DC] border border-[#D4AF37]/40 rounded-lg">
//                     <p className="text-[#8B7355] flex items-center gap-2 justify-center">
//                       <span className="text-xl">💡</span>
//                       <span className="font-medium">
//                         Indice : {currentPuzzle.hint}
//                       </span>
//                     </p>
//                   </div>
//                 )}

//                 {/* Message */}
//                 {validatedAnswers[currentPuzzle.id] === true && (
//                   <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 justify-center text-green-700">
//                     <CheckCircle className="w-5 h-5" />
//                     <span className="font-semibold">
//                       Bravo ! La nature vous révèle ses secrets !
//                     </span>
//                   </div>
//                 )}
//                 {validatedAnswers[currentPuzzle.id] === false && (
//                   <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 justify-center  text-red-700">
//                     <XCircle className="w-5 h-5" />
//                     <span>Pas encore, réessayez...</span>
//                   </div>
//                 )}
//               </form>
//             </section>

//             {/* Modal de victoire finale */}
//             {showFinalSuccess && (
//               <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
//                 <div className="bg-gradient-to-br from-[#F5E6D3] to-white rounded-3xl p-8 max-w-md text-center border-4 border-[#D4AF37] shadow-2xl">
//                   <div className="text-7xl mb-4 animate-bounce">🏆</div>
//                   <h2 className="text-4xl font-bold text-[#5C4033] mb-4">
//                     Victoire Olympienne !
//                   </h2>
//                   <div className="text-6xl mb-4">⚡</div>
//                   <p className="text-[#8B7355] mb-6 text-lg">
//                     Félicitations ! Vous avez résolu toutes les énigmes ! Les
//                     dieux de l'Olympe vous accueillent parmi les héros de la
//                     Grèce antique.
//                   </p>
//                   <div className="flex gap-2 justify-center mb-6">
//                     <span className="text-3xl">🏛️</span>
//                     <span className="text-3xl">⚔️</span>
//                     <span className="text-3xl">🦉</span>
//                     <span className="text-3xl">🌿</span>
//                     <span className="text-3xl">🏺</span>
//                   </div>
//                   <button
//                     onClick={handleFinalComplete}
//                     className="px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-[#5C4033] font-bold text-lg rounded-xl hover:from-[#FFD700] hover:to-[#D4AF37] transition-all shadow-xl"
//                   >
//                     Terminer l'Aventure
//                   </button>
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

// export default PageEnvironnement;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Background from "../Background.jsx";
import GreekFrise from "../components/GreekFrise.js";
import { Leaf, Lock, Unlock, CheckCircle, XCircle } from "lucide-react";

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

const PageEnvironnement: React.FC = () => {
  const navigate = useNavigate();

  /** States typés */
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [hints, setHints] = useState<Record<string, boolean>>({});
  const [validatedAnswers, setValidatedAnswers] = useState<Record<string, boolean | undefined>>({});
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState<number>(0);
  const [showFinalSuccess, setShowFinalSuccess] = useState<boolean>(false);

  /** Données */
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
      question: "Rébus : une haie (buisson) + K (ou potassium) + de l'eau",
      answer: "écho",
      alternativeAnswers: ["echo", "l'écho"],
      hint: "Nymphe condamnée à répéter",
      type: "rebus",
      visual: ["🌳 Haie", "K", "💧 Eau"],
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

  const handleFinalComplete = (): void => {
    navigate("/victory");
  };

  const toggleHint = (): void =>
    setHints((prev) => ({ ...prev, [currentPuzzle.id]: !prev[currentPuzzle.id] }));

  /** Events typés */
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit();
  };

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <Background>
      <GreekFrise position="top" tilesPerViewport={6.5} height={56} />
      <GreekFrise position="bottom" tilesPerViewport={6.5} height={56} />

      <div className="relative z-10 w-full max-w-4xl">
        {/* Header */}
        <header>
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4 not-prose">
              <Leaf size={50} className="text-[#8B7355] relative top-1" />
              <h1 className="heroTitle text-[65px] font-bold text-[#5C4033] relative top-1">
                Environnement
              </h1>
              <Leaf size={50} className="text-[#8B7355] relative top-1" />
            </div>
            <p className="text-[#8B7355] text-[20px]">
              La nature et les mystères de la Grèce
            </p>
          </div>
        </header>

        {/* Progress indicator */}
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
            Énigme {currentPuzzleIndex + 1} sur {puzzles.length} - Dernière étape !
          </p>
        </div>

        <div className="w-full flex items-center justify-center">
          <div className="border-2 border-[#8B7355]/40 rounded-2xl p-4">
            {/* Main puzzle card */}
            <section
              aria-labelledby="puzzle-title"
              className={`mx-auto w-[92vw] sm:w-[85vw] md:w-[70vw] lg:w-[42rem] max-w-[42rem] bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-[#8B7355]/20 overflow-hidden transition-all duration-300 ${
                validatedAnswers[currentPuzzle.id] === true
                  ? "border-green-600 shadow-green-500/20"
                  : validatedAnswers[currentPuzzle.id] === false
                  ? "border-red-500 ring-1 ring-red-500/30 shake"
                  : "hover:shadow-2xl"
              }`}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#8B7355] to-[#A0826D] p-4">
                <div className="flex items-center justify-between gap-4">
                  <h2 id="puzzle-title" className="text-lg font-semibold text-white">
                    {currentPuzzle.title}
                  </h2>
                  {validatedAnswers[currentPuzzle.id] === true ? (
                    <Unlock className="w-6 h-6 text-white" aria-hidden />
                  ) : (
                    <Lock className="w-6 h-6 text-white/80" aria-hidden />
                  )}
                </div>
              </div>

              {/* contenu */}
              <form onSubmit={onFormSubmit} className="p-6 text-center text-xl" noValidate>
                {/* Question */}
                <p className="text-[#5C4033] text-[19px] md:text-2xl leading-snug mb-4 font-semibold">
                  {currentPuzzle.question}
                </p>

                {/* Rébus si besoin */}
                {currentPuzzle.type === "rebus" && currentPuzzle.visual && (
                  <div className="flex flex-wrap gap-2 mb-4 justify-center bg-[#F5E6D3] rounded-xl p-4">
                    {currentPuzzle.visual.map((item, idx) => (
                      <div
                        key={idx}
                        className="text-xl font-bold text-[#5C4033] px-3 py-2 bg-white rounded-lg shadow-md"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                )}

                {/* input + Action */}
                <div className="grid gap-2 mb-2">
                  <label htmlFor={`answer-${currentPuzzle.id}`} className="sr-only">
                    Votre Réponse
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
                    placeholder="Votre réponse..."
                    aria-invalid={validatedAnswers[currentPuzzle.id] === false}
                    className={`w-full h-[35px] text-[20px] placeholder:text-xl px-5 rounded-xl border-2 bg-white focus:outline-none focus:ring-4 transition ${
                      validatedAnswers[currentPuzzle.id] === true
                        ? "border-green-500 bg-green-50"
                        : validatedAnswers[currentPuzzle.id] === false
                        ? "border-red-500 focus:ring-red-200"
                        : "border-[#C4B5A0] focus:ring-[#8B7355]/30 focus:border-[#8B7355]"
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
                      title="Indice"
                      aria-controls={`hint-${currentPuzzle.id}`}
                      aria-expanded={!!hints[currentPuzzle.id]}
                    >
                      💡Indice
                    </button>
                  </div>
                </div>

                {/* Indice */}
                {hints[currentPuzzle.id] && (
                  <div
                    id={`hint-${currentPuzzle.id}`}
                    className="p-4 bg-[#FFF8DC] border border-[#D4AF37]/40 rounded-lg"
                  >
                    <p className="text-[#8B7355] flex items-center gap-2 justify-center">
                      <span className="text-xl">💡</span>
                      <span className="font-medium">Indice : {currentPuzzle.hint}</span>
                    </p>
                  </div>
                )}

                {/* Message */}
                {validatedAnswers[currentPuzzle.id] === true && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 justify-center text-green-700">
                    <CheckCircle className="w-5 h-5" aria-hidden />
                    <span className="font-semibold">Bravo ! La nature vous révèle ses secrets !</span>
                  </div>
                )}
                {validatedAnswers[currentPuzzle.id] === false && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 justify-center text-red-700">
                    <XCircle className="w-5 h-5" aria-hidden />
                    <span>Pas encore, réessayez...</span>
                  </div>
                )}
              </form>
            </section>

            {/* Modal de victoire finale */}
            {showFinalSuccess && (
              <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                <div className="bg-gradient-to-br from-[#F5E6D3] to-white rounded-3xl p-8 max-w-md text-center border-4 border-[#D4AF37] shadow-2xl">
                  <div className="text-7xl mb-4 animate-bounce">🏆</div>
                  <h2 className="text-4xl font-bold text-[#5C4033] mb-4">
                    Victoire Olympienne !
                  </h2>
                  <div className="text-6xl mb-4">⚡</div>
                  <p className="text-[#8B7355] mb-6 text-lg">
                    Félicitations ! Vous avez résolu toutes les énigmes ! Les dieux de l'Olympe
                    vous accueillent parmi les héros de la Grèce antique.
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
                    Terminer l'Aventure
                  </button>
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

export default PageEnvironnement;
