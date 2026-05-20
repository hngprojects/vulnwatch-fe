export type NewsItem = {
    source: string;
    date: string;
    headline: string;
    url: string;
};

export type PressReleaseItem = {
    date: string;
    title: string;
    url: string;
};

export const pressHero = {
    title: "Press and Media",
    subtitle: "Stories, assets, and contacts for journalists.",
    email: "Vulnwatchai@gmail.com",
    brandKitUrl: "#",
};

export const newsItems: NewsItem[] = [
    {
        source: "TVC News",
        date: "May 6, 2026",
        headline: "Vulnwatch raises $14 to make website security boring",
        url: "#",
    },
    {
        source: "Punch Newspaper",
        date: "April 26, 2026",
        headline: "The 60-seconds scan that catches exposure before hackers do",
        url: "#",
    },
    {
        source: "The SUN",
        date: "April 15, 2026",
        headline: "Inside the new wave of consumer security tools",
        url: "#",
    },
    {
        source: "Tech Media Hub",
        date: "April 2, 2026",
        headline: "How a start-up is mapping the web's exposed credentials",
        url: "#",
    },
];

export const pressReleases: PressReleaseItem[] = [
    {
        date: "May 9, 2026",
        title: "VulnWatch adds DNS hijack detection across 14M domains",
        url: "#",
    },
    {
        date: "April 28, 2026",
        title: "Vulnwatch exits beta with 50,000 sites scanned weekly",
        url: "#",
    },
    {
        date: "March 12, 2026",
        title: "VulnWatch launches Continuous Monitoring for SMEs",
        url: "#",
    },
];