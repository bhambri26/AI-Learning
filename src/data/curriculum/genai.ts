import { Track } from '@/types/curriculum';

export const genaiTrack: Track = {
  meta: {
    id: 'genai',
    title: 'Generative AI & LLM Engineering',
    shortTitle: 'Generative AI',
    tagline: 'Build Transformers, RAG systems, LoRA fine-tuning, and AI agents',
    description: 'Master Transformer mechanics, Scaled Dot-Product Attention, Vector Databases, Production RAG, LoRA/QLoRA fine-tuning, and Autonomous Multi-Agent Swarms.',
    icon: '✨',
    badgeColor: 'bg-pink-500',
    accentColor: '#EC4899',
    level: 'Enterprise Mastery',
    estimatedHours: 35
  },
  units: [
    {
      id: 'genai-unit-1',
      trackId: 'genai',
      unitNumber: 1,
      title: 'Attention Mechanisms, RAG & Vector Intelligence',
      description: 'Dissect the Transformer self-attention formula and build hybrid retrieval-augmented generation.',
      color: 'bg-pink-500',
      lessons: [
        {
          id: 'genai-1-1',
          unitId: 'genai-unit-1',
          title: 'The Transformer Attention Formula',
          description: 'Calculate queries, keys, values, and understand why we divide by sqrt(d_k).',
          xpReward: 20,
          questions: [
            {
              id: 'gen-q1-1',
              type: 'multiple-choice',
              prompt: 'In the Attention formula: Attention(Q, K, V) = softmax(Q * K^T / sqrt(d_k)) * V, why is the dot product scaled by 1/sqrt(d_k)?',
              options: [
                'To prevent dot products from growing excessively large for large dimensions d_k, which would push the softmax function into regions with vanishing gradients.',
                'To convert complex numbers into real numbers.',
                'To compress the model weights onto edge mobile devices.',
                'To eliminate the need for positional embeddings.'
              ],
              correctIndex: 0,
              explanation: 'Without scaling by sqrt(d_k), for large vector dimensions the dot product magnitude grows proportional to d_k. This drives the softmax into saturation regions where gradients approach zero, stalling backpropagation.'
            },
            {
              id: 'gen-q1-2',
              type: 'code-fill',
              prompt: 'Fill in the blanks to calculate Cosine Similarity between two normalized embedding vectors.',
              codeTemplate: 'import numpy as np\n\ndef cosine_similarity(v1, v2):\n    dot_product = np.dot(v1, v2)\n    norm_product = np.linalg.norm(v1) * np.linalg.___(v2)\n    return dot_product / ___',
              wordBank: ['norm', 'norm_product', 'dot_product', 'sqrt', 'mean'],
              correctTokens: ['norm', 'norm_product'],
              explanation: 'Cosine similarity is the dot product of two vectors divided by the product of their L2 norms: (v1 · v2) / (||v1|| * ||v2||).'
            },
            {
              id: 'gen-q1-3',
              type: 'code-order',
              prompt: 'Arrange the sequence of a production Retrieval Augmented Generation (RAG) query cycle.',
              shuffledLines: [
                '1. User submits natural language question.',
                '2. Embedding model converts question into high-dimensional dense vector.',
                '3. Vector DB executes Approximate Nearest Neighbor (ANN/HNSW) search for top-k chunks.',
                '4. Cross-Encoder re-ranks candidate chunks for maximal semantic relevance.',
                '5. Augmented prompt with context chunks and instructions is streamed to LLM.'
              ],
              correctOrder: [0, 1, 2, 3, 4],
              language: 'genai',
              explanation: 'A production RAG pipeline embeds the query, retrieves candidate chunks via ANN, re-ranks using a cross-encoder, and feeds grounded context to the generator.'
            }
          ]
        },
        {
          id: 'genai-1-2',
          unitId: 'genai-unit-1',
          title: 'Fine-Tuning: LoRA & Parameter-Efficient Tuning',
          description: 'Adapt massive open-source LLMs using low-rank matrix decomposition.',
          xpReward: 25,
          questions: [
            {
              id: 'gen-q2-1',
              type: 'multiple-choice',
              prompt: 'How does LoRA (Low-Rank Adaptation) enable fine-tuning a 70B parameter LLM on consumer hardware with minimal VRAM?',
              options: [
                'It freezes the pre-trained weight matrix W and injects trainable rank-decomposition matrices A and B (where ΔW = B * A, with rank r << d), training <1% of parameters.',
                'It deletes 90% of transformer layers from the network.',
                'It converts all weights from float16 to 1-bit integers without additional matrices.',
                'It runs backpropagation only on the embedding layer.'
              ],
              correctIndex: 0,
              explanation: 'LoRA freezes base weights and decomposes the weight update into two low-rank matrices (d x r and r x k). When r is small (e.g. r=8 or 16), trainable parameters and optimizer states drop by 99%.'
            },
            {
              id: 'gen-q2-2',
              type: 'pair-match',
              prompt: 'Match Generative AI engineering concepts with their core definition:',
              pairs: [
                { id: 'gp1', left: 'KV Cache', right: 'Stores Key and Value projection states of previous tokens to prevent O(N^2) redundant computation during autoregressive generation' },
                { id: 'gp2', left: 'HNSW', right: 'Hierarchical Navigable Small World graph for lightning-fast sub-millisecond vector similarity search' },
                { id: 'gp3', left: 'ReAct Agent', right: 'Paradigm interleaving "Reasoning" (Thought) and "Action" (Tool Call execution) in cyclical steps' },
                { id: 'gp4', left: 'Temperature', right: 'Hyperparameter scaling logits prior to softmax to modulate entropy and creativity in token generation' }
              ],
              explanation: 'Understanding the engineering levers of LLMs allows you to design latency-critical AI systems.'
            }
          ]
        }
      ],
      inquisition: {
        id: 'inq-genai-1',
        unitId: 'genai-unit-1',
        title: 'The Supreme Generative AI & Agent Architect Inquisition',
        subtitle: 'Production LLM Systems & Hallucination Elimination Boss Battle',
        enterpriseScenario: 'You are deploying an Autonomous Multi-Agent AI system that diagnoses patient data, queries Snowflake feature tables, and triggers Palantir actions. In staging, the agent hallucinated an invalid API tool call and exceeded token context windows. You have 3 minutes to enforce schema guardrails, configure semantic caching, and stabilize the KV cache.',
        timeLimitSeconds: 180,
        minimumPassPercentage: 80,
        xpReward: 200,
        gemReward: 100,
        badge: {
          id: 'badge-genai-master',
          title: 'Supreme AI Architect',
          icon: '✨',
          description: 'Architected production-ready RAG, LoRA fine-tuning, and resilient multi-agent swarms.',
          tier: 'Diamond'
        },
        questions: [
          {
            id: 'inq-gen-q1',
            type: 'multiple-choice',
            prompt: 'When building an autonomous AI agent with tool calling, how do you mathematically guarantee that the LLM generates valid JSON matching your schema?',
            options: [
              'Grammar-Constrained Decoding / Logit Masking: Masking out invalid token logits at each generation step using a context-free grammar or JSON Schema state machine.',
              'Prompting the model with "Please output only valid JSON, do not make mistakes".',
              'Running regex matching after generation and re-generating up to 100 times.',
              'Setting temperature = 2.0.'
            ],
            correctIndex: 0,
            explanation: 'Grammar-constrained sampling (e.g. Outlines, Guidance, llama.cpp grammars) evaluates the JSON schema finite-state machine at every step, setting the logits of any illegal syntax token to -infinity, guaranteeing 100% valid schema compliance.'
          },
          {
            id: 'inq-gen-q2',
            type: 'multiple-choice',
            prompt: 'In production RAG systems, what is the "Lost in the Middle" phenomenon discovered by researchers?',
            options: [
              'LLMs attend significantly better to relevant facts placed at the extreme beginning or end of the input context window, frequently overlooking critical context placed in the middle.',
              'Vector databases fail to index tokens between lines 500 and 1000.',
              'Embeddings become zero vectors when text chunks exceed 512 tokens.',
              'A memory leak that occurs in the center of GPU VRAM.'
            ],
            correctIndex: 0,
            explanation: 'Extensive empirical research proves performance degrades substantially when key facts are situated in the middle of long context prompts; strategic prompt re-ordering places highest-relevance chunks at the top and bottom.'
          },
          {
            id: 'inq-gen-q3',
            type: 'code-fill',
            prompt: 'Assemble a Pydantic tool call schema for an enterprise SQL agent.',
            codeTemplate: 'from pydantic import BaseModel, Field\n\nclass ExecuteQueryTool(BaseModel):\n    sql_query: str = Field(..., description="Valid SQL query to execute")\n    timeout_seconds: int = Field(default=___, le=60)\n    max_rows: int = Field(default=___, le=1000)',
            wordBank: ['30', '100', '999999', 'False', 'None'],
            correctTokens: ['30', '100'],
            explanation: 'Strongly typed schemas with explicit defaults and bounds protect databases from unbounded queries initiated by agent planning loops.'
          }
        ]
      }
    }
  ]
};

