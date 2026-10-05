import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import gameService from '../../services/gameService';

// Async thunks
export const fetchUpcomingGames = createAsyncThunk(
  'game/fetchUpcomingGames',
  async (_, { rejectWithValue }) => {
    try {
      const response = await gameService.getUpcomingGames();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchGameDetails = createAsyncThunk(
  'game/fetchGameDetails',
  async (gameId, { rejectWithValue }) => {
    try {
      const response = await gameService.getGameDetails(gameId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signUpForGame = createAsyncThunk(
  'game/signUpForGame',
  async (gameId, { rejectWithValue }) => {
    try {
      const response = await gameService.signUpForGame(gameId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const cancelGameSignUp = createAsyncThunk(
  'game/cancelGameSignUp',
  async (gameId, { rejectWithValue }) => {
    try {
      const response = await gameService.cancelSignUp(gameId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchGameResults = createAsyncThunk(
  'game/fetchGameResults',
  async (gameId, { rejectWithValue }) => {
    try {
      const response = await gameService.getGameResults(gameId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchMyGames = createAsyncThunk(
  'game/fetchMyGames',
  async (_, { rejectWithValue }) => {
    try {
      const response = await gameService.getMyGames();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchGameLeaderboard = createAsyncThunk(
  'game/fetchGameLeaderboard',
  async (_, { rejectWithValue }) => {
    try {
      const response = await gameService.getGameLeaderboard();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  upcomingGames: [],
  myGames: [],
  currentGame: null,
  gameResults: [],
  leaderboard: [],
  signedUpGames: [],
  loading: false,
  error: null,
};

// Game slice
const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetGame: (state) => {
      state.currentGame = null;
      state.gameResults = [];
    },
  },
  extraReducers: (builder) => {
    // Fetch Upcoming Games
    builder
      .addCase(fetchUpcomingGames.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUpcomingGames.fulfilled, (state, action) => {
        state.loading = false;
        state.upcomingGames = action.payload;
      })
      .addCase(fetchUpcomingGames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch Game Details
    builder
      .addCase(fetchGameDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGameDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentGame = action.payload;
      })
      .addCase(fetchGameDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Sign Up For Game
    builder
      .addCase(signUpForGame.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpForGame.fulfilled, (state, action) => {
        state.loading = false;
        state.signedUpGames.push(action.payload.gameId);
      })
      .addCase(signUpForGame.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Cancel Game Sign Up
    builder
      .addCase(cancelGameSignUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelGameSignUp.fulfilled, (state, action) => {
        state.loading = false;
        state.signedUpGames = state.signedUpGames.filter(
          (id) => id !== action.payload.gameId
        );
      })
      .addCase(cancelGameSignUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch Game Results
    builder
      .addCase(fetchGameResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGameResults.fulfilled, (state, action) => {
        state.loading = false;
        state.gameResults = action.payload;
      })
      .addCase(fetchGameResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch My Games
    builder
      .addCase(fetchMyGames.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyGames.fulfilled, (state, action) => {
        state.loading = false;
        state.myGames = action.payload;
      })
      .addCase(fetchMyGames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch Game Leaderboard
    builder
      .addCase(fetchGameLeaderboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGameLeaderboard.fulfilled, (state, action) => {
        state.loading = false;
        state.leaderboard = action.payload;
      })
      .addCase(fetchGameLeaderboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, resetGame } = gameSlice.actions;
export default gameSlice.reducer;