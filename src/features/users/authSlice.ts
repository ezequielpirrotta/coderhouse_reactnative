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
         state.token = action.payload.token
         state.email = action.payload.email
         state.localId = action.payload.localId
      },
      logOut: (state) => {
         state.token = ''
         state.email = ''
         state.localId = ''
      }
   },
})

// Action creators are generated for each case reducer function
export const { setUser, logOut } = authSlice.actions

export default authSlice.reducer