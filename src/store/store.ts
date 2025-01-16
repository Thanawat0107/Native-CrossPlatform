import { configureStore } from "@reduxjs/toolkit";
import { herbsApi } from "../fetch";

export const store = configureStore({
  reducer: {
    [herbsApi.reducerPath]: herbsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(herbsApi.middleware),
});

// Share Get State
export type RootState = ReturnType<typeof store.getState>;
// Share Dispatch Get Action
export type AppDispatch = typeof store.dispatch;