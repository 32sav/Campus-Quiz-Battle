import api from './api';

const authService = {
  // Register a new user
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      const data = response.data;
      return {
        success: true,
        data: {
          token: data.token,
          user: {
            userId: data.userId,
            name: data.name,
            email: data.email,
            role: data.role,
          },
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  },

  // Login existing user
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      const data = response.data;
      return {
        success: true,
        data: {
          token: data.token,
          user: {
            userId: data.userId,
            name: data.name,
            email: data.email,
            role: data.role,
          },
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user stored in local storage
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Get token
  getToken: () => {
    return localStorage.getItem('token');
  },
};

export default authService;
