import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How Long Does Website Deployment Take?",
  description:
    "Learn realistic deployment timelines for business and AI-generated websites, and what can speed up launch.",
  alternates: { canonical: "/blog/how-long-does-website-deployment-take" },
};

export default function WebsiteDeploymentTimelinePage() {
  return (
    <main className="w-full bg-white text-slate-900">
      <article className="mx-auto w-full max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold text-indigo-950 sm:text-4xl">
          How long does website deployment take?
        </h1>
        <p className="mt-5 text-slate-700">
          Many small business websites can go live within 24 hours when files
          and domain details are ready. Complex full stack projects may need more
          time for backend and database validation.
        </p>
        <h2 className="mt-8 text-2xl font-semibold text-indigo-950">Typical ranges</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
          <li>Simple static/business site: 1 day</li>
          <li>CMS or integration-heavy site: 1-3 days</li>
          <li>Full stack app with DB: 2-5 days</li>
        </ul>
        <p className="mt-8 text-slate-700">
          For faster delivery, use our{" "}
          <Link href="/full-stack-hosting" className="font-semibold text-indigo-700 underline">
            full stack hosting
          </Link>{" "}
          or{" "}
          <Link href="/website-deployment-service" className="font-semibold text-indigo-700 underline">
            deployment service
          </Link>
          .
        </p>
      </article>
    </main>
  );
}
