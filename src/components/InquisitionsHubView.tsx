'use client';

import React from 'react';
import { Inquisition } from '@/types/curriculum';
import { UserProfile } from '@/types/user';
import { getAllTracksList } from '@/data/curriculum/master-plan';
import { sound } from '@/lib/audio';
import { 
  Swords, 
  Clock, 
  Award, 
  CheckCircle, 
  Lock, 
  Play, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

interface InquisitionsHubProps {
  user: UserProfile;
  onStartInquisition: (inquisition: Inquisition) => void;
}

export const InquisitionsHubView: React.FC<InquisitionsHubProps> = ({
  user,
  onStartInquisition
}) => {
  const tracks = getAllTracksList();
  const allInquisitions = tracks.map(t => ({
    track: t.meta,
    inquisition: t.units[0]?.inquisition
  })).filter(item => !!item.inquisition);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 select-none animate-fadeIn space-y-6">
      
      {/* Header */}
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 text-rose-600 dark:text-rose-400 font-black text-xs uppercase tracking-widest">
          <Swords className="w-4 h-4" />
          <span>Boss Battles Arena</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
          Enterprise Inquisitions
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Timed, high-stakes scenarios testing real-world architectural mastery. Score &gt;80% to conquer the inquisitions and earn Master Badges!
        </p>
      </div>

      {/* Grid of Inquisitions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {allInquisitions.map(({ track, inquisition }) => {
          const isPassed = !!user.completedInquisitions[inquisition.id];
          const score = user.completedInquisitions[inquisition.id]?.score;

          return (
            <div
              key={inquisition.id}
              className={`p-5 rounded-3xl border-2 flex flex-col justify-between transition-all ${
                isPassed
                  ? 'bg-gradient-to-br from-purple-50 to-white dark:from-purple-950/20 dark:to-duo-dark-card border-purple-400 dark:border-purple-800 shadow-md'
                  : 'bg-white dark:bg-duo-dark-card border-slate-200 dark:border-duo-dark-border shadow-sm hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">{track.icon}</span>
                    <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                      {track.shortTitle} Inquisition
                    </span>
                  </div>

                  {isPassed ? (
                    <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-black bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-300 border border-purple-300">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Mastered ({score}%)
                    </span>
                  ) : (
                    <span className="text-xs px-2.5 py-1 rounded-full font-black bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400">
                      Ready to Battle
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 mb-1 leading-snug">
                  {inquisition.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">
                  {inquisition.enterpriseScenario}
                </p>

                {/* Badge & Rewards Preview */}
                <div className="flex items-center gap-2 mb-4 text-xs">
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-950/40 text-amber-600 font-bold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{inquisition.timeLimitSeconds}s</span>
                  </div>
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 font-bold">
                    <span>+{inquisition.xpReward} XP</span>
                  </div>
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-sky-100 dark:bg-sky-950/40 text-sky-600 font-bold">
                    <span>+{inquisition.gemReward} 💎</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => {
                  sound.playClick();
                  onStartInquisition(inquisition);
                }}
                className={`w-full py-3 rounded-2xl font-black text-xs uppercase tracking-wider text-white transition-all transform active:translate-y-1 flex items-center justify-center gap-2 ${
                  isPassed
                    ? 'bg-purple-600 hover:bg-purple-500 shadow-duo-purple'
                    : 'bg-rose-600 hover:bg-rose-500 shadow-duo-red'
                }`}
              >
                <Swords className="w-4 h-4" />
                <span>{isPassed ? 'RE-ATTEMPT BOSS' : 'CHALLENGE INQUISITION'}</span>
              </button>
            </div>
          );
        })}
      </div>

    </div>
  );
};

