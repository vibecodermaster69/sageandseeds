import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sage & Seeds | Mindful snacking rooted in tradition",
  description: "Makhana — an honest, nourishing, clean snack rooted in Indian tradition.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
