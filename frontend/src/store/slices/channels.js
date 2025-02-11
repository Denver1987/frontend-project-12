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

export const addChannel = createAsyncThunk(
  'channels/addChannel',
  async ({newChannelName, authToken}) => {
    const response = await axios.post('/api/v1/channels', { name: newChannelName }, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    console.log(response.data);
    return response.data;
  }
);

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    currentChannelId: 1,
    isOnAddChannel: false,
  },
  reducers: {
    setOnAddChannel: (state, action) => {
      state.isOnAddChannel = action.payload;
    }
  },
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
      .addCase(addChannel.pending, () => {
        console.log('onAddChannel');
      })
      .addCase(addChannel.fulfilled, (state, action) => {
        console.log('channelAdded: ', action.payload);
        state.isOnAddChannel = false;
      })
      .addCase(addChannel.rejected, () => {
        console.log('channel add error');
      })
  }
});

export default channelsSlice.reducer;

export const { setOnAddChannel } = channelsSlice.actions;
