import { TestimonialType } from "../types";

// Avatars are sourced from i.pravatar.cc — a free, public avatar placeholder service.
// Each ?img= number maps to a consistent person photo (1–70 available).
export const TESTIMONIALS: TestimonialType[] = [
  {
    name: "John Carter",
    role: "Head of Security",
    company: "Ad-Tech Inc.",
    quote:
      "VulnWatchAI caught a misconfigured DMARC record that was letting phishing emails impersonate our domain. Fixed in minutes, not weeks.",
    avatarUrl: "https://i.pravatar.cc/150?img=11",
  },
  {
    name: "Amara Osei",
    role: "Engineer",
    company: "Lumens Innovations",
    quote:
      "The clearest, most actionable security reports I've ever read. My junior devs can actually fix things now without needing a security consultant on call.",
    avatarUrl: "https://i.pravatar.cc/150?img=47",
  },
  {
    name: "Marcus Webb",
    role: "Content Creator",
    company: "TEEM's Creator",
    quote:
      "I was skeptical as a non-technical user, but the plain-English explanations and step-by-step fixes made security genuinely accessible to our whole team.",
    avatarUrl: "https://i.pravatar.cc/150?img=15",
  },
  {
    name: "Fatima Al-Rashid",
    role: "Security Manager",
    company: "BULGI LMT",
    quote:
      "VulnWatchAI found an exposed admin subdomain we had completely forgotten about from a legacy deployment. That single find justified the subscription.",
    avatarUrl: "https://i.pravatar.cc/150?img=56",
  },
  {
    name: "Chen Wei",
    role: "Head of Security",
    company: "Mui Enterprise",
    quote:
      "The SSL certificate expiry alerts saved us from two outages this quarter alone. The risk prioritization is spot-on — zero alert fatigue.",
    avatarUrl: "https://i.pravatar.cc/150?img=12",
  },
  {
    name: "Luca Ferrero",
    role: "Co-Manager",
    company: "Fizzz Media",
    quote:
      "We manage domains for 40+ clients. VulnWatchAI makes it possible for a two-person team to stay on top of every single one without burning out.",
    avatarUrl: "https://i.pravatar.cc/150?img=67",
  },
  {
    name: "Priya Nair",
    role: "Tech Founder",
    company: "Peris Comp.",
    quote:
      "As a startup founder I can't afford a dedicated security team. VulnWatchAI gives us enterprise-grade monitoring at a price that actually makes sense.",
    avatarUrl: "https://i.pravatar.cc/150?img=49",
  },
  {
    name: "David Okonkwo",
    role: "Software Engineer",
    company: "Bendi Trusx",
    quote:
      "Integration took under ten minutes and continuous monitoring immediately caught a DNS misconfiguration our internal scans had been missing for months.",
    avatarUrl: "https://i.pravatar.cc/150?img=3",
  },
];
