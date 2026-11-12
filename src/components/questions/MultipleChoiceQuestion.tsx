'use client';

import React from 'react';
import { MultipleChoiceQuestion as MCQType } from '@/types/curriculum';
import { sound } from '@/lib/audio';

interface MCQProps {
  question: MCQType;
  selectedIndex: number | null;
  onSelect: (index: number) => void;
  disabled?: boolean;
}

export const MultipleChoiceQuestion: React.FC<MCQProps> = ({
  question,
  selectedIndex,
  onSelect,
  disabled = false
}) => {
  return (
    <div className="w-full space-y-4">
      {/* Question Prompt */}
      <h3 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 leading-snug">
        {question.prompt}
      </h3>

      {/* Optional Code Snippet */}
      {question.codeSnippet && (
        <div className="p-3.5 bg-slate-900 text-slate-100 rounded-2xl font-mono text-xs sm:text-sm overflow-x-auto border border-slate-700 shadow-inner">
          <pre>{question.codeSnippet}</pre>
        </div>
      )}

      {/* Options */}
      <div className="grid grid-cols-1 gap-2.5 pt-2">
        {question.options.map((option, idx) => {
          const isSelected = selectedIndex === idx;
          const letter = String.fromCharCode(65 + idx); // A, B, C, D

          return (
            <button
              key={idx}
              disabled={disabled}
              onClick={() => {
                sound.playClick();
                onSelect(idx);
              }}
              className={`w-full flex items-start gap-3.5 p-3.5 sm:p-4 rounded-2xl border-2 text-left font-bold transition-all transform active:translate-y-1 ${
                isSelected
                  ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 shadow-duo-blue'
                  : 'border-slate-200 dark:border-duo-dark-border bg-white dark:bg-duo-dark-card hover:border-slate-300 dark:hover:border-slate-600 text-slate-700 dark:text-slate-200 shadow-duo'
              }`}
            >
              <span
                className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs flex-shrink-0 border-2 ${
                  isSelected
                    ? 'border-sky-500 bg-sky-500 text-white'
                    : 'border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400'
                }`}
              >
                {letter}
              </span>
              <span className="text-sm sm:text-base leading-relaxed pt-0.5">{option}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

