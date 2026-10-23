/** Domain helpers shared by the tool pages and API routes (no server-only imports). */

/**
 * Turns whatever the visitor typed ("https://www.Example.com/about", "example.com")
 * into a bare lowercase host, or null when it is not a public domain name.
 */
export function normalizeDomain(raw: unknown): string | null {
  if (typeof raw !== 'string') return null;
  const trimmed = raw.trim().toLowerCase();
  if (!trimmed || trimmed.length > 253) return null;
  let host: string;
  try {
    host = new URL(/^https?:\/\//.test(trimmed) ? trimmed : `https://${trimmed}`).hostname;
  } catch {
    return null;
  }
  host = host.replace(/^www\./, '').replace(/\.$/, '');
  // Needs a dot and a letter-only TLD; rules out IPs, localhost and intranet names.
  if (!/^([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/.test(host)) return null;
  return host;
}

export function hostOf(url: string): string {
  try {
    return new URL(url).hostname.toLowerCase().replace(/^www\./, '');
  } catch {
    return '';
  }
}

/** True when `host` is `domain` or one of its subdomains. */
export function isSameSite(host: string, domain: string): boolean {
  return host === domain || host.endsWith(`.${domain}`);
}
