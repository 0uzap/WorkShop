import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '../Background.jsx';
import GreekFrise from '../components/GreekFrise.jsx';
import { Leaf, Lock, Unlock, CheckCircle, XCircle, Trophy } from 'lucide-react';

const PageEnvironnement = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [hints, setHints] = useState({});
  const [validatedAnswers, setValidatedAnswers] = useState({});
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [showFinalSuccess, setShowFinalSuccess] = useState(false);

  const puzzles = [
    {
      id: 'olivier',
      title: "L'Arbre Sacré",
      question: "Arbre argenté et cadeau d'Athéna, je nourris les athlètes et éclaire les maisons. Qui suis-je ?",
      answer: "olivier",
      alternativeAnswers: ["l'olivier", "un olivier"],
      hint: "Arbre sacré d'Athéna",
      type: "text"
    },
    {
      id: 'echo',
      title: "La Nymphe Maudite",
      question: "Rébus : une haie (buisson) + K (ou potassium) + de l'eau",
      answer: "écho",
      alternativeAnswers: ["echo", "l'écho"],
      hint: "Nymphe condamnée à répéter",
      type: "rebus",
      visual: ["🌳 Haie", "K", "💧 Eau"]
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
          // C'est la fin de l'escape game !
          setShowFinalSuccess(true);
        }
      }, 1500);
    } else {
      setValidatedAnswers({...validatedAnswers, [currentPuzzle.id]: false});
      setTimeout(() => {
        setValidatedAnswers(prev => ({...prev, [currentPuzzle.id]: undefined}));
      }, 2000);
    }
  };

  const handleFinalComplete = () => {
    // Ici vous pouvez rediriger vers une page de fin ou enregistrer le score
    navigate('/victory'); // ou '/home' ou toute autre page
  };

  const toggleHint = () => {
    setHints({...hints, [currentPuzzle.id]: !hints[currentPuzzle.id]});
  };

  return (
    <Background>
      <GreekFrise position="top" />
      <GreekFrise position="bottom" />
      
      <div className="relative z-10 w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Leaf className="w-8 h-8 text-[#8B7355]" />
            <h1 className="text-4xl md:text-5xl font-bold text-[#5C4033]">
              Environnement</h1>
            <Leaf className="w-8 h-8 text-[#8B7355]" />
          </div>
          <p className="text-[#8B7355] text-lg">
            La nature et les mystères de la Grèce
          </p>
        </div>

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
            Énigme {currentPuzzleIndex + 1} sur {puzzles.length} - Dernière étape !
          </p>
        </div>

        <div className={`bg-white/80 backdrop-blur rounded-2xl shadow-xl border-2 border-[#8B7355]/20 overflow-hidden transition-all duration-500 ${
          validatedAnswers[currentPuzzle.id] === true ? 'border-green-600 shadow-green-600/20' :
          validatedAnswers[currentPuzzle.id] === false ? 'border-red-600 shake' : ''
        }`}>
          <div className="bg-gradient-to-r from-[#8B7355] to-[#A0826D] p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">
                {currentPuzzle.title}
              </h2>
              {validatedAnswers[currentPuzzle.id] === true ? (
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

            {currentPuzzle.type === 'rebus' && currentPuzzle.visual && (
              <div className="flex flex-wrap gap-3 mb-6 justify-center bg-[#F5E6D3] rounded-xl p-4">
                {currentPuzzle.visual.map((item, idx) => (
                  <div key={idx} className="text-2xl font-bold text-[#5C4033] px-4 py-2 bg-white rounded-lg shadow-md">
                    {item}
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-3 mb-4">
              <input
                type="text"
                value={answers[currentPuzzle.id] || ''}
                onChange={(e) => setAnswers({...answers, [currentPuzzle.id]: e.target.value})}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                disabled={validatedAnswers[currentPuzzle.id] === true}
                placeholder="Votre réponse..."
                className={`flex-1 px-4 py-3 rounded-xl border-2 bg-white focus:outline-none focus:ring-2 transition-all ${
                  validatedAnswers[currentPuzzle.id] === true
                    ? 'border-green-500 bg-green-50'
                    : 'border-[#C4B5A0] focus:ring-[#8B7355]/30 focus:border-[#8B7355]'
                }`}
              />
              
              <button
                onClick={handleSubmit}
                disabled={validatedAnswers[currentPuzzle.id] === true}
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

            {hints[currentPuzzle.id] && (
              <div className="p-4 bg-[#FFF8DC] border-2 border-[#D4AF37]/30 rounded-lg">
                <p className="text-[#8B7355] flex items-center gap-2">
                  <span className="text-xl">💡</span>
                  <span className="font-medium">Indice : {currentPuzzle.hint}</span>
                </p>
              </div>
            )}

            {validatedAnswers[currentPuzzle.id] === true && (
              <div className="mt-4 p-3 bg-green-100 rounded-lg flex items-center gap-2 text-green-700">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">Bravo ! La nature vous révèle ses secrets !</span>
              </div>
            )}
            {validatedAnswers[currentPuzzle.id] === false && (
              <div className="mt-4 p-3 bg-red-100 rounded-lg flex items-center gap-2 text-red-700">
                <XCircle className="w-5 h-5" />
                <span>Pas encore, réessayez...</span>
              </div>
            )}
          </div>
        </div>

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
                Félicitations ! Vous avez résolu toutes les énigmes !
                Les dieux de l'Olympe vous accueillent parmi les héros de la Grèce antique.
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

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </Background>
  );
};

export default PageEnvironnement;