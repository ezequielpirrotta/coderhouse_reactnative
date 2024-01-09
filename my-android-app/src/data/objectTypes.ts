export type User = {
   id: string
   name: string
   pictures: string[]
   age: number
   home: string
   gender?: string
   sex: string
   likes: string[]
   interests: string[]
   matches: Match[]
   filter: Filter
}
export type UserState = {
   isLoading: boolean
   data: User|null
   error: boolean
}
export type Match = {
    userId: string
}
export type Filter = {
    ageRange?: [number, number]
    location?: string
    commonInterests?: string[]
}
export type InputFormProps = {
   label: string
   onChange: Function
   error?: string
   isSecure?: boolean
}
export type AuthState = {
   email: string | null
   token: string | null
}

export type ButtonParams = {
   title: string
   onPress: Function
}