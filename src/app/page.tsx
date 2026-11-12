'use client';

import React, { useState, useEffect } from 'react';
import { UserProfile } from '@/types/user';
import { TrackId, Lesson, Inquisition } from '@/types/curriculum';
import { StorageService, defaultUserProfile } from '@/lib/storage';
import { sound } from '@/lib/audio';
import { allTracks, getTrack } from '@/data/curriculum/master-plan';

import { Navbar } from '@/components/Navbar';
import { Sidebar, NavTab } from '@/components/Sidebar';
import { PathMap } from '@/components/PathMap';
import { ExerciseContainer } from '@/components/ExerciseContainer';
import { InquisitionView } from '@/components/InquisitionView';
import { InquisitionsHubView } from '@/components/InquisitionsHubView';
import { ProvenPlanView } from '@/components/ProvenPlanView';
import { CodeArenaView } from '@/components/CodeArenaView';
import { LeaderboardView } from '@/components/LeaderboardView';
import { ProfileView } from '@/components/ProfileView';
import { HeartModal } from '@/components/HeartModal';

export default function HomePage() {
  const [user, setUser] = useState<UserProfile>(defaultUserProfile);
  const [currentTrackId, setCurrentTrackId] = useState<TrackId>('python');
  const [currentTab, setCurrentTab] = useState<NavTab>('learn');
  const [mounted, setMounted] = useState(false);

  // Active overlays
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [activeInquisition, setActiveInquisition] = useState<Inquisition | null>(null);
  const [heartModalOpen, setHeartModalOpen] = useState(false);

  // Hydrate user profile on client
  useEffect(() => {
    const loaded = StorageService.getUserProfile();
    setUser(loaded);
    setCurrentTrackId(loaded.currentTrackId || 'python');
    sound.setEnabled(loaded.soundEnabled);
    if (loaded.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    setMounted(true);
  }, []);

  // Update track
  const handleSelectTrack = (trackId: TrackId) => {
    setCurrentTrackId(trackId);
    const updated = { ...user, currentTrackId: trackId };
    setUser(updated);
    StorageService.saveUserProfile(updated);
  };

  // Toggle sound
  const handleToggleSound = () => {
    const nextVal = !user.soundEnabled;
    sound.setEnabled(nextVal);
    const updated = { ...user, soundEnabled: nextVal };
    setUser(updated);
    StorageService.saveUserProfile(updated);
  };

  // Toggle dark mode
  const handleToggleDarkMode = () => {
    const nextVal = !user.darkMode;
    if (nextVal) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    const updated = { ...user, darkMode: nextVal };
    setUser(updated);
    StorageService.saveUserProfile(updated);
  };

  // Heart deduction
  const handleDeductHeart = () => {
    const updated = StorageService.deductHeart(user);
    setUser(updated);
  };

  // Refill hearts with gems
  const handleRefillWithGems = () => {
    if (user.gems >= 50) {
      const updated = {
        ...user,
        gems: user.gems - 50,
        hearts: user.maxHearts,
        lastHeartLossTimestamp: null
      };
      setUser(updated);
      StorageService.saveUserProfile(updated);
      setHeartModalOpen(false);
      sound.playInquisitionVictory();
    }
  };

  // Practice session refill (+1 Heart)
  const handlePracticeRefill = () => {
    const updated = {
      ...user,
      hearts: Math.min(user.maxHearts, user.hearts + 1)
    };
    setUser(updated);
    StorageService.saveUserProfile(updated);
    setHeartModalOpen(false);
    sound.playCorrect();
  };

  // Finish Lesson
  const handleFinishLesson = (earnedXp: number) => {
    if (!activeLesson) return;
    const updated = StorageService.completeLesson(user, activeLesson.id, earnedXp);
    setUser(updated);
    setActiveLesson(null);
  };

  // Finish Inquisition
  const handleFinishInquisition = (scorePercent: number, passed: boolean) => {
    if (!activeInquisition) return;
    if (passed) {
      const updated = StorageService.completeInquisition(
        user,
        activeInquisition.id,
        scorePercent,
        activeInquisition.xpReward,
        activeInquisition.gemReward,
        activeInquisition.badge
      );
      setUser(updated);
    }
    setActiveInquisition(null);
  };

  // Reset Progress
  const handleResetProgress = () => {
    setUser(defaultUserProfile);
    StorageService.saveUserProfile(defaultUserProfile);
  };

  const currentTrack = getTrack(currentTrackId);
  const currentUnit = currentTrack.units[0]; // Active unit

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-duo-dark-bg text-emerald-500 font-mono text-lg font-black animate-pulse">
        Initializing DataLingo AI...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white dark:bg-duo-dark-bg text-slate-800 dark:text-slate-100 transition-colors">
      
      {/* Sidebar (Desktop left / Mobile bottom) */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen pb-20 md:pb-6">
        
        {/* Top Navbar */}
        <Navbar
          user={user}
          currentTrackId={currentTrackId}
          onSelectTrack={handleSelectTrack}
          onOpenHeartModal={() => setHeartModalOpen(true)}
          onToggleSound={handleToggleSound}
          onToggleDarkMode={handleToggleDarkMode}
        />

        {/* Tab View Routing */}
        <main className="flex-1 overflow-x-hidden">
          {currentTab === 'learn' && (
            <PathMap
              unit={currentUnit}
              user={user}
              onStartLesson={lesson => {
                if (user.hearts <= 0) {
                  setHeartModalOpen(true);
                } else {
                  setActiveLesson(lesson);
                }
              }}
              onStartInquisition={inq => setActiveInquisition(inq)}
            />
          )}

          {currentTab === 'inquisitions' && (
            <InquisitionsHubView
              user={user}
              onStartInquisition={inq => setActiveInquisition(inq)}
            />
          )}

          {currentTab === 'master-plan' && (
            <ProvenPlanView
              user={user}
              onSelectTrack={tId => handleSelectTrack(tId)}
              onNavigateLearn={() => setCurrentTab('learn')}
            />
          )}

          {currentTab === 'arena' && <CodeArenaView />}

          {currentTab === 'leaderboard' && <LeaderboardView user={user} />}

          {currentTab === 'profile' && (
            <ProfileView
              user={user}
              onResetProgress={handleResetProgress}
            />
          )}
        </main>

      </div>

      {/* Active Lesson Modal */}
      {activeLesson && (
        <ExerciseContainer
          lesson={activeLesson}
          user={user}
          onClose={() => setActiveLesson(null)}
          onFinishLesson={handleFinishLesson}
          onDeductHeart={handleDeductHeart}
          onOpenHeartModal={() => setHeartModalOpen(true)}
        />
      )}

      {/* Active Inquisition Modal */}
      {activeInquisition && (
        <InquisitionView
          inquisition={activeInquisition}
          user={user}
          onClose={() => setActiveInquisition(null)}
          onFinishInquisition={handleFinishInquisition}
        />
      )}

      {/* Heart Refill Modal */}
      <HeartModal
        user={user}
        isOpen={heartModalOpen}
        onClose={() => setHeartModalOpen(false)}
        onRefillWithGems={handleRefillWithGems}
        onPracticeRefill={handlePracticeRefill}
      />

    </div>
  );
}

