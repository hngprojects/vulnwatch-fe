import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
    title: "Inside the new wave of consumer security tools | The SUN",
    description: "The SUN looks at how tools like VulnWatch are democratising website security for everyday businesses and individuals.",
};

export default function NewsConsumerSecurityToolsPage() {
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
                    The SUN · April 15, 2026
                </div>
                <h1 className="text-3xl font-bold text-header md:text-4xl leading-snug">
                    Inside the new wave of consumer security tools
                </h1>
                <p className="mt-3 text-sm text-gray-500">As seen in The SUN · April 15, 2026 · 5 min read</p>

                <hr className="my-8 border-gray-200" />

                <div className="space-y-6 text-base leading-relaxed text-gray-700">
                    <p>
                        For a long time, cybersecurity was a category that lived exclusively in the enterprise. The tools were expensive, complex, and designed for teams of specialists. Everyone else — the millions of small businesses, freelancers, and independent website owners — was essentially on their own.
                    </p>
                    <p>
                        That is changing. A new generation of consumer-friendly security tools has emerged, built on the premise that website protection should be as straightforward as buying insurance or filing taxes. Not something that requires a specialist. Something anyone can do.
                    </p>
                    <h2 className="text-xl font-semibold text-header mt-10">The consumerisation of security</h2>
                    <p>
                        The shift mirrors what happened to antivirus software in the early 2000s — once a complex enterprise product, now a simple app your grandmother can install. The same transition is underway for website security, driven by platforms that abstract away the complexity without sacrificing depth.
                    </p>
                    <p>
                        VulnWatch AI is one of the most prominent examples of this trend in the African market. The platform performs comprehensive domain security scans — checking SSL certificates, DNS records, open ports, security headers, and credential exposure — and presents the results in language that any business owner can understand and act on.
                    </p>
                    <h2 className="text-xl font-semibold text-header mt-10">Why now?</h2>
                    <p>
                        The timing is not accidental. Cyberattacks against small businesses have risen sharply in the past three years, while the barriers to launching a website have fallen to near-zero. There are now millions of businesses operating online who have never had a security conversation. Tools like VulnWatch exist because the market has finally caught up to the need.
                    </p>
                    <p>
                        &ldquo;There&apos;s never been more risk and less protection at the SME level,&rdquo; noted one security industry analyst. &ldquo;Consumer-grade security tools are filling a gap that should have been filled years ago.&rdquo;
                    </p>
                    <h2 className="text-xl font-semibold text-header mt-10">What to look for in a security tool</h2>
                    <p>
                        Experts suggest that any consumer security tool worth using should cover at minimum: SSL monitoring, DNS integrity checks, exposed credential detection, and security header analysis. It should surface findings in plain language, offer clear remediation steps, and not require technical expertise to use.
                    </p>
                    <p>
                        VulnWatch covers all of these and can be accessed free of charge at{" "}
                        <Link href="/" className="text-primary underline">vulnwatch.com</Link>.
                    </p>
                    <p className="mt-8 text-sm text-gray-400 border-t border-gray-200 pt-6">
                        Originally covered by The SUN. For press enquiries, contact:{" "}
                        <a href="mailto:Vulnwatchai@gmail.com" className="text-primary underline">
                            Vulnwatchai@gmail.com
                        </a>
                    </p>
                </div>
            </div>
        </main>
    );
}
