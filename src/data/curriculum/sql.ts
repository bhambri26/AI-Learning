import { Track } from '@/types/curriculum';

export const sqlTrack: Track = {
  meta: {
    id: 'sql',
    title: 'SQL & Relational Intelligence',
    shortTitle: 'SQL',
    tagline: 'Master analytical queries, window functions, and enterprise CTEs',
    description: 'The foundation of data engineering and feature stores. Learn window calculations, recursive CTEs, and query optimization.',
    icon: '📊',
    badgeColor: 'bg-sky-500',
    accentColor: '#0EA5E9',
    level: 'Beginner',
    estimatedHours: 20
  },
  units: [
    {
      id: 'sql-unit-1',
      trackId: 'sql',
      unitNumber: 1,
      title: 'Window Functions & Advanced Analytics',
      description: 'Compute rolling aggregates, rankings, and lead/lag temporal offsets without costly self-joins.',
      color: 'bg-sky-500',
      lessons: [
        {
          id: 'sql-1-1',
          unitId: 'sql-unit-1',
          title: 'ROW_NUMBER vs DENSE_RANK',
          description: 'Differentiate analytical rankings when dealing with ties in model metrics.',
          xpReward: 15,
          questions: [
            {
              id: 'sql-q1-1',
              type: 'multiple-choice',
              prompt: 'If three models tie with an accuracy score of 0.95 at rank 1, what rank does the fourth model receive when using `DENSE_RANK()` versus `RANK()`?',
              options: [
                'DENSE_RANK() assigns 2, while RANK() assigns 4',
                'DENSE_RANK() assigns 4, while RANK() assigns 2',
                'Both assign rank 2',
                'Both assign rank 4'
              ],
              correctIndex: 0,
              explanation: '`DENSE_RANK()` leaves no gaps in ranking sequence after ties (1, 1, 1, 2), whereas `RANK()` skips positions based on count of ties (1, 1, 1, 4).'
            },
            {
              id: 'sql-q1-2',
              type: 'code-fill',
              prompt: 'Fill in the blanks to calculate the rolling 7-day average latency partitioned by model.',
              codeTemplate: 'SELECT model_id, date, latency,\n       AVG(latency) OVER (\n           PARTITION BY ___\n           ORDER BY ___\n           ROWS BETWEEN 6 PRECEDING AND ___\n       ) as rolling_avg_latency\nFROM model_telemetry',
              wordBank: ['model_id', 'date', 'CURRENT ROW', 'latency', 'UNBOUNDED PRECEDING', 'GROUP BY'],
              correctTokens: ['model_id', 'date', 'CURRENT ROW'],
              explanation: '`PARTITION BY model_id` isolates the window per model, `ORDER BY date` establishes temporal order, and `ROWS BETWEEN 6 PRECEDING AND CURRENT ROW` bounds the 7-row frame.'
            },
            {
              id: 'sql-q1-3',
              type: 'interactive-runner',
              prompt: 'Execute a SQL query to select all AI models having latency_ms < 300, ordered by latency ascending.',
              starterCode: 'SELECT model_name, latency_ms, tokens_per_sec \nFROM ai_models \nWHERE latency_ms < 300 \nORDER BY latency_ms ASC;',
              solutionCode: 'SELECT model_name, latency_ms, tokens_per_sec FROM ai_models WHERE latency_ms < 300 ORDER BY latency_ms ASC;',
              language: 'sql',
              explanation: 'The WHERE clause filters latency under 300ms, and ORDER BY sorts lowest latency first.'
            }
          ]
        },
        {
          id: 'sql-1-2',
          unitId: 'sql-unit-1',
          title: 'Common Table Expressions (CTEs)',
          description: 'Structure modular, readable data transformation pipelines with WITH clauses.',
          xpReward: 20,
          questions: [
            {
              id: 'sql-q2-1',
              type: 'multiple-choice',
              prompt: 'Why are CTEs (Common Table Expressions) preferred over deeply nested subqueries in production feature pipelines?',
              options: [
                'They dramatically improve human readability, allow top-down sequential reasoning, and can be referenced multiple times.',
                'CTEs always run on GPU memory whereas subqueries run on disk.',
                'Subqueries are deprecated in modern SQL-2016 standards.',
                'CTEs automatically create permanent physical database views.'
              ],
              correctIndex: 0,
              explanation: 'CTEs (`WITH cte_name AS (...)`) make complex multistep transformations maintainable, debuggable, and modular.'
            },
            {
              id: 'sql-q2-2',
              type: 'code-order',
              prompt: 'Arrange this query to deduplicate customer inference requests keeping only the latest event per request_id.',
              shuffledLines: [
                'WITH RankedRequests AS (',
                '    SELECT request_id, prompt, response, created_at,',
                '           ROW_NUMBER() OVER(PARTITION BY request_id ORDER BY created_at DESC) as rn',
                '    FROM llm_request_logs',
                ')',
                'SELECT request_id, prompt, response FROM RankedRequests WHERE rn = 1;'
              ],
              correctOrder: [0, 1, 2, 3, 4, 5],
              language: 'sql',
              explanation: 'The CTE tags each row with `rn = 1` for the latest `created_at`, and the outer query filters `rn = 1`.'
            }
          ]
        }
      ],
      inquisition: {
        id: 'inq-sql-1',
        unitId: 'sql-unit-1',
        title: 'The Enterprise SQL Optimization Inquisition',
        subtitle: 'High-Throughput Analytics Boss Battle',
        enterpriseScenario: 'A mission-critical data lake query powering an AI dashboard is timing out after scanning 50 billion records. The CFO is furious about cloud query costs. You must identify sargable filters, resolve Cartesian explosions, and optimize window aggregations in under 3 minutes.',
        timeLimitSeconds: 180,
        minimumPassPercentage: 80,
        xpReward: 120,
        gemReward: 60,
        badge: {
          id: 'badge-sql-master',
          title: 'SQL Grandmaster',
          icon: '📊',
          description: 'Passed the High-Throughput SQL Inquisition with zero table scans.',
          tier: 'Silver'
        },
        questions: [
          {
            id: 'inq-sql-q1',
            type: 'multiple-choice',
            prompt: 'Which predicate is "SARGable" (Search Argument Able), enabling the query optimizer to utilize an index on `created_at`?',
            options: [
              'WHERE created_at >= \'2024-01-01\' AND created_at < \'2024-02-01\'',
              'WHERE YEAR(created_at) = 2024 AND MONTH(created_at) = 1',
              'WHERE DATE_TRUNC(\'month\', created_at) = \'2024-01-01\'',
              'WHERE TO_CHAR(created_at, \'YYYY-MM\') = \'2024-01\''
            ],
            correctIndex: 0,
            explanation: 'Wrapping an indexed column in a function (`YEAR()`, `DATE_TRUNC()`) prevents the engine from seeking the B-Tree index, forcing an expensive full table scan.'
          },
          {
            id: 'inq-sql-q2',
            type: 'multiple-choice',
            prompt: 'In SQL, what is the key behavioral difference between `COUNT(*)` and `COUNT(column_name)`?',
            options: [
              '`COUNT(*)` counts all rows including NULLs, while `COUNT(column_name)` counts only rows where column_name is NOT NULL.',
              '`COUNT(*)` is slower because it scans all column payloads into memory.',
              '`COUNT(column_name)` automatically performs a DISTINCT deduplication.',
              'There is no difference in ANSI SQL.'
            ],
            correctIndex: 0,
            explanation: '`COUNT(*)` returns total row count regardless of NULL values, whereas `COUNT(col)` ignores NULL values in that specific column.'
          },
          {
            id: 'inq-sql-q3',
            type: 'pair-match',
            prompt: 'Match SQL JOIN mechanisms to their operational behavior:',
            pairs: [
              { id: 'j1', left: 'LEFT SEMI JOIN', right: 'Returns rows from left table that have at least one match on right, without duplicating rows' },
              { id: 'j2', left: 'LEFT ANTI JOIN', right: 'Returns rows from left table that have NO matches on right table' },
              { id: 'j3', left: 'CROSS JOIN', right: 'Computes Cartesian product of both tables (N x M rows)' },
              { id: 'j4', left: 'INNER JOIN', right: 'Returns only rows with matching join keys in both datasets' }
            ],
            explanation: 'Semi and Anti joins are critical for clean subquery replacements in high-performance data engineering.'
          }
        ]
      }
    }
  ]
};

