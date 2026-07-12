import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api/axiosConfig';

const Quiz = () => {
  const { unitId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [loading, setLoading] = useState(true);
  const [quizFinished, setQuizFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await api.get(`/questions/${unitId}`);
        setQuestions(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchQuestions();
  }, [unitId]);

  useEffect(() => {
    let timer;
    if (!showExplanation && !quizFinished && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && !showExplanation) {
      handleAnswer(-1); // Timeout
    }
    return () => clearInterval(timer);
  }, [timeLeft, showExplanation, quizFinished]);

  const handleAnswer = (optionIdx) => {
    setSelectedOption(optionIdx);
    setShowExplanation(true);
    
    if (optionIdx === questions[currentIdx].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = async () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOption(null);
      setShowExplanation(false);
      setTimeLeft(60);
    } else {
      setQuizFinished(true);
      // Submit result
      try {
        await api.post('/quiz/submit', {
          unit: parseInt(unitId),
          score: score + (selectedOption === questions[currentIdx]?.correctAnswer ? 1 : 0),
          totalQuestions: questions.length,
          timeTaken: 60 * questions.length - timeLeft, // Rough approx
          answers: [],
          xpEarned: (score + (selectedOption === questions[currentIdx]?.correctAnswer ? 1 : 0)) * 10
        });
      } catch (err) {
        console.error('Failed to save score', err);
      }
    }
  };

  if (loading) return <div className="text-center mt-20">Loading questions...</div>;
  if (questions.length === 0) return <div className="text-center mt-20">No questions found for this unit.</div>;

  if (quizFinished) {
    return (
      <div className="flex flex-col items-center justify-center mt-20">
        <div className="glass-card w-full max-w-lg text-center">
          <h2 className="text-4xl font-display mb-4 text-cyan">Quiz Completed!</h2>
          <p className="text-2xl mb-2">Score: {score} / {questions.length}</p>
          <p className="text-xl mb-8 text-gold">XP Earned: +{score * 10}</p>
          <div className="flex space-x-4 justify-center">
            <button onClick={() => navigate('/units')} className="btn-outline">Back to Units</button>
            <button onClick={() => navigate('/dashboard')} className="btn-primary">View Dashboard</button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIdx];

  return (
    <div className="max-w-3xl mx-auto py-8 relative">
      <div className="flex justify-between items-center mb-6">
        <span className="text-gray-400">Question {currentIdx + 1} of {questions.length}</span>
        <div className={`px-4 py-1 rounded-full text-sm font-semibold ${timeLeft < 10 ? 'bg-red-500/20 text-red-400' : 'bg-cyan/20 text-cyan'}`}>
          00:{timeLeft.toString().padStart(2, '0')}
        </div>
      </div>

      {/* Timer Bar */}
      <div className="w-full h-2 bg-white/10 rounded-full mb-8 overflow-hidden">
        <motion.div 
          className="h-full bg-cyan"
          initial={{ width: '100%' }}
          animate={{ width: `${(timeLeft / 60) * 100}%` }}
          transition={{ duration: 1, ease: 'linear' }}
        />
      </div>

      <div className="glass-card border-l-4 border-l-cyan mb-8">
        <h2 className="text-xl md:text-2xl mb-6">{currentQ.questionText}</h2>
        <div className="space-y-3">
          {currentQ.options.map((opt, idx) => {
            let btnClass = "w-full text-left px-6 py-4 rounded-lg border transition-all ";
            if (showExplanation) {
              if (idx === currentQ.correctAnswer) btnClass += "bg-success/20 border-success text-white";
              else if (idx === selectedOption) btnClass += "bg-red-500/20 border-red-500 text-white";
              else btnClass += "bg-white/5 border-white/10 opacity-50";
            } else {
              btnClass += "bg-white/5 border-white/10 hover:border-cyan hover:bg-cyan/10 text-gray-200";
            }

            return (
              <button 
                key={idx} 
                className={btnClass}
                onClick={() => !showExplanation && handleAnswer(idx)}
                disabled={showExplanation}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card mb-8"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-cyan">Explanation</h3>
              <span className="text-xs bg-navy px-2 py-1 rounded font-jetbrains border border-white/10">
                {currentQ.sectionRef}
              </span>
            </div>
            <p className="text-gray-300">{currentQ.explanation}</p>
            
            {/* XP Pop */}
            {selectedOption === currentQ.correctAnswer && (
              <motion.div 
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 0, y: -50 }}
                transition={{ duration: 1.5 }}
                className="absolute right-0 top-0 text-gold font-bold text-xl pointer-events-none"
              >
                +10 XP
              </motion.div>
            )}

            <button onClick={nextQuestion} className="btn-primary w-full mt-6">
              {currentIdx + 1 === questions.length ? 'Finish Quiz' : 'Next Question'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Quiz;
