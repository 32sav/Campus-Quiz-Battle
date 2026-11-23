import api from './api';

const adminService = {
  // Platform statistics overview
  getStats: async () => {
    const response = await api.get('/admin/stats');
    return response.data;
  },

  // Courses management
  getCourses: async () => {
    const response = await api.get('/admin/courses');
    return response.data;
  },

  createCourse: async (courseData) => {
    const response = await api.post('/admin/courses', courseData);
    return response.data;
  },

  updateCourse: async (courseId, courseData) => {
    const response = await api.put(`/admin/courses/${courseId}`, courseData);
    return response.data;
  },

  deleteCourse: async (courseId) => {
    const response = await api.delete(`/admin/courses/${courseId}`);
    return response.data;
  },

  // Categories management
  getCategories: async () => {
    const response = await api.get('/admin/categories');
    return response.data;
  },

  createCategory: async (categoryData) => {
    const response = await api.post('/admin/categories', categoryData);
    return response.data;
  },

  deleteCategory: async (categoryId) => {
    const response = await api.delete(`/admin/categories/${categoryId}`);
    return response.data;
  },

  // Quizzes management
  createQuiz: async (quizData) => {
    const response = await api.post('/admin/quizzes', quizData);
    return response.data;
  },

  deleteQuiz: async (quizId) => {
    const response = await api.delete(`/admin/quizzes/${quizId}`);
    return response.data;
  },

  // Users management
  getUsers: async () => {
    const response = await api.get('/admin/users');
    return response.data;
  },

  updateUserRole: async (userId, role) => {
    const response = await api.put(`/admin/users/${userId}/role`, { role });
    return response.data;
  },

  deleteUser: async (userId) => {
    const response = await api.delete(`/admin/users/${userId}`);
    return response.data;
  },
};

export default adminService;
