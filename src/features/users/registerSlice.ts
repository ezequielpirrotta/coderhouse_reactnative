import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RegisterBasics, RegisterState, User } from '../../data/objectTypes'

const initialState: RegisterState = {
   name: '',
   email: '',
   password: '',
   age: 18,
   sex: 'male',
   gender: '',
   pictures: [],
   bio: '',
   interests: []
}

export const registerSlice = createSlice({
   name: 'register',
   initialState: initialState,
   reducers: {
      setBasics: (state: RegisterState, action: PayloadAction<RegisterBasics>) => {
         state.name = action.payload.name
         state.email = action.payload.email
         state.password = action.payload.password
         state.age = action.payload.age
         state.sex = action.payload.sex
      },
      setGender: (state: RegisterState, action: PayloadAction<string>) => {
         state.gender = action.payload
      },
      addBio: (state: RegisterState, action: PayloadAction<string>) => {
         state.bio = action.payload
      },
      addIntersts: (state: RegisterState, action: PayloadAction<string[]>) => {
         state.interests = action.payload
      },
      addPicture: (state: RegisterState, action: PayloadAction<string>) => {
         state.pictures.push(action.payload)
      }
   },
})

export const { setBasics} = registerSlice.actions

export default registerSlice.reducer