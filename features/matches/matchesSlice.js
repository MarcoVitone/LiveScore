import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllMatches = createAsyncThunk(
  'matches/fetchAllMatches',
  async date => {
    const resp = await axios.get(
      'https://api-football-v1.p.rapidapi.com/v3/fixtures',
      {
        params: {date: date, timezone: 'Europe/London'},
        headers: {
          'X-RapidAPI-Key':
            '597ea5937cmsh463ba0a61e15949p1cddb4jsnab207c393461',
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
        },
      },
    );
    const data = resp.data;
    return data;
  },
);

const initialState = {
  matches: {},
  isLoading: false,
  error: false,
};

const matchesSlice = createSlice({
  name: 'matches',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllMatches.pending]: state => {
      return {...state, isLoading: true, error: false};
    },
    [fetchAllMatches.fulfilled]: (state, {payload}) => {
      return {...state, matches: payload, isLoading: false, error: false};
    },
    [fetchAllMatches.rejected]: state => {
      return {...state, error: true, isLoading: false};
    },
  },
});
export const getAllMatches = state => state.matches.matches;

export default matchesSlice.reducer;
