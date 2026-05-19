'use client';

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Copy, Check } from "lucide-react";

interface AISecuritySummaryProps {
  backHref?: string;
}

function ExecutiveBriefIcon() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[#A0E870] shrink-0">
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M8.454 2.75C8.641 2.75 8.804 2.878 8.848 3.06L9.587 6.138C9.816 7.091 10.559 7.835 11.513 8.063L14.59 8.803C14.773 8.847 14.9 9.009 14.9 9.197C14.9 9.385 14.773 9.547 14.59 9.591L11.513 10.33C10.559 10.559 9.816 11.302 9.587 12.256L8.848 15.333C8.804 15.516 8.641 15.644 8.454 15.644C8.266 15.644 8.103 15.516 8.059 15.333L7.32 12.256C7.091 11.302 6.348 10.559 5.394 10.33L2.317 9.591C2.134 9.547 2.007 9.385 2.007 9.197C2.007 9.009 2.134 8.847 2.317 8.803L5.394 8.063C6.348 7.835 7.091 7.091 7.32 6.138L8.059 3.06C8.103 2.878 8.266 2.75 8.454 2.75Z"
          fill="#08342D"
        />
        <path
          d="M16.862 10.514C17 10.514 17.119 10.607 17.151 10.741L17.528 12.311C17.646 12.801 18.028 13.183 18.518 13.301L20.088 13.678C20.222 13.71 20.315 13.829 20.315 13.967C20.315 14.105 20.222 14.224 20.088 14.256L18.518 14.633C18.028 14.751 17.646 15.133 17.528 15.623L17.151 17.193C17.119 17.327 17 17.42 16.862 17.42C16.724 17.42 16.605 17.327 16.573 17.193L16.196 15.623C16.078 15.133 15.696 14.751 15.206 14.633L13.636 14.256C13.502 14.224 13.409 14.105 13.409 13.967C13.409 13.829 13.502 13.71 13.636 13.678L15.206 13.301C15.696 13.183 16.078 12.801 16.196 12.311L16.573 10.741C16.605 10.607 16.724 10.514 16.862 10.514Z"
          fill="#08342D"
        />
        <circle cx="15.208" cy="5.718" r="1.563" fill="#08342D" />
      </svg>
    </div>
  );
}

