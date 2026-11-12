'use client';

import React, { useState } from 'react';
import { CodeRunner, RunResult } from '@/lib/code-runner';
import { sound } from '@/lib/audio';
import { 
  Play, 
  RotateCcw, 
  Terminal, 
  Copy, 
  Check, 
  Sparkles,
  Database,
  Cpu
} from 'lucide-react';

export const CodeArenaView: React.FC = () => {
  const [lang, setLang] = useState<'python' | 'sql' | 'pyspark'>('python');
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<RunResult | null>(null);

  const presets = {
    python: `# Python AI Scripting Sandbox
import math

# Vector dot product & Cosine Similarity
v1 = [0.8, 0.2, 0.5]
v2 = [0.9, 0.1, 0.4]

dot = sum(a * b for a, b in zip(v1, v2))
norm1 = math.sqrt(sum(a**2 for a in v1))
norm2 = math.sqrt(sum(b**2 for b in v2))
similarity = dot / (norm1 * norm2)

print(f"Cosine Similarity: {similarity:.4f}")
`,
    sql: `-- ANSI SQL Analytical Engine Sandbox
-- Available Tables: ai_models, customer_telemetry

SELECT 
    model_name,
    latency_ms,
    tokens_per_sec,
    cost_per_1k
FROM ai_models
WHERE latency_ms < 300
ORDER BY tokens_per_sec DESC;
`,
    pyspark: `# Apache Spark Catalyst Engine Simulation
from pyspark.sql import functions as F

# Simulate distributed DataFrame transformations
df = spark.read.table("ai_embeddings")
transformed_df = df.filter(F.col("label") == 1.0) \\
                   .withColumn("scaled_feature", F.col("id") * 10)

transformed_df.show(4)
`
  };

  const [code, setCode] = useState<string>(presets.python);

  const handleSwitchLang = (newLang: 'python' | 'sql' | 'pyspark') => {
    sound.playClick();
    setLang(newLang);
    setCode(presets[newLang]);
    setResult(null);
  };

  const handleExecute = async () => {
    sound.playClick();
    setIsRunning(true);
    let res: RunResult;
    if (lang === 'python') {
      res = await CodeRunner.runPython(code);
    } else if (lang === 'sql') {
      res = await CodeRunner.runSQL(code);
    } else {
      res = await CodeRunner.runPySpark(code);
    }
    setResult(res);
    setIsRunning(false);
    if (res.success && !res.error) {
      sound.playCorrect();
    } else {
      sound.playWrong();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 select-none animate-fadeIn space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sky-500 font-black text-xs uppercase tracking-widest mb-1">
            <Cpu className="w-4 h-4" />
            <span>Interactive Multi-Engine Sandbox</span>
          </div>
          <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
            Code Arena
          </h1>
        </div>

        {/* Engine Tabs */}
        <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
          {(['python', 'sql', 'pyspark'] as const).map(l => (
            <button
              key={l}
              onClick={() => handleSwitchLang(l)}
              className={`px-4 py-2 rounded-xl font-black text-xs uppercase tracking-wider transition-all ${
                lang === l
                  ? 'bg-white dark:bg-duo-dark-card text-sky-500 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {l === 'pyspark' ? 'PySpark' : l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Editor & Console Container */}
      <div className="border-2 border-slate-700 rounded-3xl overflow-hidden bg-slate-950 shadow-2xl">
        
        {/* Editor Top Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500" />
            <span className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="font-mono text-xs text-slate-400 font-bold ml-2">
              arena.{lang === 'sql' ? 'sql' : 'py'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="text-slate-400 hover:text-slate-200 text-xs font-bold flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-slate-800"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setCode(presets[lang]);
                setResult(null);
              }}
              className="text-slate-400 hover:text-slate-200 text-xs font-bold flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-slate-800"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Code Input */}
        <textarea
          value={code}
          onChange={e => setCode(e.target.value)}
          rows={11}
          className="w-full p-4 bg-transparent font-mono text-xs sm:text-sm text-emerald-300 focus:outline-none resize-none leading-relaxed"
          spellCheck={false}
        />

        {/* Execute Bar */}
        <div className="px-4 py-3 bg-slate-900 border-t border-slate-800 flex justify-between items-center">
          <span className="text-xs text-slate-400 font-mono">
            Ctrl+Enter / Click to execute in isolated sandbox
          </span>

          <button
            disabled={isRunning}
            onClick={handleExecute}
            className="flex items-center gap-2 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-duo-green transition-all transform active:translate-y-1"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>{isRunning ? 'RUNNING...' : 'RUN SCRIPT'}</span>
          </button>
        </div>

        {/* Output Console */}
        {result && (
          <div className="p-4 bg-slate-900 border-t border-slate-800 font-mono text-xs text-slate-200">
            <div className="flex items-center justify-between text-slate-400 font-bold uppercase tracking-wide mb-2">
              <div className="flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>Console Output</span>
              </div>
              <span className="text-[11px] text-slate-500">{result.executionTimeMs}ms</span>
            </div>

            <pre className="whitespace-pre-wrap text-emerald-300 overflow-x-auto max-h-56">
              {result.output || 'No standard output produced.'}
            </pre>

            {result.error && (
              <div className="mt-2 text-rose-400 font-bold">
                {result.error}
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
};

