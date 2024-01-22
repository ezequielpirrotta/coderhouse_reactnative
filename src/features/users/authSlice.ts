import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AuthState } from '../../data/objectTypes'

const initialState: AuthState = {
   token: '',
   email: '',
   localId: ''
}

export const authSlice = createSlice({
   name: 'auth',
   initialState: initialState,
   reducers: {
      setUser: (state: AuthState, action: PayloadAction<AuthState>) => {
         console.log(action.payload.token)
         state.token = action.payload.token
         state.email = action.payload.email
      },
      clearUser: (state) => {
         state.token = '',
         state.email = ''
      }
   },
})

// Action creators are generated for each case reducer function
export const { setUser, clearUser } = authSlice.actions

export default authSlice.reducer