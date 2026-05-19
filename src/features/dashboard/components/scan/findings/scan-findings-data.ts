import { FileText, FolderOpen, type LucideIcon } from 'lucide-react';
import type { Severity } from './SeverityBadge';

export type FindingModule = 'Exposure' | 'SSL' | 'DNS';

export type FindingSummary = {
  id: string;
  severity: Severity;
  title: string;
  module: FindingModule;
};

export type FindingStat = {
  label: string;
  count: number;
  description: string;
  className: string;
  countClassName: string;
};

export type SecuritySummaryItem = {
  id: string;
  before?: string;
  emphasis: string;
  emphasisClassName: string;
  after: string;
};

export type ExposureCheck = {
  path: string;
  status: string;
  note?: string;
  severity: Severity;
};

export type ExposureFinding = {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  icon: LucideIcon;
  isOpen: boolean;
  checks?: ExposureCheck[];
};

export const scanOverview = {
  domain: 'mycompany.com',
  score: 54,
  issueCount: 8,
  moduleCount: 5,
};

export const findingStats: FindingStat[] = [
  {
    label: 'Critical fixes',
    count: 1,
    description: 'Could cause serious harm if not fixed soon',
    className: 'bg-[#FFE6EC] text-[#D92D50]',
    countClassName: 'bg-[#D92D50] text-white',
  },
  {
    label: 'High priority fixes',
    count: 1,
    description: 'Important to within the next 2 weeks',
    className: 'bg-[#FFF0E6] text-[#E46B16]',
    countClassName: 'bg-[#E46B16] text-white',
  },
  {
    label: 'Medium fixes',
    count: 1,
    description: 'Could cause serious harm if not fixed soon',
    className: 'bg-[#FFF8DB] text-[#B89412]',
    countClassName: 'bg-[#B89412] text-white',
  },
  {
    label: 'Low fixes',
    count: 1,
    description: 'Important to within the next 2 weeks',
    className: 'bg-[#E8EDFF] text-[#2F5BC7]',
    countClassName: 'bg-[#2F5BC7] text-white',
  },
  {
    label: 'Pass',
    count: 3,
    description: 'These areas passed our checks',
    className: 'bg-[#DFF8EC] text-[#1FA870]',
    countClassName: 'bg-[#1FA870] text-white',
  },
];

export const securitySummaryItems: SecuritySummaryItem[] = [
  {
    id: 'critical',
    before: 'Your domain has ',
    emphasis: '1 Critical Issue',
    emphasisClassName: 'text-[#D92D50]',
    after:
      ' that need immediate attention: The missing HSTS header leaves every visitor exposed to potential traffic interception, especially on public networks.',
  },
  {
    id: 'high',
    emphasis: '2 high-severity findings',
    emphasisClassName: 'text-[#D92D50]',
    after:
      ' compound the risk: Your admin panel is publicly reachable and being actively targeted by automated bots, and your robots.txt file is advertising internal paths.',
  },
  {
    id: 'good-news',
    emphasis: 'The good news:',
    emphasisClassName: 'text-[#1FA870]',
    after:
      ' All three of these are configuration fixes and do not require code changes. Prioritise the HSTS header and admin panel restriction first.',
  },
];

export const failedFindings: FindingSummary[] = [
  {
    id: 'hsts',
    severity: 'Critical',
    title: 'Missing Strict-Transport-Security (HSTS)',
    module: 'Exposure',
  },
  {
    id: 'robots',
    severity: 'High',
    title: 'robots.txt Reveals Sensitive Paths',
    module: 'Exposure',
  },
  {
    id: 'assets',
    severity: 'Medium',
    title: 'Directly Listing Enabled on /assets/',
    module: 'Exposure',
  },
  {
    id: 'ssl-expiry',
    severity: 'Low',
    title: 'SSL Certificate Expires in 28 days',
    module: 'SSL',
  },
];

export const allPassedFindings: FindingSummary[] = [
  {
    id: 'certificate-chain',
    severity: 'Pass',
    title: 'Certificate Chain Valid',
    module: 'SSL',
  },
  {
    id: 'spf',
    severity: 'Pass',
    title: 'SPF Record Configured Correctly',
    module: 'SSL',
  },
];

export const exposureFindings: ExposureFinding[] = [
  {
    id: 'file-folder-access',
    title: 'File Folder Access',
    description:
      'Anyone can browse your website files like a file manager-including sensitive file',
    severity: 'Medium',
    icon: FileText,
    isOpen: true,
    checks: [
      {
        path: '/assets/',
        status: 'HTTP 200',
        note: '3 sensitive files',
        severity: 'Medium',
      },
      {
        path: '/upload/',
        status: 'HTTP 403',
        severity: 'Pass',
      },
      {
        path: '/static/',
        status: 'HTTP 403',
        severity: 'Pass',
      },
    ],
  },
  {
    id: 'robots',
    title: 'Private Areas File [robots.txt]',
    description:
      'A public file is accidentally telling attackers where your private messages are',
    severity: 'High',
    icon: FolderOpen,
    isOpen: false,
  },
  {
    id: 'sitemap',
    title: 'Google Sitemap [sitemap.xml]',
    description:
      'Your site maps used by google includes 3 pages that should never be in public',
    severity: 'Medium',
    icon: FileText,
    isOpen: false,
  },
  {
    id: 'admin-login',
    title: 'Admin Login Pages',
    description: 'Your admin login are visible to anyone in the internet',
    severity: 'High',
    icon: FileText,
    isOpen: false,
  },
];

export const sslFindings: FindingSummary[] = [
  {
    id: 'ssl-expiry',
    severity: 'Low',
    title: 'SSL Certificate Expires in 28 days',
    module: 'SSL',
  },
  {
    id: 'legacy-tls',
    severity: 'Medium',
    title: 'TSL 1.0 and TLS 1.1 Still Enabled',
    module: 'SSL',
  },
];

export const dnsFindings: FindingSummary[] = [
  {
    id: 'dmarc',
    severity: 'Medium',
    title: 'No DMARC Policy Configured',
    module: 'DNS',
  },
];

export const dnsPassedFindings: FindingSummary[] = [
  {
    id: 'spf',
    severity: 'Pass',
    title: 'SPF Record Configured Correctly',
    module: 'DNS',
  },
];
