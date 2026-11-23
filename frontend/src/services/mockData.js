// Mock dataset used when backend/database is offline or in development preview

export const mockCourses = [
  { courseId: 1, name: 'CS 101', description: 'Introduction to Computer Science & Python' },
  { courseId: 2, name: 'Data Structures', description: 'Arrays, Linked Lists, Trees, Stacks, Queues' },
  { courseId: 3, name: 'Algorithms', description: 'Graph algorithms, sorting, searching, greedy' },
  { courseId: 4, name: 'Discrete Math', description: 'Logic, sets, proofs, combinatorics, graphs' },
];

export const mockCategories = [
  { categoryId: 1, name: 'Weekly Sprint', description: 'Short timed quizzes' },
  { categoryId: 2, name: 'Midterm Prep', description: 'Comprehensive exam review' },
  { categoryId: 3, name: 'Battle Final', description: 'High-stake competition quizzes' },
];

export const mockQuizzes = [
  {
    quizId: 1,
    title: 'Data Structures Sprint Quiz',
    description: 'Arrays, Linked Lists, Stacks, Queues and Big-O efficiency analysis.',
    courseName: 'Data Structures',
    courseId: 2,
    categoryName: 'Weekly Sprint',
    categoryId: 1,
    timeLimit: 10,
    totalQuestions: 5,
    questions: [
      {
        questionId: 101,
        questionText: 'What is the average-case time complexity of accessing an element in an array by index?',
        optionA: 'O(1)',
        optionB: 'O(n)',
        optionC: 'O(log n)',
        optionD: 'O(n²)',
        correctAnswer: 'a',
      },
      {
        questionId: 102,
        questionText: 'Which data structure operates on a Last-In, First-Out (LIFO) principle?',
        optionA: 'Queue',
        optionB: 'Stack',
        optionC: 'Binary Tree',
        optionD: 'Hash Map',
        correctAnswer: 'b',
      },
      {
        questionId: 103,
        questionText: 'In a singly linked list, what does the next pointer of the last node point to?',
        optionA: 'Head of list',
        optionB: 'Previous node',
        optionC: 'null / None',
        optionD: 'Itself',
        correctAnswer: 'c',
      },
      {
        questionId: 104,
        questionText: 'What is the worst-case time complexity of QuickSort?',
        optionA: 'O(n log n)',
        optionB: 'O(n)',
        optionC: 'O(n²)',
        optionD: 'O(1)',
        correctAnswer: 'c',
      },
      {
        questionId: 105,
        questionText: 'Which tree traversal yields elements of a Binary Search Tree in sorted ascending order?',
        optionA: 'Pre-order',
        optionB: 'Post-order',
        optionC: 'Level-order',
        optionD: 'In-order',
        correctAnswer: 'd',
      },
    ],
  },
  {
    quizId: 2,
    title: 'Sorting & Graph Algorithms',
    description: 'Breadth-First Search, Depth-First Search, Dijkstra, and Topological Sort.',
    courseName: 'Algorithms',
    courseId: 3,
    categoryName: 'Midterm Prep',
    categoryId: 2,
    timeLimit: 15,
    totalQuestions: 5,
    questions: [
      {
        questionId: 201,
        questionText: 'Which algorithm is best suited for finding the shortest path on an unweighted graph?',
        optionA: 'Dijkstra',
        optionB: 'Breadth-First Search (BFS)',
        optionC: 'Depth-First Search (DFS)',
        optionD: 'Bellman-Ford',
        correctAnswer: 'b',
      },
    ],
  },
  {
    quizId: 3,
    title: 'Combinatorics & Logic Proofs',
    description: 'Propositional logic, truth tables, pigeonhole principle and permutations.',
    courseName: 'Discrete Math',
    courseId: 4,
    categoryName: 'Midterm Prep',
    categoryId: 2,
    timeLimit: 12,
    totalQuestions: 5,
    questions: [],
  },
];

