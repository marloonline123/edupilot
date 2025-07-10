
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { cn, getSubjectColor } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { getSessions } from "@/actions/course";
import { Course } from "@/types/course";

interface RecentSessionsProps {
    title: string;
    courses?: Course[];
    classNames?: string;
}

const RecentSessions = async ({ title, classNames }: RecentSessionsProps) => {
    const recentSessions = await getSessions();
    return (
        <article className={cn('course-list', classNames)}>
            <h2 className="font-bold text-3xl">{title}</h2>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-lg w-2/3">Lessons</TableHead>
                        <TableHead className="text-lg">Subject</TableHead>
                        <TableHead className="text-lg text-right">Duration</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {recentSessions?.map(({ id, subject, name, topic, duration }) => (
                        <TableRow key={id}>
                            <TableCell>
                                <Link href={`/courses/${id}`}>
                                    <div className="flex items-center gap-2">
                                        <div className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden" style={{ backgroundColor: getSubjectColor(subject) }}>
                                            <Image
                                                src={`/icons/${subject}.svg`}
                                                alt={subject}
                                                width={35}
                                                height={35} />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <p className="font-bold text-xl">
                                                {name.length > 20 ? name.slice(0, 20) + '...' : name}

                                            </p>
                                            <p className="text-sm">
                                                {topic.length > 20 ? topic.slice(0, 30) + '...' : topic}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </TableCell>
                            <TableCell>
                                <div className="subject-badge w-fit max-md:hidden">
                                    {subject}
                                </div>
                                <div className="flex items-center justify-center rounded-lg w-fit p-2 md:hidden" style={{ backgroundColor: getSubjectColor(subject) }}>
                                    <Image
                                        src={`/icons/${subject}.svg`}
                                        alt={subject}
                                        width={18}
                                        height={18}
                                    />
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2 w-full justify-end">
                                    <p className="text-2xl">
                                        {duration} {' '}
                                        <span className="max-md:hidden">mins</span>
                                    </p>
                                    <Image src="/icons/clock.svg" alt="minutes" width={14} height={14} className="md:hidden" />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </article>
    )
}

export default RecentSessions;