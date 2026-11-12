package com.datalingo.app.model

enum class TrackType(
    val title: String,
    val icon: String,
    val tagline: String,
    val level: String
) {
    PYTHON("Python AI Core", "🐍", "Dynamic typing, generators & OOP", "Beginner"),
    SQL("SQL Intelligence", "📊", "Window functions & enterprise CTEs", "Beginner"),
    PYSPARK("PySpark Distributed", "⚡", "Catalyst DAGs & broadcast joins", "Intermediate"),
    DATABRICKS("Databricks Lakehouse", "🧱", "Delta ACID & Unity Catalog", "Intermediate"),
    SNOWFLAKE("Snowflake Data Cloud", "❄️", "Virtual warehouses & Snowpark", "Intermediate"),
    PALANTIR("Palantir Foundry & AIP", "🔮", "Ontologies & AIP LLM agents", "Advanced"),
    ML("Machine Learning Math", "🧠", "Loss functions, gradients & trees", "Intermediate"),
    GENAI("Generative AI Systems", "✨", "Attention, RAG, LoRA & Swarms", "Mastery")
}

data class Question(
    val id: String,
    val prompt: String,
    val options: List<String>,
    val correctIndex: Int,
    val explanation: String,
    val codeSnippet: String? = null
)

data class Lesson(
    val id: String,
    val title: String,
    val description: String,
    val xpReward: Int = 15,
    val questions: List<Question>
)

data class Inquisition(
    val id: String,
    val title: String,
    val subtitle: String,
    val scenario: String,
    val timeLimitSeconds: Int = 180,
    val minimumPassPercent: Int = 80,
    val xpReward: Int = 120,
    val gemReward: Int = 50,
    val badgeTitle: String,
    val badgeIcon: String,
    val questions: List<Question>
)

data class CurriculumUnit(
    val id: String,
    val track: TrackType,
    val unitNumber: Int,
    val title: String,
    val description: String,
    val lessons: List<Lesson>,
    val inquisition: Inquisition
)

data class UserState(
    val name: String = "AI Apprentice",
    val xp: Int = 120,
    val streak: Int = 3,
    val hearts: Int = 5,
    val maxHearts: Int = 5,
    val gems: Int = 150,
    val league: String = "Gold",
    val currentTrack: TrackType = TrackType.PYTHON,
    val completedLessons: Set<String> = setOf("py-1-1"),
    val completedInquisitions: Map<String, Int> = emptyMap(),
    val earnedBadges: List<String> = listOf("Hello AI World")
)

