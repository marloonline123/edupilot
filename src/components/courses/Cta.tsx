import Image from "next/image";
import Link from "next/link";

export default function Cta() {
    return (
        <section className="cta-section">
            <div className="cta-badge">Start Learning Your Way</div>

            <h3 className="font-bold text-3xl">
                Build and Personalize Learning Courses
            </h3>

            <p>
                Pick a name, subject, voice, & personality — and start learning through voice conversations that feel natural and fun.
            </p>

            <div>
                <Image src="/images/cta.svg" alt="CTA" width={500} height={500} />
            </div>

            <button className="btn-orange">
                <Image src="/icons/plus.svg" alt="plus" width={12} height={12} />
                <Link href="/courses/create">
                    <p>Build a New Course</p>
                </Link>
            </button>
        </section>
    );
}