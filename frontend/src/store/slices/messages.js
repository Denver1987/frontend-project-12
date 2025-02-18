/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { removeChannelFromStore } from './channels';

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async ({ authToken }) => {
    const response = await axios.get('api/v1/messages', {
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
    const response = await axios.post('api/v1/messages', message, {
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
      .addCase(fetchMessages.pending, () => {
        console.log('onMessagesFetch');
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        console.log('messages: ', action.payload);
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, () => {
        console.log('messages fetch error');
      })
      .addCase(sendMessage.pending, (state) => {
        console.log('onMessagesSend');
        state.onSending = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        console.log('messages: ', action.payload);
        state.onSending = false;
      })
      .addCase(sendMessage.rejected, (state) => {
        console.log('messages send error');
        state.onSending = false;
      });
  },
});

export default messagesSlice.reducer;

export const { addNewMessage } = messagesSlice.actions;
