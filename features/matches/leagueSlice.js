import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchLeagueStandings = createAsyncThunk(
  'matches/fetchLeagueStandings',
  async id => {
    const date = new Date();
    let year;
    if (date.getMonth < 6) {
      year = date.setFullYear(date.getFullYear() - 1);
    } else {
      year = date.getFullYear();
    }
    const resp = await axios.get(
      'https://api-football-v1.p.rapidapi.com/v3/standings',
      {
        params: {season: year, league: id},
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

export const fetchLeagueTopScorers = createAsyncThunk(
  'matches/fetchLeagueTopScorers',
  async id => {
    const date = new Date();
    let year;
    if (date.getMonth < 6) {
      year = date.setFullYear(date.getFullYear() - 1);
    } else {
      year = date.getFullYear();
    }
    const resp = await axios.get(
      'https://api-football-v1.p.rapidapi.com/v3/players/topscorers',
      {
        params: {league: id, season: year},
        headers: {
          'X-RapidAPI-Key':
            '**************',
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
        },
      },
    );
    const data = await resp.data.response;
    return data;
  },
);
export const fetchLeagueTopRedCard = createAsyncThunk(
  'matches/fetchLeagueTopRedCard',
  async id => {
    const date = new Date();
    let year;
    if (date.getMonth < 6) {
      year = date.setFullYear(date.getFullYear() - 1);
    } else {
      year = date.getFullYear();
    }
    const resp = await axios.get(
      'https://api-football-v1.p.rapidapi.com/v3/players/topredcards',
      {
        params: {league: id, season: year},
        headers: {
          'X-RapidAPI-Key':
            '**************',
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
        },
      },
    );
    const data = await resp.data.response;
    return data;
  },
);
export const fetchLeagueTopYellowCard = createAsyncThunk(
  'matches/fetchLeagueTopYellowCard',
  async id => {
    const date = new Date();
    let year;
    if (date.getMonth < 6) {
      year = date.setFullYear(date.getFullYear() - 1);
    } else {
      year = date.getFullYear();
    }
    const resp = await axios.get(
      'https://api-football-v1.p.rapidapi.com/v3/players/topyellowcards',
      {
        params: {league: id, season: year},
        headers: {
          'X-RapidAPI-Key':
            '**************',
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
        },
      },
    );
    const data = await resp.data.response;
    return data;
  },
);
export const fetchLeagueTopAssists = createAsyncThunk(
  'matches/fetchLeagueTopAssists',
  async id => {
    const date = new Date();
    let year;
    if (date.getMonth < 6) {
      year = date.setFullYear(date.getFullYear() - 1);
    } else {
      year = date.getFullYear();
    }
    const resp = await axios.get(
      'https://api-football-v1.p.rapidapi.com/v3/players/topassists',
      {
        params: {league: id, season: year},
        headers: {
          'X-RapidAPI-Key':
            '**************',
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
        },
      },
    );
    const data = await resp.data.response;
    return data;
  },
);

const initialState = {
  standings: {},
  topScorers: {},
  topAssists: {},
  topRedCard: {},
  topYellowCard: {},
  isLoading: false,
  error: false,
};

const leagueSlice = createSlice({
  name: 'league',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchLeagueStandings.pending]: state => {
      return {...state, isLoading: true, error: false};
    },
    [fetchLeagueStandings.fulfilled]: (state, {payload}) => {
      return {...state, standings: payload, isLoading: false, error: false};
    },
    [fetchLeagueStandings.rejected]: state => {
      return {...state, error: true, isLoading: false};
    },
    [fetchLeagueTopScorers.pending]: state => {
      return {...state, isLoading: true, error: false};
    },
    [fetchLeagueTopScorers.fulfilled]: (state, {payload}) => {
      return {...state, topScorers: payload, isLoading: false, error: false};
    },
    [fetchLeagueTopScorers.rejected]: state => {
      return {...state, error: true, isLoading: false};
    },
    [fetchLeagueTopAssists.pending]: state => {
      return {...state, isLoading: true, error: false};
    },
    [fetchLeagueTopAssists.fulfilled]: (state, {payload}) => {
      return {...state, topAssists: payload, isLoading: false, error: false};
    },
    [fetchLeagueTopAssists.rejected]: state => {
      return {...state, error: true, isLoading: false};
    },
    [fetchLeagueTopRedCard.pending]: state => {
      return {...state, isLoading: true, error: false};
    },
    [fetchLeagueTopRedCard.fulfilled]: (state, {payload}) => {
      return {...state, topRedCard: payload, isLoading: false, error: false};
    },
    [fetchLeagueTopRedCard.rejected]: state => {
      return {...state, error: true, isLoading: false};
    },
    [fetchLeagueTopYellowCard.pending]: state => {
      return {...state, isLoading: true, error: false};
    },
    [fetchLeagueTopYellowCard.fulfilled]: (state, {payload}) => {
      return {...state, topYellowCard: payload, isLoading: false, error: false};
    },
    [fetchLeagueTopYellowCard.rejected]: state => {
      return {...state, error: true, isLoading: false};
    },
  },
});

export default leagueSlice.reducer;
