import { configureStore } from '@reduxjs/toolkit';
import auth from './slices/auth.js';

export default configureStore({
  reducer: {
    auth,
  }
})
