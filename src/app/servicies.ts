import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { api_key, base_auth_url, base_url } from '../firebase/database'
import { cloudinary_api_url } from '../otherServices/urls&keys'

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
   tagTypes: ["users"],
   endpoints: (builder) => ({
      getUser: builder.query({
         query: (username) => `users.json?orderByChild=username&equalTo=${username}`,
         providesTags: ["users"]
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

export const gendersApi = createApi({
   reducerPath: 'gendersApi',
   baseQuery: fetchBaseQuery({baseUrl: base_url}),
   endpoints: (builder) => ({
      getGenders: builder.query({
         query: () => `genders.json`,
      }),
   })
})
export const { useGetGendersQuery } = gendersApi

export const picturesApi = createApi({
   reducerPath: 'picturesApi',
   baseQuery: fetchBaseQuery({baseUrl: cloudinary_api_url}),
   tagTypes: ["users"],
   endpoints: (builder) => ({
      gePicture: builder.query({
         query: () => ``,
      }),
      upLoadPicture: builder.mutation({
         query: (body) => ({
            url: ``,
            method: 'POST',
            body
         })
      })
   })
})

export const { useGePictureQuery, useUpLoadPictureMutation} = picturesApi