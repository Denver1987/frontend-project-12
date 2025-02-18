/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import settings from '../../settings/settings';
import routes from '../../utils/routes';

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async ({ authToken }) => {
    const response = await axios.get(routes.getChannelRoute(), {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  },
);

export const createChannel = createAsyncThunk(
  'channels/addChannel',
  async ({ newChannelName, authToken }) => {
    const response = await axios.post(routes.getChannelRoute(), { name: newChannelName }, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  },
);

export const renameChannel = createAsyncThunk(
  'channels/renameChannel',
  async ({ newChannelName, channelId, authToken }) => {
    const response = await axios.patch(
      routes.getChannelRoute(channelId),
      { name: newChannelName },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    );
    return response.data;
  },
);

export const removeChannel = createAsyncThunk(
  'channels/removeChannel',
  async ({ removeChannelId, authToken }) => {
    const response = await axios.delete(routes.getChannelRoute(removeChannelId), {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  },
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
    isCreateSuccess: false,
    isRenameSuccess: false,
    isRemoveSuccess: false,
  },
  reducers: {
    setOnAddChannel: (state, action) => {
      state.isOnAddChannel = action.payload;
    },
    setOnRenameChannel: (state, action) => {
      state.renamingChannel = action.payload.channelId;
      state.isOnRenameChannel = action.payload.isOn;
    },
    setOnRemoveChannel: (state, action) => {
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
      if (state.currentChannelId === action.payload.id) {
        state.currentChannelId = settings.getDefaultChannelId();
      }
    },
    resetSuccess: (state) => {
      state.isCreateSuccess = false;
      state.isRenameSuccess = false;
      state.isRemoveSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.fulfilled, (state, action) => {
        state.channels = action.payload;
      })
      .addCase(createChannel.pending, (state) => {
        state.onSending = true;
        state.isCreateSuccess = false;
      })
      .addCase(createChannel.fulfilled, (state, action) => {
        state.isOnAddChannel = false;
        state.onSending = false;
        state.currentChannelId = action.payload.id;
        state.isCreateSuccess = true;
      })
      .addCase(renameChannel.pending, (state) => {
        state.onSending = true;
        state.isRenameSuccess = false;
      })
      .addCase(renameChannel.fulfilled, (state) => {
        state.isOnRenameChannel = false;
        state.onSending = false;
        state.isRenameSuccess = true;
      })
      .addCase(renameChannel.rejected, (state) => {
        state.onSending = false;
      })
      .addCase(removeChannel.pending, (state) => {
        state.onSending = true;
        state.isRemoveSuccess = false;
      })
      .addCase(removeChannel.fulfilled, (state) => {
        state.isOnRemoveChannel = false;
        state.onSending = false;
        state.isRemoveSuccess = true;
      })
      .addCase(removeChannel.rejected, (state) => {
        state.onSending = false;
      });
  },
});

export default channelsSlice.reducer;

export const {
  setOnAddChannel,
  setOnRenameChannel,
  setOnRemoveChannel,
  setCurrentChannel,
  addNewChannel,
  renameChannelInStore,
  removeChannelFromStore,
  resetSuccess,
} = channelsSlice.actions;
