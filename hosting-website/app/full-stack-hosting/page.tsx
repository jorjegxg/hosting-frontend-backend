import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Managed Full Stack Hosting",
  description:
    "Managed full stack hosting for frontend, backend, and database projects with deployment workflow, security baseline, and monitoring.",
  alternates: { canonical: "/full-stack-hosting" },
};

export default function FullStackHostingPage() {
  return (
    <main className="w-full bg-white text-slate-900">
      <section className="border-b border-indigo-100 bg-indigo-50/60">
        <div className="mx-auto w-full max-w-5xl px-6 py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-indigo-700">
            Full Stack Hosting
          </p>
          <h1 className="mt-3 text-3xl font-bold text-indigo-950 sm:text-5xl">
            Managed full stack hosting for production workloads
          </h1>
          <p className="mt-4 max-w-3xl text-slate-700">
            Designed for SaaS and application teams that need coordinated
            frontend, backend, and database delivery without running in-house
            operations.
          </p>
          <Link
            href="/#start-your-order"
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
            <Link href="/ai-website-hosting" className="underline-offset-4 hover:underline">
              AI website hosting
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