export const mockGameSessions = [
  {
    gameSessionId: 1,
    gameTypeId: 1,
    gameTypeName: 'Mafia',
    title: 'Friday Night Quad Mafia Showdown',
    description: 'Classic physical campus gathering with Mafia, Villagers, Doctor, and Sheriff.',
    scheduledDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    scheduledTime: '18:00:00',
    location: 'Campus Quad Main Lawn',
    maxParticipants: 12,
    currentParticipantsCount: 10,
    status: 'WAITING',
    lordeName: 'Lorde Marcus',
  },
  {
    gameSessionId: 2,
    gameTypeId: 2,
    gameTypeName: 'Werewolf',
    title: 'Midnight Werewolf Camp Gathering',
    description: 'Intense village trial with Seer, Witch, and Bodyguard roles.',
    scheduledDate: new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0],
    scheduledTime: '20:30:00',
    location: 'Student Union Hall A',
    maxParticipants: 16,
    currentParticipantsCount: 8,
    status: 'WAITING',
    lordeName: 'Lorde Sarah',
  },
  {
    gameSessionId: 3,
    gameTypeId: 3,
    gameTypeName: 'IRL Among Us',
    title: 'Library Floor 2 Tasks & Deception',
    description: 'Physical campus mission tasks with hidden impostors.',
    scheduledDate: new Date().toISOString().split('T')[0],
    scheduledTime: '15:00:00',
    location: 'Main Library West Wing',
    maxParticipants: 10,
    currentParticipantsCount: 10,
    status: 'IN_PROGRESS',
    lordeName: 'Lorde Marcus',
  },
];

export const mockEducationLeaderboard = [
  { rank: 1, userId: 10, name: 'Elena Rostova', totalAttempts: 14, averagePercentage: 94, totalPoints: 580 },
  { rank: 2, userId: 12, name: 'David Kim', totalAttempts: 11, averagePercentage: 91, totalPoints: 490 },
  { rank: 3, userId: 1, name: 'Alex Johnson (You)', totalAttempts: 9, averagePercentage: 88, totalPoints: 420 },
  { rank: 4, userId: 14, name: 'Chloe Bennett', totalAttempts: 8, averagePercentage: 82, totalPoints: 360 },
  { rank: 5, userId: 15, name: 'Tariq Mansour', totalAttempts: 7, averagePercentage: 80, totalPoints: 320 },
];

export const mockCommunityLeaderboard = [
  { rank: 1, userId: 20, name: 'Liam Gallagher', gamesPlayed: 12, gamesWon: 9, totalPoints: 710 },
  { rank: 2, userId: 1, name: 'Alex Johnson (You)', gamesPlayed: 8, gamesWon: 6, totalPoints: 580 },
  { rank: 3, userId: 22, name: 'Maya Lin', gamesPlayed: 10, gamesWon: 6, totalPoints: 520 },
  { rank: 4, userId: 23, name: 'Sam Patel', gamesPlayed: 7, gamesWon: 4, totalPoints: 380 },
];

export const mockBadgesSummary = {
  academicRank: 3,
  totalAcademicPoints: 420,
  totalAcademicBadges: 4,
  academicTierTitle: "Dean's Scholar",
  communityGameRank: 2,
  totalGamePoints: 580,
  totalGameBadges: 3,
  gameTierTitle: 'Tactical Master',
};

export const mockUsers = [
  { userId: 1, name: 'Alex Johnson', email: 'student@campus.edu', role: 'STUDENT' },
  { userId: 2, name: 'Lorde Marcus', email: 'lorde@campus.edu', role: 'LORDE' },
  { userId: 3, name: 'Admin Victoria', email: 'admin@campus.edu', role: 'ADMIN' },
  { userId: 10, name: 'Elena Rostova', email: 'elena@campus.edu', role: 'STUDENT' },
  { userId: 12, name: 'David Kim', email: 'david@campus.edu', role: 'STUDENT' },
];

export const mockStats = {
  totalStudents: 142,
  totalLordes: 12,
  totalCourses: 4,
  totalQuizzes: 3,
  totalAttempts: 680,
  totalGameSessions: 35,
};
