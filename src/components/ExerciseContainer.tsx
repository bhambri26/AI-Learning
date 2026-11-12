'use client';

import React, { useState } from 'react';
import { Lesson, Question } from '@/types/curriculum';
import { UserProfile } from '@/types/user';
import { sound } from '@/lib/audio';
import confetti from 'canvas-confetti';
import { X, Heart, CheckCircle2, XCircle, Sparkles, ArrowRight } from 'lucide-react';
import { Mascot, MascotMood } from './Mascot';
import { MultipleChoiceQuestion } from './questions/MultipleChoiceQuestion';
import { CodeFillQuestion } from './questions/CodeFillQuestion';
import { CodeOrderQuestion } from './questions/CodeOrderQuestion';
import { BugHuntQuestion } from './questions/BugHuntQuestion';
import { InteractiveRunnerQuestion } from './questions/InteractiveRunnerQuestion';
import { PairMatchQuestion } from './questions/PairMatchQuestion';

interface ExerciseContainerProps {
  lesson: Lesson;
  user: UserProfile;
  onClose: () => void;
  onFinishLesson: (earnedXp: number) => void;
  onDeductHeart: () => void;
  onOpenHeartModal: () => void;
}

export const ExerciseContainer: React.FC<ExerciseContainerProps> = ({
  lesson,
  user,
  onClose,
  onFinishLesson,
  onDeductHeart,
  onOpenHeartModal
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [status, setStatus] = useState<'answering' | 'correct' | 'wrong' | 'completed'>('answering');
  const [mascotMood, setMascotMood] = useState<MascotMood>('happy');

  // Question specific states
  const [mcqSelected, setMcqSelected] = useState<number | null>(null);
  const [placedTokens, setPlacedTokens] = useState<string[]>([]);
  const [codeOrder, setCodeOrder] = useState<number[]>([]);
  const [bugOptionSelected, setBugOptionSelected] = useState<number | null>(null);
  const [runnerCode, setRunnerCode] = useState<string>('');
  const [runnerValidated, setRunnerValidated] = useState<boolean>(false);
  const [matchedPairs, setMatchedPairs] = useState<Record<string, boolean>>({});

  const currentQuestion = lesson.questions[currentIndex];
  const progressPercent = ((currentIndex) / lesson.questions.length) * 100;

  // Initialize per-question state when currentIndex changes
  React.useEffect(() => {
    if (!currentQuestion) return;
    setStatus('answering');
    setMascotMood('happy');
    setMcqSelected(null);
    setPlacedTokens([]);
    setBugOptionSelected(null);
    setRunnerValidated(false);
    setMatchedPairs({});

    if (currentQuestion.type === 'code-order') {
      setCodeOrder(currentQuestion.shuffledLines.map((_, i) => i));
    }
    if (currentQuestion.type === 'interactive-runner') {
      setRunnerCode(currentQuestion.starterCode);
    }
  }, [currentIndex, currentQuestion]);

  // Determine if user has provided an input to enable "CHECK"
  const isCheckEnabled = (): boolean => {
    if (status !== 'answering') return false;
    switch (currentQuestion.type) {
      case 'multiple-choice':
        return mcqSelected !== null;
      case 'code-fill':
        return placedTokens.length === currentQuestion.correctTokens.length;
      case 'code-order':
        return codeOrder.length > 0;
      case 'bug-hunt':
        return bugOptionSelected !== null;
      case 'interactive-runner':
        return runnerValidated;
      case 'pair-match':
        return Object.keys(matchedPairs).length === currentQuestion.pairs.length;
      default:
        return false;
    }
  };

  const handleCheck = () => {
    let isCorrect = false;

    switch (currentQuestion.type) {
      case 'multiple-choice':
        isCorrect = mcqSelected === currentQuestion.correctIndex;
        break;
      case 'code-fill':
        isCorrect = JSON.stringify(placedTokens) === JSON.stringify(currentQuestion.correctTokens);
        break;
      case 'code-order':
        isCorrect = JSON.stringify(codeOrder) === JSON.stringify(currentQuestion.correctOrder);
        break;
      case 'bug-hunt':
        isCorrect = bugOptionSelected === currentQuestion.correctOptionIndex;
        break;
      case 'interactive-runner':
        isCorrect = runnerValidated;
        break;
      case 'pair-match':
        isCorrect = Object.keys(matchedPairs).length === currentQuestion.pairs.length;
        break;
    }

    if (isCorrect) {
      sound.playCorrect();
      setStatus('correct');
      setMascotMood('cheering');
    } else {
      sound.playWrong();
      sound.playHeartLost();
      setStatus('wrong');
      setMascotMood('sad');
      onDeductHeart();
    }
  };

  const handleContinue = () => {
    sound.playClick();
    if (currentIndex + 1 < lesson.questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Completed Lesson!
      sound.playInquisitionVictory();
      setStatus('completed');
      setMascotMood('cheering');
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
    }
  };

  // Lesson Summary Screen
  if (status === 'completed') {
    return (
      <div className="fixed inset-0 z-50 bg-white dark:bg-duo-dark-bg flex flex-col justify-between p-6 max-w-lg mx-auto select-none animate-fadeIn">
        <div className="text-center pt-12 space-y-4">
          <Mascot mood="cheering" size="xl" className="justify-center" />
          <h2 className="text-3xl font-black text-amber-500 tracking-tight">Lesson Mastered!</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-bold">
            You completed {lesson.title} and leveled up your AI capabilities!
          </p>

          <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto pt-6">
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-700">
              <div className="text-xs font-black uppercase text-amber-500">Total XP</div>
              <div className="text-2xl font-black text-amber-600 dark:text-amber-400">+{lesson.xpReward} XP</div>
            </div>
            <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border-2 border-sky-300 dark:border-sky-700">
              <div className="text-xs font-black uppercase text-sky-500">Bonus Gems</div>
              <div className="text-2xl font-black text-sky-600 dark:text-sky-400">+5 💎</div>
            </div>
          </div>
        </div>

        <button
          onClick={() => onFinishLesson(lesson.xpReward)}
          className="w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white font-black text-base uppercase tracking-wider shadow-duo-green transition-all transform active:translate-y-1"
        >
          CONTINUE TO MAP
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-duo-dark-bg flex flex-col justify-between select-none">
      
      {/* Top Header */}
      <div className="w-full max-w-2xl mx-auto px-4 pt-4 pb-2 flex items-center gap-4">
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Progress Bar */}
        <div className="flex-1 h-3.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Hearts Indicator */}
        <div
          onClick={onOpenHeartModal}
          className="flex items-center gap-1 cursor-pointer font-black text-rose-500"
        >
          <Heart className="w-6 h-6 fill-rose-500 text-rose-500 animate-pulse" />
          <span className="text-base">{user.hearts}</span>
        </div>
      </div>

      {/* Main Question Body */}
      <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-4 overflow-y-auto">
        <div className="flex items-start gap-3 mb-4">
          <Mascot mood={mascotMood} size="sm" />
          <div className="pt-2 text-xs font-black uppercase tracking-wider text-slate-400">
            Question {currentIndex + 1} of {lesson.questions.length}
          </div>
        </div>

        {currentQuestion.type === 'multiple-choice' && (
          <MultipleChoiceQuestion
            question={currentQuestion}
            selectedIndex={mcqSelected}
            onSelect={setMcqSelected}
            disabled={status !== 'answering'}
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
            disabled={status !== 'answering'}
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
            disabled={status !== 'answering'}
          />
        )}

        {currentQuestion.type === 'bug-hunt' && (
          <BugHuntQuestion
            question={currentQuestion}
            selectedOptionIndex={bugOptionSelected}
            onSelectOption={setBugOptionSelected}
            disabled={status !== 'answering'}
          />
        )}

        {currentQuestion.type === 'interactive-runner' && (
          <InteractiveRunnerQuestion
            question={currentQuestion}
            currentCode={runnerCode}
            onChangeCode={setRunnerCode}
            onExecutionValidated={setRunnerValidated}
            disabled={status !== 'answering'}
          />
        )}

        {currentQuestion.type === 'pair-match' && (
          <PairMatchQuestion
            question={currentQuestion}
            matchedPairs={matchedPairs}
            onPairMatched={id => setMatchedPairs({ ...matchedPairs, [id]: true })}
            disabled={status !== 'answering'}
          />
        )}
      </main>

      {/* Bottom Footer Feedback Sheet */}
      <footer
        className={`w-full border-t-2 transition-colors py-4 px-4 ${
          status === 'correct'
            ? 'bg-duo-green-light dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800'
            : status === 'wrong'
            ? 'bg-duo-red-light dark:bg-rose-950/60 border-rose-300 dark:border-rose-800'
            : 'bg-white dark:bg-duo-dark-bg border-slate-200 dark:border-duo-dark-border'
        }`}
      >
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Feedback Info Message */}
          <div className="w-full sm:w-auto">
            {status === 'correct' && (
              <div className="flex items-center gap-2.5 text-emerald-700 dark:text-emerald-300">
                <CheckCircle2 className="w-7 h-7 flex-shrink-0" />
                <div>
                  <div className="text-base font-black">Nicely done!</div>
                  <div className="text-xs max-w-md">{currentQuestion.explanation}</div>
                </div>
              </div>
            )}

            {status === 'wrong' && (
              <div className="flex items-center gap-2.5 text-rose-700 dark:text-rose-300">
                <XCircle className="w-7 h-7 flex-shrink-0" />
                <div>
                  <div className="text-base font-black">Incorrect</div>
                  <div className="text-xs max-w-md">{currentQuestion.explanation}</div>
                </div>
              </div>
            )}
          </div>

          {/* Action Button */}
          <div className="w-full sm:w-auto sm:min-w-[160px]">
            {status === 'answering' ? (
              <button
                type="button"
                disabled={!isCheckEnabled()}
                onClick={handleCheck}
                className="w-full py-3.5 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-white font-black text-sm uppercase tracking-wider shadow-duo-green transition-all transform active:translate-y-1"
              >
                CHECK
              </button>
            ) : (
              <button
                type="button"
                onClick={handleContinue}
                className={`w-full py-3.5 px-6 rounded-2xl text-white font-black text-sm uppercase tracking-wider transition-all transform active:translate-y-1 flex items-center justify-center gap-1.5 ${
                  status === 'correct'
                    ? 'bg-emerald-500 hover:bg-emerald-400 shadow-duo-green'
                    : 'bg-rose-500 hover:bg-rose-400 shadow-duo-red'
                }`}
              >
                <span>CONTINUE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>
      </footer>

    </div>
  );
};

