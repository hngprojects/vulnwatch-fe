"use client";

import { useLayoutEffect, useRef, useState } from "react";

type LegalTab = {
  id: string;
  label: string;
  intro: string;
  sections: {
    title: string;
    body: string;
  }[];
};

const legalTabs: LegalTab[] = [
  {
    id: "privacy-policy",
    label: "Privacy Policy",
    intro:
      "Your privacy and data security are important to us. This Privacy Policy explains how we collect, use, process, and safeguard information when you access and use our platform. By using our servi
    sections: [
      {
        title: "Information We Collect",
        body: "We collect information that is reasonably necessary to provide, secure, and improve our services. This may include your account information like your email, organization details, techni
      },
      {
        title: "How We Use Information",
        body: "We use collected data to operate the platform, improve security analysis, deliver AI-powered insights, monitor system performance, prevent abuse, and support customer requests.",
      },
      {
        title: "Data Protection and Security",
        body: "We implement industry standard safeguards to protect customer information against unauthorized access, disclosure, or misuse. Security measures include encryption, secure domain access 
      },
      {
        title: "Data Retention",
        body: "We retain information only for as long as necessary to provide services, maintain security operations, comply with legal obligations, and resolve disputes.",
      },
    ],
  },
  {
    id: "terms-of-service",
    label: "Terms of Service",
    intro:
      "These Terms of Service govern access to and use of our platform. By accessing the platform, users agree to comply with these terms and all applicable laws and regulations.",
    sections: [
      {
        title: "Account Responsibilities",
        body: "Users are responsible for maintaining account security, safeguarding credentials, and ensuring that activities performed under their account comply with authorized security practices.",
      },
      {
        title: "Acceptable Use",
        body: "Users agree not to misuse the platform, interfere with security systems, perform unauthorized activities, distribute malicious content, or violate the rights of others.",
      },
    ],
  },
  {
    id: "cookie-policy",
    label: "Cookie Policy",
    intro:
      "This Cookie Policy explains how cookies and similar technologies are used to improve user experience, analyze performance, and maintain secure sessions.",
    sections: [
      {
        title: "Essential Cookies",
        body: "Essential cookies are required for the platform functionality, authentication, security protection, and user session management.",
      },
      {
        title: "Analytics Cookies",
        body: "Analytics cookies help us understand platform usage patterns, improve features, and enhance overall performance of your domain security experience.",
      },
      {
        title: "Preference Cookies",
        body: "Preference cookies store user settings such as language preferences, accessibility configurations, and interface customizations.",
      },
      {
        title: "Managing Cookies",
        body: "Users can manage or disable cookies through browser settings. Some platform features may not function properly if essential cookies are disabled.",
      },
    ],
  },
];

export function LegalDocs() {
  const [activeTab, setActiveTab] = useState(legalTabs[0]);
  const [indicatorStyle, setIndicatorStyle] = useState({
    width: 0,
    transform: "translateX(0px)",
  });
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useLayoutEffect(() => {
    const activeIndex = legalTabs.findIndex((tab) => tab.id === activeTab.id);
    const activeButton = tabRefs.current[activeIndex];

    if (!activeButton) {
      return;
    }

    const updateIndicator = () => {
      setIndicatorStyle({
        width: activeButton.offsetWidth,
        transform: `translateX(${activeButton.offsetLeft}px)`,
      });
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);

    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeTab.id]);

  return (
    <main className="bg-white">
      <section className="flex min-h-64 items-center bg-linear-to-b from-white via-[#F5FFF0] to-[#E4FFD8] px-4 py-10 text-center md:py-16">
        <div className="mx-auto max-w-[760px]">
          <h1 className="font-geist text-[32px] leading-10 font-bold tracking-[-1px] text-[#2B2B2BE5] md:text-[56px] md:leading-16 md:tracking-[-1.5px]">
            Legal Doc
          </h1>
          <p className="mx-auto mt-4 max-w-[620px] text-[13px] leading-[22px] tracking-[-0.5px] text-[#2B2B2B] md:text-[16px] md:leading-[26px]">
            Transparent policies designed to protect your organization, data,
            and platform, with good experience.
          </p>
        </div>
      </section>

      <section className="px-4 pt-8 pb-12 md:pt-10 md:pb-16">
        <div className="mx-auto max-w-[1120px]">
          <div className="relative border-b border-[#E8E8E8]">
            <div
              className="grid grid-cols-3 md:flex"
              role="tablist"
              aria-label="Legal documents"
            >
              {legalTabs.map((tab, index) => {
                const isActive = activeTab.id === tab.id;

                return (
                  <button
                    key={tab.id}
                    ref={(node) => {
                      tabRefs.current[index] = node;
                    }}
                    id={`${tab.id}-tab`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`${tab.id}-panel`}
                    onClick={() => setActiveTab(tab)}
                    className={`relative flex min-h-14 items-center justify-center px-1 py-3 text-center text-[11px] leading-4 font-medium tracking-[-0.3px] transition-colors sm:text-[12px] md:min-h-0
                      isActive ? "text-[#072E28]" : "text-[#666666]"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
            <span
              className="absolute -bottom-px left-0 h-[3px] rounded-full bg-[#072E28] transition-[transform,width] duration-300 ease-out"
              style={indicatorStyle}
              aria-hidden="true"
            />
          </div>

          <article
            key={activeTab.id}
            id={`${activeTab.id}-panel`}
            role="tabpanel"
            aria-labelledby={`${activeTab.id}-tab`}
            className="animate-in fade-in-0 slide-in-from-bottom-1 pt-8 duration-300 md:pt-10"
          >
            <h2 className="font-geist text-[26px] leading-[34px] font-semibold tracking-[-1px] text-[#111111] md:text-[32px] md:leading-10">
              Introduction
            </h2>
            <p className="mt-4 max-w-[1050px] text-[14px] leading-6 tracking-[-0.45px] text-[#666666] md:text-[16px] md:leading-7">
              {activeTab.intro}
            </p>

            <div className="mt-7 space-y-7 md:mt-8 md:space-y-8">
              {activeTab.sections.map((section) => (
                <section key={section.title}>
                  <h3 className="font-geist text-[24px] leading-8 font-semibold tracking-[-0.9px] text-[#111111] md:text-[32px] md:leading-10">
                    {section.title}
                  </h3>
                  <p className="mt-3 max-w-[1050px] text-[14px] leading-6 tracking-[-0.45px] text-[#666666] md:text-[16px] md:leading-7">
                    {section.body}
                  </p>
                </section>
              ))}
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
