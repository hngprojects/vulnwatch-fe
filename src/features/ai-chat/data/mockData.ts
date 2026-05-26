export const SUGGESTED_QUESTIONS = [
  "Why is my admin page exposed?",
  "What does HSTS mean?",
  "How urgent is the SSL expiry?",
  "Which fix should I do first?",
];

const MOCK_AI_RESPONSES: Record<string, string> = {
  "Why is my admin page exposed?":
    "Your /wp-admin login page is reachable by anyone on the internet right now. That's a problem because automated bots try thousands of password combinations on pages like this every hour.\n\nTo fix
  "What does HSTS mean?":
    "HSTS (HTTP Strict Transport Security) tells browsers to always use HTTPS — even if a user types just \"http://\".\n\nWithout it, attackers can intercept the first request before it upgrades. It
  "How urgent is the SSL expiry?":
    "If your SSL certificate expires, browsers show a scary red warning to all visitors and most will leave immediately.\n\nSet up auto-renewal to avoid this entirely — it takes about 30 minutes to 
  "Which fix should I do first?":
    "Start with your critical issues:\n\n1. Restrict admin page access (high impact, low effort)\n2. Add missing security headers like HSTS and CSP\n3. Review your SSL configuration\n\nThose three wil
};

const DEFAULT_AI_RESPONSE =
  "That's a great question. Based on your scan findings, I recommend reviewing the critical issues first before addressing medium or low severity items. Would you like me to walk you through the highe

export function getMockAiResponse(question: string): string {
  return MOCK_AI_RESPONSES[question] ?? DEFAULT_AI_RESPONSE;
}
