"use client";

import { useEffect, useState } from "react";
import { REVIEW_DISPLAY_MAX, REVIEW_NAME_MAX } from "../../lib/review-limits";

type Status = "pending" | "approved" | "rejected";
type Review = {
  id: string;
  name: string;
  rating: number;
  message: string;
  status: Status;
  createdAt: string;
};

const tabs: { status: Status; label: string }[] = [
  { status: "pending", label: "Needs review" },
  { status: "approved", label: "Published" },
  { status: "rejected", label: "Disapproved" },
];

function ReviewCard({
  review,
  onChange,
}: {
  review: Review;
  onChange: (id: string, body: object | null) => Promise<string | null>;
}) {
  const [name, setName] = useState(review.name);
  const [message, setMessage] = useState(review.message);
  const [rating, setRating] = useState(review.rating);
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);

  const over = message.trim().length > REVIEW_DISPLAY_MAX;
  const dirty =
    name !== review.name || message !== review.message || rating !== review.rating;

  async function run(body: object | null, done?: string) {
    setBusy(true);
    setNote("");
    const error = await onChange(review.id, body);
    setBusy(false);
    setNote(error ?? done ?? "");
  }

  const edits = { name, message, rating };

  return (
    <article className="admin-review">
      <div className="admin-review-head">
        <div className="star-picker" aria-label="Rating">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              type="button"
              key={n}
              aria-label={`${n} star${n > 1 ? "s" : ""}`}
              aria-pressed={rating === n}
              className={n <= rating ? "on" : ""}
              onClick={() => setRating(n)}
            >
              ★
            </button>
          ))}
        </div>
        <small>{new Date(review.createdAt).toLocaleString()}</small>
      </div>

      <label htmlFor={`msg-${review.id}`}>Review text</label>
      <textarea
        id={`msg-${review.id}`}
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        rows={4}
      />
      <p className={over ? "admin-count over" : "admin-count"}>
        {message.trim().length} / {REVIEW_DISPLAY_MAX} characters
        {over
          ? " — too long to publish. Trim it so it fits the review card."
          : " — fits the review card."}
      </p>

      <label htmlFor={`name-${review.id}`}>Shown as</label>
      <input
        id={`name-${review.id}`}
        value={name}
        maxLength={REVIEW_NAME_MAX}
        onChange={(event) => setName(event.target.value)}
      />

      <div className="admin-actions">
        {review.status !== "approved" && (
          <button
            className="primary"
            disabled={busy || over}
            onClick={() => run({ ...edits, status: "approved" }, "Published.")}
          >
            Approve &amp; publish
          </button>
        )}
        {review.status === "approved" && (
          <button
            className="primary"
            disabled={busy || over || !dirty}
            onClick={() => run(edits, "Saved.")}
          >
            Save changes
          </button>
        )}
        {review.status === "pending" && (
          <button disabled={busy || !dirty} onClick={() => run(edits, "Draft saved.")}>
            Save edit
          </button>
        )}
        {review.status !== "rejected" && (
          <button
            disabled={busy}
            onClick={() => run({ ...edits, status: "rejected" }, "Disapproved.")}
          >
            Disapprove
          </button>
        )}
        {review.status === "rejected" && (
          <button disabled={busy} onClick={() => run({ status: "pending" })}>
            Move back to review
          </button>
        )}
        <button
          className="danger"
          disabled={busy}
          onClick={() => {
            if (confirm("Delete this review permanently?")) run(null);
          }}
        >
          Delete
        </button>
      </div>
      {note && <p className="admin-note">{note}</p>}
    </article>
  );
}

export default function AdminReviews() {
  const [signedIn, setSignedIn] = useState<boolean | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [tab, setTab] = useState<Status>("pending");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function load() {
    const res = await fetch("/api/admin/reviews");
    if (res.status === 401) {
      setSignedIn(false);
      return;
    }
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Something went wrong.");
      return;
    }
    setReviews(data.reviews);
    setSignedIn(true);
  }

  useEffect(() => {
    load();
  }, []);

  async function login(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      setError((await res.json()).error ?? "Could not sign in.");
      return;
    }
    setPassword("");
    await load();
  }

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    setReviews([]);
    setSignedIn(false);
  }

  // Returns an error message, or null on success.
  async function change(id: string, body: object | null) {
    const res = await fetch("/api/admin/reviews", {
      method: body ? "PATCH" : "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body ? { id, ...body } : { id }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return data.error ?? "Something went wrong.";
    await load();
    return null;
  }

  if (signedIn === null) {
    return <main className="admin"><p>Loading…</p></main>;
  }

  if (!signedIn) {
    return (
      <main className="admin admin-narrow">
        <h1>Admin sign in</h1>
        <p>Sign in to review what customers have written.</p>
        <form className="admin-login" onSubmit={login}>
          <label htmlFor="admin-email">Email</label>
          <input
            id="admin-email"
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <label htmlFor="admin-password">Password</label>
          <input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {error && <p className="admin-error" role="alert">{error}</p>}
          <button className="button" type="submit">
            SIGN IN
          </button>
        </form>
      </main>
    );
  }

  const shown = reviews.filter((r) => r.status === tab);

  return (
    <main className="admin">
      <div className="admin-bar">
        <h1>Review moderation</h1>
        <button className="admin-link" onClick={logout}>
          Sign out
        </button>
      </div>
      <p>
        Read each review, fix wording or remove anything inappropriate, then
        publish it. Published reviews appear in the website carousel (up to{" "}
        {REVIEW_DISPLAY_MAX} characters each so they fit the card).
      </p>
      {error && <p className="admin-error" role="alert">{error}</p>}
      <div className="admin-tabs" role="tablist">
        {tabs.map((t) => (
          <button
            key={t.status}
            role="tab"
            aria-selected={tab === t.status}
            className={tab === t.status ? "on" : ""}
            onClick={() => setTab(t.status)}
          >
            {t.label} ({reviews.filter((r) => r.status === t.status).length})
          </button>
        ))}
      </div>
      {shown.length === 0 && <p className="admin-empty">Nothing here.</p>}
      {shown.map((review) => (
        <ReviewCard key={review.id + review.status} review={review} onChange={change} />
      ))}
    </main>
  );
}
