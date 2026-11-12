'use client';

import React, { useState } from 'react';
import { Unit, Lesson, Inquisition } from '@/types/curriculum';
import { UserProfile } from '@/types/user';
import { sound } from '@/lib/audio';
import { 
  Check, 
  Lock, 
  Star, 
  Swords, 
  Trophy, 
  Play, 
  Sparkles,
  Award
} from 'lucide-react';

interface PathMapProps {
  unit: Unit;
  user: UserProfile;
  onStartLesson: (lesson: Lesson) => void;
  onStartInquisition: (inquisition: Inquisition) => void;
}

export const PathMap: React.FC<PathMapProps> = ({
  unit,
  user,
  onStartLesson,
  onStartInquisition
}) => {
  const [selectedNode, setSelectedNode] = useState<{
    type: 'lesson' | 'inquisition';
    item: Lesson | Inquisition;
    isCompleted: boolean;
    isLocked: boolean;
  } | null>(null);

  // Winding offset pattern: center, slight-left, slight-right, center, slight-left...
  const xOffsets = [0, -45, 45, -30, 30, 0];

  return (
    <div className="w-full max-w-xl mx-auto py-6 px-4 flex flex-col items-center">
      
      {/* Unit Header Banner */}
      <div className={`w-full p-5 rounded-3xl ${unit.color} text-white shadow-lg mb-10 text-center relative overflow-hidden`}>
        <div className="absolute top-2 right-3 opacity-20 text-6xl">
          <Sparkles />
        </div>
        <div className="text-xs font-black uppercase tracking-widest opacity-90 mb-1">
          Unit {unit.unitNumber}
        </div>
        <h2 className="text-2xl font-black tracking-tight mb-1.5">{unit.title}</h2>
        <p className="text-sm text-white/90 max-w-md mx-auto">{unit.description}</p>
      </div>

      {/* Path Nodes List */}
      <div className="flex flex-col items-center space-y-7 relative w-full">
        {unit.lessons.map((lesson, index) => {
          const isCompleted = !!user.completedLessons[lesson.id];
          // A lesson is unlocked if previous lesson is completed or if it is the very first lesson of the unit
          const isUnlocked = index === 0 || !!user.completedLessons[unit.lessons[index - 1].id];
          const isCurrent = isUnlocked && !isCompleted;
          const xOffset = xOffsets[index % xOffsets.length];

          return (
            <div
              key={lesson.id}
              className="relative transition-transform duration-300"
              style={{ transform: `translateX(${xOffset}px)` }}
            >
              {/* Start floating indicator banner for active lesson */}
              {isCurrent && (
                <div className="absolute -top-11 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
                  <div className="bg-emerald-500 text-white text-xs font-black uppercase tracking-wider py-1.5 px-3 rounded-xl shadow-md flex items-center gap-1 border-2 border-white">
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>START</span>
                  </div>
                  <div className="w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-emerald-500 mx-auto" />
                </div>
              )}

              {/* Node Button */}
              <button
                onClick={() => {
                  sound.playClick();
                  setSelectedNode({
                    type: 'lesson',
                    item: lesson,
                    isCompleted,
                    isLocked: !isUnlocked
                  });
                }}
                disabled={!isUnlocked}
                className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all transform active:translate-y-1 ${
                  isCompleted
                    ? 'bg-amber-400 border-b-4 border-amber-600 shadow-duo-yellow text-amber-950'
                    : isCurrent
                    ? 'bg-emerald-500 border-b-4 border-emerald-700 shadow-duo-green text-white ring-4 ring-emerald-200 dark:ring-emerald-800'
                    : 'bg-slate-200 dark:bg-slate-700 border-b-4 border-slate-300 dark:border-slate-800 text-slate-400 cursor-not-allowed'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-9 h-9 stroke-[3]" />
                ) : isUnlocked ? (
                  <Star className="w-9 h-9 fill-white" />
                ) : (
                  <Lock className="w-8 h-8 text-slate-400" />
                )}

                {/* Golden Master Ring if completed */}
                {isCompleted && (
                  <div className="absolute -inset-1 rounded-full border-2 border-amber-300 pointer-events-none animate-pulse" />
                )}
              </button>
            </div>
          );
        })}

        {/* Final Unit Node: THE INQUISITION (Boss Battle) */}
        {unit.inquisition && (() => {
          const inquisition = unit.inquisition;
          const isPassed = !!user.completedInquisitions[inquisition.id];
          const allLessonsCompleted = unit.lessons.every(l => !!user.completedLessons[l.id]);
          const isUnlocked = allLessonsCompleted;

          return (
            <div className="relative pt-4 transition-transform duration-300">
              {isUnlocked && !isPassed && (
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
                  <div className="bg-rose-500 text-white text-xs font-black uppercase tracking-wider py-1.5 px-3 rounded-xl shadow-md flex items-center gap-1 border-2 border-white">
                    <Swords className="w-3.5 h-3.5" />
                    <span>BOSS INQUISITION</span>
                  </div>
                  <div className="w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-rose-500 mx-auto" />
                </div>
              )}

              <button
                onClick={() => {
                  sound.playClick();
                  setSelectedNode({
                    type: 'inquisition',
                    item: inquisition,
                    isCompleted: isPassed,
                    isLocked: !isUnlocked
                  });
                }}
                disabled={!isUnlocked}
                className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all transform active:translate-y-1 ${
                  isPassed
                    ? 'bg-purple-600 border-b-4 border-purple-800 shadow-duo-purple text-white ring-4 ring-purple-300'
                    : isUnlocked
                    ? 'bg-rose-500 border-b-4 border-rose-700 shadow-duo-red text-white ring-4 ring-rose-200 animate-pulse'
                    : 'bg-slate-200 dark:bg-slate-700 border-b-4 border-slate-300 dark:border-slate-800 text-slate-400 cursor-not-allowed'
                }`}
              >
                {isPassed ? (
                  <Trophy className="w-12 h-12 fill-yellow-300 text-yellow-300" />
                ) : isUnlocked ? (
                  <Swords className="w-11 h-11 text-white" />
                ) : (
                  <Lock className="w-9 h-9 text-slate-400" />
                )}
              </button>
              <div className="text-center mt-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Unit Inquisition
                </span>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Node Details Modal / Sheet */}
      {selectedNode && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-duo-dark-card border-2 border-slate-200 dark:border-duo-dark-border rounded-3xl p-6 max-w-sm w-full shadow-2xl relative text-center">
            
            {/* Modal Icon */}
            <div className="w-16 h-16 rounded-2xl mx-auto mb-3 flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-3xl shadow-sm">
              {selectedNode.type === 'inquisition' ? '⚔️' : selectedNode.isCompleted ? '⭐' : '📖'}
            </div>

            <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-1">
              {selectedNode.item.title}
            </h3>
            
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              {selectedNode.type === 'inquisition'
                ? (selectedNode.item as Inquisition).enterpriseScenario
                : (selectedNode.item as Lesson).description}
            </p>

            <div className="flex justify-center gap-3 mb-5 text-xs font-black text-slate-600 dark:text-slate-300">
              <span className="px-2.5 py-1 bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 rounded-lg">
                +{selectedNode.item.xpReward} XP
              </span>
              {selectedNode.type === 'inquisition' && (
                <span className="px-2.5 py-1 bg-purple-100 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 rounded-lg flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" />
                  Master Badge
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={() => {
                  sound.playClick();
                  if (selectedNode.type === 'lesson') {
                    onStartLesson(selectedNode.item as Lesson);
                  } else {
                    onStartInquisition(selectedNode.item as Inquisition);
                  }
                  setSelectedNode(null);
                }}
                className={`w-full py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider text-white transition-all transform active:translate-y-1 ${
                  selectedNode.type === 'inquisition'
                    ? 'bg-rose-500 hover:bg-rose-400 shadow-duo-red'
                    : 'bg-emerald-500 hover:bg-emerald-400 shadow-duo-green'
                }`}
              >
                {selectedNode.isCompleted ? 'PRACTICE AGAIN (+5 XP)' : 'START SESSION'}
              </button>

              <button
                onClick={() => setSelectedNode(null)}
                className="w-full py-2.5 rounded-2xl font-bold text-xs uppercase tracking-wider text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

