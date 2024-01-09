import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AuthState } from '../../data/objectTypes'

const initialState: AuthState = {
   token: null,
   email: null,
}

export const authSlice = createSlice({
   name: 'auth',
   initialState: initialState,
   reducers: {
      setUser: (state: AuthState, action: PayloadAction<AuthState>) => {
         state.token = action.payload.token
         state.email = action.payload.email
      },
      clearUser: (state) => {
         state.token = null,
         state.email = null
      }
   },
})

// Action creators are generated for each case reducer function
export const { setUser, clearUser } = authSlice.actions

export default authSlice.reducer