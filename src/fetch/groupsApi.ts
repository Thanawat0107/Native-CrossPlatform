import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../helpers/SD";

export const groupsApi = createApi({
  reducerPath: "groupsApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),

  tagTypes: ["groups"],
  endpoints: (builder) => ({
    getGroups: builder.query({
      query: () => "groups",
      providesTags: ["groups"],
    }),

    getGroupById: builder.query({
      query: (id) => `groups/${id}`,
      providesTags: (result, error, id) => [{ type: "groups", id }],
    }),
  }),
});

export const {
    useGetGroupsQuery,
    useGetGroupByIdQuery,
} = groupsApi
