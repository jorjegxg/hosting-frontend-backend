import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Strelements",
  description:
    "Talk to Strelements about hosting, deployment, and launching your AI-built website in the US.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
