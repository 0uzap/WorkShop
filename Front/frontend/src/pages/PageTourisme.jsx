import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '../Background.jsx';
import GreekFrise from '../components/GreekFrise.jsx';
import { Mountain, Lock, Unlock, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

const PageTourisme = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [hints, setHints] = useState({});
  const [validatedAnswers, setValidatedAnswers] = useState({});
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [showTransition, setShowTransition] = useState(false);

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
      visual: ["🎲 Dé", "🧝 Elfe"]
    }
  ];

  const currentPuzzle = puzzles[currentPuzzleIndex];

  const normalizeAnswer = (answer) => {
    return answer.toLowerCase().trim().replace(/[^a-zàâäéèêëïîôùûüÿœæç]/gi, '');
  };

  const checkAnswer = (userAnswer, correctAnswer, alternativeAnswers = []) => {
    const normalized = normalizeAnswer(userAnswer);
    const correct = normalizeAnswer(correctAnswer);
    const alternatives = alternativeAnswers.map(a => normalizeAnswer(a));
    
    return normalized === correct || alternatives.includes(normalized);
  };

  const handleSubmit = () => {
    const userAnswer = answers[currentPuzzle.id] || '';
    
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

  const toggleHint = () => {
    setHints({...hints, [currentPuzzle.id]: !hints[currentPuzzle.id]});
  };

  return (
    <Background>
      <GreekFrise position="top" />
      <GreekFrise position="bottom" />
      
      <div className="relative z-10 w-full max-w-4xl">
        {/* Structure identique aux autres pages avec les données spécifiques */}
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

        {/* Même structure de carte et interactions que les autres pages */}
        {/* ... Code identique avec les données de tourisme ... */}

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
    </Background>
  );
};

export default PageTourisme;