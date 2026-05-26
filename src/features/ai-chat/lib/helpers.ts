/**
 * Derives a display first name from an email address.
 * e.g. pedro.david@example.com → "Pedro"
 * Falls back to "there" if no email is available (name field coming soon).
 */
export function getFirstName(email: string | null): string {
  if (!email) return "there";
  const localPart = email.split("@")[0];
  const firstName = localPart.split(".")[0].split("_")[0];
  return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
}
