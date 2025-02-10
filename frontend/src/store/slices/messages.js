import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async ({authToken}) => {
    const response = await axios.get('api/v1/messages', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  }
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
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
  }
});

export default messagesSlice.reducer;


