import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
    title: "Vulnwatch exits beta with 50,000 sites scanned weekly | Press",
    description: "VulnWatch AI graduates from beta, with over 50,000 websites scanned every week across its growing user base.",
};

export default function PressReleaseExitsBetaPage() {
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

                <p className="text-sm font-medium text-primary uppercase tracking-widest">Press Release</p>
                <h1 className="mt-4 text-3xl font-bold text-header md:text-4xl leading-snug">
                    Vulnwatch exits beta with 50,000 sites scanned weekly
                </h1>
                <p className="mt-3 text-sm text-gray-500">April 28, 2026 · 3 min read</p>

                <hr className="my-8 border-gray-200" />

                <div className="prose prose-gray max-w-none space-y-6 text-base leading-relaxed text-gray-700">
                    <p>
                        <strong>Lagos, Nigeria — April 28, 2026</strong> — VulnWatch AI today announced its official exit from beta, having surpassed 50,000 website scans per week across its growing user base. The milestone marks a significant step for the platform, which launched its closed beta in January 2026 and has since grown to serve thousands of domain owners across Africa, Europe, and North America.
                    </p>
                    <p>
                        During the beta period, VulnWatch focused on three core capabilities: SSL certificate monitoring, DNS configuration analysis, and exposed credential detection. Feedback from beta users shaped the product significantly — leading to the introduction of real-time alerts, a redesigned vulnerability report, and one-click domain verification.
                    </p>
                    <h2 className="text-xl font-semibold text-header mt-10">What's new at launch</h2>
                    <p>
                        With today's general availability launch, VulnWatch introduces several new features beyond what was available in beta:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li>Continuous monitoring with customisable alert thresholds</li>
                        <li>Full vulnerability history timeline per domain</li>
                        <li>Security score benchmarking against industry averages</li>
                        <li>Multi-domain dashboard for teams managing multiple properties</li>
                        <li>Scan scheduling — weekly or on-demand scans with email delivery</li>
                    </ul>
                    <h2 className="text-xl font-semibold text-header mt-10">What's next</h2>
                    <p>
                        The team is actively working on integrations with popular CMS platforms and web hosting providers, making it even simpler for non-technical users to resolve detected issues. A public API for enterprise customers is also on the roadmap for Q3 2026.
                    </p>
                    <p>
                        "Leaving beta doesn't mean slowing down — it means we now have the stability and the user base to build even faster," said the VulnWatch founding team. "50,000 scans a week is just the beginning."
                    </p>
                    <h2 className="text-xl font-semibold text-header mt-10">About VulnWatch</h2>
                    <p>
                        VulnWatch AI is a website security monitoring platform that helps businesses detect vulnerabilities, expired certificates, DNS misconfigurations, and exposed credentials before attackers do. New users can start for free at{" "}
                        <Link href="/" className="text-primary underline">vulnwatch.com</Link>.
                    </p>
                    <p className="mt-8 text-sm text-gray-400 border-t border-gray-200 pt-6">
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
