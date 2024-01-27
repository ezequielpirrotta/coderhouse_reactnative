import { configureStore } from "@reduxjs/toolkit"
import registerReducer from "../../features/users/registerSlice"
import { authApi, gendersApi, userApi } from "../servicies"
import { setupListeners } from "@reduxjs/toolkit/query"
import authReducer from "../../features/users/authSlice"


export const registerStore = configureStore({
    reducer: {
        register: registerReducer,
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [gendersApi.reducerPath]: gendersApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(gendersApi.middleware,authApi.middleware,userApi.middleware)   
})
setupListeners(registerStore.dispatch)
export type RootRegisterState = ReturnType<typeof registerStore.getState>
export type RegisterDispatch = typeof registerStore.dispatch