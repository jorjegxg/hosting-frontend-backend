import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Website Deployment Service",
  description:
    "Website deployment service for AI-built websites with domain connection, SSL setup, and production launch validation.",
  alternates: { canonical: "/website-deployment-service" },
};

const deploymentBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://hostera24.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Website Deployment Service",
      item: "https://hostera24.com/website-deployment-service",
    },
  ],
};

export default function WebsiteDeploymentServicePage() {
  return (
    <main className="w-full bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(deploymentBreadcrumbSchema),
        }}
      />
      <section className="border-b border-indigo-100 bg-white">
        <div className="mx-auto w-full max-w-5xl px-6 py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-indigo-700">
            Done-for-you Deployment
          </p>
          <h1 className="mt-3 text-3xl font-bold text-indigo-950 sm:text-5xl">
            AI website deployment service with clear delivery workflow
          </h1>
          <p className="mt-4 max-w-3xl text-slate-700">
            Submit your project and our team handles deployment, domain
            integration, SSL activation, and pre-launch verification.
          </p>
          <Link
            href="/start-project"
            className="mt-8 inline-flex rounded-full bg-indigo-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            Start deployment request
          </Link>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 py-14">
          <h2 className="text-2xl font-bold text-indigo-950 sm:text-3xl">Service scope</h2>
        <ul className="mt-6 space-y-3 text-slate-700">
          <li>✓ Project intake and release-readiness review</li>
          <li>✓ Domain setup and DNS connection support</li>
          <li>✓ SSL/HTTPS setup and verification</li>
          <li>✓ Launch checks and post-launch support workflow</li>
        </ul>
      </section>

      <section className="border-t border-indigo-100 bg-indigo-50/40">
        <div className="mx-auto w-full max-w-5xl px-6 py-12">
          <h2 className="text-2xl font-bold text-indigo-950">Related pages</h2>
          <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-indigo-700">
            <Link href="/" className="underline-offset-4 hover:underline">
              Website build service
            </Link>
            <Link href="/full-stack-hosting" className="underline-offset-4 hover:underline">
              Full stack hosting
            </Link>
            <Link
              href="/blog/website-deployment-checklist-before-you-send-files"
              className="underline-offset-4 hover:underline"
            >
              Deployment checklist
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
