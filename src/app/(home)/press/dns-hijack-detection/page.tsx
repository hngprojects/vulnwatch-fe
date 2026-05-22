import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
    title: "VulnWatch adds DNS hijack detection across 14M domains | Press",
    description: "VulnWatch announces the rollout of DNS hijack detection, now actively monitoring over 14 million domains for unauthorised DNS record changes.",
};

export default function PressReleaseDnsHijackPage() {
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

                <p className="text-sm font-medium text-primary uppercase tracking-widest">Press Release</p>
                <h1 className="mt-4 text-3xl font-bold text-header md:text-4xl leading-snug">
                    VulnWatch adds DNS hijack detection across 14M domains
                </h1>
                <p className="mt-3 text-sm text-gray-500">May 9, 2026 · 3 min read</p>

                <hr className="my-8 border-gray-200" />

                <div className="prose prose-gray max-w-none space-y-6 text-base leading-relaxed text-gray-700">
                    <p>
                        <strong>Lagos, Nigeria — May 9, 2026</strong> — VulnWatch AI today announced the general availability of DNS hijack detection, a new capability that monitors over 14 million domains for unauthorised changes to DNS records in real time. The feature is available immediately to all VulnWatch users at no additional cost.
                    </p>
                    <p>
                        DNS hijacking is one of the most underreported attack vectors for small and medium-sized businesses. Attackers silently redirect domain traffic to fraudulent servers, intercepting emails, login credentials, and customer data — often without the domain owner's knowledge for days or weeks.
                    </p>
                    <p>
                        VulnWatch's new detection engine continuously compares live DNS records against a verified historical baseline for each monitored domain. When a change is detected — whether an A record swap, MX record alteration, or nameserver modification — the domain owner receives an immediate alert with a full diff of what changed, when, and from which authoritative source.
                    </p>
                    <h2 className="text-xl font-semibold text-header mt-10">How it works</h2>
                    <p>
                        Once a domain is verified and added to VulnWatch, the system automatically takes a baseline snapshot of all DNS records. From that point, our monitoring infrastructure checks for changes every five minutes using a globally distributed resolver network spanning 12 regions — eliminating false positives caused by regional propagation delays.
                    </p>
                    <p>
                        Alerts include a side-by-side comparison of the original and modified records, an estimated risk level, and recommended remediation steps. High-severity changes — such as nameserver or MX record replacements — trigger instant notifications via email.
                    </p>
                    <h2 className="text-xl font-semibold text-header mt-10">Availability</h2>
                    <p>
                        DNS hijack detection is available today for all verified domains on VulnWatch. Existing users do not need to take any action — monitoring begins automatically for all active domains. New users can add a domain and begin monitoring in under 60 seconds at{" "}
                        <Link href="/" className="text-primary underline">vulnwatch.com</Link>.
                    </p>
                    <h2 className="text-xl font-semibold text-header mt-10">About VulnWatch</h2>
                    <p>
                        VulnWatch AI is a website security monitoring platform that helps businesses detect vulnerabilities, expired certificates, DNS misconfigurations, and exposed credentials before attackers do. Trusted by thousands of domain owners across Africa and beyond, VulnWatch delivers enterprise-grade security monitoring designed to be simple enough for any business to use.
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
