import { object, string } from "yup";

export const signInSchema = object().shape({
    email: string()
        .required('Email is required')
        .email('Email not valid'),
    password: string()
        .required('Password is required')
})