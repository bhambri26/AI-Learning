'use client';

import React from 'react';
import { UserProfile, LeaderboardEntry } from '@/types/user';
import { Trophy, Flame, ChevronUp, ShieldCheck, Sparkles } from 'lucide-react';

interface LeaderboardProps {
  user: UserProfile;
}

export const LeaderboardView: React.FC<LeaderboardProps> = ({ user }) => {
  // Mock competitors in user's league
  const competitors: LeaderboardEntry[] = [
    { id: '1', name: 'Ada Lovelace', avatar: '👩‍💻', xp: 580, streak: 12, badge: 'Diamond' },
    { id: '2', name: 'Alan_Turing', avatar: '🤖', xp: 490, streak: 9, badge: 'Gold' },
    { id: '3', name: 'SparkMaster_99', avatar: '⚡', xp: 380, streak: 7, badge: 'Silver' },
    { id: 'user', name: `${user.name} (You)`, avatar: user.avatar, xp: user.xp, isUser: true, streak: user.streak, badge: user.league },
    { id: '4', name: 'DeltaLake_Dev', avatar: '🧱', xp: 110, streak: 4 },
    { id: '5', name: 'Snowflake_Whale', avatar: '❄️', xp: 85, streak: 2 },
    { id: '6', name: 'Ontology_Engineer', avatar: '🔮', xp: 60, streak: 1 },
    { id: '7', name: 'TensorCoder', avatar: '🧠', xp: 40, streak: 1 }
  ].sort((a, b) => b.xp - a.xp);

  return (
    <div className="max-w-xl mx-auto py-8 px-4 select-none animate-fadeIn space-y-6">
      
      {/* League Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-xl text-center relative overflow-hidden">
        <div className="text-xs font-black uppercase tracking-widest opacity-90 mb-1">
          Weekly Division
        </div>
        <h2 className="text-3xl font-black tracking-tight mb-1 flex items-center justify-center gap-2">
          <Trophy className="w-8 h-8 fill-yellow-200 text-yellow-200" />
          <span>{user.league} League</span>
        </h2>
        <p className="text-xs text-white/90">
          Top 3 advance to the next league! Resetting in 2 days, 14 hours.
        </p>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white dark:bg-duo-dark-card border-2 border-slate-200 dark:border-duo-dark-border rounded-3xl overflow-hidden shadow-sm">
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {competitors.map((entry, index) => {
            const rank = index + 1;
            const isTop3 = rank <= 3;
            const isPromotion = rank <= 3;

            return (
              <div
                key={entry.id}
                className={`flex items-center justify-between p-4 transition-colors ${
                  entry.isUser
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 font-black'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                {/* Rank & User Info */}
                <div className="flex items-center gap-3.5">
                  <span
                    className={`w-7 text-center font-black text-sm ${
                      rank === 1
                        ? 'text-yellow-500 text-base'
                        : rank === 2
                        ? 'text-slate-400 text-base'
                        : rank === 3
                        ? 'text-amber-600 text-base'
                        : 'text-slate-400'
                    }`}
                  >
                    {rank}
                  </span>

                  <span className="text-2xl p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                    {entry.avatar}
                  </span>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
                        {entry.name}
                      </span>
                      {entry.isUser && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full font-black bg-emerald-500 text-white">
                          YOU
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                        <Flame className="w-3 h-3 fill-amber-500" />
                        {entry.streak}d
                      </span>
                      {entry.badge && <span>• {entry.badge}</span>}
                    </div>
                  </div>
                </div>

                {/* Score XP */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-slate-700 dark:text-slate-200">
                    {entry.xp} XP
                  </span>
                  {isPromotion && (
                    <ChevronUp className="w-4 h-4 text-emerald-500" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

