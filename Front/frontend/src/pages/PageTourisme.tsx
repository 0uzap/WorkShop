import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Background from "../Background.jsx";
import GreekFrise from "../components/GreekFrise.jsx";
import {
  Mountain,
  Lock,
  Unlock,
  CheckCircle,
  XCircle,
  ArrowRight,
} from "lucide-react";

// 🖼️ ton image
import acropole from "../assets/acropole.png";

// Composants de boîte de dialogue
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

const PageTourisme: React.FC = () => {
  const navigate = useNavigate();

  /** States typés */
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [hints, setHints] = useState<Record<string, boolean>>({});
  const [validatedAnswers, setValidatedAnswers] = useState<
    Record<string, boolean | undefined>
  >({});
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState<number>(0);
  const [showTransition, setShowTransition] = useState<boolean>(false);
  const [isPuzzleOpen, setIsPuzzleOpen] = useState<boolean>(false);

  /** Données */
  const puzzles: Puzzle[] = [
    {
      id: "acropole",
      title: "La Colline Sacrée",
      question:
        "Je suis une colline couronnée de marbre, guettant Athènes depuis des millénaires. Qui suis-je ?",
      answer: "acropole",
      alternativeAnswers: [
        "l'acropole",
        "parthénon",
        "parthenon",
        "le parthénon",
      ],
      hint: "Citadelle d'Athènes",
      type: "text",
    },
    {
      id: "delphes",
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '../Background.jsx';
import GreekFrise from '../components/GreekFrise';
import { Mountain, Lock, Unlock, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import Chat from '../components/Chat.jsx';

const PageTourisme = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [hints, setHints] = useState({});
  const [validatedAnswers, setValidatedAnswers] = useState({});
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [showTransition, setShowTransition] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  const sessionId = currentUser.session_id;

  const puzzles = [
    {
      id: 'acropole',
      title: "La Colline Sacrée",
      question: "Je suis une colline couronnée de marbre, guettant Athènes depuis des millénaires. Qui suis-je ?",
      answer: "acropole",
      alternativeAnswers: ["l'acropole", "parthénon", "parthenon", "le parthénon"],
      hint: "Citadelle d'Athènes",
      type: "text"
    },
    {
      id: 'delphes',
      title: "Le Site de l'Oracle",
      question: "Rébus : Dé + Elfe",
      answer: "delphes",
      alternativeAnswers: ["delphe"],
      hint: "Site de l'oracle d'Apollon",
      type: "rebus",
      visual: ["🎲 ", "🧝 "],
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
          // setCurrentPuzzleIndex((i) => i + 1);
        } else {
          setShowTransition(true);
          setTimeout(() => navigate("/environnement"), 2000);
        }
      }, 1500);
    } else {
      setValidatedAnswers((prev) => ({ ...prev, [currentPuzzle.id]: false }));
      setTimeout(() => {
        setValidatedAnswers((prev) => ({
          ...prev,
          [currentPuzzle.id]: undefined,
        }));
  const normalizeAnswer = (answer: string) => {
    return answer.toLowerCase().trim().replace(/[^a-zàâäéèêëïîôùûüÿœæç]/gi, '');
  };

  const checkAnswer = (userAnswer: string, correctAnswer: string, alternativeAnswers: string[] = []) => {
    const normalized = normalizeAnswer(userAnswer);
    const correct = normalizeAnswer(correctAnswer);
    const alternatives = alternativeAnswers.map(a => normalizeAnswer(a));
    
    return normalized === correct || alternatives.includes(normalized);
  };

  const handleSubmit = () => {
    const userAnswer = answers[currentPuzzle.id as keyof typeof answers] || '';
    
    if (checkAnswer(userAnswer, currentPuzzle.answer, currentPuzzle.alternativeAnswers)) {
      setValidatedAnswers({...validatedAnswers, [currentPuzzle.id]: true});
      
      setTimeout(() => {
        if (currentPuzzleIndex < puzzles.length - 1) {
          setCurrentPuzzleIndex(currentPuzzleIndex + 1);
        } else {
          setShowTransition(true);
          setTimeout(() => {
            navigate('/environnement');
          }, 2000);
        }
      }, 1500);
    } else {
      setValidatedAnswers({...validatedAnswers, [currentPuzzle.id]: false});
      setTimeout(() => {
        setValidatedAnswers(prev => ({...prev, [currentPuzzle.id]: undefined}));
      }, 2000);
    }
  };

  const toggleHint = (): void => {
    setHints((prev) => ({
      ...prev,
      [currentPuzzle.id]: !prev[currentPuzzle.id],
    }));
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit();
  };

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
  };

  /** Hotspots → affichage du bon puzzle */
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

  /** Render */
  return (
    <Background>
      <GreekFrise position="top" tilesPerViewport={6.5} height={FRIEZE_HEIGHT} />
      <GreekFrise
        position="bottom"
        tilesPerViewport={6.5}
        height={FRIEZE_HEIGHT}
      />

      <div className="relative z-10 w-full max-w-5xl">
        {/* Header */}
        <header>
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4 not-prose">
              <Mountain size={50} className="text-[#8B7355] relative top-1" />
              <h1 className="heroTitle text-[65px] font-bold text-[#5C4033] leading-[1]">
                Tourisme
              </h1>
              <Mountain size={50} className="text-[#8B7355] relative top-1" />
            </div>
            <p className="text-[#8B7355] text-[20px]">
              Explorez les merveilles de la Grèce antique
            </p>
          </div>
        </header>

        {/* 🖼️ Image + zones cliquables */}
        <div className="w-full flex justify-center mb-8">
          <div className="relative inline-block">
            <img
              src={acropole}
              alt="Acropole d'Athènes"
              className="
                block mx-auto h-auto
                max-h-[82vh]
                max-w-[min(100vw-48px,1300px)]
                object-contain rounded-xl shadow
              "
            />

            {/* zone 1 → acropole */}
            <button
              onClick={() => openPuzzleAt(0)}
              className="absolute bg-transparent border-hidden rounded-md cursor-default"
              style={{ left: "33.7%", top: "22%", width: "28%", height: "22%" }}
              aria-label="Ouvrir l'énigme sur l'Acropole"
            />

            {/* zone 2 → delphes */}
            <button
              onClick={() => openPuzzleAt(1)}
              className="absolute bg-transparent border-hidden rounded-md cursor-default"
              style={{ left: "70%", top: "12%", width: "22%", height: "8%" }}
              aria-label="Ouvrir l'énigme sur Delphes"
            />

            <div className="absolute bottom-3 left-3 bg-black/70 text-white px-3 py-2 rounded-lg text-sm">
              Cliquez sur les zones invisibles de l’image pour ouvrir une énigme.
            </div>
          </div>
        </div>

        {/* Progress */}
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
  const toggleHint = () => {
    setHints({...hints, [currentPuzzle.id as keyof typeof hints]: !hints[currentPuzzle.id as keyof typeof hints]});
  };

  return (
    <Background>
      <GreekFrise position="top" />
      <GreekFrise position="bottom" />
      
      <div className="relative z-10 w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Mountain className="w-8 h-8 text-[#8B7355]" />
            <h1 className="text-4xl md:text-5xl font-bold text-[#5C4033]">
              Tourisme
            </h1>
            <Mountain className="w-8 h-8 text-[#8B7355]" />
          </div>
          <p className="text-[#8B7355] text-lg">
            Explorez les merveilles de la Grèce antique
          </p>
        </div>
  
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-center gap-2 mb-4">
            {puzzles.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index < currentPuzzleIndex ? 'bg-[#5C4033]' :
                  index === currentPuzzleIndex ? 'bg-[#8B7355] scale-125' :
                  'bg-[#C4B5A0]'
                }`}
              />
            ))}
          </div>
          <p className="text-center text-[#8B7355] text-sm">
            Énigme {currentPuzzleIndex + 1} sur {puzzles.length}
          </p>
        </div>
      </div>

      {/* 🪟 pop-up d'énigme */}
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
                    <span>Excellent ! Site découvert avec succès !</span>
                  </div>
                )}
                {validatedAnswers[currentPuzzle.id] === false && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 justify-center text-red-700">
                    <XCircle className="w-5 h-5" />
                    <span>Ce n'est pas la bonne réponse. Continuez à explorer…</span>
                  </div>
                )}
              </div>
            </form>
          </section>
        </DialogContent>
      </Dialog>

      {/* transition finale */}
      {showTransition && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 text-center max-w-md shadow-2xl">
            <div className="text-6xl mb-4">🏛️</div>
            <h2 className="text-3xl font-bold text-[#5C4033] mb-4">
              Voyage accompli !
            </h2>
            <p className="text-[#8B7355] mb-6">
              Les sites sacrés vous ont révélé leurs secrets ! Dernière étape :
              l&apos;Environnement...
            </p>
            <ArrowRight className="w-8 h-8 text-[#8B7355] animate-pulse mx-auto" />
          </div>
        </div>
      )}
  
        {/* Main Puzzle Card */}
        <div className={`bg-white/80 backdrop-blur rounded-2xl shadow-xl border-2 border-[#8B7355]/20 overflow-hidden transition-all duration-500 ${
          validatedAnswers[currentPuzzle.id as keyof typeof validatedAnswers] === true ? 'border-green-600 shadow-green-600/20' :
          validatedAnswers[currentPuzzle.id as keyof typeof validatedAnswers] === false ? 'border-red-600 shake' : ''
        }`}>
          <div className="bg-gradient-to-r from-[#8B7355] to-[#A0826D] p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">
                {currentPuzzle.title}
              </h2>
              {validatedAnswers[currentPuzzle.id as keyof typeof validatedAnswers] === true ? (
                <Unlock className="w-6 h-6 text-white" />
              ) : (
                <Lock className="w-6 h-6 text-white/60" />
              )}
            </div>
          </div>
  
          <div className="p-6">
            <p className="text-[#5C4033] text-lg mb-6 font-medium">
              {currentPuzzle.question}
            </p>
  
            {/* Visual hints for rebus */}
            {currentPuzzle.type === 'rebus' && currentPuzzle.visual && (
              <div className="flex flex-wrap gap-3 mb-6 justify-center bg-[#F5E6D3] rounded-xl p-4">
                {currentPuzzle.visual.map((item, idx) => (
                  <div key={idx} className="text-2xl font-bold text-[#5C4033] px-4 py-2 bg-white rounded-lg shadow-md">
                    {item}
                  </div>
                ))}
              </div>
            )}
  
            {/* Answer Input */}
            <div className="flex gap-3 mb-4">
              <input
                type="text"
                value={answers[currentPuzzle.id as keyof typeof answers] || ''}
                onChange={(e) => setAnswers({...answers, [currentPuzzle.id]: e.target.value})}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                disabled={validatedAnswers[currentPuzzle.id as keyof typeof validatedAnswers] === true}
                placeholder="Votre réponse..."
                className={`flex-1 px-4 py-3 rounded-xl border-2 bg-white focus:outline-none focus:ring-2 transition-all ${
                  validatedAnswers[currentPuzzle.id as keyof typeof validatedAnswers] === true
                    ? 'border-green-500 bg-green-50'
                    : 'border-[#C4B5A0] focus:ring-[#8B7355]/30 focus:border-[#8B7355]'
                }`}
              />
              
              <button
                onClick={handleSubmit}
                disabled={validatedAnswers[currentPuzzle.id as keyof typeof validatedAnswers] === true}
                className="px-6 py-3 bg-gradient-to-r from-[#8B7355] to-[#A0826D] text-white font-bold rounded-xl hover:from-[#7A6248] hover:to-[#8B7355] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                Valider
              </button>
              
              <button
                onClick={toggleHint}
                className="px-4 py-3 bg-[#F5E6D3] text-[#5C4033] rounded-xl hover:bg-[#E8D4B8] transition-all shadow-md"
                title="Indice"
              >
                💡
              </button>
            </div>
  
            {/* Hint Display */}
            {hints[currentPuzzle.id as keyof typeof hints] && (
              <div className="p-4 bg-[#FFF8DC] border-2 border-[#D4AF37]/30 rounded-lg">
                <p className="text-[#8B7355] flex items-center gap-2">
                  <span className="text-xl">💡</span>
                  <span className="font-medium">Indice : {currentPuzzle.hint}</span>
                </p>
              </div>
            )}
  
            {/* Feedback Messages */}
            {validatedAnswers[currentPuzzle.id as keyof typeof validatedAnswers] === true && (
              <div className="mt-4 p-3 bg-green-100 rounded-lg flex items-center gap-2 text-green-700">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">Excellent ! Site découvert avec succès !</span>
              </div>
            )}
            {validatedAnswers[currentPuzzle.id as keyof typeof validatedAnswers] === false && (
              <div className="mt-4 p-3 bg-red-100 rounded-lg flex items-center gap-2 text-red-700">
                <XCircle className="w-5 h-5" />
                <span>Ce n'est pas la bonne réponse. Continuez à explorer...</span>
              </div>
            )}
          </div>
        </div>
  
        {/* Transition Overlay */}
        {showTransition && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 text-center max-w-md shadow-2xl">
              <div className="text-6xl mb-4">🏛️</div>
              <h2 className="text-3xl font-bold text-[#5C4033] mb-4">
                Voyage accompli !
              </h2>
              <p className="text-[#8B7355] mb-6">
                Les sites sacrés vous ont révélé leurs secrets !
                Dernière étape : l'Environnement...
              </p>
              <div className="flex justify-center">
                <ArrowRight className="w-8 h-8 text-[#8B7355] animate-pulse" />
              </div>
            </div>
          </div>
        )}
      </div>
  
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
        <Chat
          sessionId={sessionId || 'debug-session'}
          currentUser={currentUser || 'Anonyme'} anchor="br" frise={40}
        />
     
    </Background>
  );
};

export default PageTourisme;
