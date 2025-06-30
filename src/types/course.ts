export interface Course {
    id: string|number
    name: string
    description?: string
    subject: string
    topic: string
    voice?: string
    color: string
    duration: number
    bookmarked: boolean
    createdAt?: string
}