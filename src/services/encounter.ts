import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Creature } from '../types/creature'

export interface CreaturesResponse {
    results?: Array<Creature>;
    next?: string,
    count?: number
}

export type EncounterResponse = Creature[]

export type EncounterRequest = { family?: string, rarity?: string, size?: string, alignment?: string, encounter_difficulty?: string, party_levels?: Number[] }

// Define a service using a base URL and expected endpoints
export const encounterApi = createApi({
    reducerPath: 'encounterPath',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://bybe.fly.dev/encounter/', mode: 'no-cors' }),
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
                    body: party_levels,
                    mode: 'no-cors'
                }
            },
        }),
        
    }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useLazyGenerateEncounterQuery } = encounterApi

//https://bybe.fly.dev/bestiary/