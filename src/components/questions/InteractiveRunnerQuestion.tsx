'use client';

import React, { useState } from 'react';
import { InteractiveRunnerQuestion as RunnerType } from '@/types/curriculum';
import { CodeRunner, RunResult } from '@/lib/code-runner';
import { sound } from '@/lib/audio';
import { Play, RotateCcw, Terminal, CheckCircle, AlertCircle } from 'lucide-react';

interface RunnerProps {
  question: RunnerType;
  currentCode: string;
  onChangeCode: (code: string) => void;
  onExecutionValidated: (passed: boolean) => void;
  disabled?: boolean;
}

export const InteractiveRunnerQuestion: React.FC<RunnerProps> = ({
  question,
  currentCode,
  onChangeCode,
  onExecutionValidated,
  disabled = false
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<RunResult | null>(null);

  const handleRun = async () => {
    sound.playClick();
    setIsRunning(true);

    let res: RunResult;
    if (question.language === 'python') {
      res = await CodeRunner.runPython(currentCode);
    } else if (question.language === 'sql') {
      res = await CodeRunner.runSQL(currentCode);
    } else {
      res = await CodeRunner.runPySpark(currentCode);
    }

    setResult(res);
    setIsRunning(false);

    // Validate expected output regex or solution
    if (res.success) {
      if (question.expectedOutputRegex) {
        const regex = new RegExp(question.expectedOutputRegex);
        const matches = regex.test(res.output);
        onExecutionValidated(matches);
      } else {
        onExecutionValidated(true);
      }
    } else {
      onExecutionValidated(false);
    }
  };

  const handleReset = () => {
    sound.playClick();
    onChangeCode(question.starterCode);
    setResult(null);
    onExecutionValidated(false);
  };

  return (
    <div className="w-full space-y-4">
      <h3 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 leading-snug">
        {question.prompt}
      </h3>

      {/* Code Editor Header */}
      <div className="border border-slate-700 rounded-2xl overflow-hidden bg-slate-950 shadow-lg">
        <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="font-mono text-slate-400 font-bold uppercase ml-2">
              {question.language} Sandbox
            </span>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="text-slate-400 hover:text-slate-200 flex items-center gap-1 font-bold"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        </div>

        {/* Textarea Code Input */}
        <textarea
          value={currentCode}
          disabled={disabled}
          onChange={e => onChangeCode(e.target.value)}
          rows={6}
          className="w-full p-4 bg-transparent font-mono text-xs sm:text-sm text-emerald-300 focus:outline-none resize-none leading-relaxed"
          spellCheck={false}
        />

        {/* Run Button Bar */}
        <div className="px-4 py-2.5 bg-slate-900/80 border-t border-slate-800 flex justify-between items-center">
          <div className="text-[11px] text-slate-400">
            {question.expectedOutputRegex ? 'Target output match required' : 'Syntax & execution check'}
          </div>

          <button
            type="button"
            disabled={disabled || isRunning}
            onClick={handleRun}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-duo-green transition-all transform active:translate-y-1"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            {isRunning ? 'RUNNING...' : 'EXECUTE CODE'}
          </button>
        </div>
      </div>

      {/* Terminal Output */}
      {result && (
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl font-mono text-xs text-slate-200 shadow-md">
          <div className="flex items-center gap-2 mb-2 font-bold text-slate-400 uppercase tracking-wide">
            <Terminal className="w-3.5 h-3.5" />
            <span>Standard Output ({result.executionTimeMs}ms)</span>
          </div>
          
          <pre className="whitespace-pre-wrap text-emerald-400 overflow-x-auto">
            {result.output || 'No output produced.'}
          </pre>

          {result.error && (
            <div className="mt-2 text-rose-400 flex items-center gap-1.5 font-bold">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{result.error}</span>
            </div>
          )}

          {result.success && !result.error && (
            <div className="mt-2 text-emerald-400 flex items-center gap-1 font-bold">
              <CheckCircle className="w-4 h-4" />
              <span>Execution verified successfully!</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

