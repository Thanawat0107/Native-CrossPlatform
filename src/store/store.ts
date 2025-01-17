import { configureStore } from "@reduxjs/toolkit";
import { herbsApi } from "../fetch";
import { herbsReducer } from "./slices/herbsSlice";

export const store = configureStore({
  reducer: {
    [herbsApi.reducerPath]: herbsApi.reducer, // เพิ่ม RTK Query API Reducer
    herbs: herbsReducer, // เพิ่ม Local State Reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(herbsApi.middleware), // เพิ่ม middleware ของ RTK Query
});

// Share Get State
export type RootState = ReturnType<typeof store.getState>;
// Share Dispatch Get Action
export type AppDispatch = typeof store.dispatch;