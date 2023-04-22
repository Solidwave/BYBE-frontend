// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Creature } from '../types/creature'

export interface CreaturesResponse {
  results?: Array<Creature>;
  next?: string,
  count?: number
}


// Define a service using a base URL and expected endpoints
export const creaturesApi = createApi({
  reducerPath: 'creaturesPath',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://bybe.fly.dev/bestiary/', mode: 'cors'}),
  endpoints: (builder) => ({
    getCreaturesList: builder.query<CreaturesResponse, string>({
      query: () => 'list',
    }),
    getFamiliesList: builder.query<string[], string>({
      query: () => 'families',
    }),
    getRaritiesList: builder.query<string[], string>({
      query: () => 'rarities',
    }),
    getSizesList: builder.query<string[], string>({
      query: () => 'sizes',
    }),
    getAlignmentsList: builder.query<string[], string>({
      query: () => 'aligments',
    }),
  }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetCreaturesListQuery, useGetFamiliesListQuery } = creaturesApi

//https://bybe.fly.dev/bestiary/