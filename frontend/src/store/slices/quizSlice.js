import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import quizService from '../../services/quizService';

// Async thunks
export const fetchCourses = createAsyncThunk(
  'quiz/fetchCourses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await quizService.getCourses();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchQuizzes = createAsyncThunk(
  'quiz/fetchQuizzes',
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await quizService.getQuizzes(courseId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const startQuiz = createAsyncThunk(
  'quiz/startQuiz',
  async (quizId, { rejectWithValue }) => {
    try {
      const response = await quizService.startQuiz(quizId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const submitQuiz = createAsyncThunk(
  'quiz/submitQuiz',
  async ({ attemptId, answers }, { rejectWithValue }) => {
    try {
      const response = await quizService.submitQuiz(attemptId, answers);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchLeaderboard = createAsyncThunk(
  'quiz/fetchLeaderboard',
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await quizService.getLeaderboard(courseId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  courses: [],
  quizzes: [],
  currentQuiz: null,
  currentAttempt: null,
  leaderboard: [],
  userAttempts: [],
  loading: false,
  error: null,
};

// Quiz slice
const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetQuiz: (state) => {
      state.currentQuiz = null;
      state.currentAttempt = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Courses
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch Quizzes
    builder
      .addCase(fetchQuizzes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuizzes.fulfilled, (state, action) => {
        state.loading = false;
        state.quizzes = action.payload;
      })
      .addCase(fetchQuizzes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Start Quiz
    builder
      .addCase(startQuiz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startQuiz.fulfilled, (state, action) => {
        state.loading = false;
        state.currentQuiz = action.payload.quiz;
        state.currentAttempt = action.payload.attempt;
      })
      .addCase(startQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Submit Quiz
    builder
      .addCase(submitQuiz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitQuiz.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAttempt = action.payload;
      })
      .addCase(submitQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch Leaderboard
    builder
      .addCase(fetchLeaderboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeaderboard.fulfilled, (state, action) => {
        state.loading = false;
        state.leaderboard = action.payload;
      })
      .addCase(fetchLeaderboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, resetQuiz } = quizSlice.actions;
export default quizSlice.reducer;