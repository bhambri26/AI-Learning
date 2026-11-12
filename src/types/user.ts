import { TrackId } from './curriculum';

export type League = 'Bronze' | 'Silver' | 'Gold' | 'Sapphire' | 'Ruby' | 'Diamond';

export interface DailyQuest {
  id: string;
  title: string;
  target: number;
  current: number;
  rewardGems: number;
  rewardXp: number;
  completed: boolean;
}

export interface UserBadge {
  id: string;
  title: string;
  icon: string;
  description: string;
  earnedAt: string;
  tier: string;
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  xp: number;
  hearts: number;
  maxHearts: number;
  lastHeartLossTimestamp: number | null;
  streak: number;
  gems: number;
  league: League;
  currentTrackId: TrackId;
  completedLessons: Record<string, boolean>; // lessonId -> true
  completedInquisitions: Record<string, { score: number; passedAt: string }>; // inquisitionId -> details
  earnedBadges: UserBadge[];
  dailyQuests: DailyQuest[];
  dailyGoalXp: number;
  todayXp: number;
  lastActiveDate: string;
  soundEnabled: boolean;
  hapticsEnabled: boolean;
  darkMode: boolean;
  streakFreezes: number;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  xp: number;
  isUser?: boolean;
  streak: number;
  badge?: string;
}

