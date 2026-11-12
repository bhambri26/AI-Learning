import { Track } from '@/types/curriculum';

export const pythonTrack: Track = {
  meta: {
    id: 'python',
    title: 'Python for AI & Systems',
    shortTitle: 'Python',
    tagline: 'From zero to Pythonic high-performance AI scripting',
    description: 'Master core syntax, data structures, generators, OOP, async pipelines, and vectorized logic required for AI engineering.',
    icon: '🐍',
    badgeColor: 'bg-emerald-500',
    accentColor: '#10B981',
    level: 'Beginner',
    estimatedHours: 24
  },
  units: [
    {
      id: 'py-unit-1',
      trackId: 'python',
      unitNumber: 1,
      title: 'Python Core & Vectorized Foundations',
      description: 'Variables, dynamic typing, list comprehensions, and dictionaries.',
      color: 'bg-emerald-500',
      lessons: [
        {
          id: 'py-1-1',
          unitId: 'py-unit-1',
          title: 'Dynamic Typing & Truthiness',
          description: 'Explore variables, memory references, and boolean evaluations in Python.',
          xpReward: 15,
          questions: [
            {
              id: 'py-q1-1',
              type: 'multiple-choice',
              prompt: 'In Python, which of the following expressions evaluates to False in a boolean context?',
              options: [
                'bool([0])',
                'bool({})',
                'bool("False")',
                'bool(-1)'
              ],
              correctIndex: 1,
              explanation: 'Empty containers like empty dictionaries {}, empty lists [], empty sets, 0, and None evaluate to False. Non-empty containers like [0] or strings like "False" evaluate to True.'
            },
            {
              id: 'py-q1-2',
              type: 'code-fill',
              prompt: 'Fill in the blanks to define a function that calculates batch average loss.',
              codeTemplate: '___ compute_loss(losses):\n    if not losses:\n        return ___\n    return sum(losses) / ___',
              wordBank: ['def', '0.0', 'len(losses)', 'function', 'None', 'losses.size'],
              correctTokens: ['def', '0.0', 'len(losses)'],
              explanation: 'In Python, `def` defines functions, and `len()` returns the count of items in a sequence.'
            },
            {
              id: 'py-q1-3',
              type: 'code-order',
              prompt: 'Rearrange these lines to safely extract an embedding vector from a dictionary with a default fallback.',
              shuffledLines: [
                'embedding = model_weights.get(token, default_vector)',
                'token = "transformer"',
                'print(f"Loaded dimension: {len(embedding)}")',
                'default_vector = [0.0] * 768'
              ],
              correctOrder: [3, 1, 0, 2],
              language: 'python',
              explanation: 'First initialize `default_vector`, set the target `token`, call `.get(token, default_vector)` to avoid KeyError, then print.'
            }
          ]
        },
        {
          id: 'py-1-2',
          unitId: 'py-unit-1',
          title: 'List & Dict Comprehensions',
          description: 'Harness high-speed Pythonic comprehensions for feature extraction.',
          xpReward: 20,
          questions: [
            {
              id: 'py-q2-1',
              type: 'bug-hunt',
              prompt: 'Find the bug in this token length filter comprehension:',
              code: 'tokens = ["attention", "is", "all", "you", "need"]\nfiltered = [t.upper() for t in tokens if len(t) > 3 else "SHORT"]',
              buggyLineIndex: 1,
              options: [
                'SyntaxError: In comprehensions, if-else ternary must precede the for loop: [t.upper() if len(t) > 3 else "SHORT" for t in tokens]',
                'List comprehensions cannot call string methods like .upper()',
                'len() is not allowed inside list comprehensions',
                'tokens must be converted to a numpy array first'
              ],
              correctOptionIndex: 0,
              explanation: 'When using if-else (ternary expression) in a comprehension, it must be placed before for: [x if cond else y for x in list].',
              fixExplanation: 'When using `if-else` (ternary expression) in a comprehension, it must be placed before `for`. When using `if` only as a filter, it goes at the end.'
            },
            {
              id: 'py-q2-2',
              type: 'interactive-runner',
              prompt: 'Write a Python snippet to normalize a list of raw prediction scores: divide each score by the sum of scores.',
              starterCode: '# Normalize raw scores\nscores = [10, 20, 70]\ntotal = sum(scores)\nprobs = [s / total for s in scores]\nprint(probs)',
              solutionCode: 'scores = [10, 20, 70]\ntotal = sum(scores)\nprobs = [s / total for s in scores]\nprint(probs)',
              expectedOutputRegex: '\\[0\\.1, 0\\.2, 0\\.7\\]',
              language: 'python',
              explanation: 'List comprehension `[s / total for s in scores]` applies division to each element cleanly.'
            }
          ]
        }
      ],
      inquisition: {
        id: 'inq-py-1',
        unitId: 'py-unit-1',
        title: 'The Python Memory & Architecture Inquisition',
        subtitle: 'Enterprise AI Pipeline Checkpoint',
        enterpriseScenario: 'You are an AI Platform Engineer at a high-frequency trading firm. A critical feature-engineering microservice is leaking memory and throwing unhandled exceptions during real-time feature normalization. You have 3 minutes to diagnose and resolve the bottlenecks.',
        timeLimitSeconds: 180,
        minimumPassPercentage: 75,
        xpReward: 100,
        gemReward: 50,
        badge: {
          id: 'badge-py-master',
          title: 'Pythonic Alchemist',
          icon: '🐍',
          description: 'Conquered the Python Core & Vectorized Architecture Inquisition.',
          tier: 'Silver'
        },
        questions: [
          {
            id: 'inq-py-q1',
            type: 'multiple-choice',
            prompt: 'In a real-time streaming pipeline, why should you prefer `(x**2 for x in dataset)` over `[x**2 for x in dataset]`?',
            options: [
              'The parenthesis syntax creates a Generator expression which computes items lazily with O(1) memory footprint.',
              'The bracket syntax executes on the GPU whereas parenthesis executes in CPU registers.',
              'Generators are compiled directly to C extensions automatically.',
              'There is no performance difference in Python 3.12+.'
            ],
            correctIndex: 0,
            explanation: 'Generators yield items one by one on demand rather than allocating the entire list in RAM at once, preventing Out-Of-Memory (OOM) crashes.'
          },
          {
            id: 'inq-py-q2',
            type: 'multiple-choice',
            prompt: 'What happens when modifying a default mutable argument like `def add_vector(vec, registry=[])` across multiple function calls?',
            options: [
              'A new empty list is created every time the function is called.',
              'The default list is bound at function definition time, so all calls without arguments mutate the same shared list in memory!',
              'Python raises a `MutableDefaultArgumentError` during bytecode compilation.',
              'The list is automatically frozen into an immutable tuple.'
            ],
            correctIndex: 1,
            explanation: 'Default argument values are evaluated when function definitions are executed once, leading to sneaky cross-invocation state leakage.'
          },
          {
            id: 'inq-py-q3',
            type: 'code-order',
            prompt: 'Assemble the production-grade context manager to track latency of an ML model inference block.',
            shuffledLines: [
              'from contextlib import contextmanager',
              '@contextmanager',
              'def timer(label):',
              '    t0 = time.perf_counter()',
              '    try:\n        yield\n    finally:\n        print(f"{label}: {time.perf_counter() - t0:.4f}s")'
            ],
            correctOrder: [0, 1, 2, 3, 4],
            language: 'python',
            explanation: 'Using `contextlib.contextmanager` with a `try...yield...finally` block guarantees latency measurement even if inference errors.'
          },
          {
            id: 'inq-py-q4',
            type: 'pair-match',
            prompt: 'Match Python AI memory concepts with their internal mechanics:',
            pairs: [
              { id: 'p1', left: '__slots__', right: 'Prevents __dict__ allocation per instance, drastically saving RAM' },
              { id: 'p2', left: 'GIL (Global Interpreter Lock)', right: 'Mutex preventing multiple native threads from executing Python bytecodes concurrently' },
              { id: 'p3', left: 'Weakref', right: 'Reference to an object that does not increase its reference count' },
              { id: 'p4', left: 'functools.lru_cache', right: 'Memoization decorator storing recent function call returns' }
            ],
            explanation: 'Mastery of internal Python structures separates senior AI engineers from script copyists.'
          }
        ]
      }
    }
  ]
};
