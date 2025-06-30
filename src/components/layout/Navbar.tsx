import Image from "next/image";
import Link from "next/link";
import NavbarItems from "./NavbarItems";

export default function Navbar() {
    return (
        <nav className="navbar">
            <Link href="/">
                <div>
                    <Image src="/images/logo.svg" alt="Logo" width={50} height={50} />
                </div>
            </Link>

            <NavbarItems />
        </nav>
    );
}