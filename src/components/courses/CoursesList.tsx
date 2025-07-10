import { Course } from "@/types/course";
import CourseCard from "./CourseCard";

export default function CoursesList({courses}: {courses: Course[]}) {
    return (
        <div className="flex gap-2 flex-wrap">
            {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
            ))}
        </div>
    );
}