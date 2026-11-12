# DataLingo AI 🚀 (Web, Android & iOS)

> **The Duolingo for AI & Big Data Engineering**  
> Master **Python, SQL, Machine Learning, PySpark, Databricks, Snowflake, and Palantir Foundry & AIP** through gamified bite-sized lessons, interactive in-browser code execution, and high-stakes enterprise **Inquisitions** (Boss Battles).

---

## 🌟 Overview & Key Features

DataLingo AI brings Duolingo's iconic addictive learning mechanics directly to advanced AI and enterprise data engineering:

- 🛣️ **Interactive Winding Learning Road**: Vertical winding path with 3D tactile nodes, mastery rings, start banners, and unit milestone trophies.
- 🦉 **"Byte" The AI Owl / Cyber-Mascot**: Reactive animated companion that celebrates wins, offers guidance, droops on heart loss, and dons a glowing neon visor for Inquisitions.
- ⚔️ **Enterprise Inquisitions (Boss Battles)**: High-pressure timed challenges testing real-world architectural design, disaster recovery, memory leaks, data skew, and LLM guardrails. Score ≥80% to claim Master Badges.
- 💻 **Live In-Browser Code Runner**: Real execution and syntax validation for **Python 3.12**, **ANSI SQL** (against simulated analytical tables), and **Apache Spark / PySpark** DataFrame DAGs.
- 🔊 **Procedural Web Audio Synthesizer**: 100% offline, zero-network Web Audio API sound generator producing Duolingo chime chords, buzzers, click pops, and victorious fanfare.
- ❤️ **Hearts & Flame Streak System**: 5 Hearts with 20-minute regeneration, practice sessions, daily streak freezes, and gem rewards.
- 🏆 **Weekly League Leaderboards**: Tiered competition (Bronze ➔ Diamond) with simulated AI peers.
- 📱 **Triple-Platform Ready**:
  1. **Web**: Next.js 14 (React, TypeScript, Tailwind CSS) optimized for **Vercel** with zero-config edge deployment.
  2. **Android**: Native **Kotlin + Jetpack Compose** app ready for Android Studio.
  3. **iOS**: **SwiftUI** companion + **Capacitor** iOS container ready for Xcode.

---

## 🗺️ The Proven Step-by-Step AI Learning Plan

DataLingo is structured according to a battle-tested enterprise roadmap:

```
┌──────────────────────────────────────────────────────────┐
│ STAGE 1: Computational & Relational Foundations          │
│ • Python 3.12: Typing, Comprehensions, Generators, OOP   │
│ • Modern SQL: Window functions, DENSE_RANK, CTEs         │
│ ⚔️ Boss: Python Memory & SQL Optimization Inquisition     │
└────────────────────────────┬─────────────────────────────┘
                             ▼
┌──────────────────────────────────────────────────────────┐
│ STAGE 2: Distributed Big Data & Lakehouse Architecture   │
│ • PySpark: Catalyst DAGs, Partitioning, Broadcast Joins  │
│ • Databricks: Medallion (Bronze/Silver/Gold), Unity Cat  │
│ ⚔️ Boss: Petabyte-Scale Spark & Lakehouse Inquisition     │
└────────────────────────────┬─────────────────────────────┘
                             ▼
┌──────────────────────────────────────────────────────────┐
│ STAGE 3: Cloud Warehouses & Kinetic Enterprise Ontology  │
│ • Snowflake: Virtual Warehouses, Zero-Copy Cloning, CDC  │
│ • Palantir Foundry & AIP: Ontology Objects & LLM Agents  │
│ ⚔️ Boss: Snowflake Cost & Palantir Decision Inquisition  │
└────────────────────────────┬─────────────────────────────┘
                             ▼
┌──────────────────────────────────────────────────────────┐
│ STAGE 4: Statistical Machine Learning & Math for AI      │
│ • Scikit-Learn: Loss functions, Gradients, XGBoost, L1/L2│
│ • Validation: Leakage prevention, ROC-AUC, F1 tradeoffs  │
│ ⚔️ Boss: ML Engineering & Production Drift Inquisition   │
└────────────────────────────┬─────────────────────────────┘
                             ▼
┌──────────────────────────────────────────────────────────┐
│ STAGE 5: Deep Learning, Transformers & Multi-Agent Swarms│
│ • Attention: Scaled Dot-Product, Positional Encodings    │
│ • Enterprise RAG: Vector DBs, Hybrid Search, Re-ranking  │
│ • Fine-Tuning & Agents: LoRA, QLoRA, ReAct Tool Calling  │
│ ⚔️ Boss: The Supreme AI & Multi-Agent Swarm Inquisition   │
└──────────────────────────────────────────────────────────┘
```

---

## 🚀 Quickstart & Development

### 1. Web Application (React / Next.js)

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# Open http://localhost:3000 in your browser

# Build production bundle (tested with 0 errors)
npm run build
```

### 2. Deploy to Vercel in 1-Click

This repository is pre-configured with `vercel.json` for zero-configuration deployment:

1. Push this repository to your GitHub account:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/datalingo-ai.git
   git push -u origin main
   ```
2. Log into [vercel.com](https://vercel.com).
3. Click **"Add New Project"** and select your repository.
4. Vercel automatically detects Next.js. Click **"Deploy"**!
5. Your live app is instantly hosted at `https://your-project.vercel.app`.

---

### 3. Android Native App (Kotlin + Jetpack Compose)

The `android/` directory contains a native Jetpack Compose project:

1. Open **Android Studio** (Hedgehog or newer).
2. Click **File ➔ Open** and select the `/android` directory.
3. Allow Gradle to sync.
4. Select an Android Emulator or connected physical device and click **Run (Shift+F10)**.

Key Kotlin structure:
- `android/app/src/main/java/com/datalingo/app/MainActivity.kt`: Compose root
- `ui/screens/HomeScreen.kt`: Interactive winding road
- `ui/screens/LessonScreen.kt`: Interactive quiz engine with instant feedback
- `ui/screens/InquisitionScreen.kt`: Timed boss battle challenge
- `repository/CurriculumRepository.kt`: Full offline curriculum

---

### 4. iOS Native App (SwiftUI & Capacitor)

The `ios/` directory provides both Capacitor integration and native SwiftUI views:

```bash
# Sync web build to iOS container
npx cap sync ios

# Open in Xcode
npx cap open ios
```

Or open `ios/App/App/NativeDataLingoView.swift` in Xcode to preview the native SwiftUI UI.

---

## 🎮 Gamification Details

| Feature | Description |
| :--- | :--- |
| **Hearts / Health** | Start with 5 hearts. Making a mistake in lessons loses 1 heart. Regenerate 1 heart every 20 minutes, or refill via free practice or 50 gems. |
| **Streaks** | Consecutive daily learning tracks. Includes automatic Streak Freeze protection. |
| **Gems (Lingots)** | Earned by finishing lessons, daily quests, and conquering Inquisitions. |
| **Inquisitions** | High-stakes timed scenario exams with minimum pass percentages (75-80%) unlocking Master Badges. |
| **Code Arena** | Multi-engine sandbox allowing live execution of Python, SQL, and PySpark scripts. |

---

## 🛡️ License

MIT License. Designed & Built for AI Engineers worldwide.

