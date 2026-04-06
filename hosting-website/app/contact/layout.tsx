import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Hostera 24",
  description:
    "Talk to Hostera 24 about hosting, deployment, and launching your AI-built website in the US.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
