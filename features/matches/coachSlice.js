import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCoaches = createAsyncThunk(
  'matches/fetchCoaches',
  async id => {
    const resp = await axios.get(
      'https://api-football-v1.p.rapidapi.com/v3/coachs',
      {
        params: {id: id},
        headers: {
          'X-RapidAPI-Key':
            '597ea5937cmsh463ba0a61e15949p1cddb4jsnab207c393461',
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
        },
      },
    );
    const data = await resp.data.response[0];
    return data;
  },
);

const initialState = {
  coach: {},
  isLoading: false,
  error: false,
};

const coachSlice = createSlice({
  name: 'coach',
  initialState,
  reducers,
  extraReducers: {
    [fetchCoaches.pending]: state => {
      return {...state, isLoading: true, error: false};
    },
    [fetchCoaches.fulfilled]: (state, {payload}) => {
      return {...state, coach: payload, isLoading: false, error: false};
    },
    [fetchCoaches.rejected]: state => {
      return {...state, error: true, isLoading: false};
    },
  },
});

export default coachSlice.reducer;
