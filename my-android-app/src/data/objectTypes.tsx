export type User = {
    id: string
    username: string
    password: string
    age: number
    location: string
    interests: string[]
    matches: Match[]
}
export type UserContextType = {
    user: User | undefined
    updateUser: (user: User|undefined) => void
  };
export type Match = {
    userId: string
}
export type Filter = {
    ageRange?: [number, number]
    location?: string
    commonInterests?: string[]
}
export type Props = {
    setScreen: Function
 }