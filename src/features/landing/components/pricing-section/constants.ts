import { Plan } from "./types";

/** Pricing plan definitions for the VulnWatch AI landing page. Tiers scale Essential → Professional → Premium. */

export const plans: Plan[] = [
  {
    name: "Essential",
    price: 28,
    features: [
      "Up to 3 domains monitored",
      "Weekly automated scans",
      "Email alerts for critical findings",
      "DNS & SSL health checks",
    ],
    featured: false,
  },
  {
    name: "Professional",
    price: 19,
    features: [
      "Up to 10 domains monitored",
      "Daily automated scans",
      "Slack & email alert integrations",
      "Malware & dark web exposure checks",
      "Priority scan queue",
    ],
    featured: true,
  },
  {
    name: "Premium",
    price: 29,
    features: [
      "Unlimited domains monitored",
      "Continuous real-time scanning",
      "Custom alert thresholds",
      "Full remediation reports (PDF export)",
      "SSO & team role management",
    ],
    featured: false,
  },
];
