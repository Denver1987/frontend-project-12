/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { authorize, getAuthToken, getCurrentUser } from '../../utils/login.js';
import routes from '../../utils/routes.js';

export const fetchAuthData = createAsyncThunk(
  'auth/fetchAuthData',
  async ({ username, password }) => {
    const response = await axios.post(routes.getLoginRoute(), { username, password });
    return response.data;
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authToken: getAuthToken(),
    username: getCurrentUser(),
    isAuthFailed: false,
    isOnAuth: false,
    isNetworkError: false,
  },
  reducers: {
    removeAuthData: (state) => {
      delete state.authToken;
      delete state.username;
      state.isAuthFailed = false;
    },
    resetNetworkError: (state) => {
      state.isNetworkError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthData.pending, (state) => {
        state.isOnAuth = true;
      })
      .addCase(fetchAuthData.fulfilled, (state, action) => {
        const { token, username } = action.payload;
        authorize(action.payload);
        state.authToken = token;
        state.username = username;
        state.isAuthFailed = false;
        state.isOnAuth = false;
      })
      .addCase(fetchAuthData.rejected, (state, action) => {
        if (action.error.code === 'ERR_BAD_REQUEST') {
          state.isAuthFailed = true;
          state.isOnAuth = false;
        } else if (action.error.code === 'ERR_NETWORK') {
          state.isNetworkError = true;
        }
        state.isOnAuth = false;
      });
  },
});

export default authSlice.reducer;

export const { removeAuthData, resetNetworkError } = authSlice.actions;
