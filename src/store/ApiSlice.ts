import { IPokeItem, IResponse } from './../types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/pokemon' }),
  endpoints: builder => ({
    getTotalPokemons: builder.query<IPokeItem[], number>({
      query: (limit) => ({
        url: '/',
        params: {
          limit: limit
        }
      }),      
      transformResponse: (response: IResponse) : IPokeItem[] => {
        return response.results
      }
    })
  })
})

export default apiSlice;