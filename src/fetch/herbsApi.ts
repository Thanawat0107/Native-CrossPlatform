import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrlIos, baseUrlOs } from "../helpers/SD";
import { Platform } from "react-native";
const isIOS = Platform.OS === "ios";

const baseUrl = isIOS ? baseUrlIos : baseUrlOs;

export const herbsApi = createApi({
  reducerPath: "herbsApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),

  tagTypes: ["herbs"],
  endpoints: (builder) => ({
    getHerbs: builder.query({
      query: () => "herbs",
      providesTags: ["herbs"],
    }),
    
    getHerbById: builder.query({
      query: (id) => `herbs/${id}`,
      providesTags: (result, error, id) => [{ type: "herbs", id }],
    }),

    addHerb: builder.mutation({
      query: (newHerb) => ({
        url: "herbs",
        method: "POST",
        body: newHerb,
      }),
      invalidatesTags: ["herbs"],
    }),

    updateHerb: builder.mutation({
      query: ({ id, editHerb }) => ({
        url: `herbs/${id}`,
        method: "PUT",
        body: editHerb,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "herbs", id }],
    }),

    deleteHerb: builder.mutation({
      query: (id) => ({
        url: `herb/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "herbs", id }],
    }),

  }),
});

export const {
  useGetHerbsQuery,
  useGetHerbByIdQuery,
  useAddHerbMutation,
  useUpdateHerbMutation,
  useDeleteHerbMutation,
} = herbsApi;
