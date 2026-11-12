'use client';

import React from 'react';
import { BugHuntQuestion as BugHuntType } from '@/types/curriculum';
import { sound } from '@/lib/audio';
import { Bug } from 'lucide-react';

interface BugHuntProps {
  question: BugHuntType;
  selectedOptionIndex: number | null;
  onSelectOption: (idx: number) => void;
  disabled?: boolean;
}

export const BugHuntQuestion: React.FC<BugHuntProps> = ({
  question,
  selectedOptionIndex,
  onSelectOption,
  disabled = false
}) => {
  const codeLines = question.code.split('\n');

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-2 text-rose-500 font-black text-xs uppercase tracking-wider">
        <Bug className="w-4 h-4" />
        <span>Spot the Defect</span>
      </div>

      <h3 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 leading-snug">
        {question.prompt}
      </h3>

      {/* Code Viewer with Highlighted Lines */}
      <div className="p-4 bg-slate-950 text-slate-100 rounded-2xl font-mono text-xs sm:text-sm border border-slate-800 shadow-inner overflow-x-auto">
        <div className="space-y-1">
          {codeLines.map((line, idx) => {
            const isBuggyLine = idx === question.buggyLineIndex;
            return (
              <div
                key={idx}
                className={`flex items-start gap-3 px-2 py-0.5 rounded ${
                  isBuggyLine ? 'bg-rose-950/40 text-rose-200 border-l-2 border-rose-500' : ''
                }`}
              >
                <span className="text-slate-600 select-none text-xs w-5 text-right">{idx + 1}</span>
                <span className="whitespace-pre">{line}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Options for What the Bug is */}
      <div className="space-y-2 pt-2">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Select the correct explanation & fix:
        </div>
        {question.options.map((option, idx) => {
          const isSelected = selectedOptionIndex === idx;
          return (
            <button
              key={idx}
              disabled={disabled}
              onClick={() => {
                sound.playClick();
                onSelectOption(idx);
              }}
              className={`w-full text-left p-3.5 rounded-2xl border-2 font-bold text-sm transition-all transform active:translate-y-1 ${
                isSelected
                  ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/30 text-rose-800 dark:text-rose-200 shadow-duo-red'
                  : 'border-slate-200 dark:border-duo-dark-border bg-white dark:bg-duo-dark-card hover:border-slate-300 text-slate-700 dark:text-slate-200 shadow-duo'
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};

