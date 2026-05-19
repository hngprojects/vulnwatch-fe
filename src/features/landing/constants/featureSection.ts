export type Feature = {
  image: string;
  title: string;
  description: string;
};

export const FeaturesData: Feature[] = [
  {
    image: '/images/landing-page/malware-icon.png',
    title: 'Malware detection',
    description:
      'Scan codes, scripts and assets for known malware signatures & obfuscated payloads.',
  },
  {
    image: '/images/landing-page/SSL.jpg',
    title: 'SSL/TLS Review',
    description:
      'Verify certificate validity, encrypt data strength, HSTS, & protocol versions in use.',
  },
  {
    image: '/images/landing-page/DNS.jpg',
    title: 'DNS & Domain health',
    description:
      'Detect DNS misconfigurations, expired and dangling domains and subdomains.',
  },
  {
    image: '/images/landing-page/security-headers.png',
    title: 'Security Headers',
    description:
      'Audit CSP, X-Frame-Options, Referrer-Policy, Permissions-Policy & so much more.',
  },
  {
    image: '/images/landing-page/DarkWeb.jpg',
    title: 'Dark web exposure',
    description:
      'Monitor breaches and confirmed leaks tied to your domain on dark web marketplaces.',
  },
  {
    image: '/images/landing-page/uptime-icon.png',
    title: 'Uptime & performance',
    description:
      'Continuous monitoring with instant alerts for downtime or performance defects.',
  },
];
