import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Full Stack Hosting for AI-Built Apps",
  description:
    "Full stack hosting for AI-built apps with frontend, backend, and database deployment, security baseline, and monitoring.",
  alternates: { canonical: "/full-stack-hosting" },
};

const fullStackBreadcrumbSchema = {
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
      name: "Full Stack Hosting",
      item: "https://hostera24.com/full-stack-hosting",
    },
  ],
};

export default function FullStackHostingPage() {
  return (
    <main className="w-full bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(fullStackBreadcrumbSchema),
        }}
      />
      <section className="border-b border-indigo-100 bg-indigo-50/60">
        <div className="mx-auto w-full max-w-5xl px-6 py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-indigo-700">
            Full Stack Hosting
          </p>
          <h1 className="mt-3 text-3xl font-bold text-indigo-950 sm:text-5xl">
            Full stack hosting for AI-built production apps
          </h1>
          <p className="mt-4 max-w-3xl text-slate-700">
            Designed for SaaS and application teams that need coordinated
            frontend, backend, and database delivery without running in-house
            operations.
          </p>
          <p className="mt-3 max-w-3xl text-sm font-medium text-indigo-800">
            Full stack maintenance and incident handling are provided by our
            engineering team as a managed service.
          </p>
          <Link
            href="/start-project"
            className="mt-8 inline-flex rounded-full bg-indigo-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            Start full stack request
          </Link>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-5xl gap-6 px-6 py-14 md:grid-cols-2">
        <article className="rounded-2xl border border-indigo-100 p-6">
          <h2 className="text-xl font-semibold">Deployment operations</h2>
          <p className="mt-3 text-sm text-slate-700">
            We deploy frontend and backend services, validate environment
            configuration, and confirm routing behavior.
          </p>
        </article>
        <article className="rounded-2xl border border-indigo-100 p-6">
          <h2 className="text-xl font-semibold">Database and observability</h2>
          <p className="mt-3 text-sm text-slate-700">
            We provision and configure the database layer, then run core uptime
            and stability monitoring.
          </p>
        </article>
      </section>

      <section className="border-t border-indigo-100 bg-white">
        <div className="mx-auto w-full max-w-5xl px-6 py-12">
          <div className="flex flex-wrap gap-3 text-sm font-semibold text-indigo-700">
            <Link href="/website-deployment-service" className="underline-offset-4 hover:underline">
              Deployment service
            </Link>
            <Link href="/" className="underline-offset-4 hover:underline">
              Website build service
            </Link>
            <Link
              href="/blog/how-long-does-website-deployment-take"
              className="underline-offset-4 hover:underline"
            >
              Deployment timeline guide
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
