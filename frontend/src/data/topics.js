export const topics = [
  {
    id: 'recursion',
    title: 'Recursion',
    description: 'Functions that call themselves',
    questions: [
      { id: 'fibonacci', title: 'Fibonacci', hasVisualization: false },
      { id: 'factorial', title: 'Factorial', hasVisualization: false },
      { id: 'hanoi', title: 'Tower of Hanoi', hasVisualization: true },
      { id: 'sum-digits', title: 'Sum of Digits', hasVisualization: false }
    ]
  },
  {
    id: 'loops',
    title: 'Loops',
    description: 'Repeating actions step by step',
    questions: [
      { id: 'pattern-printing', title: 'Pattern Printing', hasVisualization: false },
      { id: 'multiplication-table', title: 'Multiplication Table', hasVisualization: false },
      { id: 'sum-n-numbers', title: 'Sum of N Numbers', hasVisualization: false }
    ]
  },
  {
    id: 'arrays',
    title: 'Arrays',
    description: 'Working with collections of values',
    questions: [
      { id: 'two-sum', title: 'Two Sum', hasVisualization: false },
      { id: 'linear-search', title: 'Linear Search', hasVisualization: false },
      { id: 'find-max-min', title: 'Find Max/Min', hasVisualization: false }
    ]
  },
  {
    id: 'sorting',
    title: 'Sorting',
    description: 'Arranging data in order',
    questions: [
      { id: 'bubble-sort', title: 'Bubble Sort', hasVisualization: false },
      { id: 'selection-sort', title: 'Selection Sort', hasVisualization: false }
    ]
  },
  {
    id: 'stack-queue',
    title: 'Stack & Queue',
    description: 'Last-in-first-out and first-in-first-out structures',
    questions: [
      { id: 'balanced-parentheses', title: 'Balanced Parentheses', hasVisualization: false },
      { id: 'queue-operations', title: 'Queue Operations', hasVisualization: false }
    ]
  },
  {
    id: 'searching',
    title: 'Searching',
    description: 'Finding values efficiently',
    questions: [
      { id: 'binary-search', title: 'Binary Search', hasVisualization: false }
    ]
  },
  {
    id: 'linked-list',
    title: 'Linked List',
    description: 'Nodes connected through pointers',
    questions: [
      { id: 'traversal', title: 'Traversal', hasVisualization: false },
      { id: 'insertion', title: 'Insertion', hasVisualization: false }
    ]
  }
]

// Helper function - ek topic id se poora topic object dhundta hai
export function getTopicById(topicId) {
  return topics.find(t => t.id === topicId)
}

// Helper function - ek question id se poora question object dhundta hai (uska topic bhi)
export function getQuestionById(topicId, questionId) {
  const topic = getTopicById(topicId)
  if (!topic) return null
  const question = topic.questions.find(q => q.id === questionId)
  return question ? { ...question, topicId, topicTitle: topic.title } : null
}