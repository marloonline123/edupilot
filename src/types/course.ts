export interface Course {
    id: string|number
    name: string
    description?: string
    subject: string
    topic: string
    voice: string
    color: string
    duration: number
    style: string
    bookmarked: boolean
    createdAt?: string
}