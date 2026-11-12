'use client';

import React from 'react';
import { CodeFillQuestion as CodeFillType } from '@/types/curriculum';
import { sound } from '@/lib/audio';

interface CodeFillProps {
  question: CodeFillType;
  placedTokens: string[];
  onPlaceToken: (token: string) => void;
  onRemoveToken: (index: number) => void;
  disabled?: boolean;
}

export const CodeFillQuestion: React.FC<CodeFillProps> = ({
  question,
  placedTokens,
  onPlaceToken,
  onRemoveToken,
  disabled = false
}) => {
  // Split template by blanks "___"
  const templateParts = question.codeTemplate.split('___');

  // Compute available tokens in bank (tokens not yet placed)
  const remainingTokens = [...question.wordBank];
  placedTokens.forEach(p => {
    const idx = remainingTokens.indexOf(p);
    if (idx !== -1) {
      remainingTokens.splice(idx, 1);
    }
  });

  return (
    <div className="w-full space-y-5">
      <h3 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 leading-snug">
        {question.prompt}
      </h3>

      {/* Code Display with Dynamic Blanks */}
      <div className="p-4 bg-slate-900 text-slate-100 rounded-2xl font-mono text-xs sm:text-sm border border-slate-700 shadow-inner overflow-x-auto leading-loose">
        <pre className="whitespace-pre-wrap flex flex-wrap items-center">
          {templateParts.map((part, i) => (
            <React.Fragment key={i}>
              <span className="text-slate-200">{part}</span>
              {i < templateParts.length - 1 && (
                <span className="inline-block mx-1 my-0.5">
                  {placedTokens[i] ? (
                    <button
                      type="button"
                      disabled={disabled}
                      onClick={() => {
                        sound.playPop();
                        onRemoveToken(i);
                      }}
                      className="px-2.5 py-1 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-lg shadow-sm border border-sky-400 cursor-pointer animate-pop"
                    >
                      {placedTokens[i]}
                    </button>
                  ) : (
                    <span className="inline-block w-20 h-7 border-2 border-dashed border-sky-400/60 rounded-lg bg-sky-950/30 align-middle" />
                  )}
                </span>
              )}
            </React.Fragment>
          ))}
        </pre>
      </div>

      {/* Word Bank */}
      <div className="pt-2">
        <div className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
          Token Bank (Tap to insert)
        </div>
        <div className="flex flex-wrap gap-2">
          {question.wordBank.map((token, idx) => {
            const isUsed = !remainingTokens.includes(token);
            return (
              <button
                key={`${token}-${idx}`}
                type="button"
                disabled={disabled || isUsed || placedTokens.length >= question.correctTokens.length}
                onClick={() => {
                  sound.playPop();
                  onPlaceToken(token);
                }}
                className={`px-3.5 py-2 rounded-xl font-mono text-sm font-bold border-2 transition-all transform active:translate-y-1 ${
                  isUsed
                    ? 'opacity-20 border-slate-300 bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-default'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-duo-dark-card text-slate-800 dark:text-slate-100 shadow-duo hover:border-sky-400'
                }`}
              >
                {token}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

