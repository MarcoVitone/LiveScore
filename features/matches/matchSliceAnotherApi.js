import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllMatches = createAsyncThunk(
  'matches/fetchAllMatches',
  async date => {
    const resp = await axios.get('https://v3.football.api-sports.io/fixtures', {
      params: {date: date, timezone: 'Europe/London'},
      headers: {
        'X-RapidAPI-Key': '272ef48264ecf111ffd9b0a2f9c56264',
        'X-RapidAPI-Host': 'v3.football.api-sports.io',
      },
    });
    const data = resp.data;
    return data;
  },
);
export const fetchSingleMatch = createAsyncThunk(
  'matches/fetchSingleMatch',
  async id => {
    const resp = await axios.get('https://v3.football.api-sports.io/fixtures', {
      params: {id: id},
      headers: {
        'X-RapidAPI-Key': '272ef48264ecf111ffd9b0a2f9c56264',
        'X-RapidAPI-Host': 'v3.football.api-sports.io',
      },
    });
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
      'https://v3.football.api-sports.io/standings',
      {
        params: {league: id, season: year},
        headers: {
          'X-RapidAPI-Key': '272ef48264ecf111ffd9b0a2f9c56264',
          'X-RapidAPI-Host': 'v3.football.api-sports.io',
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
    const resp = await axios.get('https://v3.football.api-sports.io/teams', {
      params: {id: id},
      headers: {
        'X-RapidAPI-Key': '272ef48264ecf111ffd9b0a2f9c56264',
        'X-RapidAPI-Host': 'v3.football.api-sports.io',
      },
    });
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
    const resp = await axios.get('https://v3.football.api-sports.io/fixtures', {
      params: {season: year, team: id, to: actualDate},
      headers: {
        'X-RapidAPI-Key': '272ef48264ecf111ffd9b0a2f9c56264',
        'X-RapidAPI-Host': 'v3.football.api-sports.io',
      },
    });
    const data = resp.data.response;
    return data;
  },
);
export const fetchCoaches = createAsyncThunk(
  'matches/fetchCoaches',
  async id => {
    const resp = await axios.get('https://v3.football.api-sports.io/coachs', {
      params: {id: id},
      headers: {
        'X-RapidAPI-Key': '272ef48264ecf111ffd9b0a2f9c56264',
        'X-RapidAPI-Host': 'v3.football.api-sports.io',
      },
    });
    const data = await resp.data.response[0];
    return data;
  },
);
export const fetchPlayers = createAsyncThunk(
  'matches/fetchPlayers',
  async id => {
    const date = new Date();
    let year;
    if (date.getMonth < 6) {
      year = date.setFullYear(date.getFullYear() - 1);
    } else {
      year = date.getFullYear();
    }
    const resp = await axios.get('https://v3.football.api-sports.io/players', {
      params: {id: id, season: year},
      headers: {
        'X-RapidAPI-Key': '272ef48264ecf111ffd9b0a2f9c56264',
        'X-RapidAPI-Host': 'v3.football.api-sports.io',
      },
    });
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
      'https://v3.football.api-sports.io/players/topscorers',
      {
        params: {league: id, season: year},
        headers: {
          'X-RapidAPI-Key': '272ef48264ecf111ffd9b0a2f9c56264',
          'X-RapidAPI-Host': 'v3.football.api-sports.io',
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
      'https://v3.football.api-sports.io/players/topredcards',
      {
        params: {league: id, season: year},
        headers: {
          'X-RapidAPI-Key': '272ef48264ecf111ffd9b0a2f9c56264',
          'X-RapidAPI-Host': 'v3.football.api-sports.io',
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
      'https://v3.football.api-sports.io/players/topyellowcards',
      {
        params: {league: id, season: year},
        headers: {
          'X-RapidAPI-Key': '272ef48264ecf111ffd9b0a2f9c56264',
          'X-RapidAPI-Host': 'v3.football.api-sports.io',
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
      'https://v3.football.api-sports.io/players/topassists',
      {
        params: {league: 135, season: year},
        headers: {
          'X-RapidAPI-Key': '272ef48264ecf111ffd9b0a2f9c56264',
          'X-RapidAPI-Host': 'v3.football.api-sports.io',
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
