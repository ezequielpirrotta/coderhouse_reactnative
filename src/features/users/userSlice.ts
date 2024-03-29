import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {UserData, UserState } from '../../data/objectTypes'

const initialState: UserState = {
   isLoading: true,
   data: null,
   error: null
}

export const userSlice = createSlice({
   name: 'user',
   initialState: initialState,
   reducers: {
      setCurrentUser: (state: UserState, action: PayloadAction<UserState>) => {
         state.data = action.payload.data
         state.isLoading = action.payload.isLoading
         state.error = action.payload.error
      },
      updateUser: (state: UserState, action: PayloadAction<UserData>) => {
         state.data = action.payload
      }
   },
})

// Action creators are generated for each case reducer function
export const { updateUser, setCurrentUser} = userSlice.actions

export default userSlice.reducer