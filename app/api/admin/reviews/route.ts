import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, sessionValid } from "../../../lib/admin-auth";
import {
  REVIEW_DISPLAY_MAX,
  REVIEW_NAME_MAX,
  REVIEW_SUBMIT_MIN,
} from "../../../lib/review-limits";
import {
  listReviews,
  removeReview,
  updateReview,
  type ReviewStatus,
} from "../../../lib/reviews-store";

export const dynamic = "force-dynamic";

function guard(request: NextRequest) {
  return sessionValid(request.cookies.get(SESSION_COOKIE)?.value)
    ? null
    : NextResponse.json({ error: "Please sign in." }, { status: 401 });
}

export async function GET(request: NextRequest) {
  const blocked = guard(request);
  if (blocked) return blocked;
  try {
    return NextResponse.json({ reviews: await listReviews() });
  } catch {
    return NextResponse.json({ error: "Could not load reviews." }, { status: 500 });
  }
}

// Edit wording and/or change status. A review can only be approved when it
// fits the carousel card, so the admin is made to trim long ones first.
export async function PATCH(request: NextRequest) {
  const blocked = guard(request);
  if (blocked) return blocked;
  const body = (await request.json().catch(() => ({}))) as {
    id?: string;
    name?: string;
    message?: string;
    rating?: number;
    status?: ReviewStatus;
  };
  const existing = (await listReviews()).find((r) => r.id === body.id);
  if (!existing) {
    return NextResponse.json({ error: "Review not found." }, { status: 404 });
  }

  const name = (body.name ?? existing.name).trim();
  const message = (body.message ?? existing.message).trim();
  const rating = body.rating ?? existing.rating;
  const status = body.status ?? existing.status;

  if (!["pending", "approved", "rejected"].includes(status)) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }
  if (!name || name.length > REVIEW_NAME_MAX) {
    return NextResponse.json(
      { error: `Name must be 1–${REVIEW_NAME_MAX} characters.` },
      { status: 400 },
    );
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Rating must be 1–5." }, { status: 400 });
  }
  if (message.length < REVIEW_SUBMIT_MIN) {
    return NextResponse.json(
      { error: `Review must be at least ${REVIEW_SUBMIT_MIN} characters.` },
      { status: 400 },
    );
  }
  if (status === "approved" && message.length > REVIEW_DISPLAY_MAX) {
    return NextResponse.json(
      {
        error: `Trim the review to ${REVIEW_DISPLAY_MAX} characters or fewer before approving (it is ${message.length}).`,
      },
      { status: 400 },
    );
  }

  const updated = await updateReview(existing.id, { name, message, rating, status });
  return NextResponse.json({ review: updated });
}

export async function DELETE(request: NextRequest) {
  const blocked = guard(request);
  if (blocked) return blocked;
  const { id } = (await request.json().catch(() => ({}))) as { id?: string };
  if (!id || !(await removeReview(id))) {
    return NextResponse.json({ error: "Review not found." }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
