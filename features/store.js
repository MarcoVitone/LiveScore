import {configureStore} from '@reduxjs/toolkit';
import matchesReducer from './matches/matchesSlice';
import darkMode from './dark_mode/darkMode';

export const store = configureStore({
  reducer: {
    matches: matchesReducer,
    darkMode,
  },
});
