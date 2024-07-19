import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkMode: true,
  isDrawerOpen: false,
  login: false,
  register: false,
  loading: true,
};

export const counterSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleTheme: state => {
      state.darkMode = !state.darkMode;
    },
    closeDrawer: state => {
      state.isDrawerOpen = false;
    },
    openDrawer: state => {
      state.isDrawerOpen = true;
    },
    toggleDrawer: state => {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
    openLoginModel: state => {
      state.login = true;
    },
    closeLoginModel: state => {
      state.login = false;
    },
    openRegisterModel: state => {
      state.register = true;
    },
    closeRegisterModel: state => {
      state.register = false;
    },
  },
});

export const {
  closeDrawer,
  openDrawer,
  toggleTheme,
  toggleDrawer,
  openLoginModel,
  closeLoginModel,
  openRegisterModel,
  closeRegisterModel,
} = counterSlice.actions;

export default counterSlice.reducer;
