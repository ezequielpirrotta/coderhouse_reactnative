import { object, ref, string } from "yup";

export const signUpSchema = object().shape({
    email: string()
        .required('Email is required')
        .email('Email not valid'),
    password: string()
        .required('Password is required')
        .min(6, 'Must be at least 6 characters'),
    confirmPassword: string()
        .oneOf([ref('password')],'Passwords must match')
        .required()
})