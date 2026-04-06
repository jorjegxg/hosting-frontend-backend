import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hostera24.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: {
    icon: "/hosting-logo.svg",
    shortcut: "/hosting-logo.svg",
    apple: "/hosting-logo.svg",
  },
  title: {
    default: "Hostera 24 | AI Website Hosting & Deployment Service",
    template: "%s | Hostera 24",
  },
  description:
    "US-focused AI website hosting and deployment service for sites built with tools like Claude Code, Cursor, and Lovable.",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Hostera 24",
    locale: "en_US",
    url: "/",
    title: "Hostera 24 | AI Website Hosting & Deployment Service",
    description:
      "AI website hosting and deployment with domain setup, SSL, and launch support for AI-built projects.",
    images: [
      {
        url: "/hosting-logo-text.svg",
        width: 1200,
        height: 630,
        alt: "Hostera 24 hosting service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hostera 24 | AI Website Hosting & Deployment Service",
    description:
      "AI website hosting service for founders who built websites with AI tools and need reliable deployment support.",
    images: ["/hosting-logo-text.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const year = new Date().getFullYear();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
    >
      <body
        suppressHydrationWarning
        className="flex min-h-dvh flex-col bg-white"
      >
        <header className="sticky top-0 z-30 border-b border-indigo-100 bg-white/95 backdrop-blur">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/hosting-logo-text.svg"
                alt="Hostera 24"
                width={220}
                height={51}
                className="h-9 w-auto max-w-52 sm:h-11 sm:max-w-64"
                priority
              />
            </Link>
            <nav className="hidden items-center gap-6 text-sm font-semibold text-indigo-900/70 md:flex">
              <Link href="/" className="transition hover:text-indigo-950">
                Home
              </Link>
              <Link
                href="/#pricing"
                className="transition hover:text-indigo-950"
              >
                Plans
              </Link>
              <Link href="/#faq" className="transition hover:text-indigo-950">
                FAQ
              </Link>
              <Link
                href="/contact"
                className="transition hover:text-indigo-950"
              >
                Contact
              </Link>
            </nav>
            <Link
              href="/#start-your-order"
              className="inline-flex rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
            >
              Start Launch Request
            </Link>
          </div>
        </header>

        <div className="flex-1">{children}</div>

        <footer className="border-t border-slate-200 bg-slate-950">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 pb-20 pt-10 text-sm text-slate-300 md:flex-row md:items-center md:justify-between">
            <p>© {year} Hostera 24. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/about-us" className="transition hover:text-white">
                About Us
              </Link>
              <Link
                href="/privacy-policy"
                className="transition hover:text-white"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-and-conditions"
                className="transition hover:text-white"
              >
                Terms & Conditions
              </Link>
              <a
                href="mailto:hello@hostera24.com"
                className="transition hover:text-white"
              >
                hello@hostera24.com
              </a>
              <Link href="/" className="transition hover:text-white">
                Back to home
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
