import { configureStore } from "@reduxjs/toolkit"
import userReducer from "../features/users/userSlice"
import authReducer from "../features/users/authSlice"
import { authApi, userApi } from "./servicies"
import { setupListeners } from "@reduxjs/toolkit/query"

export const store = configureStore({
   reducer: {
      user: userReducer,
      auth: authReducer,
      [authApi.reducerPath]: authApi.reducer,      
      [userApi.reducerPath]: userApi.reducer,      
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware).concat(userApi.middleware)   
})
setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch