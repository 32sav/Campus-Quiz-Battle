import api from './api';

const quizService = {
  // Fetch all quizzes
  getAllQuizzes: async () => {
    const response = await api.get('/quizzes');
    return { data: response.data };
  },

  // Fetch quizzes (filtered by course if specified)
  getQuizzes: async (courseFilter) => {
    const response = await api.get('/quizzes');
    const quizzes = response.data;
    if (courseFilter && courseFilter !== 'all') {
      const filtered = quizzes.filter(
        (q) => q.courseName?.toLowerCase() === courseFilter.toLowerCase()
      );
      return { data: filtered };
    }
    return { data: quizzes };
  },

  // Fetch courses list derived from quizzes
  getCourses: async () => {
    try {
      const response = await api.get('/quizzes');
      const courses = [];
      const seen = new Set();
      response.data.forEach((q) => {
        if (q.courseName && !seen.has(q.courseName)) {
          seen.add(q.courseName);
          courses.push({
            id: q.courseName,
            name: q.courseName,
          });
        }
      });
      return { data: courses };
    } catch {
      return { data: [] };
    }
  },

  // Fetch quiz detail with questions for taking
  startQuiz: async (quizId) => {
    const response = await api.get(`/quizzes/${quizId}`);
    return {
      data: {
        quiz: response.data,
        attempt: {
          quizId: response.data.quizId,
          startedAt: new Date().toISOString(),
        },
      },
    };
  },

  // Submit completed quiz answers
  submitQuiz: async (quizId, answers) => {
    // Format answers to match QuizDto.QuizSubmitRequest: { answers: [{ questionId, answer, timeTaken }] }
    const formattedAnswers = Array.isArray(answers)
      ? answers
      : Object.entries(answers).map(([qId, ans]) => ({
          questionId: Number(qId),
          answer: typeof ans === 'object' ? ans.answer : ans,
          timeTaken: typeof ans === 'object' ? ans.timeTaken || 10 : 10,
        }));

    const response = await api.post(`/quizzes/${quizId}/submit`, {
      answers: formattedAnswers,
    });
    return { data: response.data };
  },

  // Fetch educational quiz leaderboard
  getLeaderboard: async (limit = 50) => {
    const response = await api.get(`/leaderboards/education?limit=${limit}`);
    return { data: response.data };
  },

  // Fetch the current user's quiz attempt history
  getMyAttempts: async () => {
    const response = await api.get('/quizzes/attempts/me');
    return { data: response.data };
  },
};

export default quizService;
