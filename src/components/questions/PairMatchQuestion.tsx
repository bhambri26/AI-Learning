'use client';

import React, { useState } from 'react';
import { PairMatchQuestion as PairMatchType } from '@/types/curriculum';
import { sound } from '@/lib/audio';
import { Check } from 'lucide-react';

interface PairMatchProps {
  question: PairMatchType;
  matchedPairs: Record<string, boolean>; // pairId -> true
  onPairMatched: (pairId: string) => void;
  disabled?: boolean;
}

export const PairMatchQuestion: React.FC<PairMatchProps> = ({
  question,
  matchedPairs,
  onPairMatched,
  disabled = false
}) => {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [mismatchError, setMismatchError] = useState(false);

  // Shuffled rights
  const [shuffledRights] = useState(() => {
    return [...question.pairs].sort(() => Math.random() - 0.5);
  });

  const handleSelectLeft = (id: string) => {
    if (disabled || matchedPairs[id]) return;
    sound.playClick();
    setSelectedLeft(id);
    if (selectedRight) {
      checkMatch(id, selectedRight);
    }
  };

  const handleSelectRight = (id: string) => {
    if (disabled || matchedPairs[id]) return;
    sound.playClick();
    setSelectedRight(id);
    if (selectedLeft) {
      checkMatch(selectedLeft, id);
    }
  };

  const checkMatch = (leftId: string, rightId: string) => {
    if (leftId === rightId) {
      sound.playCorrect();
      onPairMatched(leftId);
      setSelectedLeft(null);
      setSelectedRight(null);
    } else {
      sound.playWrong();
      setMismatchError(true);
      setTimeout(() => {
        setSelectedLeft(null);
        setSelectedRight(null);
        setMismatchError(false);
      }, 600);
    }
  };

  return (
    <div className="w-full space-y-4">
      <h3 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 leading-snug">
        {question.prompt}
      </h3>
      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
        Tap a term on the left, then its definition on the right:
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        
        {/* Left Column (Terms) */}
        <div className="space-y-2.5">
          {question.pairs.map(p => {
            const isMatched = !!matchedPairs[p.id];
            const isSelected = selectedLeft === p.id;

            return (
              <button
                key={`left-${p.id}`}
                type="button"
                disabled={disabled || isMatched}
                onClick={() => handleSelectLeft(p.id)}
                className={`w-full text-left p-3.5 rounded-2xl border-2 font-black text-sm transition-all transform active:translate-y-1 flex items-center justify-between ${
                  isMatched
                    ? 'opacity-40 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 cursor-default'
                    : isSelected
                    ? mismatchError
                      ? 'border-rose-500 bg-rose-50 text-rose-700 shadow-duo-red'
                      : 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 shadow-duo-blue'
                    : 'border-slate-200 dark:border-duo-dark-border bg-white dark:bg-duo-dark-card text-slate-700 dark:text-slate-200 shadow-duo hover:border-slate-300'
                }`}
              >
                <span>{p.left}</span>
                {isMatched && <Check className="w-4 h-4 text-emerald-500" />}
              </button>
            );
          })}
        </div>

        {/* Right Column (Definitions) */}
        <div className="space-y-2.5">
          {shuffledRights.map(p => {
            const isMatched = !!matchedPairs[p.id];
            const isSelected = selectedRight === p.id;

            return (
              <button
                key={`right-${p.id}`}
                type="button"
                disabled={disabled || isMatched}
                onClick={() => handleSelectRight(p.id)}
                className={`w-full text-left p-3.5 rounded-2xl border-2 font-bold text-xs leading-relaxed transition-all transform active:translate-y-1 flex items-center justify-between ${
                  isMatched
                    ? 'opacity-40 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 cursor-default'
                    : isSelected
                    ? mismatchError
                      ? 'border-rose-500 bg-rose-50 text-rose-700 shadow-duo-red'
                      : 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 shadow-duo-blue'
                    : 'border-slate-200 dark:border-duo-dark-border bg-white dark:bg-duo-dark-card text-slate-700 dark:text-slate-200 shadow-duo hover:border-slate-300'
                }`}
              >
                <span>{p.right}</span>
                {isMatched && <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 ml-2" />}
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};

