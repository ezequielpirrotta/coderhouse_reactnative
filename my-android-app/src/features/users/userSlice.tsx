import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../data/objectTypes'

type UserState = {
   isLoading: boolean
   data: User|null
   error: boolean
}
export const getUser = createAsyncThunk('getUser', async () => {
   const response = await fetch('https://randomuser.me/api/?inc=gender,login,id,name,location,dob,cell,picture,nat&noinfo');
   const result = await response.json()
   let newUser: User = {
      id: result.results[0].id.value,
      name: result.results[0].name.first+' '+result.results[0].name.last,
      username: result.results[0].login.username,
      password: result.results[0].login.password,
      matches: [],
      pictures: [result.results[0].picture.thumbnail],
      age: 20,
      location: 'Ciudad1',
      gender: result.results[0].gender,
      sex: 'M',
      likes: [],
      interests: ['musica','correr'],
      filter: {ageRange: [20,30]}
   }
   return newUser
})

const initialState: UserState = {
   isLoading: false,
   data: null,
   error: false
}

export const userSlice = createSlice({
   name: 'user',
   initialState: initialState,
   reducers: {

   },
   extraReducers: builder => {
   
      builder.addCase(getUser.pending, (state,action) => {
         state.isLoading = true
      })
      .addCase(getUser.fulfilled, (state,action: PayloadAction<User>) => {
         state.isLoading = false
         state.data = action.payload
      })
      .addCase(getUser.rejected, (state,action) => {
         state.isLoading = true
      })
   },
})

// Action creators are generated for each case reducer function
export const {  } = userSlice.actions

export default userSlice.reducer