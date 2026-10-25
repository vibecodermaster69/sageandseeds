import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

export type ReviewStatus = "pending" | "approved" | "rejected";

export type Review = {
  id: string;
  name: string;
  rating: number;
  message: string;
  status: ReviewStatus;
  createdAt: string;
};

const KEY = "sage-and-seeds:reviews";
const FILE = path.join(process.cwd(), "data", "reviews.json");
const MAX_STORED = 500;

// Upstash Redis (or Vercel KV, which is Upstash underneath) keeps reviews on
// Vercel, where the filesystem is read-only. Without it the local JSON file is
// used, which is enough for development and for any host with a writable disk.
function remote() {
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  return url && token ? { url, token } : null;
}

async function command(
  store: { url: string; token: string },
  args: string[],
): Promise<string | null> {
  const res = await fetch(store.url, {
    method: "POST",
    headers: { Authorization: `Bearer ${store.token}` },
    body: JSON.stringify(args),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Review store responded ${res.status}`);
  const body = (await res.json()) as { result: string | null };
  return body.result;
}

async function load(): Promise<Review[]> {
  const store = remote();
  if (store) {
    const raw = await command(store, ["GET", KEY]);
    return raw ? (JSON.parse(raw) as Review[]) : [];
  }
  try {
    return JSON.parse(await fs.readFile(FILE, "utf8")) as Review[];
  } catch {
    return [];
  }
}

async function save(reviews: Review[]) {
  const store = remote();
  if (store) {
    await command(store, ["SET", KEY, JSON.stringify(reviews)]);
    return;
  }
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(reviews, null, 2));
}

export async function listReviews(status?: ReviewStatus) {
  const all = await load();
  return (status ? all.filter((r) => r.status === status) : all).sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );
}

export async function addReview(input: {
  name: string;
  rating: number;
  message: string;
}) {
  const all = await load();
  const review: Review = {
    id: randomUUID(),
    ...input,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  await save([review, ...all].slice(0, MAX_STORED));
  return review;
}

export async function setReviewStatus(id: string, status: ReviewStatus) {
  const all = await load();
  const target = all.find((r) => r.id === id);
  if (!target) return null;
  target.status = status;
  await save(all);
  return target;
}

export async function removeReview(id: string) {
  const all = await load();
  const next = all.filter((r) => r.id !== id);
  if (next.length === all.length) return false;
  await save(next);
  return true;
}
