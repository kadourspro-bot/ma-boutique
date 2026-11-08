// Accès sur invitation : le ou les mots de passe sont dans la variable SITE_PASSWORD
// (réglée sur Vercel, jamais écrite dans le code). Plusieurs codes : les séparer par des virgules.
export const ACCESS_COOKIE = "lunaria-acces";

export function accessCodes(): string[] {
  return (process.env.SITE_PASSWORD ?? "").split(",").map((c) => c.trim()).filter(Boolean);
}

export async function hashCode(code: string): Promise<string> {
  const data = new TextEncoder().encode(`lunaria:${code}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}
