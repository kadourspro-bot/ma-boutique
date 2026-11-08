import { NextResponse, type NextRequest } from "next/server";
import { ACCESS_COOKIE, accessCodes, hashCode } from "@/lib/acces";

const THIRTY_DAYS = 60 * 60 * 24 * 30;

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const code = String(form.get("code") ?? "").trim();
  const fromRaw = String(form.get("from") ?? "/");
  const from = fromRaw.startsWith("/") && !fromRaw.startsWith("//") ? fromRaw : "/";

  if (!accessCodes().includes(code)) {
    const back = new URL("/acces", req.url);
    back.searchParams.set("erreur", "1");
    if (from !== "/") back.searchParams.set("from", from);
    return NextResponse.redirect(back, 303);
  }

  const res = NextResponse.redirect(new URL(from, req.url), 303);
  res.cookies.set(ACCESS_COOKIE, await hashCode(code), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: THIRTY_DAYS,
  });
  return res;
}
