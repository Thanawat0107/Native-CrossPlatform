import { configureStore } from "@reduxjs/toolkit";
import { herbsApi } from "../fetch";
import { herbsReducer } from "./slices/herbsSlice";

export const store = configureStore({
  reducer: {
    herbs: herbsReducer,
    [herbsApi.reducerPath]: herbsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(herbsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;