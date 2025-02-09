import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authorize, getAuthToken, getCurrentUser } from '../../utils/login.js';
import axios from 'axios';


export const fetchAuthData = createAsyncThunk(
  'auth/fetchAuthData',
  async ({ username, password }) => {
    console.log(username, password);
    const response = await axios.post('api/v1/login', { username, password });
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authToken: getAuthToken(),
    username: getCurrentUser(),
    isAuthFailed: false
  },
  reducers: {
    removeAuthData: (state) => {
      delete state.authToken;
      delete state.username;
      state.isAuthFailed = false;
      //document.dispatchEvent('Loguot');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthData.pending, () => {
        console.log('onAuthFetch');
      })
      .addCase(fetchAuthData.fulfilled, (state, action) => {
        console.log(action.payload);
        const { token, username } = action.payload;
        authorize(action.payload);
        state.authToken = token;
        state.username = username;
        state.isAuthFailed = false;
      })
      .addCase(fetchAuthData.rejected, (state) => {
        state.isAuthFailed = true;
      })
  }
});

export default authSlice.reducer;

export const { removeAuthData } = authSlice.actions;
