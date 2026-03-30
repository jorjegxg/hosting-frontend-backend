import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Host an AI-Generated Website Without Coding",
  description:
    "A beginner-friendly guide to hosting an AI-generated website without server setup skills.",
  alternates: { canonical: "/blog/how-to-host-ai-generated-website-without-coding" },
};

export default function HowToHostAiGeneratedWebsitePage() {
  return (
    <main className="w-full bg-white text-slate-900">
      <article className="mx-auto w-full max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold text-indigo-950 sm:text-4xl">
          How to host an AI-generated website without coding
        </h1>
        <p className="mt-5 text-slate-700">
          If your website was built by an AI tool, you can still launch fast
          without learning deployment workflows. You need a project export, a
          domain, and a hosting partner that handles setup.
        </p>
        <h2 className="mt-8 text-2xl font-semibold text-indigo-950">Quick checklist</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
          <li>Export your site files in ZIP format</li>
          <li>Prepare your preferred domain name</li>
          <li>Share any form or API requirements</li>
          <li>Confirm your timeline and support needs</li>
        </ul>
        <p className="mt-8 text-slate-700">
          Want it done for you? See{" "}
          <Link href="/ai-website-hosting" className="font-semibold text-indigo-700 underline">
            AI website hosting service
          </Link>{" "}
          and start from the order form on the homepage.
        </p>
      </article>
    </main>
  );
}
