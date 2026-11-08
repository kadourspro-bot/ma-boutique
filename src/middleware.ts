import { NextResponse, type NextRequest } from "next/server";
import { ACCESS_COOKIE, accessCodes, hashCode } from "@/lib/acces";

// Site sur invitation : sans le bon mot de passe, on est renvoyé vers /acces.
// Si SITE_PASSWORD n'est pas réglé (ex. sur ton ordinateur), le site reste ouvert.
export async function middleware(req: NextRequest) {
  const codes = accessCodes();
  if (codes.length === 0) return NextResponse.next();

  const { pathname, search } = req.nextUrl;
  // La page du mot de passe et les images fixes du décor (pour qu'elle reste jolie) restent visibles
  if (pathname === "/acces" || pathname === "/api/acces" || /^\/videos\/[^/]+\.jpg$/.test(pathname)) {
    return NextResponse.next();
  }

  const cookie = req.cookies.get(ACCESS_COOKIE)?.value;
  if (cookie) {
    const valid = await Promise.all(codes.map(hashCode));
    if (valid.includes(cookie)) return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = "/acces";
  url.search = pathname === "/" ? "" : `?from=${encodeURIComponent(pathname + search)}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Tout est protégé (pages, images, vidéos) sauf les fichiers techniques de Next.js et l'icône
  matcher: ["/((?!_next/static|_next/image|icon.svg|favicon.ico).*)"],
};
