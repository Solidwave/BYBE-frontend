// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Creature } from '../types/creature'

// export interface CreaturesResponse {
//     results?: Array<Creature>;
//     next?: string,
//     count?: number
// }


// // Define a service using a base URL and expected endpoints
// export const encounterApi = createApi({
//     reducerPath: 'encounterPath',
//     baseQuery: fetchBaseQuery({ baseUrl: 'https://bybe.fly.dev/encounter/', mode: 'cors' }),
//     endpoints: (builder) => ({
//         getCreaturesList: builder.query<CreaturesResponse, string>({
//             query: () => 'list',
//         }),
        
//     }),
// })

// // Export hooks for usage in function components, which are
// // auto-generated based on the defined endpoints
// export const {  } = encounterApi

// //https://bybe.fly.dev/bestiary/