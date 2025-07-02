"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { subjects } from "@/constants";

export default function SubjectFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("subject") ?? '';
    const [subject, setSubject] = useState(query);

    useEffect(() => {
        const debouncedSubject = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            if (subject && subject !== "all") {
                params.set("subject", subject);
            } else {
                params.delete("subject");
            }
            router.push(`/courses?${params.toString()}`, { scroll: false });
        }, 500)

        return () => clearTimeout(debouncedSubject);
    }, [subject, router, searchParams]);

    return (
        <div>
            <Select onValueChange={setSubject} defaultValue={subject}>
                <SelectTrigger className="w-full capitalize">
                    <SelectValue placeholder="Pick a subject" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                            {subject}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}