/**
 * Returns a display name from the auth store's firstName / lastName.
 * Priority: firstName → lastName → "there"
 */
export function getDisplayName(
  firstName: string | null,
  lastName: string | null
): string {
  if (firstName?.trim()) return firstName.trim();
  if (lastName?.trim()) return lastName.trim();
  return "there";
}

/**
 * Legacy helper — kept for any existing callers.
 * Derives a display first name from an email address.
 * e.g. pedro.david@example.com → "Pedro"
 * Falls back to "there" if no email is available.
 */
export function getFirstName(email: string | null): string {
  const fallback = "there";
  if (!email) return fallback;

  const localPart = email.split("@")[0];
  if (!localPart) return fallback;

  const firstName = localPart.split(".")[0].split("_")[0];
  if (!firstName) return fallback;

  return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
}
