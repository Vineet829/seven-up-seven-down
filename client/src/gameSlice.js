import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const getToken = () => localStorage.getItem('token');
console.log(getToken());
export const fetchPointsById = createAsyncThunk(
  'game/fetchPointsById',
  async ({ userId }, { rejectWithValue }) => {
    const token = getToken();
    console.log(token)
    try {
      const response = await axios.get(`https://vineetpersonal.site:5000/api/users/${userId}/points`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data.points;
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || 'Failed to fetch points');
    }
  }
);

export const rollDice = createAsyncThunk(
  'game/rollDice',
  async ({ betAmount, betOption, userId }, { rejectWithValue }) => {
    const token = getToken();
    try {
      const response = await axios.post(
        'https://vineetpersonal.site:5000/api/game/roll',
        { betAmount, betOption, userId },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || 'Failed to roll the dice');
    }
  }
);

export const updatePoints = createAsyncThunk(
  'game/updatePoints',
  async ({ userId, points }, { rejectWithValue }) => {
    const token = getToken();
    try {
      const response = await axios.put(`https://vineetpersonal.site:5000/api/users/${userId}/points`, { points }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data.points;
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || 'Failed to update points');
    }
  }
);

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    points: null,
    diceResult: null,
    message: '',
    betAmount: '',
    betOption: '',
    loading: false,
    error: null,
  },
  reducers: {
    setBetAmount(state, action) {
      state.betAmount = action.payload;
    },
    setBetOption(state, action) {
      state.betOption = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPointsById.fulfilled, (state, action) => {
        state.points = action.payload;
      })
      .addCase(fetchPointsById.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(rollDice.pending, (state) => {
        state.loading = true;
        state.diceResult = null;
        state.message = '';
        state.error = null;
      })
      .addCase(rollDice.fulfilled, (state, action) => {
        state.loading = false;
        state.diceResult = action.payload;
        state.points = action.payload.newPoints;
        state.message = action.payload.message;
      })
      .addCase(rollDice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatePoints.fulfilled, (state, action) => {
        state.points = action.payload;
      })
      .addCase(updatePoints.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setBetAmount, setBetOption } = gameSlice.actions;

export default gameSlice.reducer;
