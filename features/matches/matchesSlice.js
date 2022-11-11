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
export const fetchSingleMatch = createAsyncThunk(
  'matches/fetchSingleMatch',
  async id => {
    const resp = await axios.get(
      'https://api-football-v1.p.rapidapi.com/v3/fixtures',
      {
        params: {id: id},
        headers: {
          'X-RapidAPI-Key':
            '597ea5937cmsh463ba0a61e15949p1cddb4jsnab207c393461',
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
        },
      },
    );
    const data = resp.data.response[0];
    return data;
  },
);

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
            '597ea5937cmsh463ba0a61e15949p1cddb4jsnab207c393461',
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
        },
      },
    );
    const data = resp.data.response[0];
    return data;
  },
);

export const fetchTeamInfo = createAsyncThunk(
  'matches/fetchTeamInfo',
  async id => {
    const resp = await axios.get(
      'https://api-football-v1.p.rapidapi.com/v3/teams',
      {
        params: {id: id},
        headers: {
          'X-RapidAPI-Key':
            '597ea5937cmsh463ba0a61e15949p1cddb4jsnab207c393461',
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
    const date = new Date();
    let season;
    if (date.getMonth < 6) {
      season = date.setFullYear(date.getFullYear() - 1);
    } else {
      season = date.getFullYear();
    }
    const resp = await axios.get(
      'https://api-football-v1.p.rapidapi.com/v3/fixtures',
      {
        params: {season: season, team: id},
        headers: {
          'X-RapidAPI-Key':
            '597ea5937cmsh463ba0a61e15949p1cddb4jsnab207c393461',
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
        },
      },
    );
    const data = resp.data.response;
    return data;
  },
);
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
            '597ea5937cmsh463ba0a61e15949p1cddb4jsnab207c393461',
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
            '597ea5937cmsh463ba0a61e15949p1cddb4jsnab207c393461',
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
            '597ea5937cmsh463ba0a61e15949p1cddb4jsnab207c393461',
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
            '597ea5937cmsh463ba0a61e15949p1cddb4jsnab207c393461',
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
        },
      },
    );
    const data = await resp.data.response;
    return data;
  },
);

const initialState = {
  matches: {},
  singleMatch: {},
  standings: {},
  teamInfo: {},
  teamMatches: {},
  coach: {},
  player: {},
  topScorers: {},
  topAssists: {},
  topRedCard: {},
  topYellowCard: {},
  isLoading: false,
  error: false,
};

const matchesSlice = createSlice({
  name: 'matches',
  initialState,
  reducers: {
    resetError(state) {
      state.error = false;
    },
  },
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
    [fetchSingleMatch.pending]: state => {
      return {...state, isLoading: true, error: false};
    },
    [fetchSingleMatch.fulfilled]: (state, {payload}) => {
      return {...state, singleMatch: payload, isLoading: false, error: false};
    },
    [fetchSingleMatch.rejected]: state => {
      return {...state, error: true, isLoading: false};
    },
    [fetchLeagueStandings.pending]: state => {
      return {...state, isLoading: true, error: false};
    },
    [fetchLeagueStandings.fulfilled]: (state, {payload}) => {
      return {...state, standings: payload, isLoading: false, error: false};
    },
    [fetchLeagueStandings.rejected]: state => {
      return {...state, error: true, isLoading: false};
    },
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
    [fetchCoaches.pending]: state => {
      return {...state, isLoading: true, error: false};
    },
    [fetchCoaches.fulfilled]: (state, {payload}) => {
      return {...state, coach: payload, isLoading: false, error: false};
    },
    [fetchCoaches.rejected]: state => {
      return {...state, error: true, isLoading: false};
    },
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
export const getAllMatches = state => state.matches.matches;
export const {resetError} = matchesSlice.actions;

export default matchesSlice.reducer;
