export type User = {
   name: string
   pictures: string[]
   age: number
   home: string
   gender?: string
   sex: string
   bio: string
   likes: string[]
   interests: string[]
   matches: Match[]
   filter: Filter
}
export type UserState = {
   isLoading: boolean
   data: User|null
   error: Error | null | undefined
}
export type RegisterState = {
   name: string
   email: string,
   password: string,
   age: number,
   sex: string,
   gender: string,
   home: string
   pictures: string[],
   bio: string,
   interests: string[],
}

export type RegisterBasics = {
   name: string,
   email: string,
   password: string,
   age: number,
   sex: string,
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
export type InputSelectFormProps = {
   label: string
   onChange: Function,
   options: string[]
}
export type AuthState = {
   email: string
   token: string
   localId: string
}
export type ButtonParams = {
   title: string
   onPress: Function
   color?: string
}
export type Error = {
   message: string
}
export type sessionInsert = {
   localId: string,
   email: string | null,
   token: string | null
}