export const SCAN_RESULTS = [
  {
    findingsCount: 1,
    description: "Could cause serious harm if not fixed soon",
    score: 12,
  },
  {
    findingsCount: 2,
    description: "Important to within the next 2 weeks",
    score: 32,
  },
  {
    findingsCount: 1,
    description: "Could cause serious harm if not fixed soon",
    score: 55,
  },
  {
    findingsCount: 1,
    description: "Important to within the next 2 weeks  ",
    score: 76,
  },
  {
    findingsCount: 3,
    description: "These areas passed our checks",
    score: 98,
  },
];

export const SCAN_RESULTS_STATS = [
  {
    type: "Exposure",
    score: 45,
    description: "Admin panel exposed to public internet.",
  },
  {
    type: "SSL",
    score: 79,
    description: "All DNS records are properly configured.",
  },
  { type: "DNS", score: 90, description: "Certificate expires in 18 days." },
];
