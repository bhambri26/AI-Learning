import { Track } from '@/types/curriculum';

export const databricksTrack: Track = {
  meta: {
    id: 'databricks',
    title: 'Databricks Lakehouse & Unity Catalog',
    shortTitle: 'Databricks',
    tagline: 'Architect enterprise Lakehouses, Delta Lake & MLflow pipelines',
    description: 'Unify data engineering, governance, and ML. Master the Medallion architecture, Delta ACID transactions, Unity Catalog, and Delta Live Tables.',
    icon: '🧱',
    badgeColor: 'bg-red-500',
    accentColor: '#EF4444',
    level: 'Intermediate',
    estimatedHours: 25
  },
  units: [
    {
      id: 'dbx-unit-1',
      trackId: 'databricks',
      unitNumber: 1,
      title: 'Medallion Architecture & Delta Lake Internals',
      description: 'Design Bronze, Silver, and Gold pipelines with ACID transactions and Z-Ordering.',
      color: 'bg-red-500',
      lessons: [
        {
          id: 'dbx-1-1',
          unitId: 'dbx-unit-1',
          title: 'The Medallion Multi-Hop Pattern',
          description: 'Classify data curation stages across raw, cleaned, and feature-ready tiers.',
          xpReward: 15,
          questions: [
            {
              id: 'dbx-q1-1',
              type: 'multiple-choice',
              prompt: 'In the Databricks Medallion architecture, what is the primary role of the "Silver" tier?',
              options: [
                'Cleaned, validated, and enriched data with unified schemas for enterprise-wide analysis and feature engineering',
                'Raw, unprocessed JSON append-only event dump',
                'Aggregated business-level KPI summaries for C-level dashboards only',
                'Archival storage destined for long-term cold tape backup'
              ],
              correctIndex: 0,
              explanation: 'Bronze stores raw ingested events; Silver cleans, dedupes, and structures data into a source-of-truth; Gold serves aggregated feature stores and business metrics.'
            },
            {
              id: 'dbx-q1-2',
              type: 'code-fill',
              prompt: 'Fill in the blanks to perform file compaction and co-locality clustering on a Delta table.',
              codeTemplate: 'OPTIMIZE feature_store_delta\n___ BY (user_id, event_timestamp);',
              wordBank: ['ZORDER', 'PARTITION', 'CLUSTER', 'GROUP', 'SORT'],
              correctTokens: ['ZORDER'],
              explanation: '`OPTIMIZE ... ZORDER BY` co-locates related information within the same set of files, minimizing the number of Parquet files scanned during filtered queries.'
            },
            {
              id: 'dbx-q1-3',
              type: 'code-order',
              prompt: 'Arrange the SQL statements to query historical data and revert an accidental corrupted table update.',
              shuffledLines: [
                'DESCRIBE HISTORY ml_training_features;',
                'SELECT * FROM ml_training_features VERSION AS OF 14;',
                'RESTORE TABLE ml_training_features TO VERSION AS OF 14;'
              ],
              correctOrder: [0, 1, 2],
              language: 'sql',
              explanation: 'First inspect the transaction log history, verify the historical snapshot with Time Travel `VERSION AS OF`, then call `RESTORE TABLE`.'
            }
          ]
        },
        {
          id: 'dbx-1-2',
          unitId: 'dbx-unit-1',
          title: 'Unity Catalog Governance & Lineage',
          description: 'Enforce three-tier namespaces and fine-grained data security across clouds.',
          xpReward: 20,
          questions: [
            {
              id: 'dbx-q2-1',
              type: 'multiple-choice',
              prompt: 'What is the correct 3-level namespace format introduced by Databricks Unity Catalog?',
              options: [
                'catalog.schema.table',
                'database.schema.table',
                'workspace.database.table',
                'cloud.region.dataset'
              ],
              correctIndex: 0,
              explanation: 'Unity Catalog structures data governance as `catalog_name.schema_name.table_name`, enabling centralized cross-workspace permissions and data lineage.'
            },
            {
              id: 'dbx-q2-2',
              type: 'pair-match',
              prompt: 'Match Databricks ecosystem technologies to their primary function:',
              pairs: [
                { id: 'dp1', left: 'Delta Lake', right: 'Storage layer providing ACID transactions, time travel, and unified streaming/batch' },
                { id: 'dp2', left: 'Unity Catalog', right: 'Unified governance for data, tables, models, and notebooks across cloud clouds' },
                { id: 'dp3', left: 'Delta Live Tables', right: 'Declarative framework for building reliable, testable data pipelines with automatic quality expectations' },
                { id: 'dp4', left: 'MLflow Registry', right: 'Lifecycle management tool for tracking experiments, packaging code, and deploying models' }
              ],
              explanation: 'The Databricks Lakehouse combines storage, compute, and governance into a unified AI engine.'
            }
          ]
        }
      ],
      inquisition: {
        id: 'inq-dbx-1',
        unitId: 'dbx-unit-1',
        title: 'The Databricks Lakehouse Architect Inquisition',
        subtitle: 'Enterprise AI Governance & Performance Boss Battle',
        enterpriseScenario: 'A healthcare AI system hosted on Databricks suffered a schema drift event that corrupts patient features. Simultaneously, privacy auditors demand full data lineage and row-level masking for PII columns. You must configure Unity Catalog ACLs, repair Delta transactions, and optimize streaming reads in 3 minutes.',
        timeLimitSeconds: 180,
        minimumPassPercentage: 80,
        xpReward: 150,
        gemReward: 75,
        badge: {
          id: 'badge-dbx-master',
          title: 'Lakehouse Grand Architect',
          icon: '🧱',
          description: 'Orchestrated Medallion pipelines and locked down Unity Catalog security.',
          tier: 'Gold'
        },
        questions: [
          {
            id: 'inq-dbx-q1',
            type: 'multiple-choice',
            prompt: 'In Delta Lake, how does the transaction log (`_delta_log/`) maintain ACID guarantees without distributed locks?',
            options: [
              'Through Optimistic Concurrency Control (OCC) and atomic commit file serialization (`00000.json`, `00001.json`) with periodic Parquet checkpoint files.',
              'By establishing a 2-phase commit lock on AWS S3 / Azure ADLS hardware.',
              'Using a single centralized PostgreSQL metadata coordinator.',
              'By forcing all writes to happen sequentially on the Spark driver node.'
            ],
            correctIndex: 0,
            explanation: 'Delta Lake uses optimistic concurrency control: commits write sequentially numbered JSON logs, verifying that no conflicting commit altered the targeted partition.'
          },
          {
            id: 'inq-dbx-q2',
            type: 'multiple-choice',
            prompt: 'In Delta Live Tables (DLT), how do you enforce data quality constraints so rows failing validation are dropped automatically?',
            options: [
              '@dlt.table\n@dlt.expect_or_drop("valid_age", "patient_age BETWEEN 0 AND 120")',
              '@dlt.table\n@dlt.abort_if("patient_age < 0")',
              'CHECK CONSTRAINT patient_age ON FAIL DROP',
              'ALTER TABLE ADD DROP RULE patient_age'
            ],
            correctIndex: 0,
            explanation: '`@dlt.expect_or_drop` guarantees that dirty records failing the boolean SQL predicate are automatically excluded without failing the entire pipeline run.'
          },
          {
            id: 'inq-dbx-q3',
            type: 'code-fill',
            prompt: 'Grant a data science group permission to read a sanitized view in Unity Catalog.',
            codeTemplate: 'GRANT ___ ON VIEW prod_catalog.ml_features.sanitized_patients TO `___`;',
            wordBank: ['SELECT', 'data_scientists', 'READ', 'ADMIN', 'ALL PRIVILEGES'],
            correctTokens: ['SELECT', 'data_scientists'],
            explanation: 'In Unity Catalog, SQL standard `GRANT SELECT ON VIEW <namespace> TO <principal>` assigns fine-grained read privileges.'
          }
        ]
      }
    }
  ]
};

