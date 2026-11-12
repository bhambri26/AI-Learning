'use client';

import React, { useState } from 'react';
import { UserProfile } from '@/types/user';
import { TrackId, TrackMeta } from '@/types/curriculum';
import { getAllTracksList } from '@/data/curriculum/master-plan';
import { sound } from '@/lib/audio';
import { 
  Flame, 
  Heart, 
  Gem, 
  Volume2, 
  VolumeX, 
  Moon, 
  Sun, 
  ChevronDown, 
  Check, 
  PlusCircle,
  HelpCircle
} from 'lucide-react';

interface NavbarProps {
  user: UserProfile;
  currentTrackId: TrackId;
  onSelectTrack: (trackId: TrackId) => void;
  onOpenHeartModal: () => void;
  onToggleSound: () => void;
  onToggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  currentTrackId,
  onSelectTrack,
  onOpenHeartModal,
  onToggleSound,
  onToggleDarkMode
}) => {
  const [trackMenuOpen, setTrackMenuOpen] = useState(false);
  const tracks = getAllTracksList();
  const currentTrack = tracks.find(t => t.meta.id === currentTrackId) || tracks[0];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-duo-dark-bg/95 backdrop-blur border-b-2 border-slate-200 dark:border-duo-dark-border px-4 py-2.5 transition-colors">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Track Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              sound.playClick();
              setTrackMenuOpen(!trackMenuOpen);
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-slate-50 dark:bg-duo-dark-card transition-all font-bold text-sm text-slate-800 dark:text-slate-100 shadow-sm"
          >
            <span className="text-xl">{currentTrack.meta.icon}</span>
            <span className="hidden sm:inline font-black tracking-wide">{currentTrack.meta.title}</span>
            <span className="sm:hidden font-black">{currentTrack.meta.shortTitle}</span>
            <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${trackMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {trackMenuOpen && (
            <>
              <div 
                className="fixed inset-0 z-20"
                onClick={() => setTrackMenuOpen(false)}
              />
              <div className="absolute left-0 mt-2 w-72 sm:w-80 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-30 p-2 max-h-96 overflow-y-auto">
                <div className="text-xs font-black uppercase text-slate-400 px-3 py-1">
                  Choose Learning Track
                </div>
                {tracks.map(t => {
                  const isSelected = t.meta.id === currentTrackId;
                  return (
                    <button
                      key={t.meta.id}
                      onClick={() => {
                        sound.playClick();
                        onSelectTrack(t.meta.id);
                        setTrackMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-colors text-left my-1 ${
                        isSelected 
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700' 
                          : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">{t.meta.icon}</span>
                        <div>
                          <div className="font-bold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
                            {t.meta.title}
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                              {t.meta.level}
                            </span>
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[190px]">
                            {t.meta.tagline}
                          </div>
                        </div>
                      </div>
                      {isSelected && <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Gamification Stats: Streak, Gems, Hearts */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Streak Flame */}
          <div 
            title={`Daily Streak: ${user.streak} Days`}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl font-black text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-colors cursor-pointer"
            onClick={() => sound.playStreak()}
          >
            <Flame className="w-5 h-5 fill-amber-500 text-amber-500 animate-pulse" />
            <span className="text-sm font-extrabold">{user.streak}</span>
          </div>

          {/* Gems / Lingots */}
          <div 
            title={`Gems: ${user.gems}`}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl font-black text-sky-500 hover:bg-sky-50 dark:hover:bg-sky-950/30 transition-colors"
          >
            <Gem className="w-5 h-5 fill-sky-500 text-sky-500" />
            <span className="text-sm font-extrabold">{user.gems}</span>
          </div>

          {/* Hearts / Health */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenHeartModal();
            }}
            title="Hearts / Energy. Click to refill!"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl font-black text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all border border-transparent hover:border-rose-200 dark:hover:border-rose-800"
          >
            <Heart className={`w-5 h-5 ${user.hearts > 0 ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
            <span className="text-sm font-extrabold">{user.hearts}</span>
            {user.hearts < user.maxHearts && (
              <PlusCircle className="w-3.5 h-3.5 text-rose-400 ml-0.5" />
            )}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              sound.playClick();
              onToggleSound();
            }}
            title={user.soundEnabled ? 'Mute audio' : 'Enable audio'}
            className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {user.soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={() => {
              sound.playClick();
              onToggleDarkMode();
            }}
            title={user.darkMode ? 'Switch to Light' : 'Switch to Dark'}
            className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {user.darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
          </button>

        </div>

      </div>
    </header>
  );
};

