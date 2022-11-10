import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isDark: false,
};

export const darkModeSlice = createSlice({
  name: 'changeDarkMode',
  initialState,
  reducers: {
    changeTheme(state, {payload}) {
      state.isDark = payload;
    },
  },
});

export const {changeTheme} = darkModeSlice.actions;

export default darkModeSlice.reducer;