export function AISecuritySummary({
  backHref = "/scan/report",
}: AISecuritySummaryProps) {
  const [isTechnical, setIsTechnical] = useState(false);
  const [copied, setCopied] = useState(false);
  const currentDateLabel = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleCopy = () => {
    let copyText = "";
    if (!isTechnical) {
      copyText = `EXECUTIVE BRIEF - ${currentDateLabel}\n\nYour Security Summary:\n` +
        `- Your domain has 1 Critical Issue that need immediate attention: The missing HSTS header leaves every visitor exposed to potential traffic interception, especially on public networks.\n` +
        `- 2 high-severity findings compound the risk: Your admin panel is publicly reachable and being actively targeted by automated bots, and your robots.txt file is advertising internal paths.\n` +
        `- The good news: All three of these are configuration fixes don't require code changes and can typically be resolved in under an hour. Prioritise the HSTS header and admin panel restriction first.\n` +
        `- Your SSL infrastructure is mostly solid, certificate chain is valid and SPF is correctly configured. Focus on the 3 high-impact items above before addressing the medium and low findings.\n\n` +
        `Overall, your security posture is moderate, fixable in a focused afternoon, but attackers actively scan for these specific gaps.`;
    } else {
      copyText = `EXECUTIVE BRIEF - ${currentDateLabel}\n\nWHAT WE FOUND:\n` +
        `- DNS resolution is functioning nominally with valid A, MX, SPF, and DMARC records. TLS certificate, acme-corp.com is valid but expires 2026-05-13T00:00:00Z (18d remaining). Response headers lack CSP, X-Frame-Options, and Strict-Transport-Security directives.\n` +
        `- HTTP response from origin 203.0.113.42 does not include Administrative endpoint /admin returns HTTP 200 without authentication challenge from non-whitelisted IPs. CVSS base score: 7.4.`;
    }

    navigator.clipboard.writeText(copyText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="px-4 md:px-8 py-6 max-w-6xl mx-auto">
      {/* Back Button */}
      <Link
        href={backHref}
        className="inline-flex items-center gap-2 text-sm font-bold text-[#6B7280] hover:text-[#111827] transition-colors mb-5"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Link>

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-[28px] font-bold text-[#111827] leading-tight">
          AI Security Summary
        </h1>
        <p className="text-sm text-[#6B7280] mt-1">
          Auto-generated from your latest scan, written for humans.
        </p>
      </div>

      {/* Executive Brief Card */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 md:p-6 mb-8 shadow-sm">
        {/* Card Header Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#F3F4F6] mb-6">
          <div className="flex items-center gap-3">
            <ExecutiveBriefIcon />
            <div>
              <h2 className="text-sm font-bold text-[#111827] tracking-wide uppercase leading-none">
                EXECUTIVE BRIEF
              </h2>
              <span className="text-xs text-[#9CA3AF] block mt-1 font-medium">
                {currentDateLabel}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            {/* View Switch Toggle */}
            <div className="flex items-center gap-1.5 select-none">
              <button
                type="button"
                onClick={() => setIsTechnical(false)}
                className={`min-w-[28px] text-left text-[10px] leading-none font-medium transition-colors focus:outline-none ${
                  !isTechnical
                    ? "text-[#7E8694]"
                    : "text-[#B3BAC5] hover:text-[#8F97A5]"
                }`}
              >
                Basic
              </button>
              <button
                type="button"
                role="switch"
                aria-checked={isTechnical}
                aria-label={`Switch summary view to ${isTechnical ? "basic" : "technical"}`}
                onClick={() => setIsTechnical((prev) => !prev)}
                className={`relative h-[18px] w-[30px] rounded-full transition-colors duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[#08342D]/15 ${
                  isTechnical ? "bg-[#0A3B34]" : "bg-[#8A8A8A]"
                }`}
              >
                <span
                  className={`absolute top-[1px] left-[1px] h-4 w-4 rounded-full bg-white shadow-[0_1px_2px_rgba(17,24,39,0.2)] transition-transform duration-200 ease-out ${
                    isTechnical ? "translate-x-3" : "translate-x-0"
                  }`}
                />
              </button>
              <button
                type="button"
                onClick={() => setIsTechnical(true)}
                className={`min-w-[40px] text-left text-[10px] leading-none font-medium transition-colors focus:outline-none ${
                  isTechnical
                    ? "text-[#7E8694]"
                    : "text-[#B3BAC5] hover:text-[#8F97A5]"
                }`}
              >
                Technical
              </button>
            </div>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all select-none ${copied ? "bg-green-50 border-green-200 text-green-700" : "bg-white border-[#E5E7EB] text-[#4B5563] hover:border-[#111827] hover:text-[#111827]"}`}
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>

        {/* Dynamic Summary Content */}
        {!isTechnical ? (
          /* BASIC VIEW */
          <div className="space-y-5">
            <h3 className="text-sm font-bold text-[#111827] tracking-wide uppercase">
              Your Security Summary
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="h-5 w-5 rounded-full bg-[#57D132]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3.5 w-3.5 text-[#2E7D32]" strokeWidth={3} />
                </div>
                <p className="text-[13px] text-[#4B5563] leading-relaxed">
                  Your domain has <span className="text-red-500 font-bold">1 Critical Issue</span> that need immediate attention: <span className="text-[#6B7280]">The missing HSTS header leaves every visitor exposed to potential traffic interception, especially on public networks.</span>
                </p>
              </li>

              <li className="flex items-start gap-3">
                <div className="h-5 w-5 rounded-full bg-[#57D132]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3.5 w-3.5 text-[#2E7D32]" strokeWidth={3} />
                </div>
                <p className="text-[13px] text-[#4B5563] leading-relaxed">
                  <span className="text-red-500 font-bold">2 high-severity findings</span> compound the risk: <span className="text-[#6B7280]">Your admin panel is publicly reachable and being actively targeted by automated bots, and your robots.txt file is advertising internal paths.</span>
                </p>
              </li>

              <li className="flex items-start gap-3">
                <div className="h-5 w-5 rounded-full bg-[#57D132]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3.5 w-3.5 text-[#2E7D32]" strokeWidth={3} />
                </div>
                <p className="text-[13px] text-[#4B5563] leading-relaxed">
                  <span className="text-green-600 font-bold">The good news:</span> <span className="text-[#6B7280]">All three of these are configuration fixes don&apos;t require code changes and can typically be resolved in under an hour.</span> <strong>Prioritise the HSTS header and admin panel restriction first.</strong>
                </p>
              </li>

              <li className="flex items-start gap-3">
                <div className="h-5 w-5 rounded-full bg-[#57D132]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3.5 w-3.5 text-[#2E7D32]" strokeWidth={3} />
                </div>
                <p className="text-[13px] text-[#6B7280] leading-relaxed">
                  Your SSL infrastructure is mostly solid, certificate chain is valid and SPF is correctly configured. Focus on the 3 high-impact items above before addressing the medium and low findings.
                </p>
              </li>
            </ul>
            <p className="text-[13px] text-[#6B7280] leading-relaxed pt-3 border-t border-[#F3F4F6]">
              Overall, your security posture is moderate, fixable in a focused afternoon, but attackers actively scan for these specific gaps.
            </p>
          </div>
        ) : (
          /* TECHNICAL VIEW */
          <div className="space-y-5">
            <h3 className="text-sm font-bold text-[#111827] tracking-wide uppercase">
              WHAT WE FOUND
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="h-5 w-5 rounded-full bg-[#57D132]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3.5 w-3.5 text-[#2E7D32]" strokeWidth={3} />
                </div>
                <p className="text-[13px] text-[#6B7280] leading-relaxed">
                  DNS resolution is functioning nominally with valid A, MX, SPF, and DMARC records. TLS certificate, acme-corp.com is valid but expires 2026-05-13T00:00:00Z (18d remaining). Response headers lack CSP, X-Frame-Options, and Strict-Transport-Security directives.
                </p>
              </li>

              <li className="flex items-start gap-3">
                <div className="h-5 w-5 rounded-full bg-[#57D132]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3.5 w-3.5 text-[#2E7D32]" strokeWidth={3} />
                </div>
                <p className="text-[13px] text-[#6B7280] leading-relaxed">
                  HTTP response from origin 203.0.113.42 does not include Administrative endpoint /admin returns HTTP 200 without authentication challenge from non-whitelisted IPs. CVSS base score: 7.4.
                </p>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* "WHAT IS MORE IMPORTANT" Section */}
      <div className="mb-8">
        <h3 className="text-xs font-bold text-[#111827] tracking-widest uppercase mb-4">
          WHAT IS MORE IMPORTANT
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 flex flex-col gap-3 min-h-[110px]">
            <div>
              <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded bg-[#F3F4F6] text-[#6B7280] border border-[#E5E7EB]">
                SSL
              </span>
            </div>
            <p className="text-[13px] font-medium text-[#4B5563] leading-snug">
              Renew your SSL certificate before April 24
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 flex flex-col gap-3 min-h-[110px]">
            <div>
              <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded bg-[#F3F4F6] text-[#6B7280] border border-[#E5E7EB]">
                Header
              </span>
            </div>
            <p className="text-[13px] font-medium text-[#4B5563] leading-snug">
              Missing security headers leave your site open to injection attacks
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 flex flex-col gap-3 min-h-[110px]">
            <div>
              <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded bg-[#F3F4F6] text-[#6B7280] border border-[#E5E7EB]">
                Exposure
              </span>
            </div>
            <p className="text-[13px] font-medium text-[#4B5563] leading-snug">
              Your admin panel is publicly visible without access controls
            </p>
          </div>
        </div>
      </div>

      {/* "WHAT COMES FIRST" Section */}
      <div>
        <h3 className="text-xs font-bold text-[#111827] tracking-widest uppercase mb-4">
          WHAT COMES FIRST
        </h3>
        <div className="space-y-4">
          {/* Step 1 */}
          <div className="flex gap-4">
            <span className="text-xs font-bold text-[#2E7D32] bg-[#57D132]/10 h-6 w-6 rounded-full flex items-center justify-center shrink-0 select-none">
              1
            </span>
            <p className="text-[13px] text-[#4B5563] leading-relaxed">
              <strong>Renew your SSL certificate before April 24.</strong> Contact your certificate authority or hosting provider today to initiate renewal.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex gap-4">
            <span className="text-xs font-bold text-[#2E7D32] bg-[#57D132]/10 h-6 w-6 rounded-full flex items-center justify-center shrink-0 select-none">
              2
            </span>
            <p className="text-[13px] text-[#4B5563] leading-relaxed">
              <strong>Add a Content-Security-Policy, X-Frame-Options, and HSTS header to your web server configuration file.</strong> This can be done in under 30 minutes.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex gap-4">
            <span className="text-xs font-bold text-[#2E7D32] bg-[#57D132]/10 h-6 w-6 rounded-full flex items-center justify-center shrink-0 select-none">
              3
            </span>
            <p className="text-[13px] text-[#4B5563] leading-relaxed">
              <strong>Restrict access to your admin panel by IP address or require VPN access.</strong> Talk to your system administrator or hosting support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
