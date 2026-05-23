import type { Metadata } from "next";
import Link from "next/link";
import PressArticleLayout from "@/features/landing/components/press/PressArticleLayout";

export const metadata: Metadata = {
    title: "VulnWatch launches Continuous Monitoring for SMEs | Press",
    description: "VulnWatch AI introduces always-on continuous security monitoring, purpose-built for small and medium-sized enterprises.",
};

export default function PressReleaseContinuousMonitoringPage() {
    return (
        <PressArticleLayout
            title="VulnWatch launches Continuous Monitoring for SMEs"
            meta="March 12, 2026 · 4 min read"
            category="Press Release"
        >
            <p>
                <strong>Lagos, Nigeria — March 12, 2026</strong> — VulnWatch AI today launched Continuous Monitoring, a new tier of always-on security surveillance designed specifically for small and medium-sized enterprises (SMEs). Unlike periodic or manual scans, Continuous Monitoring watches for new vulnerabilities, certificate changes, and DNS anomalies around the clock — and notifies domain owners the moment something changes.
            </p>
            <p>
                For most SMEs, the reality of website security is grim: limited IT budgets, no dedicated security staff, and a false sense of safety because nothing has gone wrong yet. Continuous Monitoring is built to close that gap — bringing enterprise-level vigilance to businesses that couldn&apos;t previously afford it.
            </p>
            <h2 className="text-xl font-semibold text-header mt-10">What Continuous Monitoring covers</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>SSL certificate expiry</strong> — alerts at 30, 14, and 3 days before expiry</li>
                <li><strong>DNS record changes</strong> — real-time alerts for any unauthorised modifications</li>
                <li><strong>Open ports and exposed services</strong> — detection of newly exposed attack surfaces</li>
                <li><strong>Security header degradation</strong> — notifications when headers like CSP or HSTS are removed or weakened</li>
                <li><strong>Credential exposure</strong> — daily checks against known data breach databases</li>
            </ul>
            <h2 className="text-xl font-semibold text-header mt-10">Why SMEs are a primary target</h2>
            <p>
                According to recent cybersecurity research, over 43% of cyberattacks are directed at small businesses, yet only 14% of SMEs consider themselves prepared. A misconfigured DNS or expired SSL certificate is often all an attacker needs. VulnWatch Continuous Monitoring eliminates the window between a change happening and a business owner finding out.
            </p>
            <p>
                &ldquo;We built Continuous Monitoring because a weekly scan is not enough. Attacks happen on Sundays at 2am. Our users needed something that never sleeps,&rdquo; said the VulnWatch founding team.
            </p>
            <h2 className="text-xl font-semibold text-header mt-10">Getting started</h2>
            <p>
                Continuous Monitoring is included in all VulnWatch plans. Existing users can enable it from their domain dashboard with a single click. New users can start free and have their first domain under continuous protection in under 60 seconds at{" "}
                <Link href="/" className="text-primary underline">vulnwatch.com</Link>.
            </p>
            <h2 className="text-xl font-semibold text-header mt-10">About VulnWatch</h2>
            <p>
                VulnWatch AI is a website security monitoring platform that helps businesses detect vulnerabilities, expired certificates, DNS misconfigurations, and exposed credentials before attackers do. Trusted by thousands of domain owners across Africa and beyond.
            </p>
        </PressArticleLayout>
    );
}
