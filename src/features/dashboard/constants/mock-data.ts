import type { DashboardData } from "@/types/dashboard.types";

export const mockDashboardData: DashboardData = {
  domain: "www.mycompany.com",
  securityScore: 78,
  hasScans: true,

  primaryAlert: {
    id: "alert-1",
    title: "SSL Certificate Expiring in 12 Days",
    description:
      "Your SSL certificate is set to expire soon. Failure to renew will trigger browser warnings and break HTTPS connections for all visitors.",
    priority: "High",
    category: "SSL/TLS",
  },

  issues: [
    {
      id: "issue-1",
      title: "Missing Content Security Policy Header",
      description:
        "No CSP header detected. This leaves your site open to XSS attacks.",
      priority: "Critical",
      category: "Security Headers",
    },
    {
      id: "issue-2",
      title: "DMARC Record Not Configured",
      description:
        "Without DMARC, attackers can spoof your domain in phishing emails.",
      priority: "High",
      category: "DNS & Email",
    },
    {
      id: "issue-3",
      title: "Outdated TLS 1.0 Protocol Enabled",
      description:
        "TLS 1.0 is deprecated and contains known vulnerabilities. Disable it immediately.",
      priority: "Medium",
      category: "SSL/TLS",
    },
  ],

  aiActions: [
    {
      id: "ai-1",
      title: "Renew SSL Certificate",
      description:
        "Certificate from Let's Encrypt expires May 27. Run certbot renew or update via your hosting panel before expiry.",
      priority: "Critical",
      category: "SSL/TLS",
    },
    {
      id: "ai-2",
      title: "Add CSP Header via Nginx",
      description:
        "Add add_header Content-Security-Policy to your nginx.conf. VulnWatch has generated a starter policy for your stack.",
      priority: "High",
      category: "Security Headers",
    },
    {
      id: "ai-3",
      title: "Configure DMARC DNS Record",
      description:
        'Add a TXT record: v=DMARC1; p=quarantine; rua=mailto:reports@yourdomain.com to your DNS zone.',
      priority: "Medium",
      category: "DNS & Email",
    },
  ],

  recentScans: [
    {
      id: "scan-1",
      date: "2026-05-15T10:30:00Z",
      scanType: "Full Scan",
      riskLevel: "High",
      status: "Complete",
    },
    {
      id: "scan-2",
      date: "2026-05-12T08:15:00Z",
      scanType: "Quick Scan",
      riskLevel: "Medium",
      status: "Complete",
    },
    {
      id: "scan-3",
      date: "2026-05-08T14:00:00Z",
      scanType: "Full Scan",
      riskLevel: "Critical",
      status: "Complete",
    },
    {
      id: "scan-4",
      date: "2026-05-01T09:45:00Z",
      scanType: "Quick Scan",
      riskLevel: "Low",
      status: "Complete",
    },
  ],
};

export const emptyDashboardData: DashboardData = {
  ...mockDashboardData,
  hasScans: false,
};

