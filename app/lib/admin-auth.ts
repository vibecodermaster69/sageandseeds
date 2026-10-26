import { createHmac, timingSafeEqual } from "crypto";

export const SESSION_COOKIE = "sage_admin_session";
const SESSION_HOURS = 12;

// Defaults are the temporary credentials agreed for now. Set ADMIN_EMAIL,
// ADMIN_PASSWORD and ADMIN_SESSION_SECRET in the environment to replace them;
// the defaults must not stay in place for a public launch.
const email = () => process.env.ADMIN_EMAIL ?? "admin@admin.com";
const password = () => process.env.ADMIN_PASSWORD ?? "password123";
const secret = () =>
  process.env.ADMIN_SESSION_SECRET ?? `sage-and-seeds::${password()}`;

function safeEqual(a: string, b: string) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export function credentialsValid(givenEmail: string, givenPassword: string) {
  // Evaluate both so timing doesn't reveal which one was wrong.
  const okEmail = safeEqual(givenEmail.trim().toLowerCase(), email().toLowerCase());
  const okPassword = safeEqual(givenPassword, password());
  return okEmail && okPassword;
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

export function createSession() {
  const expires = Date.now() + SESSION_HOURS * 3600_000;
  return `${expires}.${sign(String(expires))}`;
}

export function sessionValid(token: string | undefined) {
  if (!token) return false;
  const [expires, signature] = token.split(".");
  if (!expires || !signature) return false;
  if (!safeEqual(signature, sign(expires))) return false;
  return Number(expires) > Date.now();
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "strict" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_HOURS * 3600,
};

// Small in-memory brake on password guessing (per server instance).
const attempts = new Map<string, { count: number; resetAt: number }>();
export function tooManyAttempts(key: string) {
  const now = Date.now();
  const entry = attempts.get(key);
  if (!entry || entry.resetAt < now) {
    attempts.set(key, { count: 1, resetAt: now + 15 * 60_000 });
    return false;
  }
  entry.count += 1;
  return entry.count > 10;
}
