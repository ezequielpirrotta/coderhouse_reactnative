import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'
import { RegisterDispatch, RootRegisterState } from './Register/registerStore'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


type RegisterDispatchFunc = () => RegisterDispatch
export const useRegisterDispatch: RegisterDispatchFunc = useDispatch
export const useRegisterSelector: TypedUseSelectorHook<RootRegisterState> = useSelector