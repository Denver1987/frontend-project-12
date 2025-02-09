import { configureStore } from '@reduxjs/toolkit';
import auth from './slices/auth.js';
import channels from './slices/channels.js'

export default configureStore({
  reducer: {
    auth,
    channels,
  }
})
