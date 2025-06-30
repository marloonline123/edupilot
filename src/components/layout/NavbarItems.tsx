"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { label: 'Home', url: '/' },
    { label: 'Courses', url: '/courses' },
    { label: 'Subscription', url: '/subscription' },
]
export default function NavbarItems() {
    const pathname = usePathname();
    return (
        <nav>
            <ul className="flex gap-3 items-center">
                {links.map((link, index) => (
                    <li key={index}>
                        <Link href={link.url} className={cn(pathname === link.url && 'text-primary font-semibold')}>{link.label}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}