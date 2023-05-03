import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { creaturesApi } from '../services/creatures';
import { encounterApi } from '../services/encounter';
import partySlice from '../services/partySlice';

export const store = configureStore({
  reducer: {
    [creaturesApi.reducerPath]: creaturesApi.reducer,
    [encounterApi.reducerPath]: encounterApi.reducer,
    party: partySlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    creaturesApi.middleware,
    encounterApi.middleware
  ])
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
