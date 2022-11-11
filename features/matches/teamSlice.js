import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTeamInfo = createAsyncThunk(
  'matches/fetchTeamInfo',
  async id => {
    const resp = await axios.get(
      'https://api-football-v1.p.rapidapi.com/v3/teams',
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
export const fetchTeamMatches = createAsyncThunk(
  'matches/fetchTeamMatches',
  async id => {
    const newDate = new Date();
    let year;
    if (newDate.getMonth < 6) {
      year = newDate.setFullYear(newDate.getFullYear() - 1);
    } else {
      year = newDate.getFullYear();
    }
    const actualDate = new Date().toISOString().split('T')[0];
    const resp = await axios.get(
      'https://api-football-v1.p.rapidapi.com/v3/fixtures',
      {
        params: {season: year, team: id, to: actualDate},
        headers: {
          'X-RapidAPI-Key':
            '**************',
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
        },
      },
    );
    const data = resp.data.response;
    return data;
  },
);

const initialState = {
  teamInfo: {},
  teamMatches: {},
  isLoading: false,
  error: false,
};

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchTeamInfo.pending]: state => {
      return {...state, isLoading: true, error: false};
    },
    [fetchTeamInfo.fulfilled]: (state, {payload}) => {
      return {...state, teamInfo: payload, isLoading: false, error: false};
    },
    [fetchTeamInfo.rejected]: state => {
      return {...state, error: true, isLoading: false};
    },
    [fetchTeamMatches.pending]: state => {
      return {...state, isLoading: true, error: false};
    },
    [fetchTeamMatches.fulfilled]: (state, {payload}) => {
      return {...state, teamMatches: payload, isLoading: false, error: false};
    },
    [fetchTeamMatches.rejected]: state => {
      return {...state, error: true, isLoading: false};
    },
  },
});

export default teamSlice.reducer;
