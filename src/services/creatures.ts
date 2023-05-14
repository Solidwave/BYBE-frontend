// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Creature } from '../types/creature'

const backendUrl = process.env.REACT_APP_BACKEND_URL
export interface CreaturesResponse {
  results: Array<Creature>;
  next?: string,
  count: number
}

export type VariantResponseType = {
  results: Creature
}

export type ListRequest = {
  cursor: number,
  order: string
}

// Define a service using a base URL and expected endpoints
export const creaturesApi = createApi({
  reducerPath: 'creaturesPath',
  baseQuery: fetchBaseQuery({ baseUrl: `${backendUrl}/bestiary/`, mode: 'cors' }),
  endpoints: (builder) => ({
    getCreaturesList: builder.query<CreaturesResponse, ListRequest>({
      query: ({cursor, order}) => {
        return {
          url: 'list',
          method: 'get',
          params: {
            cursor,
            order: order !== '' ? order : undefined,
            page_size: 50
          }
        }
      }
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
      query: () => 'alignments',
    }),
    getElite: builder.query<VariantResponseType, string>({
      query: (creature_id) => {
        return {
          url: 'elite',
          method: 'get',
          params: {
            creature_id
          }
        }
      },
      transformResponse: (response: VariantResponseType, meta, arg) => {
        if (!response.results.quantity) {
          response.results.quantity = 1
        }
        response.results.variant = 'elite'
        return response
      }
    }),
    getWeak: builder.query<VariantResponseType, string >({
      query: (creature_id) => {
        return {
          url: 'weak',
          method: 'get',
          params: {
            creature_id
          }
        }
      },
      transformResponse: (response: VariantResponseType, meta, arg) => {
        if (!response.results.quantity) {
          response.results.quantity = 1
        }

        response.results.variant = 'weak'
        return response
      }
    }),
  }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useGetCreaturesListQuery,
  useGetFamiliesListQuery,
  useGetAlignmentsListQuery,
  useGetRaritiesListQuery,
  useGetSizesListQuery,
  useLazyGetEliteQuery,
  useLazyGetWeakQuery
 } = creaturesApi

//https://bybe.fly.dev/bestiary/