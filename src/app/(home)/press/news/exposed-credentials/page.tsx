import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
    title: "How a start-up is mapping the web's exposed credentials | Tech Media Hub",
    description: "Tech Media Hub reports on VulnWatch's credential exposure detection and how it is helping businesses protect their users.",
};

export default function NewsExposedCredentialsPage() {
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
                    Tech Media Hub · April 2, 2026
                </div>
                <h1 className="text-3xl font-bold text-header md:text-4xl leading-snug">
                    How a start-up is mapping the web&apos;s exposed credentials
                </h1>
                <p className="mt-3 text-sm text-gray-500">As seen in Tech Media Hub · April 2, 2026 · 5 min read</p>

                <hr className="my-8 border-gray-200" />

                <div className="space-y-6 text-base leading-relaxed text-gray-700">
                    <p>
                        Somewhere on the dark web right now, there is a database containing the email addresses and passwords of your customers. You almost certainly don't know it exists. You probably haven't checked. VulnWatch AI has built a system to check for you — and alert you before the damage is done.
                    </p>
                    <p>
                        The Lagos-based security startup has developed a credential exposure detection engine that cross-references domains against a continuously updated index of known data breaches. When a match is found — an email associated with your domain appearing in a leaked database — the domain owner receives an alert detailing the breach source, the date, and the recommended actions.
                    </p>
                    <h2 className="text-xl font-semibold text-header mt-10">The scale of the problem</h2>
                    <p>
                        The numbers are staggering. Billions of credentials have been exposed in data breaches over the past decade. Many of those credentials are still active — passwords reused across multiple services, dormant accounts left open on old platforms, email addresses tied to business domains that nobody thought to monitor.
                    </p>
                    <p>
                        For businesses, the risk is not just to their own systems. When a customer's email and password from your platform appear in a breach, attackers use them to access the customer's other accounts — banking, social media, email. The business that suffered the original breach becomes the starting point for a cascade of harm.
                    </p>
                    <h2 className="text-xl font-semibold text-header mt-10">How VulnWatch maps exposure</h2>
                    <p>
                        VulnWatch's credential detection works by monitoring domains, not individual users. When you verify a domain on the platform, VulnWatch begins checking whether email addresses associated with that domain appear in indexed breach databases. The system is updated continuously as new breaches are indexed.
                    </p>
                    <p>
                        Critically, VulnWatch does not store or display the actual passwords from breaches — only the metadata needed to alert you to the fact that exposure has occurred. The goal is awareness and action, not surveillance.
                    </p>
                    <h2 className="text-xl font-semibold text-header mt-10">The bigger picture</h2>
                    <p>
                        VulnWatch's credential detection is one piece of a broader security monitoring suite that includes SSL certificate monitoring, DNS integrity checks, security header analysis, and open port detection. Together, these capabilities give any business owner — regardless of technical background — a comprehensive view of their security posture.
                    </p>
                    <p>
                        "We want businesses to know what attackers know about them," said the VulnWatch team. "Right now, most of them don't. That information asymmetry is exactly what we are closing."
                    </p>
                    <p>
                        Get started free at{" "}
                        <Link href="/" className="text-primary underline">vulnwatch.com</Link>.
                    </p>
                    <p className="mt-8 text-sm text-gray-400 border-t border-gray-200 pt-6">
                        Originally covered by Tech Media Hub. For press enquiries, contact:{" "}
                        <a href="mailto:Vulnwatchai@gmail.com" className="text-primary underline">
                            Vulnwatchai@gmail.com
                        </a>
                    </p>
                </div>
            </div>
        </main>
    );
}
