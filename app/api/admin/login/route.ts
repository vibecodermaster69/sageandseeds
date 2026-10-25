import { NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  createSession,
  credentialsValid,
  sessionCookieOptions,
  tooManyAttempts,
} from "../../../lib/admin-auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ?? "local";
  if (tooManyAttempts(ip)) {
    return NextResponse.json(
      { error: "Too many attempts. Please try again in a few minutes." },
      { status: 429 },
    );
  }
  const body = (await request.json().catch(() => ({}))) as {
    email?: string;
    password?: string;
  };
  if (!credentialsValid(String(body.email ?? ""), String(body.password ?? ""))) {
    return NextResponse.json(
      { error: "Wrong email or password." },
      { status: 401 },
    );
  }
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, createSession(), sessionCookieOptions);
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, "", { ...sessionCookieOptions, maxAge: 0 });
  return response;
}
