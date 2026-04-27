import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best Way to Launch a Small Business Website in 24 Hours",
  description:
    "A practical launch plan to get your small business website live in 24 hours, even if you are non-technical.",
  alternates: { canonical: "/blog/best-way-to-launch-small-business-website-in-24-hours" },
};

export default function LaunchSmallBusinessWebsitePage() {
  return (
    <main className="w-full bg-white text-slate-900">
      <article className="mx-auto w-full max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold text-indigo-950 sm:text-4xl">
          Best way to launch a small business website in 24 hours
        </h1>
        <p className="mt-5 text-slate-700">
          The fastest path is simple: finalize content, package your site files,
          send domain preferences, and use a done-for-you deployment service.
        </p>
        <h2 className="mt-8 text-2xl font-semibold text-indigo-950">24-hour launch plan</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-slate-700">
          <li>Confirm your homepage, contact info, and call-to-action</li>
          <li>Export final website files</li>
          <li>Share domain goals and backup options</li>
          <li>Launch with SSL and post-launch checks</li>
        </ol>
        <p className="mt-8 text-slate-700">
          Start here:{" "}
          <Link href="/start-project" className="font-semibold text-indigo-700 underline">
            submit your order
          </Link>{" "}
          or review the{" "}
          <Link href="/" className="font-semibold text-indigo-700 underline">
            website service page
          </Link>
          .
        </p>
      </article>
    </main>
  );
}
