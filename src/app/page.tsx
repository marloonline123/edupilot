import { getAllCourses } from '@/actions/course'
import CourseCard from '@/components/courses/CourseCard'
import Cta from '@/components/courses/Cta'
import RecentSessions from '@/components/courses/RecentSessions'
import React from 'react'

// const courses = [
//   {
//     id: 1,
//     subject: "Maths",
//     name: "Maths 101",
//     topic: "Basic Arithmetic",
//     duration: 78,
//     bookmarked: false,
//     color: "#FFDA6E",
//   },
//   {
//     id: 2,
//     subject: "Science",
//     name: "Science 101",
//     topic: "Basic Science",
//     duration: 12,
//     bookmarked: false,
//     color: "#E5D0FF",
//   },
//   {
//     id: 3,
//     subject: "Coding",
//     name: "Coding 101",
//     topic: "Basic Coding",
//     duration: 45,
//     bookmarked: false,
//     color: "#FFC0CB",
//   },
// ]
const Page = async () => {
  const courses = await getAllCourses({ limit: 3 });
  return (
    <main>
      <h1>Populer Courses</h1>

      <section className='home-section'>
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </section>

      <section className='home-section'>
        <RecentSessions title='Recent Sessions' classNames='max-md:w-full w-2/3' />
        <Cta />
      </section>
    </main>
  )
}

export default Page