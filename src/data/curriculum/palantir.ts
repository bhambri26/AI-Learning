import { Track } from '@/types/curriculum';

export const palantirTrack: Track = {
  meta: {
    id: 'palantir',
    title: 'Palantir Foundry & AIP Architecture',
    shortTitle: 'Palantir',
    tagline: 'Operationalize enterprise ontologies and mission-critical AIP agents',
    description: 'Learn how defense, healthcare, and Fortune 500 giants operationalize data. Master Foundry Datasets, Enterprise Ontologies, Workshop, and Palantir AIP.',
    icon: '🔮',
    badgeColor: 'bg-violet-500',
    accentColor: '#8B5CF6',
    level: 'Advanced',
    estimatedHours: 26
  },
  units: [
    {
      id: 'pal-unit-1',
      trackId: 'palantir',
      unitNumber: 1,
      title: 'Foundry Architecture & The Enterprise Ontology',
      description: 'Model real-world entities into Objects, Link Types, and Operational Actions.',
      color: 'bg-violet-500',
      lessons: [
        {
          id: 'pal-1-1',
          unitId: 'pal-unit-1',
          title: 'The Semantic Ontology Layer',
          description: 'Map raw tabular datasets into kinetic business objects and relations.',
          xpReward: 15,
          questions: [
            {
              id: 'pal-q1-1',
              type: 'multiple-choice',
              prompt: 'In Palantir Foundry, what is the primary role of the "Enterprise Ontology"?',
              options: [
                'It is the digital twin of the enterprise: translating raw tables into kinetic business Objects (e.g. Flight, Patient, Turbine), Link Types, and Actions.',
                'It is an encrypted password manager for system administrators.',
                'It is a pure BI reporting dashboard replacement for Tableau.',
                'It is a hardware virtualization layer for Docker containers.'
              ],
              correctIndex: 0,
              explanation: 'The Foundry Ontology abstracts tabular data schemas into meaningful semantic business entities (Objects), relational ties (Link Types), and executable business operations (Actions).'
            },
            {
              id: 'pal-q1-2',
              type: 'pair-match',
              prompt: 'Match Palantir Foundry components to their operational purpose:',
              pairs: [
                { id: 'pp1', left: 'Ontology Action', right: 'A governed mutation modifying object properties or executing external enterprise logic with audit logging' },
                { id: 'pp2', left: 'Workshop', right: 'An application builder for creating operational, high-interactivity web apps powered by Ontology objects' },
                { id: 'pp3', left: 'Pipeline Builder', right: 'A web-based visual environment for building batch and streaming data transformation pipelines' },
                { id: 'pp4', left: 'Palantir AIP', right: 'Platform integrating LLMs and generative agents directly into the governed Enterprise Ontology' }
              ],
              explanation: 'Foundry is built to bridge data engineering directly into end-user operational decision making.'
            },
            {
              id: 'pal-q1-3',
              type: 'code-order',
              prompt: 'Arrange the sequence for defining a secure Palantir AIP generative agent workflow.',
              shuffledLines: [
                '1. Back backing datasets into Enterprise Object Types (e.g., SupplyShipment).',
                '2. Define governed Actions with strict parameter bounds and approvals.',
                '3. Expose Object Actions to AIP Logic functions as callable tools for the LLM.',
                '4. Deploy AIP Automate to trigger ontology actions upon event arrival.'
              ],
              correctOrder: [0, 1, 2, 3],
              language: 'palantir',
              explanation: 'AIP agents must be grounded in governed Ontology objects and constrained to verified Actions before automated execution.'
            }
          ]
        },
        {
          id: 'pal-1-2',
          unitId: 'pal-unit-1',
          title: 'Palantir AIP (Artificial Intelligence Platform)',
          description: 'Anchor LLMs into enterprise security boundaries, avoiding hallucinations and data leaks.',
          xpReward: 20,
          questions: [
            {
              id: 'pal-q2-1',
              type: 'multiple-choice',
              prompt: 'How does Palantir AIP prevent LLMs from taking destructive unauthorized enterprise actions?',
              options: [
                'By enforcing strict Ontology Action permissions: LLMs can only propose or execute pre-authorized Actions bounded by user ACLs and human-in-the-loop review.',
                'By disabling all write access across the entire platform permanently.',
                'By training proprietary models without knowledge of SQL.',
                'By relying entirely on prompt engineering instructions like "Please do not delete data".'
              ],
              correctIndex: 0,
              explanation: 'Palantir AIP treats the LLM as a reasoned planner that can only interact with the enterprise via governed Ontology Actions, governed by cryptographic audit trails and user permissions.'
            },
            {
              id: 'pal-q2-2',
              type: 'code-fill',
              prompt: 'Fill in the blanks to define a TypeScript Function-on-Objects in Palantir Foundry.',
              codeTemplate: 'import { Function, Integer } from "@foundry/functions-api";\nimport { Objects, Patient } from "@foundry/ontology-api";\n\nexport class PatientRiskFunctions {\n    @Function()\n    public calculateRiskScore(patient: Patient): ___ {\n        return patient.vitalsCount * 1.5 + patient.age * ___\n    }\n}',
              wordBank: ['Double', '0.2', 'Integer', 'void', 'String'],
              correctTokens: ['Double', '0.2'],
              explanation: 'Functions on Objects in Foundry use TypeScript with strongly typed Ontology bindings to compute live reactive values.'
            }
          ]
        }
      ],
      inquisition: {
        id: 'inq-pal-1',
        unitId: 'pal-unit-1',
        title: 'The Palantir AIP & Ontology Architect Inquisition',
        subtitle: 'Enterprise Kinetic Decision System Boss Battle',
        enterpriseScenario: 'During a global aerospace supply disruption, a critical aircraft fleet is grounded. You must build an end-to-end Ontology linking Aircraft, ReplacementParts, and FlightSchedules, wire an AIP Logic agent to re-route critical parts, and ensure Zero-Trust clearance checks within 3 minutes.',
        timeLimitSeconds: 180,
        minimumPassPercentage: 80,
        xpReward: 160,
        gemReward: 80,
        badge: {
          id: 'badge-pal-master',
          title: 'Ontology Master',
          icon: '🔮',
          description: 'Constructed an enterprise digital twin and deployed governed AIP agents.',
          tier: 'Platinum'
        },
        questions: [
          {
            id: 'inq-pal-q1',
            type: 'multiple-choice',
            prompt: 'In Foundry Compass, what happens to downstream artifacts when you create a Branch on a Dataset?',
            options: [
              'Branching provides isolated Git-like lineage: changes in the branch do not affect Master until evaluated and merged via Pull Request.',
              'All downstream production dashboards are immediately locked until the branch is deleted.',
              'The underlying S3 storage is duplicated byte-for-byte immediately.',
              'Branching is only permitted on metadata, not on data transforms.'
            ],
            correctIndex: 0,
            explanation: 'Foundry provides native data branching: you can test transformations, verify schema impacts, and preview downstream outcomes safely without contaminating production.'
          },
          {
            id: 'inq-pal-q2',
            type: 'multiple-choice',
            prompt: 'What distinguishes Palantir AIP Logic from a standard conversational ChatGPT chatbot?',
            options: [
              'AIP Logic binds LLM reasoning chains directly into parameterized Ontology Functions, tool calls, and automated evaluation suites with strict provenance tracking.',
              'AIP Logic has no UI and runs only in command-line terminals.',
              'AIP Logic does not support Retrieval Augmented Generation (RAG).',
              'AIP Logic only runs on local laptops without cloud connection.'
            ],
            correctIndex: 0,
            explanation: 'AIP Logic empowers enterprise developers to create deterministic LLM workflows where every step is grounded in enterprise ontology schemas and tracked in security audit logs.'
          },
          {
            id: 'inq-pal-q3',
            type: 'pair-match',
            prompt: 'Match Palantir Foundry Security primitives to their roles:',
            pairs: [
              { id: 'sp1', left: 'Markings', right: 'Cryptographic security labels that travel with data downstream through all transforms and derived objects' },
              { id: 'sp2', left: 'Roles & Permissions', right: 'Viewer, Editor, Owner access levels assigned at the Project or Folder level' },
              { id: 'sp3', left: 'Audit Trail', right: 'Immutable cryptographic ledger recording every user interaction, query, and AIP action' },
              { id: 'sp4', left: 'Data Lineage', right: 'Visual DAG displaying the full origin and downstream dependency graph of every dataset' }
            ],
            explanation: 'Palantir\'s Marking inheritance ensures classified or restricted data can never be accidentally leaked by downstream users or LLMs.'
          }
        ]
      }
    }
  ]
};

