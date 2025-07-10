import { canCreateCourse } from "@/actions/course";
import CourseForm from "@/components/courses/CourseForm";
import Image from "next/image";
import Link from "next/link";

export default async function CreateCourse() {
    const canCreate = await canCreateCourse();


    return (
        <main className="min-lg:w-2/4 min-md:w-2/3 items-center justify-center">
            {canCreate ? (
                <article className="w-full">
                    <h1 className="text-center">Course Builder</h1>
                    <CourseForm />
                </article>
            ) : (
                <article className="course-limit">
                    <Image src="/images/limit.svg" alt="course limit reached" width={360} height={230} />
                    <div className="cta-badge">
                        Upgrade your plan
                    </div>
                    <h1>You’ve Reached Your Limit</h1>
                    <p>You’ve reached your course limit. Upgrade to create more courses and premium features.</p>
                    <Link href="/subscription" className="btn-primary w-full justify-center" >
                        Upgrade My Plan
                    </Link>
                </article>
            )}
        </main>
    );
}