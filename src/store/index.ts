import { configureStore } from '@reduxjs/toolkit';
import myProfileReducer from './slices/myProfileSlice';

export const store = configureStore({
  reducer: {
    myProfile: myProfileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
