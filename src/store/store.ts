import { configureStore } from "@reduxjs/toolkit";
import { groupsApi, herbsApi } from "../fetch";
import { herbsReducer } from "./slices/herbsSlice";
import { groupsReducer } from "./slices/groupsSlice";

export const store = configureStore({
  reducer: {
    herbs: herbsReducer,
    [herbsApi.reducerPath]: herbsApi.reducer,

    groups: groupsReducer,
    [groupsApi.reducerPath]: groupsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(herbsApi.middleware, groupsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;