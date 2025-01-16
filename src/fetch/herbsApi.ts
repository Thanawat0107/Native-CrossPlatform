import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrlAPI } from "../helpers/SD";

export const herbsApi = createApi({
  reducerPath: "herbsApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrlAPI }),
  tagTypes: ["herbs"],
  endpoints: (builder) => ({
    getHerbs: builder.query({
      query: () => "herbs",
      providesTags: ["herbs"],
    }),
  }),
});

export const { useGetHerbsQuery } = herbsApi;
