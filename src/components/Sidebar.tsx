'use client';

import React from 'react';
import { 
  GraduationCap, 
  Swords, 
  Map, 
  Terminal, 
  Trophy, 
  User, 
  Sparkles,
  Zap
} from 'lucide-react';
import { sound } from '@/lib/audio';

export type NavTab = 'learn' | 'inquisitions' | 'master-plan' | 'arena' | 'leaderboard' | 'profile';

interface SidebarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, onSelectTab }) => {
  const navItems: Array<{ id: NavTab; label: string; icon: React.ReactNode; badge?: string; color: string }> = [
    {
      id: 'learn',
      label: 'LEARN',
      icon: <GraduationCap className="w-6 h-6" />,
      color: 'text-emerald-500'
    },
    {
      id: 'inquisitions',
      label: 'INQUISITIONS',
      icon: <Swords className="w-6 h-6" />,
      badge: 'BOSS',
      color: 'text-rose-500'
    },
    {
      id: 'master-plan',
      label: 'AI MASTER PLAN',
      icon: <Map className="w-6 h-6" />,
      badge: 'PROVEN',
      color: 'text-amber-500'
    },
    {
      id: 'arena',
      label: 'CODE ARENA',
      icon: <Terminal className="w-6 h-6" />,
      color: 'text-sky-500'
    },
    {
      id: 'leaderboard',
      label: 'LEADERBOARDS',
      icon: <Trophy className="w-6 h-6" />,
      color: 'text-yellow-500'
    },
    {
      id: 'profile',
      label: 'PROFILE & BADGES',
      icon: <User className="w-6 h-6" />,
      color: 'text-purple-500'
    }
  ];

  return (
    <>
      {/* Desktop Left Sidebar */}
      <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 bg-white dark:bg-duo-dark-bg border-r-2 border-slate-200 dark:border-duo-dark-border px-4 py-6 justify-between select-none transition-colors">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 px-3 mb-8 cursor-pointer" onClick={() => onSelectTab('learn')}>
            <div className="w-10 h-10 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-duo-green">
              <Zap className="w-6 h-6 fill-white" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-emerald-500 font-mono">DataLingo</span>
              <div className="text-[10px] font-black tracking-wider text-slate-400 uppercase -mt-1">
                AI & Big Data Mastery
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map(item => {
              const active = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    sound.playClick();
                    onSelectTab(item.id);
                  }}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl font-black text-sm tracking-wider uppercase transition-all ${
                    active
                      ? 'bg-sky-50 dark:bg-sky-950/40 text-sky-500 border-2 border-sky-300 dark:border-sky-800 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 border-2 border-transparent'
                  }`}
                >
                  <span className={active ? 'text-sky-500' : 'text-slate-400'}>{item.icon}</span>
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto text-[9px] px-1.5 py-0.5 rounded-full font-black tracking-widest bg-rose-500 text-white shadow-sm">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Mascot Tip Card */}
        <div className="p-3.5 bg-slate-50 dark:bg-duo-dark-card border-2 border-slate-200 dark:border-duo-dark-border rounded-2xl">
          <div className="flex items-center gap-2 mb-1.5">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span className="text-xs font-black uppercase text-emerald-500 tracking-wider">Daily Pro-Tip</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug">
            Pass the unit <strong>Inquisition</strong> with &gt;80% accuracy to unlock the Master Gold Badge!
          </p>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-duo-dark-bg/95 backdrop-blur border-t-2 border-slate-200 dark:border-duo-dark-border px-2 py-1.5 flex justify-around items-center select-none">
        {navItems.map(item => {
          const active = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                sound.playClick();
                onSelectTab(item.id);
              }}
              className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition-all ${
                active ? 'text-sky-500 scale-105 font-black' : 'text-slate-400'
              }`}
            >
              <div className="relative">
                {item.icon}
                {item.badge && (
                  <span className="absolute -top-1 -right-2 w-2 h-2 rounded-full bg-rose-500" />
                )}
              </div>
              <span className="text-[10px] mt-0.5 font-bold tracking-tight">{item.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};

