"use client";

import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("topic") ?? '';
    const [search, setSearch] = useState(query);    

    useEffect(() => {
        const debouncedSearch = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            if (search) {
                params.set("topic", search);
            } else {
                params.delete("topic");
            }
            router.push(`/courses?${params.toString()}`, { scroll: false });
        }, 500)

        return () => clearTimeout(debouncedSearch);
    }, [search, router, searchParams]);
    
    return (
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Enter a topic..." className="w-full" />
    );
}