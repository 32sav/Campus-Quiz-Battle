import api from './api';

const gameService = {
  // Fetch upcoming community game sessions
  getUpcomingGames: async () => {
    const response = await api.get('/games/sessions');
    return { data: response.data };
  },

  // Get details for a specific game session
  getGameDetails: async (sessionId) => {
    const response = await api.get('/games/sessions');
    const session = response.data.find(
      (s) => s.gameSessionId === Number(sessionId)
    );
    return { data: session || null };
  },

  // Create a new game session (Lorde / Admin only)
  createGameSession: async (sessionData) => {
    const response = await api.post('/games/sessions', sessionData);
    return { data: response.data };
  },

  // Student signs up for a game session
  signUpForGame: async (sessionId) => {
    const response = await api.post(`/games/sessions/${sessionId}/signup`);
    return {
      data: {
        gameId: sessionId,
        message: response.data.message,
      },
    };
  },

  // Cancel game sign up (optimistic local or future backend endpoint)
  cancelSignUp: async (sessionId) => {
    return {
      data: {
        gameId: sessionId,
      },
    };
  },

  // Record game results & award role points (Lorde / Admin only)
  recordGameResults: async (sessionId, resultsData) => {
    const response = await api.post(
      `/games/sessions/${sessionId}/results`,
      resultsData
    );
    return { data: response.data };
  },

  // Fetch games the student is signed up for / attended
  getMyGames: async () => {
    const response = await api.get('/games/sessions');
    return { data: response.data };
  },

  // Fetch community games leaderboard
  getGameLeaderboard: async (limit = 50) => {
    const response = await api.get(`/leaderboards/community-games?limit=${limit}`);
    return { data: response.data };
  },

  // Start a game session (Lorde / Admin only)
  startGameSession: async (sessionId) => {
    const response = await api.post(`/games/sessions/${sessionId}/start`);
    return { data: response.data };
  },

  // End a game session (Lorde / Admin only)
  endGameSession: async (sessionId) => {
    const response = await api.post(`/games/sessions/${sessionId}/end`);
    return { data: response.data };
  },

  // Cancel signup for a game session
  cancelSignUp: async (sessionId) => {
    const response = await api.delete(`/games/sessions/${sessionId}/signup`);
    return { data: response.data };
  },

  // Get sessions for the logged-in lorde
  getLordeSessions: async () => {
    const response = await api.get('/games/sessions/my');
    return { data: response.data };
  },
};

export default gameService;
