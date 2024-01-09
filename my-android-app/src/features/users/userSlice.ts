import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User, UserState } from '../../data/objectTypes'

const initialState: UserState = {
   isLoading: true,
   data: null,
   error: false
}

export const userSlice = createSlice({
   name: 'user',
   initialState: initialState,
   reducers: {
      
      updateUser: (state: UserState, action: PayloadAction<User>) => {
         let updatedUser: User = action.payload
         state.data = updatedUser
      }
   },
   extraReducers: builder => {
   
      /*builder.addCase(getUser.pending, (state,action) => {
         state.isLoading = true
      })
      .addCase(getUser.fulfilled, (state,action: PayloadAction<User>) => {
         state.isLoading = false
         state.data = action.payload
      })
      .addCase(getUser.rejected, (state,action) => {
         state.isLoading = true
      })*/
   },
})

// Action creators are generated for each case reducer function
export const { updateUser } = userSlice.actions

export default userSlice.reducer