// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Creature } from '../types/Creature'

const backendUrl = process.env.REACT_APP_BACKEND_URL
export type CreaturesResponse = {
  results: Array<Creature>;
  next?: string,
  count: number
}

export type VariantResponseType = {
  results: Creature
}

export type ListRequest = {
  cursor: number,
  page_size: number,
  order: string,
  sort_field?: string,
  name_filter?: string,
  alignment_filter?: string,
  family_filter?: string,
  rarity_filter?: string,
  size_filter?: string
}

// Define a service using a base URL and expected endpoints
export const creaturesApi = createApi({
  reducerPath: 'creaturesPath',
  baseQuery: fetchBaseQuery({ baseUrl: `${backendUrl}/bestiary/`, mode: 'cors' }),
  endpoints: (builder) => ({
    getCreaturesList: builder.query<CreaturesResponse, ListRequest>({
      query: ({cursor, order, page_size, name_filter, sort_field, alignment_filter, family_filter, rarity_filter, size_filter}) => {
        return {
          url: 'list',
          method: 'get',
          params: {
            cursor,
            sort_field: sort_field ,
            order: order,
            page_size,
            name_filter,
            alignment_filter,
            family_filter,
            rarity_filter,
            size_filter
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
        response.results.variant = 'weak'
        return response
      }
    }),
    getCreature: builder.query<VariantResponseType, string>({
      query: (creature_id) => {
        return {
          url: '',
          method: 'get',
          params: {
            creature_id
          }
        }
      },
      transformResponse: (response: VariantResponseType, meta, arg) => {
        response.results.variant = 'normal'
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
  useLazyGetWeakQuery,
  useLazyGetCreatureQuery
 } = creaturesApi

//https://bybe.fly.dev/bestiary/