import { configureStore } from '@reduxjs/toolkit';
import registrationReducer from './slices/registrationSlice';
import interestReducer     from './slices/interestSlice';
import pillarReducer       from './slices/pillarSlice';

export const store = configureStore({
  reducer: {
    registration: registrationReducer,
    interests:    interestReducer,
    pillars:      pillarReducer,
  },
});
