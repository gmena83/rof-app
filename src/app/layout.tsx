import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Raya Opportunity Finder",
  description:
    "Discover, prioritize, and apply for funding opportunities — tailored for solar power startups.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main style={{ minHeight: "calc(100vh - 64px - 73px)" }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
