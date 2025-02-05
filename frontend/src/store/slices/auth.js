import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAuthToken, getCurrentUser } from '../../utils/login.js';
import axios from 'axios';

export const fetchAuthData = createAsyncThunk(
  'auth/fetchAuthData',
  async (username, password) => {
    const response = await axios.post('api/v1/login', { username, password });
    console.log(response.data);
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
    getAuthData: ( state, action) => {
      console.log(state);
      console.log(action);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthData.pending, (state, action) => {
        console.log('onFetch');
      })
      .addCase(fetchAuthData.fulfilled, (state, action) => {
        console.log(action, state);

      })
      .addCase(fetchAuthData.rejected, (state, action) => {

      })
  }
});

export default authSlice.reducer;

export const { getAuthData } = authSlice.actions;
