import { getUserCourses, getUserSessions } from "@/actions/course";
import CoursesList from "@/components/courses/CoursesList";
import RecentSessions from "@/components/courses/RecentSessions";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Profile() {
    const user = await currentUser();
    if (!user) return redirect('/sign-in');
    const sessions = await getUserSessions(user.id);
    const courses = await getUserCourses(user.id);
    return (
        <main className="min-lg:w-3/4">
            <section className="flex justify-between items-center max-sm:flex-col gap-4">
                <div className="flex items-center gap-4">
                    <Image src={user.imageUrl} alt={user.firstName ?? "User Profile image"} width={113} height={113} className="rounded-lg" />

                    <div className="flex flex-col gap-2">
                        <h2 className="text-3xl font-bold">{user.firstName} {user.lastName}</h2>
                        <p className="text-lg text-muted-foreground">{user.emailAddresses[0].emailAddress}</p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="border-2 border-black rounded-md p-2 h-fit">
                        <div className=" flex gap-2">
                            <Image src="/icons/check.svg" alt="checkmark" width={20} height={20} />
                            <span>{sessions.length}</span>
                        </div>
                        <p className="text-muted-foreground">Active Sessions</p>
                    </div>
                    <div className="border-2 border-black rounded-md p-2 h-fit">
                        <div className=" flex gap-2">
                            <Image src="/icons/cap.svg" alt="capmark" width={20} height={20} />
                            <span>{courses.length}</span>
                        </div>
                        <p className="text-muted-foreground">Active Courses</p>
                    </div>
                </div>
            </section>

            <Accordion
                type="multiple"
                
                className="w-full"
                defaultValue="recent-sessions"
            >
                <AccordionItem value="recent-sessions">
                    <AccordionTrigger className="text-2xl font-bold">Recent Sesions</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                        <RecentSessions title="Recent Sessions" />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="recent-courses">
                    <AccordionTrigger className="text-2xl font-bold">Recent Courses</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                        <CoursesList courses={courses} />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </main>
    );
}