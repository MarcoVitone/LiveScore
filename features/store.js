import {configureStore} from '@reduxjs/toolkit';
import matches from './matches/matchesSlice';
import singleMatch from './matches/singleMatchSlice';
import team from './matches/teamSlice';
import league from './matches/leagueSlice';
import player from './matches/playerSlice';
import coach from './matches/coachSlice';
import darkMode from './dark_mode/darkMode';

export const store = configureStore({
  reducer: {
    matches,
    singleMatch,
    team,
    league,
    player,
    coach,
    darkMode,
  },
});
