import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
    title: "VulnWatch raises $14 to make website security boring | TVC News",
    description: "TVC News covers VulnWatch's funding round and its mission to make website security so routine it becomes boring.",
};

export default function NewsVulnWatchFundingPage() {
    return (
        <main className="min-h-screen bg-white">
            <div className="mx-auto max-w-3xl px-6 py-24 md:py-32">
                <Link
                    href="/press"
                    className="mb-8 flex w-fit items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition"
                >
                    <ArrowLeft size={14} />
                    Back to Press
                </Link>

                <div className="inline-flex items-center gap-2 rounded-full bg-secondary/30 px-3 py-1 text-xs font-medium text-primary mb-6">
                    TVC News · May 6, 2026
                </div>
                <h1 className="text-3xl font-bold text-header md:text-4xl leading-snug">
                    VulnWatch raises $14 to make website security boring
                </h1>
                <p className="mt-3 text-sm text-gray-500">As seen in TVC News · May 6, 2026 · 4 min read</p>

                <hr className="my-8 border-gray-200" />

                <div className="space-y-6 text-base leading-relaxed text-gray-700">
                    <p>
                        There is a certain irony in the pitch. The founders of VulnWatch — a Lagos-based website security startup — have spent the better part of two years telling potential investors that their goal is to make security boring. Not exciting. Not cutting-edge. Boring.
                    </p>
                    <p>
                        The argument, it turns out, is convincing. VulnWatch has closed a pre-seed funding round, giving the team the runway to accelerate growth, expand its monitoring infrastructure, and begin building integrations with popular web platforms across Africa and Europe.
                    </p>
                    <p>
                        &ldquo;Boring security means nothing breaks,&rdquo; said the team. &ldquo;It means your SSL certificate doesn&apos;t expire on a Friday night. It means a hacker doesn&apos;t redirect your traffic because you forgot to check your DNS records. Boring is the goal.&rdquo;
                    </p>
                    <h2 className="text-xl font-semibold text-header mt-10">The problem they are solving</h2>
                    <p>
                        For most small business owners, website security is a black box. They know it matters, but they don&apos;t know what to look for, and they can&apos;t afford to hire someone who does. The result is millions of websites running with expired SSL certificates, misconfigured DNS, and outdated software — sitting ducks for opportunistic attackers.
                    </p>
                    <p>
                        VulnWatch&apos;s platform scans a domain in under 60 seconds and surfaces actionable findings in plain language. No jargon. No cryptic terminal output. Just: &ldquo;Your SSL certificate expires in 11 days. Here&apos;s how to renew it.&rdquo;
                    </p>
                    <h2 className="text-xl font-semibold text-header mt-10">What&apos;s next</h2>
                    <p>
                        The team plans to use the funding to expand its monitoring coverage, grow its team, and launch a public API for developers and agencies managing multiple client domains. A mobile app is also in the works for later this year.
                    </p>
                    <p>
                        For the founders, the next milestone is straightforward: get the next hundred thousand businesses to stop worrying about their websites. Make security so routine, so automatic, and so accessible that it becomes — boringly — a non-issue.
                    </p>
                    <p>
                        You can start monitoring your domain for free at{" "}
                        <Link href="/" className="text-primary underline">vulnwatch.com</Link>.
                    </p>
                    <p className="mt-8 text-sm text-gray-400 border-t border-gray-200 pt-6">
                        Originally covered by TVC News. For press enquiries, contact:{" "}
                        <a href="mailto:Vulnwatchai@gmail.com" className="text-primary underline">
                            Vulnwatchai@gmail.com
                        </a>
                    </p>
                </div>
            </div>
        </main>
    );
}
