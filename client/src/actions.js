import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';


export const rollDice = createAsyncThunk(
  'game/rollDice',
  async ({ betAmount, betOption, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://vineetpersonal.site:5000/api/game/roll',
        { betAmount, betOption },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const setBetAmount = (amount) => ({
  type: 'game/setBetAmount',
  payload: amount,
});


export const setBetOption = (option) => ({
  type: 'game/setBetOption',
  payload: option,
});


export const fetchPointsById = createAsyncThunk(
  'game/fetchPointsById',
  async ({ userId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/auth/profile/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.points;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
