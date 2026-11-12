'use client';

import React from 'react';
import { UserProfile } from '@/types/user';
import { sound } from '@/lib/audio';
import { Heart, Gem, X, Zap } from 'lucide-react';

interface HeartModalProps {
  user: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onRefillWithGems: () => void;
  onPracticeRefill: () => void;
}

export const HeartModal: React.FC<HeartModalProps> = ({
  user,
  isOpen,
  onClose,
  onRefillWithGems,
  onPracticeRefill
}) => {
  if (!isOpen) return null;

  const canAffordGems = user.gems >= 50;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 select-none animate-fadeIn">
      <div className="bg-white dark:bg-duo-dark-card border-2 border-slate-200 dark:border-duo-dark-border rounded-3xl p-6 max-w-sm w-full shadow-2xl relative text-center">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Big Heart Icon with Pulse */}
        <div className="w-20 h-20 mx-auto mb-3 flex items-center justify-center">
          <Heart className="w-16 h-16 fill-rose-500 text-rose-500 animate-pulse drop-shadow-md" />
        </div>

        <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-1">
          {user.hearts === 0 ? 'Out of Hearts!' : `${user.hearts} / ${user.maxHearts} Hearts`}
        </h3>

        <p className="text-xs text-slate-500 dark:text-slate-400 mb-5 leading-relaxed">
          Hearts allow you to learn and make mistakes. Hearts automatically regenerate 1 every 20 minutes, or you can refill instantly!
        </p>

        {/* Options */}
        <div className="space-y-3">
          
          {/* Refill with Gems */}
          <button
            disabled={!canAffordGems || user.hearts === user.maxHearts}
            onClick={() => {
              sound.playClick();
              onRefillWithGems();
            }}
            className={`w-full p-3.5 rounded-2xl border-2 flex items-center justify-between font-black text-sm transition-all transform active:translate-y-1 ${
              canAffordGems && user.hearts < user.maxHearts
                ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-300 shadow-duo-blue hover:bg-sky-100'
                : 'opacity-40 border-slate-300 bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
            }`}
          >
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 fill-sky-500 text-sky-500" />
              <span>Full Refill (5 Hearts)</span>
            </div>
            <div className="flex items-center gap-1 text-sky-500">
              <Gem className="w-4 h-4 fill-sky-500" />
              <span>50</span>
            </div>
          </button>

          {/* Free Practice to earn a heart */}
          <button
            onClick={() => {
              sound.playClick();
              onPracticeRefill();
            }}
            className="w-full p-3.5 rounded-2xl border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 shadow-duo-green hover:bg-emerald-100 font-black text-sm flex items-center justify-center gap-2 transition-all transform active:translate-y-1"
          >
            <Heart className="w-4 h-4 fill-emerald-500 text-emerald-500" />
            <span>Practice Session (+1 Heart)</span>
          </button>

        </div>

      </div>
    </div>
  );
};

