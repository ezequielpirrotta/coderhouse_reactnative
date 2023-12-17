export type User = {
    id: string
    username: string
    password: string
    pictures: string[]
    age: number
    location: string
    interests: string[]
    matches: Match[]
    filter: Filter
}
export type UserContextType = {
    user: User | undefined
    updateUser: (user: User) => void
  };
export type Match = {
    userId: string
}
export type Filter = {
    ageRange?: [number, number]
    location?: string
    commonInterests?: string[]
}
