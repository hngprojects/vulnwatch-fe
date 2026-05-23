import Link from "next/link";
import { pressReleases } from "../../constants/press";

export default function PressRelease() {
    return (
        <section className="mx-auto max-w-6xl px-6 py-16">
            <h2 className="mb-8 text-[20px] font-bold text-header md:text-[24px]">
                Press release
            </h2>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                {pressReleases.map((release) => (
                    <article
                        key={release.title}
                        className="rounded-xl border border-gray-200 bg-white px-6 py-10 transition hover:shadow-md"
                    >
                        <p className="text-sm text-gray-500">{release.date}</p>

                        <h3 className="mt-3 text-base font-medium leading-snug text-header">
                            {release.title}
                        </h3>

                        <Link
                            href={release.url}
                            className="mt-5 inline-block text-sm text-primary underline underline-offset-4 transition hover:text-primary/80"
                        >
                            Read release
                        </Link>
                    </article>
                ))}
            </div>
        </section>
    );
}