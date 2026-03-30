import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Host a Cursor-Built Website",
  description:
    "Hosting for websites built with Cursor. We manage deployment, domain connection, SSL, and go-live support.",
  alternates: { canonical: "/host-cursor-website" },
};

export default function HostCursorWebsitePage() {
  return (
    <main className="w-full bg-white text-slate-900">
      <section className="mx-auto w-full max-w-4xl px-6 py-16">
        <h1 className="text-3xl font-bold text-indigo-950 sm:text-5xl">
          Host your Cursor-built website
        </h1>
        <p className="mt-4 text-slate-700">
          If Cursor helped you build your site, we can handle production hosting
          and deployment so you can focus on your business.
        </p>
        <Link
          href="/#start-your-order"
          className="mt-7 inline-flex rounded-full bg-indigo-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          Launch my Cursor website
        </Link>
        <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold text-indigo-700">
          <Link href="/ai-website-hosting" className="underline-offset-4 hover:underline">
            AI website hosting
          </Link>
          <Link href="/host-claude-code-website" className="underline-offset-4 hover:underline">
            Host Claude Code website
          </Link>
        </div>
      </section>
    </main>
  );
}
