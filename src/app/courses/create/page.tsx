import CourseForm from "@/components/courses/CourseForm";

export default function CreateCourse() {
    return (
        <main className="min-lg:w-2/4 min-md:w-2/3 items-center justify-center">
            <article className="w-full">
                <h1 className="text-center">Course Builder</h1>
                <CourseForm />
            </article>
        </main>
    );
}