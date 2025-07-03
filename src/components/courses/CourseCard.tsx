import { getSubjectColor } from "@/lib/utils";
import { Course } from "@/types/course";
import Image from "next/image";
import Link from "next/link";

interface CourseCardProps {
    course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
    return (
        <div className="course-card" style={{ backgroundColor: getSubjectColor(course.subject) }}>
            <div className="flex items-center justify-between">
                <span className="subject-badge">{course.subject}</span>
                <button className="course-bookmark">
                    <Image src="/icons/bookmark.svg" alt="Bookmark" width={15} height={15} />
                </button>
            </div>

                <h3 className="text-2xl font-semibold">{course.name}</h3>
                <p className="text-sm">{course.topic}</p>

            <div className="flex items-center gap-2">
                <Image src="/icons/clock.svg" alt="Bookmark" width={15} height={15} />
                <span>{course.duration} minutes</span>
            </div>

            <Link href={`/courses/${course.id}`} className="">
                <button className="btn-primary w-full text-center justify-center">Start Learning</button>
            </Link>
        </div>
    );
}