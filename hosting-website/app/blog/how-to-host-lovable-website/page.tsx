import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Host a Lovable Website (US Launch Guide)",
  description:
    "Step-by-step guide to host a Lovable website with domain, SSL, and production launch checks.",
  alternates: { canonical: "/blog/how-to-host-lovable-website" },
};

export default function HowToHostLovableWebsitePage() {
  return (
    <main className="w-full bg-white text-slate-900">
      <article className="mx-auto w-full max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold text-indigo-950 sm:text-4xl">
          How to host a Lovable website
        </h1>
        <p className="mt-5 text-slate-700">
          If you built your website with Lovable, the fastest path to production
          is to prepare a clean project handoff: source files, domain target,
          and any integrations that need environment variables.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-indigo-950">
          Launch checklist for Lovable projects
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
          <li>Export your latest project files or repository</li>
          <li>Confirm your primary domain and DNS access</li>
          <li>List integrations (forms, email, analytics, API endpoints)</li>
          <li>Set launch target and post-launch support needs</li>
        </ul>

        <p className="mt-8 text-slate-700">
          For managed setup, see{" "}
          <Link href="/" className="font-semibold text-indigo-700 underline">
            website build service
          </Link>{" "}
          or review the{" "}
          <Link href="/website-deployment-service" className="font-semibold text-indigo-700 underline">
            website deployment service
          </Link>
          .
        </p>
      </article>
    </main>
  );
}
