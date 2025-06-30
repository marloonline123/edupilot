import CourseCard from '@/components/courses/CourseCard'
import React from 'react'

const courses = [
  {
    id: 1,
    subject: "Maths",
    name: "Maths 101",
    topic: "Basic Arithmetic",
    duration: 78,
    bookmarked: false,
    color: "#FFDA6E",
  },
  {
    id: 2,
    subject: "Science",
    name: "Science 101",
    topic: "Basic Science",
    duration: 12,
    bookmarked: false,
    color: "#E5D0FF",
  },
  {
    id: 3,
    subject: "Coding",
    name: "Coding 101",
    topic: "Basic Coding",
    duration: 45,
    bookmarked: false,
    color: "#FFC0CB",
  },
]
const Page = () => {
  return (
    <main>
      <h1>Home</h1>

      <section className='home-section'>
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </section>
    </main>
  )
}

export default Page