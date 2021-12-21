import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authFormReducer from 'src/components/auth-form/authFormSlice';

export const store = configureStore({
  reducer: {
    auth: authFormReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
