import { Track } from '@/types/curriculum';

export const mlTrack: Track = {
  meta: {
    id: 'ml',
    title: 'Machine Learning & Statistical AI',
    shortTitle: 'Machine Learning',
    tagline: 'Master feature engineering, mathematical modeling, and scikit-learn',
    description: 'Learn the core mathematical principles, loss functions, algorithms, regularization, and model validation techniques powering modern AI.',
    icon: '🧠',
    badgeColor: 'bg-purple-500',
    accentColor: '#A855F7',
    level: 'Intermediate',
    estimatedHours: 30
  },
  units: [
    {
      id: 'ml-unit-1',
      trackId: 'ml',
      unitNumber: 1,
      title: 'Loss Functions, Gradients & Classical Models',
      description: 'Grasp the mechanics of optimization, gradient descent, and model evaluation metrics.',
      color: 'bg-purple-500',
      lessons: [
        {
          id: 'ml-1-1',
          unitId: 'ml-unit-1',
          title: 'Precision, Recall & The F1 Trade-off',
          description: 'Evaluate models when class distributions are severely imbalanced.',
          xpReward: 15,
          questions: [
            {
              id: 'ml-q1-1',
              type: 'multiple-choice',
              prompt: 'In a medical cancer detection model where failing to identify a malignant tumor can be fatal, which metric must you prioritize maximizing?',
              options: [
                'Recall (Sensitivity): Minimizing False Negatives so no sick patient is missed.',
                'Precision: Ensuring that predicted positive cases are highly reliable.',
                'Overall Accuracy: Total correct predictions over all samples.',
                'Specificity only.'
              ],
              correctIndex: 0,
              explanation: 'Recall = TP / (TP + FN). In critical diagnostic or fraud scenarios, False Negatives carry catastrophic cost, making high recall imperative.'
            },
            {
              id: 'ml-q1-2',
              type: 'code-fill',
              prompt: 'Fill in the blanks to calculate Mean Squared Error (MSE) loss using NumPy.',
              codeTemplate: 'import numpy as np\n\ndef calculate_mse(y_true, y_pred):\n    errors = y_true - ___\n    squared_errors = errors ** ___\n    return np.___(squared_errors)',
              wordBank: ['y_pred', '2', 'mean', 'sum', 'std', 'y_true'],
              correctTokens: ['y_pred', '2', 'mean'],
              explanation: 'MSE computes the average squared discrepancy: `np.mean((y_true - y_pred) ** 2)`.'
            },
            {
              id: 'ml-q1-3',
              type: 'interactive-runner',
              prompt: 'Compute the Euclidean distance between two 3D feature embeddings.',
              starterCode: '# Vector Euclidean distance\nimport math\n\nv1 = [1.0, 2.0, 3.0]\nv2 = [4.0, 6.0, 3.0]\n\ndist = math.sqrt(sum((a - b) ** 2 for a, b in zip(v1, v2)))\nprint(f"Distance: {dist:.1f}")',
              solutionCode: 'import math\nv1 = [1.0, 2.0, 3.0]\nv2 = [4.0, 6.0, 3.0]\ndist = math.sqrt(sum((a - b) ** 2 for a, b in zip(v1, v2)))\nprint(f"Distance: {dist:.1f}")',
              expectedOutputRegex: 'Distance: 5\\.0',
              language: 'python',
              explanation: 'Euclidean distance is the square root of the sum of squared vector component differences.'
            }
          ]
        },
        {
          id: 'ml-1-2',
          unitId: 'ml-unit-1',
          title: 'Bias vs Variance & Regularization',
          description: 'Combat overfitting and underfitting with L1 (Lasso) and L2 (Ridge) penalties.',
          xpReward: 20,
          questions: [
            {
              id: 'ml-q2-1',
              type: 'multiple-choice',
              prompt: 'What unique mathematical property distinguishes L1 regularization (Lasso) from L2 regularization (Ridge)?',
              options: [
                'L1 regularization drives redundant feature coefficients exactly to zero, performing intrinsic feature selection.',
                'L1 regularization squares the weights, leading to smooth spherical contours.',
                'L2 regularization completely eliminates collinearity without shrinking coefficients.',
                'L1 regularization can only be used with neural networks.'
              ],
              correctIndex: 0,
              explanation: 'Because the L1 penalty (|w|) has sharp corners on coordinate axes, gradient descent solutions naturally intersect at zero, creating sparse weight vectors.'
            },
            {
              id: 'ml-q2-2',
              type: 'pair-match',
              prompt: 'Match machine learning algorithms with their core inductive bias:',
              pairs: [
                { id: 'mp1', left: 'Random Forest', right: 'Bagging ensemble of decorrelated decision trees using bootstrap aggregating and random feature subsets' },
                { id: 'mp2', left: 'XGBoost', right: 'Sequential gradient boosting that fits each new tree to the pseudo-residuals of previous trees' },
                { id: 'mp3', left: 'K-Means', right: 'Partitioning data into k spherical clusters by iteratively updating centroids to minimize within-cluster inertia' },
                { id: 'mp4', left: 'PCA', right: 'Orthogonal linear transformation that projects data onto directions of maximal variance' }
              ],
              explanation: 'Understanding the mechanics and inductive biases of classical algorithms is crucial for production model selection.'
            }
          ]
        }
      ],
      inquisition: {
        id: 'inq-ml-1',
        unitId: 'ml-unit-1',
        title: 'The Machine Learning Engineering Inquisition',
        subtitle: 'Production Model Drift & Validation Boss Battle',
        enterpriseScenario: 'A deployed credit-scoring model is suffering from severe covariate shift: approval rates plunged 40% overnight. The data science team is panicking. You must diagnose data leakage, calibrate decision thresholds, and establish a cross-validation baseline in under 3 minutes.',
        timeLimitSeconds: 180,
        minimumPassPercentage: 80,
        xpReward: 160,
        gemReward: 80,
        badge: {
          id: 'badge-ml-master',
          title: 'Master of Statistical AI',
          icon: '🧠',
          description: 'Diagnosed covariate shift and optimized production validation pipelines.',
          tier: 'Gold'
        },
        questions: [
          {
            id: 'inq-ml-q1',
            type: 'multiple-choice',
            prompt: 'Why does fitting a StandardScaler on the entire dataset BEFORE splitting into train/test sets invalidate model evaluation results?',
            options: [
              'Data Leakage: Test set distribution parameters (mean & standard deviation) leak into the training process, producing artificially optimistic performance.',
              'StandardScaler requires GPU acceleration which is not supported on split sets.',
              'The test set cannot be scaled in Scikit-Learn.',
              'It causes a division-by-zero error on the test set.'
            ],
            correctIndex: 0,
            explanation: 'Any preprocessing scaler or imputer must be `fit()` strictly on training data alone, and only `transform()` applied to test data to prevent target leakage.'
          },
          {
            id: 'inq-ml-q2',
            type: 'multiple-choice',
            prompt: 'When evaluating a classification model across varying probability thresholds, what does the Area Under the ROC Curve (ROC-AUC) measure?',
            options: [
              'The probability that the model ranks a randomly chosen positive instance higher than a randomly chosen negative instance.',
              'The exact classification accuracy at threshold 0.5.',
              'The percentage of true positives among all positive predictions.',
              'The computational inference speed per sample.'
            ],
            correctIndex: 0,
            explanation: 'ROC-AUC is threshold-independent: an AUC of 0.85 indicates an 85% chance that a random positive sample receives a higher predicted risk score than a random negative sample.'
          },
          {
            id: 'inq-ml-q3',
            type: 'code-order',
            prompt: 'Assemble the scikit-learn pipeline ensuring strict leakage-free cross-validation.',
            shuffledLines: [
              'from sklearn.pipeline import Pipeline',
              'from sklearn.preprocessing import StandardScaler',
              'from sklearn.ensemble import RandomForestClassifier',
              'pipe = Pipeline([',
              '    ("scaler", StandardScaler()),',
              '    ("model", RandomForestClassifier(n_estimators=100))',
              '])'
            ],
            correctOrder: [0, 1, 2, 3, 4, 5, 6],
            language: 'python',
            explanation: 'Encapsulating scalers and estimators inside `Pipeline` prevents data leakage during k-fold cross validation.'
          }
        ]
      }
    }
  ]
};

