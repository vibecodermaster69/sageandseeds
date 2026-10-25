import { NextResponse } from "next/server";
import {
  REVIEW_NAME_MAX,
  REVIEW_SUBMIT_MAX,
  REVIEW_SUBMIT_MIN,
} from "../../lib/review-limits";
import { addReview, listReviews } from "../../lib/reviews-store";

export const dynamic = "force-dynamic";

// Only approved reviews are ever returned to the public site.
export async function GET() {
  try {
    const approved = await listReviews("approved");
    return NextResponse.json({
      reviews: approved.map(({ id, name, rating, message }) => ({
        id,
        name,
        rating,
        message,
      })),
    });
  } catch {
    return NextResponse.json({ reviews: [] });
  }
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Hidden field that people never see; bots tend to fill it in.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = String(body.name ?? "").trim();
  const message = String(body.message ?? "").trim();
  const rating = Number(body.rating);

  if (!name || name.length > REVIEW_NAME_MAX) {
    return NextResponse.json(
      { error: `Please add your name (up to ${REVIEW_NAME_MAX} characters).` },
      { status: 400 },
    );
  }
  if (message.length < REVIEW_SUBMIT_MIN || message.length > REVIEW_SUBMIT_MAX) {
    return NextResponse.json(
      {
        error: `Please write between ${REVIEW_SUBMIT_MIN} and ${REVIEW_SUBMIT_MAX} characters.`,
      },
      { status: 400 },
    );
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json(
      { error: "Please choose a star rating." },
      { status: 400 },
    );
  }

  try {
    await addReview({ name, rating, message });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Reviews are unavailable right now. Please try again later." },
      { status: 503 },
    );
  }
}
