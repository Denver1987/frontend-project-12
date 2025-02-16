import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//import { getAuthToken, getCurrentUser } from '../../utils/login.js';
import axios from 'axios';
import settings from '../../settings/settings';

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

export const createChannel = createAsyncThunk(
  'channels/addChannel',
  async ({newChannelName, authToken}) => {
    const response = await axios.post('/api/v1/channels', { name: newChannelName }, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  }
);

export const renameChannel = createAsyncThunk(
  'channels/renameChannel',
  async ({newChannelName, channelId, authToken}) => {
    const response = await axios.patch(`/api/v1/channels/${channelId}`, { name: newChannelName }, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    console.log(response.data);
    return response.data;
  }
);

export const removeChannel = createAsyncThunk(
  'channels/removeChannel',
  async ({ removeChannelId, authToken}) => {
    const response = await axios.delete(`/api/v1/channels/${removeChannelId}`, {
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
    channels: [],
    currentChannelId: '1',
    isOnAddChannel: false,
    isOnRemoveChannel: false,
    isOnRenameChannel: false,
    renamingChannel: null,
    removingChannel: null,
    onSending: false,
  },
  reducers: {
    setOnAddChannel: (state, action) => {
      state.isOnAddChannel = action.payload;
    },
    setOnRenameChannel: (state, action) => {
      console.log(action);
      state.renamingChannel = action.payload.channelId;
      state.isOnRenameChannel = action.payload.isOn;

    },
    setOnRemoveChannel: (state, action) => {
      console.log(action.payload);
      state.isOnRemoveChannel = action.payload.isOn;
      state.removingChannel = action.payload.channelId;
    },
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
    addNewChannel: (state, action) => {
      state.channels.push(action.payload);
    },
    renameChannelInStore: (state, action) => {
      state.channels.map((channel) => {
        if (channel.id === action.payload.id) channel.name = action.payload.name;
      });
    },
    removeChannelFromStore: (state, action) => {
      state.channels = state.channels.filter((channel) => channel.id !== action.payload.id);
      if (state.currentChannelId === action.payload.id) state.currentChannelId = settings.defaultChannelId;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeChannelFromStore, (state, action) => {
        console.log('remove channel' + action.payload.id + ' from store');
      })
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
      .addCase(createChannel.pending, (state) => {
        console.log('onAddChannel');
        state.onSending = true;
      })
      .addCase(createChannel.fulfilled, (state, action) => {
        console.log('channelAdded: ', action.payload);
        state.isOnAddChannel = false;
        state.onSending = false;
        state.currentChannelId = action.payload.id;
      })
      .addCase(createChannel.rejected, () => {
        console.log('channel add error');
      })
      .addCase(renameChannel.pending, (state) => {
        console.log('onRenameChannel');
        state.onSending = true;
      })
      .addCase(renameChannel.fulfilled, (state, action) => {
        console.log('channelRenamed: ', action.payload);
        state.isOnRenameChannel = false;
        state.onSending = false;
      })
      .addCase(renameChannel.rejected, (state) => {
        console.log('channel rename error');
        state.onSending = false;
      })
      .addCase(removeChannel.pending, (state) => {
        console.log('onRemoveChannel');
        state.onSending = true;
      })
      .addCase(removeChannel.fulfilled, (state, action) => {
        console.log('channelRemove: ', action.payload);
        state.isOnRemoveChannel = false;
        state.onSending = false;
      })
      .addCase(removeChannel.rejected, (state) => {
        console.log('channel remove error');
        state.onSending = false;
      })

  }
});

export default channelsSlice.reducer;

export const {
  setOnAddChannel,
  setOnRenameChannel,
  setOnRemoveChannel,
  setCurrentChannel,
  addNewChannel,
  renameChannelInStore,
  removeChannelFromStore
} = channelsSlice.actions;
