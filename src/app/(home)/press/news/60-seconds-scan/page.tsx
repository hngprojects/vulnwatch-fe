import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
    title: "The 60-seconds scan that catches exposure before hackers do | Punch Newspaper",
    description: "Punch Newspaper explores how VulnWatch's rapid scan engine is helping Nigerian businesses stay ahead of cyber threats.",
};

export default function News60SecondsScanPage() {
    return (
        <main className="min-h-screen bg-white">
            <div className="mx-auto max-w-3xl px-6 py-24 md:py-32">
                <Link
                    href="/press"
                    className="mb-10 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition"
                >
                    <ArrowLeft size={14} />
                    Back to Press
                </Link>

                <div className="inline-flex items-center gap-2 rounded-full bg-secondary/30 px-3 py-1 text-xs font-medium text-primary mb-6">
                    Punch Newspaper · April 26, 2026
                </div>
                <h1 className="text-3xl font-bold text-header md:text-4xl leading-snug">
                    The 60-seconds scan that catches exposure before hackers do
                </h1>
                <p className="mt-3 text-sm text-gray-500">As seen in Punch Newspaper · April 26, 2026 · 5 min read</p>

                <hr className="my-8 border-gray-200" />

                <div className="space-y-6 text-base leading-relaxed text-gray-700">
                    <p>
                        When a small business owner in Lagos types their website address into VulnWatch, they have no idea what is about to happen. Sixty seconds later, the platform has checked their SSL certificate status, scanned their DNS configuration, tested their security headers, looked for exposed credentials, and produced a report that reads less like a security audit and more like a letter from a trusted adviser.
                    </p>
                    <p>
                        This is precisely the point. VulnWatch was built for people who run businesses — not for people who run security teams. The distinction matters enormously in a market where the average Nigerian SME has no IT department and no budget for a cybersecurity consultant.
                    </p>
                    <h2 className="text-xl font-semibold text-header mt-10">A window hackers exploit</h2>
                    <p>
                        The attack vectors VulnWatch monitors are not sophisticated. They don't need to be. Expired SSL certificates, misconfigured DNS records, missing security headers — these are the digital equivalent of a shop owner leaving their front door unlocked because they forgot it was even a door.
                    </p>
                    <p>
                        Hackers routinely scan millions of domains per day looking for exactly these kinds of oversights. Automated tools probe for open vulnerabilities continuously. A small business that hasn't checked its security posture in six months is almost certainly exposed in ways it doesn't know about.
                    </p>
                    <h2 className="text-xl font-semibold text-header mt-10">Designed for African businesses</h2>
                    <p>
                        VulnWatch's founders were deliberate about building for the African market from day one. The product is priced accessibly, operates without requiring any technical setup, and communicates in plain language that doesn't assume the reader has a computer science degree.
                    </p>
                    <p>
                        "We wanted a product that works for the woman selling products through her website in Ibadan, not just the tech startup in Victoria Island," the team explained. "The threat is the same. The language and the price point needed to be different."
                    </p>
                    <h2 className="text-xl font-semibold text-header mt-10">Getting started</h2>
                    <p>
                        VulnWatch is free to start. Domain owners can run their first scan at{" "}
                        <Link href="/" className="text-primary underline">vulnwatch.com</Link>{" "}
                        in under 60 seconds, no credit card required.
                    </p>
                    <p className="mt-8 text-sm text-gray-400 border-t border-gray-200 pt-6">
                        Originally covered by Punch Newspaper. For press enquiries, contact:{" "}
                        <a href="mailto:Vulnwatchai@gmail.com" className="text-primary underline">
                            Vulnwatchai@gmail.com
                        </a>
                    </p>
                </div>
            </div>
        </main>
    );
}
