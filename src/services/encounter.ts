import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Creature } from '../types/Creature';

const backendUrl = process.env.REACT_APP_BACKEND_URL

export interface CreaturesResponse {
    results?: Array<Creature>;
    next?: string,
    count?: number
}

export type EncounterResponse = {
    results: Creature[],
    count: number,
    experience: number,
    difficulty: string,
    levels: {
        TRIVIAL: number,
        LOW: number,
        MODERATE: number,
        SEVERE: number,
        EXTREME: number,
        IMPOSSIBLE: number
    }
}

export type EncounterInfoRequest = {
    party_levels: number[],
    enemy_levels: number[]
}

export type EncounterInfoResponse = {
    experience: number,
    difficulty: string,
    levels:{
        TRIVIAL: number,
        LOW: number,
        MODERATE: number,
        SEVERE: number,
        EXTREME: number,
        IMPOSSIBLE: number
    }
}

export type EncounterRequest = { family?: string, rarity?: string, size?: string, alignment?: string, encounter_difficulty?: string, party_levels?: number[] }

// Define a service using a base URL and expected endpoints
export const encounterApi = createApi({
    reducerPath: 'encounterPath',
    baseQuery: fetchBaseQuery({ baseUrl: `${backendUrl}/encounter/`, mode: 'cors'}),
    endpoints: (builder) => ({
        generateEncounter: builder.query<EncounterResponse, EncounterRequest>({
            query: (args) => {
                const {
                    family,rarity,size,alignment,encounter_difficulty,party_levels
                } = args

                return {
                    url: 'generator',
                    params: {family,rarity,size,alignment,encounter_difficulty},
                    method: 'post',
                    body: party_levels
                }
            },
            transformResponse: (response: EncounterResponse) => {

                response.results = response.results.map(creature => {
                    return {
                        ...creature,
                        variant: 'normal'
                    }
                })
                
                return response
            }
        }),
        getEncounterInfo: builder.query<EncounterInfoResponse, EncounterInfoRequest>({
            query: (args) => {
                const {
                    party_levels, enemy_levels
                } = args

                return {
                    url: 'info',
                    method: 'post',
                    body: {
                        party_levels,
                        enemy_levels
                    }
                }
            },
        }),
        
    }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useLazyGenerateEncounterQuery, useLazyGetEncounterInfoQuery } = encounterApi

//https://bybe.fly.dev/bestiary/