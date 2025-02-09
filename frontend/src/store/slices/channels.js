import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//import { getAuthToken, getCurrentUser } from '../../utils/login.js';
import axios from 'axios';

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async ({authToken}) => {
    const response = await axios.get('api/v1/channels', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  }
);

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.pending, () => {
        console.log('onChannelsFetch');
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        console.log('channels: ', action.payload);
        state.channels = action.payload;
      })
      .addCase(fetchChannels.rejected, () => {
        console.log('channels fetch error');
      })
  }
});

export default channelsSlice.reducer;

//export const {  } = channelsSlice.actions;
