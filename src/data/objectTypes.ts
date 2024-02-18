export type UserData = {
   name: string
   pictures: string[]
   age: number
   home: string
   gender?: string
   sex: string
   birthDate?: Date
   bio: string
   likes: string[]
   interests: string[]
   matches: Match[]
   filters: Filter
   location?:  Location
}
export type User = {
   id: string
   data:UserData
}
export type UserState = {
   isLoading: boolean
   data:UserData|null
   error: object | null | undefined
}
export type RegisterState = {
   name: string
   email: string,
   password: string,
   age: number,
   birthDate: string,
   sex: string,
   gender: string,
   home: string
   pictures: string[],
   bio: string,
   filters: Filter
   interests: string[],
}
export type Location = {
   latitude: string,
   longitude: string,
   address?: string
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
   ageRange: [number, number]
   distanceRange: number
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
   defaultValue?: string | number
}
export type AuthState = {
   email: string
   token: string
   localId: string
}
export type ButtonParams = {
   title?: string
   titleStyle?:object
   onPress: Function
   buttonColor?: object
}
export type Error = {
   message: string
}
export type sessionInsert = {
   localId: string,
   email: string | null,
   token: string | null
}
export type ImageSelectorType = {
   onAdd: (images: string[]) => void;
   maxImages?: number
   currentImages?: string[]
}