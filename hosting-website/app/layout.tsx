import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import FadeInOnScroll from "../components/FadeInOnScroll";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://strelements.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Strelements | AI Website Hosting for Non-Technical Owners",
    template: "%s | Strelements",
  },
  description:
    "US-focused done-for-you hosting and deployment for AI-built and small business websites. Send your files, go live fast, and get real support.",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Strelements",
    locale: "en_US",
    url: "/",
    title: "Strelements | AI Website Hosting for Non-Technical Owners",
    description:
      "Done-for-you website deployment, domain setup, SSL, and ongoing support for AI-generated websites.",
    images: [
      {
        url: "/hosting-logo-text.svg",
        width: 1200,
        height: 630,
        alt: "Strelements hosting service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Strelements | AI Website Hosting for Non-Technical Owners",
    description:
      "Hosting and deployment for AI-built websites. No technical stress, just a site that goes live fast.",
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
        <FadeInOnScroll />
        <header className="sticky top-0 z-30 border-b border-indigo-100 bg-white/95 backdrop-blur">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/strelements-logo.svg"
                alt="Strelements"
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
              <Link href="/#pricing" className="transition hover:text-indigo-950">
                Pricing
              </Link>
              <Link href="/#faq" className="transition hover:text-indigo-950">
                FAQ
              </Link>
              <Link href="/contact" className="transition hover:text-indigo-950">
                Contact
              </Link>
            </nav>
            <Link
              href="/#start-your-order"
              className="inline-flex rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
            >
              Launch My Site
            </Link>
          </div>
        </header>

        <div className="flex-1">{children}</div>

        <footer className="border-t border-slate-200 bg-slate-950">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 pb-20 pt-10 text-sm text-slate-300 md:flex-row md:items-center md:justify-between">
            <p>© {year} Strelements. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/about-us" className="transition hover:text-white">
                About Us
              </Link>
              <Link href="/privacy-policy" className="transition hover:text-white">
                Privacy Policy
              </Link>
              <Link
                href="/terms-and-conditions"
                className="transition hover:text-white"
              >
                Terms & Conditions
              </Link>
              <a
                href="mailto:hello@strelements.com"
                className="transition hover:text-white"
              >
                hello@strelements.com
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
