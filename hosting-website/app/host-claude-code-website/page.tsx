import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Host a Claude Code Website",
  description:
    "Deploy and host your Claude Code generated website with done-for-you setup, domain connection, and SSL.",
  alternates: { canonical: "/host-claude-code-website" },
};

export default function HostClaudeCodeWebsitePage() {
  return (
    <main className="w-full bg-white text-slate-900">
      <section className="mx-auto w-full max-w-4xl px-6 py-16">
        <h1 className="text-3xl font-bold text-indigo-950 sm:text-5xl">
          Host your Claude Code website without ops work
        </h1>
        <p className="mt-4 text-slate-700">
          We help founders launch Claude Code websites quickly with deployment,
          SSL, and domain setup handled for them.
        </p>
        <Link
          href="/#start-your-order"
          className="mt-7 inline-flex rounded-full bg-indigo-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          Launch my Claude Code website
        </Link>
        <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold text-indigo-700">
          <Link href="/ai-website-hosting" className="underline-offset-4 hover:underline">
            AI website hosting
          </Link>
          <Link href="/host-lovable-website" className="underline-offset-4 hover:underline">
            Host Lovable website
          </Link>
        </div>
      </section>
    </main>
  );
}
