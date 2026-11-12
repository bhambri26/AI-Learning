'use client';

import React from 'react';
import { masterLearningPlan, allTracks } from '@/data/curriculum/master-plan';
import { TrackId } from '@/types/curriculum';
import { UserProfile } from '@/types/user';
import { sound } from '@/lib/audio';
import { 
  CheckCircle, 
  ArrowRight, 
  Swords, 
  Sparkles, 
  Award,
  Layers
} from 'lucide-react';

interface ProvenPlanProps {
  user: UserProfile;
  onSelectTrack: (trackId: TrackId) => void;
  onNavigateLearn: () => void;
}

export const ProvenPlanView: React.FC<ProvenPlanProps> = ({
  user,
  onSelectTrack,
  onNavigateLearn
}) => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 select-none animate-fadeIn">
      
      {/* Hero Header */}
      <div className="text-center mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-400 font-black text-xs uppercase tracking-widest">
          <Sparkles className="w-4 h-4" />
          <span>The Battle-Tested Curriculum</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
          Proven AI Architect Learning Plan
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          From zero programming knowledge to designing petabyte-scale distributed data systems, kinetic enterprise ontologies, and multi-agent Generative AI swarms.
        </p>
      </div>

      {/* Vertical Stepper Roadmap */}
      <div className="space-y-8 relative">
        <div className="absolute left-6 sm:left-8 top-10 bottom-10 w-1 bg-slate-200 dark:bg-slate-800 -z-0" />

        {masterLearningPlan.map((stage, idx) => {
          return (
            <div
              key={stage.stageNumber}
              className="relative flex items-start gap-4 sm:gap-6 z-10"
            >
              {/* Stepper Node Circle */}
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center font-black text-base sm:text-xl flex-shrink-0 border-4 border-white dark:border-duo-dark-bg bg-emerald-500 text-white shadow-duo-green">
                {stage.stageNumber}
              </div>

              {/* Stage Card */}
              <div className="flex-1 bg-white dark:bg-duo-dark-card border-2 border-slate-200 dark:border-duo-dark-border rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-emerald-500">
                      {stage.subtitle}
                    </span>
                    <h3 className="text-xl font-black text-slate-800 dark:text-slate-100">
                      {stage.title}
                    </h3>
                  </div>

                  <span className="text-xs px-2.5 py-1 rounded-full font-black bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 w-fit">
                    Tier {idx + 1}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                  {stage.description}
                </p>

                {/* Sub-Tracks Covered */}
                <div className="mb-4">
                  <div className="text-xs font-black uppercase text-slate-400 tracking-wider mb-2">
                    Included Tracks:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {stage.trackIds.map(tId => {
                      const track = allTracks[tId];
                      const isCurrent = user.currentTrackId === tId;
                      return (
                        <button
                          key={tId}
                          onClick={() => {
                            sound.playClick();
                            onSelectTrack(tId);
                            onNavigateLearn();
                          }}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border-2 font-bold text-xs transition-all transform active:translate-y-1 ${
                            isCurrent
                              ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 shadow-duo-green'
                              : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 shadow-duo hover:border-slate-400'
                          }`}
                        >
                          <span className="text-base">{track.meta.icon}</span>
                          <span>{track.meta.title}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Concrete Learning Outcomes */}
                <div className="space-y-1.5 mb-4">
                  <div className="text-xs font-black uppercase text-slate-400 tracking-wider">
                    Core Competencies Acquired:
                  </div>
                  {stage.outcomes.map((outcome, oIdx) => (
                    <div key={oIdx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>

                {/* Stage Capstone Challenge */}
                <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-2xl flex items-center gap-3">
                  <Swords className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  <div className="text-xs font-bold text-amber-900 dark:text-amber-200">
                    <span className="font-black uppercase">Capstone Boss: </span>
                    {stage.capstoneChallenge}
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

