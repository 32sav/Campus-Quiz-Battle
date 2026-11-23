import axios from 'axios';
import {
  mockQuizzes,
  mockGameSessions,
  mockEducationLeaderboard,
  mockCommunityLeaderboard,
  mockBadgesSummary,
  mockCourses,
  mockCategories,
  mockUsers,
  mockStats,
} from './mockData';

// Create Axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api',
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Fallback resolver for offline / pre-database development
function getMockFallback(url, method, data) {
  const cleanUrl = url.split('?')[0];

  // Auth mock
  if (cleanUrl.includes('/auth/login') || cleanUrl.includes('/auth/register')) {
    const role = cleanUrl.includes('admin') ? 'ADMIN' : cleanUrl.includes('lorde') ? 'LORDE' : 'STUDENT';
    return {
      token: 'mock-jwt-token-preview',
      userId: 1,
      name: 'Alex Johnson',
      email: 'student@campus.edu',
      role: role,
    };
  }

  // Quizzes
  if (cleanUrl === '/quizzes') return mockQuizzes;
  if (cleanUrl.startsWith('/quizzes/') && cleanUrl.endsWith('/submit')) {
    return {
      quizId: 1,
      quizTitle: 'Data Structures Sprint Quiz',
      score: 5,
      totalQuestions: 5,
      percentage: 100.0,
      newlyEarnedBadges: [
        { badgeId: 1, name: 'Array Master', description: 'Full score on array questions', badgePoints: 50 },
      ],
    };
  }
  if (cleanUrl.startsWith('/quizzes/') && !cleanUrl.includes('attempts')) {
    return mockQuizzes[0];
  }
  if (cleanUrl.includes('/quizzes/attempts')) {
    return [
      {
        attemptId: 1,
        quizId: 1,
        quizTitle: 'Data Structures Sprint Quiz',
        courseName: 'CS 101',
        score: 5,
        totalQuestions: 5,
        percentage: 100,
        submittedAt: new Date().toISOString(),
      },
    ];
  }

  // Games
  if (cleanUrl === '/games/sessions' || cleanUrl === '/games/sessions/my') return mockGameSessions;
  if (cleanUrl.includes('/signup')) return { message: 'Successfully signed up for session' };
  if (cleanUrl.includes('/start')) return { message: 'Session started' };
  if (cleanUrl.includes('/end')) return { message: 'Session ended' };
  if (cleanUrl.includes('/results')) return { message: 'Results recorded' };

  // Leaderboards
  if (cleanUrl.includes('/leaderboards/education')) return mockEducationLeaderboard;
  if (cleanUrl.includes('/leaderboards/community-games')) return mockCommunityLeaderboard;
  if (cleanUrl.includes('/leaderboards/badges/me')) return mockBadgesSummary;
  if (cleanUrl.includes('/leaderboards/badges/academic')) return mockEducationLeaderboard;
  if (cleanUrl.includes('/leaderboards/badges/community')) return mockCommunityLeaderboard;

  // Admin
  if (cleanUrl.includes('/admin/stats')) return mockStats;
  if (cleanUrl.includes('/admin/courses')) return mockCourses;
  if (cleanUrl.includes('/admin/categories')) return mockCategories;
  if (cleanUrl.includes('/admin/users')) return mockUsers;

  return [];
}

// Response interceptor with graceful mock fallback if DB/backend is offline
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If backend is not running, provide seamless preview mock data
    const url = error.config?.url || '';
    const method = error.config?.method || 'get';
    const fallbackData = getMockFallback(url, method, error.config?.data);

    if (fallbackData !== undefined) {
      console.warn(`[Offline/Preview Mode] Serving mock data for: ${method.toUpperCase()} ${url}`);
      return Promise.resolve({ data: fallbackData, status: 200, statusText: 'OK (Mock Preview)' });
    }

    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'An unexpected error occurred';
    return Promise.reject(new Error(message));
  }
);

export default api;
