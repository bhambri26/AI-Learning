package com.datalingo.app.repository

import com.datalingo.app.model.*

object CurriculumRepository {

    fun getUnitForTrack(track: TrackType): CurriculumUnit {
        return when (track) {
            TrackType.PYTHON -> CurriculumUnit(
                id = "unit-py-1",
                track = TrackType.PYTHON,
                unitNumber = 1,
                title = "Python Core & Vectorized Foundations",
                description = "Master variables, truthiness, list comprehensions, and generators.",
                lessons = listOf(
                    Lesson(
                        id = "py-1-1",
                        title = "Dynamic Typing & Truthiness",
                        description = "Evaluate memory references and truthiness.",
                        questions = listOf(
                            Question(
                                id = "q-py-1",
                                prompt = "Which of the following evaluates to False in Python?",
                                options = listOf("bool([0])", "bool({})", "bool('False')", "bool(-1)"),
                                correctIndex = 1,
                                explanation = "Empty collections like {} and [] evaluate to False; non-empty collections like [0] evaluate to True."
                            ),
                            Question(
                                id = "q-py-2",
                                prompt = "Why prefer (x**2 for x in data) over [x**2 for x in data]?",
                                options = listOf(
                                    "Generators compute items lazily with O(1) memory footprint",
                                    "It automatically runs on GPU",
                                    "It compiles to C automatically",
                                    "No difference in Python 3.12"
                                ),
                                correctIndex = 0,
                                explanation = "Generators yield elements on demand, avoiding high RAM usage."
                            )
                        )
                    ),
                    Lesson(
                        id = "py-1-2",
                        title = "List Comprehensions & Lambdas",
                        description = "High-speed inline transformations for feature datasets.",
                        questions = listOf(
                            Question(
                                id = "q-py-3",
                                prompt = "What is the correct syntax for an if-else expression in a list comprehension?",
                                options = listOf(
                                    "[x*2 if x > 0 else 0 for x in nums]",
                                    "[x*2 for x in nums if x > 0 else 0]",
                                    "[if x > 0: x*2 else: 0 for x in nums]",
                                    "[x*2 for x in nums where x > 0]"
                                ),
                                correctIndex = 0,
                                explanation = "Ternary if-else must precede the for loop in Python list comprehensions."
                            )
                        )
                    )
                ),
                inquisition = Inquisition(
                    id = "inq-py-1",
                    title = "The Python Memory & Architecture Inquisition",
                    subtitle = "Enterprise AI Pipeline Checkpoint",
                    scenario = "A real-time AI normalization service is leaking memory. Diagnose mutable arguments and generator streams under 3 minutes.",
                    timeLimitSeconds = 180,
                    badgeTitle = "Pythonic Alchemist",
                    badgeIcon = "🐍",
                    questions = listOf(
                        Question(
                            id = "inq-py-q1",
                            prompt = "What happens when using def train(batch, weights=[]) across calls?",
                            options = listOf(
                                "Weights is allocated once at function definition time, leaking state between invocations!",
                                "A new list is created on every call",
                                "Python throws a MutableDefaultError",
                                "The list is automatically frozen into a tuple"
                            ),
                            correctIndex = 0,
                            explanation = "Default mutable arguments are evaluated only once at definition time."
                        )
                    )
                )
            )

            TrackType.SQL -> CurriculumUnit(
                id = "unit-sql-1",
                track = TrackType.SQL,
                unitNumber = 1,
                title = "Window Functions & Enterprise CTEs",
                description = "Perform rolling aggregates and ranking without costly self-joins.",
                lessons = listOf(
                    Lesson(
                        id = "sql-1-1",
                        title = "ROW_NUMBER vs DENSE_RANK",
                        description = "Compute analytical ranks across model evaluation metrics.",
                        questions = listOf(
                            Question(
                                id = "q-sql-1",
                                prompt = "If 3 models tie at rank 1, what rank does the next model receive with DENSE_RANK()?",
                                options = listOf("Rank 2", "Rank 4", "Rank 1", "Rank 3"),
                                correctIndex = 0,
                                explanation = "DENSE_RANK() does not skip rank positions after ties."
                            )
                        )
                    )
                ),
                inquisition = Inquisition(
                    id = "inq-sql-1",
                    title = "The Enterprise SQL Optimization Inquisition",
                    subtitle = "High-Throughput Analytics Boss Battle",
                    scenario = "A 50-billion record query is timing out. Optimize non-sargable filters and window partitions.",
                    badgeTitle = "SQL Grandmaster",
                    badgeIcon = "📊",
                    questions = listOf(
                        Question(
                            id = "inq-sql-q1",
                            prompt = "Which predicate allows index seeks (is SARGable)?",
                            options = listOf(
                                "WHERE created_at >= '2024-01-01' AND created_at < '2024-02-01'",
                                "WHERE YEAR(created_at) = 2024",
                                "WHERE DATE_TRUNC('month', created_at) = '2024-01-01'",
                                "WHERE TO_CHAR(created_at, 'YYYY') = '2024'"
                            ),
                            correctIndex = 0,
                            explanation = "Functions applied directly to indexed columns invalidate index seeks."
                        )
                    )
                )
            )

            TrackType.PYSPARK -> CurriculumUnit(
                id = "unit-spk-1",
                track = TrackType.PYSPARK,
                unitNumber = 1,
                title = "Catalyst DAG & Broadcast Optimization",
                description = "Master distributed transformations, actions, and cluster shuffle mitigation.",
                lessons = listOf(
                    Lesson(
                        id = "spk-1-1",
                        title = "Transformations vs Actions",
                        description = "Understand what triggers DAG execution across cluster nodes.",
                        questions = listOf(
                            Question(
                                id = "q-spk-1",
                                prompt = "Which operation is an ACTION triggering physical execution?",
                                options = listOf("df.count()", "df.select()", "df.filter()", "df.withColumn()"),
                                correctIndex = 0,
                                explanation = "count(), collect(), and show() are actions that trigger DAG execution."
                            )
                        )
                    )
                ),
                inquisition = Inquisition(
                    id = "inq-spk-1",
                    title = "The Distributed Spark Cluster Inquisition",
                    subtitle = "Petabyte-Scale Engineering Checkpoint",
                    scenario = "A 500-node Spark cluster suffers from shuffle skew. Salting keys and broadcast joins are needed.",
                    badgeTitle = "Catalyst Conqueror",
                    badgeIcon = "⚡",
                    questions = listOf(
                        Question(
                            id = "inq-spk-q1",
                            prompt = "How to resolve extreme join skew on a dominant key?",
                            options = listOf(
                                "Key Salting: Add random integer prefixes to distribute the key across buckets",
                                "Increase executor cores to 64",
                                "Switch from Parquet to CSV",
                                "Set shuffle partitions to 1"
                            ),
                            correctIndex = 0,
                            explanation = "Salting spreads skewed rows evenly across partitions."
                        )
                    )
                )
            )

            TrackType.DATABRICKS -> CurriculumUnit(
                id = "unit-dbx-1",
                track = TrackType.DATABRICKS,
                unitNumber = 1,
                title = "Medallion Architecture & Unity Catalog",
                description = "Build Bronze, Silver, Gold pipelines with Delta ACID transactions.",
                lessons = listOf(
                    Lesson(
                        id = "dbx-1-1",
                        title = "The Medallion Multi-Hop Pattern",
                        description = "Classify data curation across raw, cleaned, and feature-ready tiers.",
                        questions = listOf(
                            Question(
                                id = "q-dbx-1",
                                prompt = "What is the primary role of the Silver layer?",
                                options = listOf(
                                    "Cleaned, deduplicated, and enriched source of truth",
                                    "Raw unparsed append-only JSON",
                                    "Archival tape backup",
                                    "C-suite summary dashboards only"
                                ),
                                correctIndex = 0,
                                explanation = "Silver cleans and validates data for downstream features and models."
                            )
                        )
                    )
                ),
                inquisition = Inquisition(
                    id = "inq-dbx-1",
                    title = "The Databricks Lakehouse Architect Inquisition",
                    subtitle = "Enterprise AI Governance Checkpoint",
                    scenario = "Enforce Unity Catalog three-tier namespace permissions and repair Delta transactions.",
                    badgeTitle = "Lakehouse Grand Architect",
                    badgeIcon = "🧱",
                    questions = listOf(
                        Question(
                            id = "inq-dbx-q1",
                            prompt = "What is the 3-level namespace in Unity Catalog?",
                            options = listOf("catalog.schema.table", "database.schema.table", "cloud.region.table", "user.dataset.view"),
                            correctIndex = 0,
                            explanation = "Unity Catalog structures data as catalog.schema.table."
                        )
                    )
                )
            )

            TrackType.SNOWFLAKE -> CurriculumUnit(
                id = "unit-snw-1",
                track = TrackType.SNOWFLAKE,
                unitNumber = 1,
                title = "Virtual Compute & Zero-Copy Cloning",
                description: "Separate storage and compute, configure multi-cluster auto-scaling.",
                lessons = listOf(
                    Lesson(
                        id = "snw-1-1",
                        title = "Scaling Dimensions",
                        description = "Differentiate scaling up vs scaling out.",
                        questions = listOf(
                            Question(
                                id = "q-snw-1",
                                prompt = "How to handle 50 concurrent querying data scientists without queuing?",
                                options = listOf(
                                    "Scale Out with Multi-Cluster Warehouses",
                                    "Scale Up warehouse size from M to 4XL",
                                    "Run VACUUM",
                                    "Restart database"
                                ),
                                correctIndex = 0,
                                explanation = "Scaling Out adds cluster instances to eliminate query queuing."
                            )
                        )
                    )
                ),
                inquisition = Inquisition(
                    id = "inq-snw-1",
                    title = "The Snowflake Cloud Architect Inquisition",
                    subtitle = "Enterprise Concurrency Boss Battle",
                    scenario = "Optimize runaway multi-cluster warehouses and recover dropped tables via Time Travel.",
                    badgeTitle = "Snowflake Architect",
                    badgeIcon = "❄️",
                    questions = listOf(
                        Question(
                            id = "inq-snw-q1",
                            prompt = "How to immediately recover an accidentally dropped table in Snowflake?",
                            options = listOf("UNDROP TABLE table_name;", "RESTORE FROM S3;", "ROLLBACK;", "RECOVER TABLE;"),
                            correctIndex = 0,
                            explanation = "UNDROP TABLE restores dropped objects instantaneously using Time Travel metadata."
                        )
                    )
                )
            )

            TrackType.PALANTIR -> CurriculumUnit(
                id = "unit-pal-1",
                track = TrackType.PALANTIR,
                unitNumber = 1,
                title = "Foundry Architecture & Enterprise Ontology",
                description = "Model real-world entities into Objects, Link Types, and AIP actions.",
                lessons = listOf(
                    Lesson(
                        id = "pal-1-1",
                        title = "Semantic Ontology Layer",
                        description = "Transform tables into operational digital twins.",
                        questions = listOf(
                            Question(
                                id = "q-pal-1",
                                prompt = "What is the primary role of the Foundry Ontology?",
                                options = listOf(
                                    "Digital twin translating raw tables into Objects, Links, and Actions",
                                    "An encrypted password manager",
                                    "Pure BI reporting tool",
                                    "Docker hypervisor"
                                ),
                                correctIndex = 0,
                                explanation = "The Ontology maps relational schemas into meaningful enterprise objects and executable actions."
                            )
                        )
                    )
                ),
                inquisition = Inquisition(
                    id = "inq-pal-1",
                    title = "The Palantir AIP & Ontology Architect Inquisition",
                    subtitle = "Kinetic Decision System Boss Battle",
                    scenario = "Orchestrate an AIP Logic agent grounded in governed Ontology Actions to re-route critical supply chains.",
                    badgeTitle = "Ontology Master",
                    badgeIcon = "🔮",
                    questions = listOf(
                        Question(
                            id = "inq-pal-q1",
                            prompt = "How does Palantir AIP prevent unauthorized generative AI actions?",
                            options = listOf(
                                "LLMs can only trigger pre-authorized Ontology Actions with user ACLs and human review",
                                "Disabling all write access permanently",
                                "Training models with no SQL knowledge",
                                "Prompt engineering with 'please do not delete'"
                            ),
                            correctIndex = 0,
                            explanation = "AIP grounds LLMs into governed Ontology Actions with strict cryptographic audit logs."
                        )
                    )
                )
            )

            TrackType.ML -> CurriculumUnit(
                id = "unit-ml-1",
                track = TrackType.ML,
                unitNumber = 1,
                title = "Loss Functions & Optimization Math",
                description = "Explore gradients, regularizations (L1/L2), and cross-validation.",
                lessons = listOf(
                    Lesson(
                        id = "ml-1-1",
                        title = "Precision vs Recall",
                        description = "Evaluate models with severe class imbalance.",
                        questions = listOf(
                            Question(
                                id = "q-ml-1",
                                prompt = "In cancer diagnosis where false negatives are fatal, which metric must be maximized?",
                                options = listOf("Recall (Sensitivity)", "Precision", "Overall Accuracy", "Specificity"),
                                correctIndex = 0,
                                explanation = "Recall minimizes False Negatives, ensuring sick patients are not missed."
                            )
                        )
                    )
                ),
                inquisition = Inquisition(
                    id = "inq-ml-1",
                    title = "The Machine Learning Engineering Inquisition",
                    subtitle = "Model Drift & Leakage Boss Battle",
                    scenario = "Diagnose target leakage and calibrate decision thresholds for a credit-scoring model under 3 minutes.",
                    badgeTitle = "Master of Statistical AI",
                    badgeIcon = "🧠",
                    questions = listOf(
                        Question(
                            id = "inq-ml-q1",
                            prompt = "Why is fitting StandardScaler before train/test split invalid?",
                            options = listOf(
                                "Data Leakage: Test distribution leaks into training data",
                                "StandardScaler only works on GPU",
                                "Test data cannot be scaled",
                                "Causes division by zero"
                            ),
                            correctIndex = 0,
                            explanation = "Scalers must be fit strictly on training data to prevent leakage."
                        )
                    )
                )
            )

            TrackType.GENAI -> CurriculumUnit(
                id = "unit-gen-1",
                track = TrackType.GENAI,
                unitNumber = 1,
                title = "Attention, RAG & Multi-Agent Swarms",
                description = "Scaled dot-product attention, LoRA fine-tuning, and autonomous tool calling.",
                lessons = listOf(
                    Lesson(
                        id = "gen-1-1",
                        title = "The Attention Formula",
                        description = "Dissect queries, keys, values, and sqrt(d_k) scaling.",
                        questions = listOf(
                            Question(
                                id = "q-gen-1",
                                prompt = "Why scale dot products by 1/sqrt(d_k) in Attention(Q, K, V)?",
                                options = listOf(
                                    "To prevent large values from pushing softmax into vanishing gradient regions",
                                    "To convert imaginary numbers to real",
                                    "To compress weights for mobile",
                                    "To eliminate positional embeddings"
                                ),
                                correctIndex = 0,
                                explanation = "Without scaling, large dot products saturate softmax, stopping gradients during backprop."
                            )
                        )
                    )
                ),
                inquisition = Inquisition(
                    id = "inq-gen-1",
                    title = "The Supreme Generative AI Architect Inquisition",
                    subtitle = "Multi-Agent System & Guardrail Boss Battle",
                    scenario = "Enforce JSON grammar-constrained decoding and configure semantic caching on a multi-agent system in 3 minutes.",
                    badgeTitle = "Supreme AI Architect",
                    badgeIcon = "✨",
                    questions = listOf(
                        Question(
                            id = "inq-gen-q1",
                            prompt = "How to mathematically guarantee valid JSON output from an LLM?",
                            options = listOf(
                                "Grammar-constrained logit masking at each token step via JSON schema FSM",
                                "Prompting 'Please output valid JSON'",
                                "Retrying regex 100 times",
                                "Setting temperature = 2.0"
                            ),
                            correctIndex = 0,
                            explanation = "Grammar masking drives invalid schema token logits to -infinity at each generation step."
                        )
                    )
                )
            )
        }
    }
}

