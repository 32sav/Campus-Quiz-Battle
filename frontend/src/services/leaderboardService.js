import api from './api';

const leaderboardService = {
  // Fetch education quiz leaderboard
  getEducationLeaderboard: async (limit = 50) => {
    const response = await api.get(`/leaderboards/education?limit=${limit}`);
    return response.data;
  },

  // Fetch community games leaderboard
  getCommunityGamesLeaderboard: async (limit = 50) => {
    const response = await api.get(`/leaderboards/community-games?limit=${limit}`);
    return response.data;
  },

  // Fetch academic badges leaderboard
  getAcademicBadges: async (limit = 50) => {
    const response = await api.get(`/leaderboards/badges/academic?limit=${limit}`);
    return response.data;
  },

  // Fetch community games badges leaderboard
  getCommunityBadges: async (limit = 50) => {
    const response = await api.get(`/leaderboards/badges/community?limit=${limit}`);
    return response.data;
  },

  // Fetch logged in user's dual-track badge summary
  getMyBadgeSummary: async () => {
    const response = await api.get('/leaderboards/badges/me');
    return response.data;
  },

  // Fetch specific student's badge summary
  getStudentBadgeSummary: async (userId) => {
    const response = await api.get(`/leaderboards/badges/summary/${userId}`);
    return response.data;
  },
};

export default leaderboardService;
