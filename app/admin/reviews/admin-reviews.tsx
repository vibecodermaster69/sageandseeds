"use client";

import { useState } from "react";

type Review = {
  id: string;
  name: string;
  rating: number;
  message: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
};

export default function AdminReviews() {
  const [token, setToken] = useState("");
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [error, setError] = useState("");

  async function call(method: string, body?: object) {
    const res = await fetch("/api/admin/reviews", {
      method,
      headers: { "x-admin-token": token, "content-type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
    return data;
  }

  async function load() {
    setError("");
    try {
      setReviews((await call("GET")).reviews);
    } catch (e) {
      setReviews(null);
      setError((e as Error).message);
    }
  }

  async function act(id: string, status: Review["status"] | "delete") {
    setError("");
    try {
      if (status === "delete") await call("DELETE", { id });
      else await call("PATCH", { id, status });
      await load();
    } catch (e) {
      setError((e as Error).message);
    }
  }

  const groups: Review["status"][] = ["pending", "approved", "rejected"];

  return (
    <main className="admin">
      <h1>Review moderation</h1>
      <p>
        New reviews stay hidden until you approve them. Approved reviews appear
        in &ldquo;What our customers say&rdquo; straight away.
      </p>
      <form
        className="admin-login"
        onSubmit={(event) => {
          event.preventDefault();
          load();
        }}
      >
        <label htmlFor="token">Admin token</label>
        <input
          id="token"
          type="password"
          autoComplete="off"
          value={token}
          onChange={(event) => setToken(event.target.value)}
        />
        <button className="button" type="submit">
          LOAD REVIEWS
        </button>
      </form>
      {error && <p className="admin-error">{error}</p>}
      {reviews &&
        groups.map((group) => {
          const items = reviews.filter((r) => r.status === group);
          return (
            <section key={group}>
              <h2>
                {group[0].toUpperCase() + group.slice(1)} ({items.length})
              </h2>
              {items.length === 0 && <p className="admin-empty">Nothing here.</p>}
              {items.map((r) => (
                <article className="admin-review" key={r.id}>
                  <div className="stars" aria-label={`${r.rating} out of 5 stars`}>
                    {"★".repeat(r.rating)}
                    {"☆".repeat(5 - r.rating)}
                  </div>
                  <p>{r.message}</p>
                  <small>
                    {r.name} &middot; {new Date(r.createdAt).toLocaleString()}
                  </small>
                  <div className="admin-actions">
                    {group !== "approved" && (
                      <button onClick={() => act(r.id, "approved")}>Approve</button>
                    )}
                    {group !== "rejected" && (
                      <button onClick={() => act(r.id, "rejected")}>Reject</button>
                    )}
                    <button onClick={() => act(r.id, "delete")}>Delete</button>
                  </div>
                </article>
              ))}
            </section>
          );
        })}
    </main>
  );
}
