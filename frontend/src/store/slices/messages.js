/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { removeChannelFromStore } from './channels';
import routes from '../../utils/routes';

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async ({ authToken }) => {
    const response = await axios.get(routes.getMessageRoute(), {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  },
);

export const sendMessage = createAsyncThunk(
  'messages/sendMessage',
  async ({ message, authToken }) => {
    const response = await axios.post(routes.getMessageRoute(), message, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  },
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
    onSending: false,
  },
  reducers: {
    addNewMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeChannelFromStore, (state, action) => {
        state.messages = state.messages.filter(
          (message) => message.channelId !== action.payload.id,
        );
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, () => {
      })
      .addCase(sendMessage.pending, (state) => {
        state.onSending = true;
      })
      .addCase(sendMessage.fulfilled, (state) => {
        state.onSending = false;
      })
      .addCase(sendMessage.rejected, (state) => {
        state.onSending = false;
      });
  },
});

export default messagesSlice.reducer;

export const { addNewMessage } = messagesSlice.actions;
