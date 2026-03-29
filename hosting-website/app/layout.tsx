import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Your Hosting Service",
  description:
    "Website hosting service for $9.99 per month with setup and support.",
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
      <body suppressHydrationWarning className="flex min-h-dvh flex-col bg-slate-50">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
            <a href="/" className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white">
                <Image
                  src="/hosting-logo.svg"
                  alt="Strelements logo"
                  width={34}
                  height={34}
                  className="h-8 w-8"
                />
              </span>
              <span className="font-sans text-lg font-bold tracking-[0.06em] text-slate-900 sm:text-xl">
                Strelements
              </span>
            </a>
            <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-700 md:flex">
              <a href="/" className="transition hover:text-slate-900">
                Home
              </a>
              <a href="/#pricing" className="transition hover:text-slate-900">
                Pricing
              </a>
              <a href="/#faq" className="transition hover:text-slate-900">
                FAQ
              </a>
              <a href="/contact" className="transition hover:text-slate-900">
                Contact
              </a>
            </nav>
            <a
              href="/#start-your-order"
              className="inline-flex rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
            >
              Launch My Site
            </a>
          </div>
        </header>

        <div className="flex-1">{children}</div>

        <footer className="border-t border-slate-200 bg-slate-950">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 pb-20 pt-10 text-sm text-slate-300 md:flex-row md:items-center md:justify-between">
            <p>© {year} Strelements. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-4">
              <a href="/about-us" className="transition hover:text-white">
                About Us
              </a>
              <a href="/privacy-policy" className="transition hover:text-white">
                Privacy Policy
              </a>
              <a href="/terms-and-conditions" className="transition hover:text-white">
                Terms & Conditions
              </a>
              <a
                href="mailto:hello@strelements.com"
                className="transition hover:text-white"
              >
                hello@strelements.com
              </a>
              <a href="/" className="transition hover:text-white">
                Back to home
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
