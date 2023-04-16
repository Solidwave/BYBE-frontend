import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { creaturesApi } from '../services/creatures';

export const store = configureStore({
  reducer: {
    [creaturesApi.reducerPath]: creaturesApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(creaturesApi.middleware) 
});

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
