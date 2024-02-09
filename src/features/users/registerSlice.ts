import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Filter, RegisterBasics, RegisterState,UserData } from '../../data/objectTypes'
import { minAge,initialMaxAge, initialMaxDistance } from '../../global/constants'

const initialState: RegisterState = {
   name: '',
   email: '',
   password: '',
   age: 18,
   sex: '',
   home: '',
   gender: '',
   pictures: [],
   bio: '',
   filters: { ageRange: [minAge,initialMaxAge], distanceRange: initialMaxDistance },
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
      setHome: (state: RegisterState, action: PayloadAction<string>) => {
         state.gender = action.payload
      },
      setGender: (state: RegisterState, action: PayloadAction<string>) => {
         state.gender = action.payload
      },
      setFilters: (state: RegisterState, action: PayloadAction<Filter>) => {
         state.filters = action.payload
      },
      addBio: (state: RegisterState, action: PayloadAction<string>) => {
         state.bio = action.payload
      },
      addIntersts: (state: RegisterState, action: PayloadAction<string[]>) => {
         state.interests = action.payload
      },
      addPictures: (state: RegisterState, action: PayloadAction<string[]>) => {
         state.pictures = action.payload
      }
   },
})

export const { setBasics,setHome,setGender, addBio, addIntersts, addPictures, setFilters} = registerSlice.actions

export default registerSlice.reducer