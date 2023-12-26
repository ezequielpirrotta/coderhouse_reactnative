export type User = {
    id: string
    name: string
    username: string
    password: string
    pictures: string[]
    age: number
    location: string
    gender: string
    sex: 'M'|'F'
    likes: string[]
    interests: string[]
    matches: Match[]
    filter: Filter
}
export type Match = {
    userId: string
}
export type Filter = {
    ageRange?: [number, number]
    location?: string
    commonInterests?: string[]
}
