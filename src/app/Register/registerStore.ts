import { configureStore } from "@reduxjs/toolkit"
import registerReducer from "../../features/users/registerSlice"

export const registerStore = configureStore({
    reducer: {
        register: registerReducer,      
    },
})

export type RootRegisterState = ReturnType<typeof registerStore.getState>
export type RegisterDispatch = typeof registerStore.dispatch