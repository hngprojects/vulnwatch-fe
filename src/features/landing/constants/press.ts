export type NewsItem = {
    source: string;
    date: string;
    headline: string;
    url: string;
    slug: string;
};

export type PressReleaseItem = {
    date: string;
    title: string;
    url: string;
    slug: string;
};

export const pressHero = {
    title: "Press and Media",
    subtitle: "Stories, assets, and contacts for journalists.",
    email: "Vulnwatchai@gmail.com",
    brandKitUrl: "",
};

export const newsItems: NewsItem[] = [
    {
        source: "TVC News",
        date: "May 6, 2026",
        headline: "Vulnwatch raises $14 to make website security boring",
        url: "/press/news/vulnwatch-raises-funding",
        slug: "vulnwatch-raises-funding",
    },
    {
        source: "Punch Newspaper",
        date: "April 26, 2026",
        headline: "The 60-seconds scan that catches exposure before hackers do",
        url: "/press/news/60-seconds-scan",
        slug: "60-seconds-scan",
    },
    {
        source: "The SUN",
        date: "April 15, 2026",
        headline: "Inside the new wave of consumer security tools",
        url: "/press/news/consumer-security-tools",
        slug: "consumer-security-tools",
    },
    {
        source: "Tech Media Hub",
        date: "April 2, 2026",
        headline: "How a start-up is mapping the web's exposed credentials",
        url: "/press/news/exposed-credentials",
        slug: "exposed-credentials",
    },
];

export const pressReleases: PressReleaseItem[] = [
    {
        date: "May 9, 2026",
        title: "VulnWatch adds DNS hijack detection across 14M domains",
        url: "/press/dns-hijack-detection",
        slug: "dns-hijack-detection",
    },
    {
        date: "April 28, 2026",
        title: "Vulnwatch exits beta with 50,000 sites scanned weekly",
        url: "/press/exits-beta-50k-sites",
        slug: "exits-beta-50k-sites",
    },
    {
        date: "March 12, 2026",
        title: "VulnWatch launches Continuous Monitoring for SMEs",
        url: "/press/continuous-monitoring-smes",
        slug: "continuous-monitoring-smes",
    },
];