import { Track } from '@/types/curriculum';

export const pysparkTrack: Track = {
  meta: {
    id: 'pyspark',
    title: 'PySpark & Distributed Big Data',
    shortTitle: 'PySpark',
    tagline: 'Scale AI feature engineering across petabyte clusters',
    description: 'Learn Apache Spark internals: Catalyst optimizer, DAG execution, broadcast joins, partition tuning, and distributed streaming.',
    icon: '⚡',
    badgeColor: 'bg-amber-500',
    accentColor: '#F59E0B',
    level: 'Intermediate',
    estimatedHours: 28
  },
  units: [
    {
      id: 'spark-unit-1',
      trackId: 'pyspark',
      unitNumber: 1,
      title: 'Spark DAG & Execution Architecture',
      description: 'Understand lazy evaluation, transformations vs actions, and Catalyst optimization.',
      color: 'bg-amber-500',
      lessons: [
        {
          id: 'spark-1-1',
          unitId: 'spark-unit-1',
          title: 'Transformations vs Actions',
          description: 'Identify what triggers physical cluster execution.',
          xpReward: 15,
          questions: [
            {
              id: 'spk-q1-1',
              type: 'multiple-choice',
              prompt: 'Which of the following PySpark operations is an ACTION that triggers DAG execution across executors?',
              options: [
                'df.count()',
                'df.select("user_id", "embedding")',
                'df.filter(df["age"] > 21)',
                'df.withColumn("scaled", df["feature"] * 2)'
              ],
              correctIndex: 0,
              explanation: '`count()`, `collect()`, `take()`, `show()`, and `write()` are actions that trigger DAG execution. `select()`, `filter()`, and `withColumn()` are lazy transformations that merely build the query plan.'
            },
            {
              id: 'spk-q1-2',
              type: 'code-fill',
              prompt: 'Fill in the blanks to perform an optimized Broadcast Hash Join to prevent cluster shuffle.',
              codeTemplate: 'from pyspark.sql.functions import ___\n\njoined_df = large_telemetry_df.join(\n    ___(dim_lookup_df),\n    on="category_id",\n    how="___"\n)',
              wordBank: ['broadcast', 'broadcast', 'inner', 'collect', 'persist', 'repartition'],
              correctTokens: ['broadcast', 'broadcast', 'inner'],
              explanation: '`broadcast(small_df)` sends a copy of the lookup table to all executors, eliminating the expensive shuffle stage across the cluster network.'
            },
            {
              id: 'spk-q1-3',
              type: 'interactive-runner',
              prompt: 'Trigger an optimized PySpark DataFrame display with Catalyst execution plan.',
              starterCode: '# Initialize PySpark DataFrame logic\nfrom pyspark.sql import functions as F\n\n# Simulated Spark session invocation\ndf = spark.read.table("ai_embeddings")\nfiltered_df = df.filter(F.col("label") == 1.0)\nfiltered_df.show(4)',
              solutionCode: '# Initialize PySpark DataFrame logic\nfrom pyspark.sql import functions as F\n\ndf = spark.read.table("ai_embeddings")\nfiltered_df = df.filter(F.col("label") == 1.0)\nfiltered_df.show(4)',
              language: 'pyspark',
              explanation: 'PySpark compiles the filter and projection into a single physical stage before displaying rows.'
            }
          ]
        },
        {
          id: 'spark-1-2',
          unitId: 'spark-unit-1',
          title: 'Partitioning: Repartition vs Coalesce',
          description: 'Control cluster parallelism, eliminate small file problems, and manage data skew.',
          xpReward: 20,
          questions: [
            {
              id: 'spk-q2-1',
              type: 'multiple-choice',
              prompt: 'When reducing the number of partitions in a PySpark DataFrame from 200 to 10 before saving to S3, why is `coalesce(10)` preferred over `repartition(10)`?',
              options: [
                '`coalesce()` avoids a full network shuffle by collapsing adjacent partitions on existing nodes.',
                '`coalesce()` automatically compresses files with Gzip.',
                '`repartition()` cannot decrease partition count, only increase it.',
                '`coalesce()` executes on the Spark driver directly.'
              ],
              correctIndex: 0,
              explanation: '`coalesce()` minimizes data movement across nodes by merging existing partitions without triggering a full shuffle stage, saving network bandwidth.'
            },
            {
              id: 'spk-q2-2',
              type: 'bug-hunt',
              prompt: 'Identify the dangerous anti-pattern in this PySpark pipeline processing 100M rows:',
              code: 'df = spark.read.parquet("s3://ai-data/vectors/")\nall_records = df.collect()\nfor record in all_records:\n    process(record)',
              buggyLineIndex: 1,
              options: [
                'Calling .collect() pulls all 100M distributed records into the driver memory, causing an OutOfMemoryError (OOM) crash',
                'Parquet files cannot be read with spark.read.parquet()',
                'df.collect() returns a generator which cannot be iterated',
                'for loops are illegal in Python when used with Spark DataFrames'
              ],
              correctOptionIndex: 0,
              explanation: 'Never call .collect() on large distributed datasets! Distribute the computation using DataFrame API methods or .rdd.mapPartitions() across worker nodes.',
              fixExplanation: 'Never call `.collect()` on large datasets! Distribute the computation using DataFrame API methods or `.rdd.mapPartitions()` across worker nodes.'
            }
          ]
        }
      ],
      inquisition: {
        id: 'inq-spark-1',
        unitId: 'spark-unit-1',
        title: 'The Distributed Spark Cluster Inquisition',
        subtitle: 'Petabyte-Scale Engineering Checkpoint',
        enterpriseScenario: 'During nightly AI feature extraction, a 500-node Spark cluster encounters severe data skew: 99% of tasks finish in 2 minutes, but task 147 hangs for 4 hours before failing with `FetchFailedException: Connection refused`. You must redesign the partitioning, join strategy, and spill buffers to save the run.',
        timeLimitSeconds: 180,
        minimumPassPercentage: 80,
        xpReward: 140,
        gemReward: 70,
        badge: {
          id: 'badge-spark-master',
          title: 'Catalyst Conqueror',
          icon: '⚡',
          description: 'Eliminated cluster shuffle skew and mastered distributed execution.',
          tier: 'Gold'
        },
        questions: [
          {
            id: 'inq-spk-q1',
            type: 'multiple-choice',
            prompt: 'What technique effectively resolves extreme data skew when joining on a high-cardinality key with one dominant value (e.g. `null` or `unknown`)?',
            options: [
              'Salting: Append a random integer prefix (e.g. `concat(key, "_", floor(rand()*10))`) to distribute the hot key across multiple partitions.',
              'Increase executor cores to 64 to force single-thread execution.',
              'Switch from Parquet to CSV format.',
              'Set `spark.sql.shuffle.partitions = 1`.'
            ],
            correctIndex: 0,
            explanation: 'Key salting spreads the skewed rows across multiple buckets so no single reducer executor gets overwhelmed with all rows for that key.'
          },
          {
            id: 'inq-spk-q2',
            type: 'multiple-choice',
            prompt: 'In Spark Structured Streaming, what is the purpose of a "Watermark"?',
            options: [
              'It defines the threshold for how late incoming data can arrive before being discarded from stateful streaming aggregations.',
              'It marks the copyright owner of the dataset for compliance.',
              'It forces an hourly checkpoint to Amazon S3.',
              'It regulates executor CPU clock speed.'
            ],
            correctIndex: 0,
            explanation: 'Watermarks allow the Spark engine to clean up old aggregated state from executor memory once the engine is confident no further late-arriving events will arrive.'
          },
          {
            id: 'inq-spk-q3',
            type: 'pair-match',
            prompt: 'Match Apache Spark internal engine components:',
            pairs: [
              { id: 'sc1', left: 'Catalyst', right: 'Extensible query optimizer producing rule-based & cost-based logical/physical plans' },
              { id: 'sc2', left: 'Tungsten', right: 'In-memory execution engine with off-heap memory management & whole-stage code generation' },
              { id: 'sc3', left: 'Driver Node', right: 'Orchestrates DAG, translates code into stages/tasks, coordinates executors' },
              { id: 'sc4', left: 'AQE (Adaptive Query Execution)', right: 'Dynamically optimizes query plans at runtime based on completed stage statistics' }
            ],
            explanation: 'Deep knowledge of Catalyst, Tungsten, and AQE enables 10x-50x speedups in big data AI workloads.'
          }
        ]
      }
    }
  ]
};
