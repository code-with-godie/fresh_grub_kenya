import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
};

export const counterSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, actions) => {
      localStorage.setItem('fresh_grub_user', JSON.stringify(actions.payload));
      state.currentUser = actions.payload;
    },
    logout: state => {
      localStorage.setItem('fresh_grub_user', JSON.stringify(null));
      state.currentUser = null;
    },
    getUser: state => {
      const user = JSON.parse(localStorage.getItem('fresh_grub_user'));
      state.currentUser = user;
    },
    updateUser: (state, action) => {
      localStorage.setItem('fresh_grub_user', JSON.stringify(action.payload));
      state.currentUser = action.payload;
    },
  },
});

export const { login, logout, updateUser, getUser } = counterSlice.actions;

export default counterSlice.reducer;
