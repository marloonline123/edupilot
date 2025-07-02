import { getAllCourses } from "@/actions/course";
import CourseCard from "@/components/courses/CourseCard";
import SearchFilter from "@/components/courses/SearchFilter";
import SubjectFilter from "@/components/courses/SubjectFilter";

export default async function Courses({searchParams}: SearchParams) {
    const params = await searchParams;
    const subject = params?.subject || '';
    const topic = params?.topic || '';
    const courses = await getAllCourses({subject, topic});
    console.log('path', courses);
    
    return (
        <main className="">
            <section className="flex justify-between items-center max-sm:flex-col max-sm:items-start">
                <h2 className="font-bold text-3xl">Courses Library</h2>

                <div className="flex gap-2">
                    <SearchFilter />
                    <SubjectFilter />
                </div>
            </section>

            <section>
                <div className="courses-grid">
                    { courses.map((course) => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            </section>
        </main>
    );
}