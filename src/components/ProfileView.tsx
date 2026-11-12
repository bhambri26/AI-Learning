'use client';

import React from 'react';
import { UserProfile } from '@/types/user';
import { sound } from '@/lib/audio';
import { 
  Trophy, 
  Flame, 
  Gem, 
  Heart, 
  Award, 
  CheckCircle2, 
  Sparkles,
  Download,
  RotateCcw
} from 'lucide-react';

interface ProfileViewProps {
  user: UserProfile;
  onResetProgress: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ user, onResetProgress }) => {
  const handleExport = () => {
    sound.playClick();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(user, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `datalingo_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 select-none animate-fadeIn space-y-6">
      
      {/* Profile Card */}
      <div className="bg-white dark:bg-duo-dark-card border-2 border-slate-200 dark:border-duo-dark-border rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row items-center gap-5">
        <div className="w-24 h-24 rounded-3xl bg-emerald-100 dark:bg-emerald-950/60 border-2 border-emerald-300 dark:border-emerald-700 flex items-center justify-center text-5xl shadow-sm">
          {user.avatar}
        </div>
        <div className="text-center sm:text-left space-y-1">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100">
              {user.name}
            </h2>
            <span className="text-xs px-2 py-0.5 rounded-full font-black bg-emerald-500 text-white">
              {user.league} Tier
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">
            Active since {user.lastActiveDate} • AI Systems Track
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-duo-dark-card border-2 border-slate-200 dark:border-duo-dark-border shadow-sm text-center">
          <Flame className="w-6 h-6 fill-amber-500 text-amber-500 mx-auto mb-1" />
          <div className="text-2xl font-black text-slate-800 dark:text-slate-100">{user.streak}</div>
          <div className="text-[11px] font-black uppercase text-slate-400">Day Streak</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-duo-dark-card border-2 border-slate-200 dark:border-duo-dark-border shadow-sm text-center">
          <Sparkles className="w-6 h-6 text-yellow-500 mx-auto mb-1" />
          <div className="text-2xl font-black text-slate-800 dark:text-slate-100">{user.xp}</div>
          <div className="text-[11px] font-black uppercase text-slate-400">Total XP</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-duo-dark-card border-2 border-slate-200 dark:border-duo-dark-border shadow-sm text-center">
          <Gem className="w-6 h-6 fill-sky-500 text-sky-500 mx-auto mb-1" />
          <div className="text-2xl font-black text-slate-800 dark:text-slate-100">{user.gems}</div>
          <div className="text-[11px] font-black uppercase text-slate-400">Gems</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-duo-dark-card border-2 border-slate-200 dark:border-duo-dark-border shadow-sm text-center">
          <Trophy className="w-6 h-6 fill-amber-400 text-amber-400 mx-auto mb-1" />
          <div className="text-2xl font-black text-slate-800 dark:text-slate-100">{user.earnedBadges.length}</div>
          <div className="text-[11px] font-black uppercase text-slate-400">Badges</div>
        </div>
      </div>

      {/* Daily Quests */}
      <div className="bg-white dark:bg-duo-dark-card border-2 border-slate-200 dark:border-duo-dark-border rounded-3xl p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-base text-slate-800 dark:text-slate-100">
            Daily Quests
          </h3>
          <span className="text-xs font-bold text-slate-400">Resets daily</span>
        </div>

        <div className="space-y-2.5">
          {user.dailyQuests.map(quest => {
            const pct = Math.min(100, Math.round((quest.current / quest.target) * 100));
            return (
              <div
                key={quest.id}
                className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700"
              >
                <div className="flex justify-between items-center mb-1.5 text-xs">
                  <span className="font-bold text-slate-800 dark:text-slate-200">{quest.title}</span>
                  <span className="font-black text-sky-500">+{quest.rewardGems} 💎</span>
                </div>
                <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Master Badges Showcase */}
      <div className="bg-white dark:bg-duo-dark-card border-2 border-slate-200 dark:border-duo-dark-border rounded-3xl p-5 shadow-sm space-y-3">
        <h3 className="font-black text-base text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" />
          <span>Inquisition Master Badges</span>
        </h3>

        {user.earnedBadges.length === 0 ? (
          <p className="text-xs text-slate-400">
            No inquisition badges unlocked yet. Complete an Inquisition Boss Battle to claim your first badge!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {user.earnedBadges.map(b => (
              <div
                key={b.id}
                className="p-3.5 rounded-2xl border-2 border-amber-300 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20 flex items-center gap-3"
              >
                <div className="text-3xl p-1 bg-white dark:bg-slate-800 rounded-xl shadow-xs">
                  {b.icon}
                </div>
                <div>
                  <div className="text-xs font-black uppercase text-amber-600 dark:text-amber-400">
                    {b.tier} Badge
                  </div>
                  <div className="text-sm font-black text-slate-800 dark:text-slate-100">
                    {b.title}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[180px]">
                    {b.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Account & Progress Actions */}
      <div className="flex gap-3">
        <button
          onClick={handleExport}
          className="flex-1 py-3 px-4 rounded-2xl border-2 border-slate-200 dark:border-duo-dark-border bg-white dark:bg-duo-dark-card hover:bg-slate-100 dark:hover:bg-slate-800 font-black text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center justify-center gap-2 shadow-duo transition-all transform active:translate-y-1"
        >
          <Download className="w-4 h-4" />
          <span>Export Backup</span>
        </button>

        <button
          onClick={() => {
            if (confirm('Are you sure you want to reset all progress?')) {
              sound.playClick();
              onResetProgress();
            }
          }}
          className="py-3 px-4 rounded-2xl border-2 border-rose-300 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-duo-red hover:bg-rose-100 transition-all transform active:translate-y-1"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset</span>
        </button>
      </div>

    </div>
  );
};

