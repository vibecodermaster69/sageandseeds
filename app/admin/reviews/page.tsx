import type { Metadata } from "next";
import AdminReviews from "./admin-reviews";

export const metadata: Metadata = {
  title: "Review moderation | Sage & Seeds",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <AdminReviews />;
}
