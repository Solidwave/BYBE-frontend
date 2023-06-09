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
    min_level_filter?: number,
    max_level_filter?: number,
    min_hp_filter?: number,
    max_hp_filter?: number,
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
            query: (args) => {
                return {
                    url: 'list',
                    method: 'get',
                    params: {
                        ...args
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
            transformResponse: (response: VariantResponseType) => {
                response.results.variant = 'elite'
                return response
            }
        }),
        getWeak: builder.query<VariantResponseType, string>({
            query: (creature_id) => {
                return {
                    url: 'weak',
                    method: 'get',
                    params: {
                        creature_id
                    }
                }
            },
            transformResponse: (response: VariantResponseType) => {
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
            transformResponse: (response: VariantResponseType) => {
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