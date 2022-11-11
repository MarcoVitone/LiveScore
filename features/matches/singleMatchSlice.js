import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSingleMatch = createAsyncThunk(
  'matches/fetchSingleMatch',
  async id => {
    const resp = await axios.get(
      'https://api-football-v1.p.rapidapi.com/v3/fixtures',
      {
        params: {id: id},
        headers: {
          'X-RapidAPI-Key':
            '**************',
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
        },
      },
    );
    const data = resp.data.response[0];
    return data;
  },
);

const initialState = {
  singleMatch: {},
  isLoading: false,
  error: false,
};

const singleMatchSlice = createSlice({
  name: 'singleMatch',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchSingleMatch.pending]: state => {
      return {...state, isLoading: true, error: false};
    },
    [fetchSingleMatch.fulfilled]: (state, {payload}) => {
      return {...state, singleMatch: payload, isLoading: false, error: false};
    },
    [fetchSingleMatch.rejected]: state => {
      return {...state, error: true, isLoading: false};
    },
  },
});

export default singleMatchSlice.reducer;
