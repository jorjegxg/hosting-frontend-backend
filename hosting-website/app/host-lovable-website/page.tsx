import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Host a Lovable Website",
  description:
    "Need hosting for a Lovable-built website? We deploy your files, connect domain and SSL, and help you launch quickly.",
  alternates: { canonical: "/host-lovable-website" },
};

export default function HostLovableWebsitePage() {
  return (
    <main className="w-full bg-white text-slate-900">
      <section className="mx-auto w-full max-w-4xl px-6 py-16">
        <h1 className="text-3xl font-bold text-indigo-950 sm:text-5xl">
          Host your Lovable website in the US
        </h1>
        <p className="mt-4 text-slate-700">
          Built with Lovable and need a reliable launch? Send your project files
          and we handle deployment, domain setup, SSL, and support.
        </p>
        <Link
          href="/#start-your-order"
          className="mt-7 inline-flex rounded-full bg-indigo-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          Launch my Lovable website
        </Link>
        <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold text-indigo-700">
          <Link href="/ai-website-hosting" className="underline-offset-4 hover:underline">
            AI website hosting
          </Link>
          <Link href="/host-cursor-website" className="underline-offset-4 hover:underline">
            Host Cursor website
          </Link>
        </div>
      </section>
    </main>
  );
}
