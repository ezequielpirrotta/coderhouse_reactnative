import { configureStore } from "@reduxjs/toolkit"
import registerReducer from "../../features/users/registerSlice"
import { gendersApi } from "../servicies"
import { setupListeners } from "@reduxjs/toolkit/query"

export const registerStore = configureStore({
    reducer: {
        register: registerReducer,
        [gendersApi.reducerPath]: gendersApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(gendersApi.middleware)   
})
setupListeners(registerStore.dispatch)
export type RootRegisterState = ReturnType<typeof registerStore.getState>
export type RegisterDispatch = typeof registerStore.dispatch