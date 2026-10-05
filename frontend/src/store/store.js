import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import quizReducer from './slices/quizSlice';
import gameReducer from './slices/gameSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    quiz: quizReducer,
    game: gameReducer,
  },
});

export default store;