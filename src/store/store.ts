import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import companyReducer from './companySlice';
import locationReducer from './locationSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    company: companyReducer,
    location: locationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;