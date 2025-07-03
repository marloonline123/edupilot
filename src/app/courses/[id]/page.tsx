import { getCourse } from "@/actions/course";
import CourseMeeting from "@/components/courses/CourseMeeting";
import { getSubjectColor } from "@/lib/utils";
import { auth, currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

interface ShowCourseProps {
    params: Promise<{ id: string }>;
}
export default async function ShowCourse({ params }: ShowCourseProps) {
    const { id } = await params;
    const course = await getCourse(id);
    const user = await currentUser();

    if (!course) redirect('/courses');

    return (
        <main className="mb-5">
            <section className="rounded-border flex justify-between p-5 max-sm:flex-col gap-3">
                <div className="flex gap-3">
                    <div className="size-[70px] flex items-center justify-center rounded-lg p-3 max-md:hidden" style={{ backgroundColor: getSubjectColor(course.subject) }}>
                        <Image src={`/icons/${course.subject}.svg`} alt={course.subject} width={50} height={50} />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold">{course.name} <span className="subject-badge max-md:hidden">{course.subject}</span></h3>
                        <p>{course.topic}</p>
                    </div>
                </div>
                <div>
                    <span className="text-lg">{course.duration} minutes</span>
                </div>
            </section>

            <CourseMeeting course={course} userName={user?.firstName ?? 'user'} userImage={user?.imageUrl} />
        </main>
    );
}