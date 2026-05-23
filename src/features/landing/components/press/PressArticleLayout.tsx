import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PressArticleLayoutProps {
    title: string;
    meta: string;
    backHref?: string;
    category?: string;
    badge?: ReactNode;
    originallyCoveredBy?: string;
    children: ReactNode;
}

export default function PressArticleLayout({
    title,
    meta,
    backHref = "/press",
    category,
    badge,
    originallyCoveredBy,
    children,
}: PressArticleLayoutProps) {
    return (
        <main className="min-h-screen bg-white">
            <div className="mx-auto max-w-3xl px-6 py-24 md:py-32">
                <Link
                    href={backHref}
                    className="mb-8 flex w-fit items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition"
                >
                    <ArrowLeft size={14} />
                    Back to Press
                </Link>

                {badge ? (
                    badge
                ) : category ? (
                    <p className="text-sm font-medium text-primary uppercase tracking-widest mb-4">
                        {category}
                    </p>
                ) : null}

                <h1 className="text-3xl font-bold text-header md:text-4xl leading-snug">
                    {title}
                </h1>
                <p className="mt-3 text-sm text-gray-500">{meta}</p>

                <hr className="my-8 border-gray-200" />

                <div className="prose prose-gray max-w-none space-y-6 text-base leading-relaxed text-gray-700">
                    {children}
                    <p className="mt-8 text-sm text-gray-400 border-t border-gray-200 pt-6">
                        {originallyCoveredBy ? `Originally covered by ${originallyCoveredBy}. ` : ""}
                        For press enquiries, contact:{" "}
                        <a href="mailto:Vulnwatchai@gmail.com" className="text-primary underline">
                            Vulnwatchai@gmail.com
                        </a>
                    </p>
                </div>
            </div>
        </main>
    );
}
