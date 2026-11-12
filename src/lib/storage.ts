import { UserProfile, DailyQuest } from '@/types/user';
import { TrackId } from '@/types/curriculum';

const STORAGE_KEY = 'datalingo_user_profile_v1';
const HEART_REFILL_INTERVAL_MS = 20 * 60 * 1000; // 20 minutes per heart

export const initialQuests: DailyQuest[] = [
  {
    id: 'q1',
    title: 'Earn 30 XP in any track',
    target: 30,
    current: 0,
    rewardGems: 10,
    rewardXp: 15,
    completed: false
  },
  {
    id: 'q2',
    title: 'Complete 2 Lessons with >80% accuracy',
    target: 2,
    current: 0,
    rewardGems: 15,
    rewardXp: 20,
    completed: false
  },
  {
    id: 'q3',
    title: 'Attempt an Inquisition Boss Battle',
    target: 1,
    current: 0,
    rewardGems: 25,
    rewardXp: 50,
    completed: false
  }
];

export const defaultUserProfile: UserProfile = {
  id: 'user_default',
  name: 'AI Apprentice',
  avatar: '🤖',
  xp: 120,
  hearts: 5,
  maxHearts: 5,
  lastHeartLossTimestamp: null,
  streak: 3,
  gems: 150,
  league: 'Gold',
  currentTrackId: 'python',
  completedLessons: {
    'py-1-1': true
  },
  completedInquisitions: {},
  earnedBadges: [
    {
      id: 'badge-first-code',
      title: 'Hello AI World',
      icon: '⚡',
      description: 'Wrote first runnable Python code block',
      earnedAt: new Date().toISOString(),
      tier: 'Bronze'
    }
  ],
  dailyQuests: initialQuests,
  dailyGoalXp: 30,
  todayXp: 15,
  lastActiveDate: new Date().toISOString().split('T')[0],
  soundEnabled: true,
  hapticsEnabled: true,
  darkMode: false,
  streakFreezes: 1
};

export class StorageService {
  public static getUserProfile(): UserProfile {
    if (typeof window === 'undefined') return defaultUserProfile;

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        this.saveUserProfile(defaultUserProfile);
        return defaultUserProfile;
      }
      const parsed: UserProfile = JSON.parse(raw);
      return this.checkHeartRefillAndStreak(parsed);
    } catch {
      return defaultUserProfile;
    }
  }

  public static saveUserProfile(profile: UserProfile): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // storage quota exceeded or disabled
    }
  }

  public static checkHeartRefillAndStreak(profile: UserProfile): UserProfile {
    let updated = { ...profile };
    const now = Date.now();
    const today = new Date().toISOString().split('T')[0];

    // Check Hearts Regeneration
    if (updated.hearts < updated.maxHearts && updated.lastHeartLossTimestamp) {
      const elapsed = now - updated.lastHeartLossTimestamp;
      const heartsToRegen = Math.floor(elapsed / HEART_REFILL_INTERVAL_MS);
      if (heartsToRegen > 0) {
        updated.hearts = Math.min(updated.maxHearts, updated.hearts + heartsToRegen);
        if (updated.hearts === updated.maxHearts) {
          updated.lastHeartLossTimestamp = null;
        } else {
          updated.lastHeartLossTimestamp = now - (elapsed % HEART_REFILL_INTERVAL_MS);
        }
      }
    }

    // Check Streak
    if (updated.lastActiveDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (updated.lastActiveDate === yesterday) {
        // active yesterday, ready for today
      } else {
        // missed yesterday!
        if (updated.streakFreezes > 0) {
          updated.streakFreezes -= 1;
        } else {
          updated.streak = 0;
        }
      }
      updated.todayXp = 0;
      // Reset daily quests
      updated.dailyQuests = initialQuests.map(q => ({ ...q, current: 0, completed: false }));
      updated.lastActiveDate = today;
    }

    this.saveUserProfile(updated);
    return updated;
  }

  public static deductHeart(profile: UserProfile): UserProfile {
    const updated = { ...profile };
    if (updated.hearts > 0) {
      updated.hearts -= 1;
      if (!updated.lastHeartLossTimestamp) {
        updated.lastHeartLossTimestamp = Date.now();
      }
    }
    this.saveUserProfile(updated);
    return updated;
  }

  public static refillHearts(profile: UserProfile): UserProfile {
    const updated = {
      ...profile,
      hearts: profile.maxHearts,
      lastHeartLossTimestamp: null
    };
    this.saveUserProfile(updated);
    return updated;
  }

  public static addXp(profile: UserProfile, amount: number): UserProfile {
    const updated = {
      ...profile,
      xp: profile.xp + amount,
      todayXp: profile.todayXp + amount
    };
    // Update daily quests
    updated.dailyQuests = updated.dailyQuests.map(q => {
      if (q.id === 'q1') {
        const nextVal = Math.min(q.target, q.current + amount);
        return { ...q, current: nextVal, completed: nextVal >= q.target };
      }
      return q;
    });
    this.saveUserProfile(updated);
    return updated;
  }

  public static completeLesson(profile: UserProfile, lessonId: string, xpReward: number): UserProfile {
    const isFirstTime = !profile.completedLessons[lessonId];
    const updated = {
      ...profile,
      xp: profile.xp + xpReward,
      todayXp: profile.todayXp + xpReward,
      completedLessons: {
        ...profile.completedLessons,
        [lessonId]: true
      }
    };

    if (isFirstTime) {
      updated.gems += 5;
    }

    // Update quest 2
    updated.dailyQuests = updated.dailyQuests.map(q => {
      if (q.id === 'q2') {
        const nextVal = Math.min(q.target, q.current + 1);
        return { ...q, current: nextVal, completed: nextVal >= q.target };
      }
      return q;
    });

    this.saveUserProfile(updated);
    return updated;
  }

  public static completeInquisition(
    profile: UserProfile,
    inquisitionId: string,
    score: number,
    xpReward: number,
    gemReward: number,
    badge: { id: string; title: string; icon: string; description: string; tier: string }
  ): UserProfile {
    const hasBadge = profile.earnedBadges.some(b => b.id === badge.id);
    const earnedBadges = hasBadge
      ? profile.earnedBadges
      : [
          ...profile.earnedBadges,
          {
            ...badge,
            earnedAt: new Date().toISOString()
          }
        ];

    const updated: UserProfile = {
      ...profile,
      xp: profile.xp + xpReward,
      todayXp: profile.todayXp + xpReward,
      gems: profile.gems + gemReward,
      completedInquisitions: {
        ...profile.completedInquisitions,
        [inquisitionId]: { score, passedAt: new Date().toISOString() }
      },
      earnedBadges
    };

    // Update quest 3
    updated.dailyQuests = updated.dailyQuests.map(q => {
      if (q.id === 'q3') {
        return { ...q, current: 1, completed: true };
      }
      return q;
    });

    this.saveUserProfile(updated);
    return updated;
  }
}

