import { NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import {
  listReviews,
  removeReview,
  setReviewStatus,
  type ReviewStatus,
} from "../../../lib/reviews-store";

export const dynamic = "force-dynamic";

function authorised(request: Request) {
  const expected = process.env.REVIEW_ADMIN_TOKEN;
  if (!expected) return "unconfigured" as const;
  const given = request.headers.get("x-admin-token") ?? "";
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b)
    ? ("ok" as const)
    : ("denied" as const);
}

function guard(request: Request) {
  const state = authorised(request);
  if (state === "unconfigured") {
    return NextResponse.json(
      { error: "REVIEW_ADMIN_TOKEN is not set on the server." },
      { status: 503 },
    );
  }
  if (state === "denied") {
    return NextResponse.json({ error: "Wrong admin token." }, { status: 401 });
  }
  return null;
}

export async function GET(request: Request) {
  const blocked = guard(request);
  if (blocked) return blocked;
  try {
    return NextResponse.json({ reviews: await listReviews() });
  } catch {
    return NextResponse.json({ error: "Could not load reviews." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const blocked = guard(request);
  if (blocked) return blocked;
  const { id, status } = (await request.json()) as {
    id?: string;
    status?: ReviewStatus;
  };
  if (!id || !["pending", "approved", "rejected"].includes(String(status))) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const updated = await setReviewStatus(id, status as ReviewStatus);
  return updated
    ? NextResponse.json({ review: updated })
    : NextResponse.json({ error: "Review not found." }, { status: 404 });
}

export async function DELETE(request: Request) {
  const blocked = guard(request);
  if (blocked) return blocked;
  const { id } = (await request.json()) as { id?: string };
  if (!id || !(await removeReview(id))) {
    return NextResponse.json({ error: "Review not found." }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
