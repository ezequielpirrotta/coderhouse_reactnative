import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { api_key, base_auth_url, base_url } from '../firebase/database'

export const authApi = createApi({
   reducerPath: 'authApi',
   baseQuery: fetchBaseQuery({baseUrl: base_auth_url}),
   endpoints: (builder) => ({
      register: builder.mutation({
         query: ({...auth}) => ({
            url: `accounts:signUp?key=${api_key}`,
            method: 'POST',
            body: auth
         })
      }),
      login: builder.mutation({
         query: ({...auth}) => ({
            url: `accounts:signInWithPassword?key=${api_key}`,
            method: 'POST',
            body: auth
         })
      })
   })
})

export const { useLoginMutation, useRegisterMutation} = authApi

export const userApi = createApi({
   reducerPath: 'userApi',
   baseQuery: fetchBaseQuery({baseUrl: base_url}),
   endpoints: (builder) => ({
      getUser: builder.query({
         query: (userId) => `users.json?equalTo=${userId}`
      }),
      createUser: builder.mutation({
         query: (body) => ({
            url: `users.json`,
            method: 'POST',
            body
         })
      })
   })
})

export const { useGetUserQuery, useCreateUserMutation} = userApi
