import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPlayers = createAsyncThunk(
  'matches/fetchPlayers',
  async id => {
    const date = new Date();
    let season;
    if (date.getMonth < 6) {
      season = date.setFullYear(date.getFullYear() - 1);
    } else {
      season = date.getFullYear();
    }
    const resp = await axios.get(
      'https://api-football-v1.p.rapidapi.com/v3/players',
      {
        params: {id: id, season: season},
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
  player: {},
  isLoading: false,
  error: false,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers,
  extraReducers: {
    [fetchPlayers.pending]: state => {
      return {...state, isLoading: true, error: false};
    },
    [fetchPlayers.fulfilled]: (state, {payload}) => {
      return {...state, player: payload, isLoading: false, error: false};
    },
    [fetchPlayers.rejected]: (state, action) => {
      console.log(action);
      return {...state, error: true, isLoading: false};
    },
  },
});

export default playerSlice.reducer;
