'use client';

import React, { useState, useEffect } from 'react';
import { Inquisition } from '@/types/curriculum';
import { UserProfile } from '@/types/user';
import { sound } from '@/lib/audio';
import confetti from 'canvas-confetti';
import { 
  Swords, 
  Clock, 
  AlertTriangle, 
  Trophy, 
  X, 
  CheckCircle, 
  Award,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { Mascot } from './Mascot';
import { MultipleChoiceQuestion } from './questions/MultipleChoiceQuestion';
import { CodeFillQuestion } from './questions/CodeFillQuestion';
import { CodeOrderQuestion } from './questions/CodeOrderQuestion';
import { PairMatchQuestion } from './questions/PairMatchQuestion';

interface InquisitionViewProps {
  inquisition: Inquisition;
  user: UserProfile;
  onClose: () => void;
  onFinishInquisition: (scorePercent: number, passed: boolean) => void;
}

export const InquisitionView: React.FC<InquisitionViewProps> = ({
  inquisition,
  user,
  onClose,
  onFinishInquisition
}) => {
  const [stage, setStage] = useState<'briefing' | 'battle' | 'verdict'>('briefing');
  const [timeLeft, setTimeLeft] = useState(inquisition.timeLimitSeconds);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  // Current question answers
  const [mcqChoice, setMcqChoice] = useState<number | null>(null);
  const [placedTokens, setPlacedTokens] = useState<string[]>([]);
  const [codeOrder, setCodeOrder] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<Record<string, boolean>>({});

  const currentQuestion = inquisition.questions[currentIdx];

  // Timer loop during battle
  useEffect(() => {
    if (stage !== 'battle') return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleTimeExpired();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [stage]);

  // Reset per-question state
  useEffect(() => {
    if (!currentQuestion) return;
    setMcqChoice(null);
    setPlacedTokens([]);
    setMatchedPairs({});
    if (currentQuestion.type === 'code-order') {
      setCodeOrder(currentQuestion.shuffledLines.map((_, i) => i));
    }
  }, [currentIdx, currentQuestion]);

  const handleTimeExpired = () => {
    sound.playWrong();
    setStage('verdict');
  };

  const isCurrentAnswerReady = () => {
    if (!currentQuestion) return false;
    switch (currentQuestion.type) {
      case 'multiple-choice':
        return mcqChoice !== null;
      case 'code-fill':
        return placedTokens.length === currentQuestion.correctTokens.length;
      case 'code-order':
        return codeOrder.length > 0;
      case 'pair-match':
        return Object.keys(matchedPairs).length === currentQuestion.pairs.length;
      default:
        return false;
    }
  };

  const handleNextInquisitionQuestion = () => {
    sound.playClick();
    // Validate current question
    let isCorrect = false;
    switch (currentQuestion.type) {
      case 'multiple-choice':
        isCorrect = mcqChoice === currentQuestion.correctIndex;
        break;
      case 'code-fill':
        isCorrect = JSON.stringify(placedTokens) === JSON.stringify(currentQuestion.correctTokens);
        break;
      case 'code-order':
        isCorrect = JSON.stringify(codeOrder) === JSON.stringify(currentQuestion.correctOrder);
        break;
      case 'pair-match':
        isCorrect = Object.keys(matchedPairs).length === currentQuestion.pairs.length;
        break;
    }

    const nextCorrect = isCorrect ? correctAnswersCount + 1 : correctAnswersCount;
    setCorrectAnswersCount(nextCorrect);

    if (currentIdx + 1 < inquisition.questions.length) {
      setCurrentIdx(currentIdx + 1);
    } else {
      // Completed all questions
      setStage('verdict');
      const scorePercent = Math.round((nextCorrect / inquisition.questions.length) * 100);
      const passed = scorePercent >= inquisition.minimumPassPercentage;

      if (passed) {
        sound.playInquisitionVictory();
        try {
          confetti({ particleCount: 150, spread: 80, origin: { y: 0.5 } });
        } catch {
          // ignore
        }
      } else {
        sound.playWrong();
      }
    }
  };

  // Briefing Stage (Mission Brief)
  if (stage === 'briefing') {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col justify-between p-6 max-w-xl mx-auto select-none animate-fadeIn">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-rose-500 font-black text-xs uppercase tracking-widest">
            <Swords className="w-5 h-5" />
            <span>High-Stakes Inquisition</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6 my-auto text-center">
          <Mascot mood="determined" size="xl" className="justify-center" />
          
          <div>
            <div className="text-xs font-black uppercase text-amber-400 tracking-widest mb-1">
              {inquisition.subtitle}
            </div>
            <h2 className="text-3xl font-black tracking-tight">{inquisition.title}</h2>
          </div>

          <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-left space-y-2">
            <div className="flex items-center gap-2 text-rose-400 font-black text-xs uppercase">
              <ShieldAlert className="w-4 h-4" />
              <span>Enterprise Scenario</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {inquisition.enterpriseScenario}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <Clock className="w-4 h-4 text-amber-400 mx-auto mb-1" />
              <div className="text-base font-black">{inquisition.timeLimitSeconds}s</div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">Time Limit</div>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <AlertTriangle className="w-4 h-4 text-rose-400 mx-auto mb-1" />
              <div className="text-base font-black">{inquisition.minimumPassPercentage}%</div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">Required</div>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <Award className="w-4 h-4 text-purple-400 mx-auto mb-1" />
              <div className="text-base font-black">+{inquisition.xpReward}</div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">Bonus XP</div>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            setStage('battle');
          }}
          className="w-full py-4 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-base uppercase tracking-wider shadow-duo-red transition-all transform active:translate-y-1"
        >
          COMMENCE INQUISITION
        </button>
      </div>
    );
  }

  // Verdict Stage
  if (stage === 'verdict') {
    const finalScore = Math.round((correctAnswersCount / inquisition.questions.length) * 100);
    const passed = finalScore >= inquisition.minimumPassPercentage;

    return (
      <div className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col justify-between p-6 max-w-xl mx-auto select-none animate-fadeIn">
        <div className="text-center pt-8 space-y-5 my-auto">
          <Mascot mood={passed ? 'cheering' : 'sad'} size="xl" className="justify-center" />
          
          <h2 className={`text-4xl font-black tracking-tight ${passed ? 'text-amber-400' : 'text-rose-500'}`}>
            {passed ? 'INQUISITION CONQUERED!' : 'INQUISITION FAILED'}
          </h2>

          <p className="text-sm text-slate-300 max-w-sm mx-auto">
            {passed
              ? `You proved enterprise-grade mastery with a score of ${finalScore}%!`
              : `You achieved ${finalScore}%, but ${inquisition.minimumPassPercentage}% is required to unlock the badge. Review the unit and re-attempt!`}
          </p>

          {/* Master Badge Preview */}
          {passed && (
            <div className="p-5 bg-gradient-to-r from-purple-950/60 to-slate-900 border-2 border-purple-500 rounded-3xl max-w-sm mx-auto shadow-xl text-center space-y-2">
              <div className="text-5xl">{inquisition.badge.icon}</div>
              <div className="text-xs font-black uppercase text-purple-400 tracking-wider">
                {inquisition.badge.tier} Badge Unlocked
              </div>
              <div className="text-lg font-black text-white">{inquisition.badge.title}</div>
              <div className="text-xs text-slate-300">{inquisition.badge.description}</div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto pt-2">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-400 uppercase font-bold">Accuracy</div>
              <div className="text-2xl font-black text-white">{finalScore}%</div>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-400 uppercase font-bold">Rewards</div>
              <div className="text-2xl font-black text-amber-400">
                {passed ? `+${inquisition.xpReward} XP` : '0 XP'}
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => onFinishInquisition(finalScore, passed)}
          className={`w-full py-4 rounded-2xl font-black text-base uppercase tracking-wider text-white transition-all transform active:translate-y-1 ${
            passed
              ? 'bg-emerald-500 hover:bg-emerald-400 shadow-duo-green'
              : 'bg-slate-700 hover:bg-slate-600 shadow-duo'
          }`}
        >
          {passed ? 'CLAIM REWARDS & RETURN' : 'RETURN TO MAP'}
        </button>
      </div>
    );
  }

  // Active Battle Stage
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col justify-between select-none">
      
      {/* Top Header */}
      <div className="w-full max-w-2xl mx-auto px-4 pt-4 pb-2 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Swords className="w-5 h-5 text-rose-500" />
          <span className="text-xs font-black uppercase tracking-wider text-rose-400">
            Boss Battle ({currentIdx + 1}/{inquisition.questions.length})
          </span>
        </div>

        {/* Countdown Clock */}
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-xl font-mono font-black text-sm border ${
          timeLeft < 30 ? 'bg-rose-950/60 border-rose-500 text-rose-400 animate-pulse' : 'bg-slate-900 border-slate-700 text-amber-400'
        }`}>
          <Clock className="w-4 h-4" />
          <span>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
        </div>
      </div>

      {/* Main Question Body */}
      <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-4 overflow-y-auto">
        {currentQuestion.type === 'multiple-choice' && (
          <MultipleChoiceQuestion
            question={currentQuestion}
            selectedIndex={mcqChoice}
            onSelect={setMcqChoice}
          />
        )}

        {currentQuestion.type === 'code-fill' && (
          <CodeFillQuestion
            question={currentQuestion}
            placedTokens={placedTokens}
            onPlaceToken={tok => setPlacedTokens([...placedTokens, tok])}
            onRemoveToken={idx => {
              const updated = [...placedTokens];
              updated.splice(idx, 1);
              setPlacedTokens(updated);
            }}
          />
        )}

        {currentQuestion.type === 'code-order' && (
          <CodeOrderQuestion
            question={currentQuestion}
            currentOrder={codeOrder}
            onMoveLine={(from, to) => {
              const updated = [...codeOrder];
              const [item] = updated.splice(from, 1);
              updated.splice(to, 0, item);
              setCodeOrder(updated);
            }}
          />
        )}

        {currentQuestion.type === 'pair-match' && (
          <PairMatchQuestion
            question={currentQuestion}
            matchedPairs={matchedPairs}
            onPairMatched={id => setMatchedPairs({ ...matchedPairs, [id]: true })}
          />
        )}
      </main>

      {/* Footer Submit Button */}
      <footer className="w-full border-t border-slate-800 bg-slate-900/90 p-4">
        <div className="max-w-2xl mx-auto">
          <button
            type="button"
            disabled={!isCurrentAnswerReady()}
            onClick={handleNextInquisitionQuestion}
            className="w-full py-4 rounded-2xl bg-rose-600 hover:bg-rose-500 disabled:opacity-40 text-white font-black text-sm uppercase tracking-wider shadow-duo-red transition-all transform active:translate-y-1 flex items-center justify-center gap-2"
          >
            <span>{currentIdx + 1 === inquisition.questions.length ? 'SUBMIT INQUISITION' : 'LOCK ANSWER'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </footer>

    </div>
  );
};

