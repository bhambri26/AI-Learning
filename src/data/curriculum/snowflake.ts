import { Track } from '@/types/curriculum';

export const snowflakeTrack: Track = {
  meta: {
    id: 'snowflake',
    title: 'Snowflake Data Cloud & Snowpark',
    shortTitle: 'Snowflake',
    tagline: 'Scale AI feature warehouses with zero-copy cloning and Snowpark',
    description: 'Master Snowflake architecture: virtual warehouses, micro-partitions, Time Travel, zero-copy cloning, Streams & Tasks, and Snowpark Python.',
    icon: '❄️',
    badgeColor: 'bg-cyan-500',
    accentColor: '#06B6D4',
    level: 'Intermediate',
    estimatedHours: 22
  },
  units: [
    {
      id: 'snow-unit-1',
      trackId: 'snowflake',
      unitNumber: 1,
      title: 'Snowflake Architecture & Virtual Compute',
      description: 'Separate storage and compute, configure multi-cluster auto-scaling, and tune virtual warehouses.',
      color: 'bg-cyan-500',
      lessons: [
        {
          id: 'snow-1-1',
          unitId: 'snow-unit-1',
          title: 'Virtual Warehouses & Scaling Dimensions',
          description: 'Master the difference between Scaling Up (size) and Scaling Out (clusters).',
          xpReward: 15,
          questions: [
            {
              id: 'snow-q1-1',
              type: 'multiple-choice',
              prompt: 'If 50 data scientists submit simultaneous queries causing high query queuing in Snowflake, should you Scale Up (increase warehouse size) or Scale Out (add clusters)?',
              options: [
                'Scale Out: Enable Multi-Cluster Warehouses to handle concurrent query volume without queuing.',
                'Scale Up: Resize the warehouse from M to 4XL to speed up single-query execution.',
                'Switch from Standard to Enterprise edition.',
                'Run VACUUM on the database.'
              ],
              correctIndex: 0,
              explanation: 'Scaling Up (e.g. Medium to Large) accelerates complex individual long-running queries. Scaling Out (adding warehouse clusters) resolves high query concurrency and queuing.'
            },
            {
              id: 'snow-q1-2',
              type: 'code-fill',
              prompt: 'Fill in the blanks to create an auto-suspending, auto-resuming virtual warehouse for an ML inference pipeline.',
              codeTemplate: 'CREATE WAREHOUSE ml_infer_wh\n  WITH WAREHOUSE_SIZE = \'X-SMALL\'\n  AUTO_SUSPEND = ___\n  AUTO_RESUME = ___\n  INITIALLY_SUSPENDED = ___;',
              wordBank: ['60', 'TRUE', 'TRUE', 'FALSE', '3600', 'NEVER'],
              correctTokens: ['60', 'TRUE', 'TRUE'],
              explanation: 'Setting `AUTO_SUSPEND = 60` turns off compute after 1 minute of inactivity, and `AUTO_RESUME = TRUE` awakens the cluster in seconds upon receiving a query, preventing wasted cloud credits.'
            },
            {
              id: 'snow-q1-3',
              type: 'code-order',
              prompt: 'Order the SQL statements to instantly create a zero-storage staging clone of a 50-terabyte table for testing.',
              shuffledLines: [
                'CREATE OR REPLACE TABLE prod_features_clone',
                'CLONE prod_features_v2',
                'AT (OFFSET => -1800);'
              ],
              correctOrder: [0, 1, 2],
              language: 'sql',
              explanation: '`CREATE TABLE ... CLONE ... AT (OFFSET => -1800)` duplicates metadata pointers in seconds without copying underlying micro-partitions, capturing the snapshot from 30 minutes ago.'
            }
          ]
        },
        {
          id: 'snow-1-2',
          unitId: 'snow-unit-1',
          title: 'Streams & Tasks (Automated CDC)',
          description: 'Build continuous change-data-capture pipelines for real-time model retraining.',
          xpReward: 20,
          questions: [
            {
              id: 'snow-q2-1',
              type: 'multiple-choice',
              prompt: 'What does a Snowflake "Stream" object track on a target table?',
              options: [
                'Change Data Capture (CDC) deltas: INSERT, UPDATE, and DELETE actions including metadata like METADATA$ACTION and METADATA$ISUPDATE.',
                'Real-time network packet loss between Snowflake and AWS.',
                'Continuous audio/video streaming files.',
                'User login history from the web interface.'
              ],
              correctIndex: 0,
              explanation: 'Snowflake Streams record changes made to a table using micro-partition offsets, enabling downstream Tasks to process only net-new or modified rows.'
            },
            {
              id: 'snow-q2-2',
              type: 'pair-match',
              prompt: 'Match Snowflake features with their core capability:',
              pairs: [
                { id: 'sf1', left: 'Micro-partitioning', right: 'Automatic 50MB-500MB columnar files managed entirely by Snowflake without manual sharding' },
                { id: 'sf2', left: 'Zero-Copy Cloning', right: 'Instant snapshot of tables, schemas, or databases by duplicating metadata pointers with $0 storage cost' },
                { id: 'sf3', left: 'Time Travel', right: 'Query or restore historical states of data up to 90 days in the past using AT/BEFORE clauses' },
                { id: 'sf4', left: 'Snowpark', right: 'Execute Python, Java, or Scala DataFrames directly within Snowflake virtual compute engines' }
              ],
              explanation: 'Snowflake separates compute from immutable micro-partition storage, enabling rapid cloning and Time Travel.'
            }
          ]
        }
      ],
      inquisition: {
        id: 'inq-snow-1',
        unitId: 'snow-unit-1',
        title: 'The Snowflake Cloud Architect Inquisition',
        subtitle: 'Enterprise Cost & Concurrency Boss Battle',
        enterpriseScenario: 'A Fintech startup just received a surprise $120,000 monthly Snowflake bill due to unpruned queries and runaway multi-cluster warehouses. You must refactor clustering keys, implement resource monitors, and deploy a Snowpark CDC pipeline before the board meeting in 3 minutes.',
        timeLimitSeconds: 180,
        minimumPassPercentage: 80,
        xpReward: 150,
        gemReward: 75,
        badge: {
          id: 'badge-snow-master',
          title: 'Snowflake Architect',
          icon: '❄️',
          description: 'Optimized Snowflake warehouses and automated enterprise CDC pipelines.',
          tier: 'Gold'
        },
        questions: [
          {
            id: 'inq-snow-q1',
            type: 'multiple-choice',
            prompt: 'In Snowflake, how can you immediately restore a production table that was accidentally dropped with `DROP TABLE customer_scores;`?',
            options: [
              'UNDROP TABLE customer_scores;',
              'RESTORE DATABASE FROM S3 BACKUP;',
              'ROLLBACK TRANSACTION;',
              'RECOVER TABLE customer_scores FROM RECYCLE BIN;'
            ],
            correctIndex: 0,
            explanation: 'The `UNDROP TABLE` command instantaneously recovers dropped tables, schemas, or databases within the Time Travel retention period with zero data loss.'
          },
          {
            id: 'inq-snow-q2',
            type: 'multiple-choice',
            prompt: 'When writing Snowpark Python code, where does the DataFrame execution occur when calling `.collect()`?',
            options: [
              'The DataFrame operations are converted to SQL and executed inside Snowflake\'s Virtual Warehouse compute nodes; only the final result is returned to the client.',
              'All data is pulled over HTTP to the local laptop for execution in local Python RAM.',
              'It requires an external AWS Lambda function to execute.',
              'Inside the Snowflake Cloud Services metadata coordinator layer.'
            ],
            correctIndex: 0,
            explanation: 'Snowpark pushes computations down to the Snowflake engine as optimized SQL queries, leveraging the full elasticity of virtual warehouses.'
          },
          {
            id: 'inq-snow-q3',
            type: 'code-fill',
            prompt: 'Set up a resource monitor to prevent runaway spend by suspending warehouse at 100% credit quota.',
            codeTemplate: 'CREATE OR REPLACE RESOURCE MONITOR ml_budget_guard\n  WITH CREDIT_QUOTA = 500\n  FREQUENCY = MONTHLY\n  START_TIMESTAMP = IMMEDIATELY\n  TRIGGERS\n    ON ___ PERCENT DO SUSPEND;',
            wordBank: ['100', '90', '50', 'WARN', 'NOTIFY'],
            correctTokens: ['100'],
            explanation: 'Resource monitors enforce hard boundaries: `ON 100 PERCENT DO SUSPEND` shuts down warehouses to stop bill shock.'
          }
        ]
      }
    }
  ]
};

