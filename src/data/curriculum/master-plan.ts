import { Track, TrackId } from '@/types/curriculum';
import { pythonTrack } from './python';
import { sqlTrack } from './sql';
import { pysparkTrack } from './pyspark';
import { databricksTrack } from './databricks';
import { snowflakeTrack } from './snowflake';
import { palantirTrack } from './palantir';
import { mlTrack } from './ml';
import { genaiTrack } from './genai';

export const allTracks: Record<TrackId, Track> = {
  python: pythonTrack,
  sql: sqlTrack,
  pyspark: pysparkTrack,
  databricks: databricksTrack,
  snowflake: snowflakeTrack,
  palantir: palantirTrack,
  ml: mlTrack,
  genai: genaiTrack
};

export interface MasterPlanStage {
  stageNumber: number;
  title: string;
  subtitle: string;
  description: string;
  trackIds: TrackId[];
  outcomes: string[];
  capstoneChallenge: string;
}

export const masterLearningPlan: MasterPlanStage[] = [
  {
    stageNumber: 1,
    title: 'Stage 1: Computational & Relational Foundations',
    subtitle: 'Python 3.12 + Modern ANSI SQL',
    description: 'Establish rock-solid programming syntax, data structures, vector operations, and complex multi-table window analytics.',
    trackIds: ['python', 'sql'],
    outcomes: [
      'Write idiomatic, memory-efficient Python code with comprehensions & generators',
      'Execute high-speed SQL analytics with ROW_NUMBER, DENSE_RANK, and CTEs',
      'Eliminate data leakage and un-sargable query bottlenecks'
    ],
    capstoneChallenge: 'Pass the Python Memory & Architecture Inquisition and SQL Query Optimization Boss Battle.'
  },
  {
    stageNumber: 2,
    title: 'Stage 2: Distributed Big Data & Lakehouse Architecture',
    subtitle: 'Apache Spark / PySpark + Databricks Medallion',
    description: 'Scale computation to billions of records across distributed clusters. Master Catalyst DAGs, partition skew, Delta Lake ACID logs, and Unity Catalog.',
    trackIds: ['pyspark', 'databricks'],
    outcomes: [
      'Design Medallion architecture (Bronze -> Silver -> Gold) pipelines',
      'Optimize PySpark jobs using Broadcast Joins and eliminate Shuffle Skew',
      'Enforce cross-cloud governance with Databricks Unity Catalog'
    ],
    capstoneChallenge: 'Survive the Petabyte-Scale Distributed Spark Cluster Inquisition & Lakehouse Architect Boss Battle.'
  },
  {
    stageNumber: 3,
    title: 'Stage 3: Enterprise Cloud Data & Kinetic Ontologies',
    subtitle: 'Snowflake Data Cloud + Palantir Foundry & AIP',
    description: 'Architect multi-cluster warehouses, zero-copy cloning, continuous CDC streams, and model enterprise operations into kinetic semantic ontologies.',
    trackIds: ['snowflake', 'palantir'],
    outcomes: [
      'Scale Snowflake virtual warehouses and automate CDC with Streams & Tasks',
      'Model digital twin enterprise entities in Palantir Foundry Ontologies',
      'Ground generative LLM agents into secure, governed Palantir AIP workflows'
    ],
    capstoneChallenge: 'Conquer the Snowflake Cloud Cost Inquisition & Palantir AIP Decision System Boss Battle.'
  },
  {
    stageNumber: 4,
    title: 'Stage 4: Statistical Machine Learning & Predictive Modeling',
    subtitle: 'Scikit-Learn + Optimization Math',
    description: 'Dive deep into gradient descent, loss functions, ensemble trees (Random Forest, XGBoost), regularization (L1/L2), and strict leakage-free cross-validation.',
    trackIds: ['ml'],
    outcomes: [
      'Formulate objective loss functions and understand gradient descent mechanics',
      'Master the Bias-Variance tradeoff and combat overfitting with regularization',
      'Evaluate imbalanced classification models with ROC-AUC and Precision-Recall'
    ],
    capstoneChallenge: 'Overcome the Machine Learning Engineering & Production Drift Inquisition.'
  },
  {
    stageNumber: 5,
    title: 'Stage 5: Generative AI, Transformers & Autonomous Agents',
    subtitle: 'Attention Mechanisms, RAG, LoRA & Multi-Agent Swarms',
    description: 'The pinnacle of modern AI engineering. Dissect Scaled Dot-Product Attention, deploy production RAG pipelines, fine-tune models with LoRA/QLoRA, and orchestrate autonomous multi-agent systems.',
    trackIds: ['genai'],
    outcomes: [
      'Implement Scaled Dot-Product Attention and optimize KV Cache latency',
      'Build end-to-end RAG with hybrid search and Cross-Encoder re-ranking',
      'Fine-tune open-weights models with PEFT/LoRA and build ReAct tool-calling agents'
    ],
    capstoneChallenge: 'Conquer the Supreme Generative AI & Autonomous Agent Architect Inquisition.'
  }
];

export function getTrack(id: TrackId): Track {
  return allTracks[id] || pythonTrack;
}

export function getAllTracksList(): Track[] {
  return Object.values(allTracks);
}

