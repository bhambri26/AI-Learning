'use client';

import React from 'react';
import { CodeOrderQuestion as CodeOrderType } from '@/types/curriculum';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { sound } from '@/lib/audio';

interface CodeOrderProps {
  question: CodeOrderType;
  currentOrder: number[]; // indices of shuffledLines
  onMoveLine: (fromIndex: number, toIndex: number) => void;
  disabled?: boolean;
}

export const CodeOrderQuestion: React.FC<CodeOrderProps> = ({
  question,
  currentOrder,
  onMoveLine,
  disabled = false
}) => {
  return (
    <div className="w-full space-y-4">
      <h3 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 leading-snug">
        {question.prompt}
      </h3>

      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
        Reorder lines into the correct execution sequence:
      </div>

      <div className="space-y-2">
        {currentOrder.map((lineIdx, position) => {
          const lineText = question.shuffledLines[lineIdx];
          return (
            <div
              key={`${lineIdx}-${position}`}
              className="flex items-center justify-between p-3 bg-slate-900 border border-slate-700 text-slate-100 rounded-xl font-mono text-xs sm:text-sm shadow-sm"
            >
              <div className="flex items-center gap-2 overflow-x-auto">
                <span className="text-slate-500 font-bold select-none text-xs">
                  {position + 1}.
                </span>
                <span className="whitespace-pre">{lineText}</span>
              </div>

              {!disabled && (
                <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                  <button
                    type="button"
                    disabled={position === 0}
                    onClick={() => {
                      sound.playClick();
                      onMoveLine(position, position - 1);
                    }}
                    className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:hover:bg-slate-800"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    disabled={position === currentOrder.length - 1}
                    onClick={() => {
                      sound.playClick();
                      onMoveLine(position, position + 1);
                    }}
                    className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:hover:bg-slate-800"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

