import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Managed AI Website Hosting",
  description:
    "Managed AI website hosting with deployment workflow, domain setup, SSL, and post-launch support.",
  alternates: { canonical: "/ai-website-hosting" },
};

const aiHostingServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "AI Website Hosting Service",
  provider: {
    "@type": "Organization",
    name: "Hostera 24",
    url: "https://hostera24.com",
  },
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
};

export default function AiWebsiteHostingPage() {
  return (
    <main className="w-full bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aiHostingServiceSchema) }}
      />
      <section className="border-b border-indigo-100 bg-indigo-50/60">
        <div className="mx-auto w-full max-w-5xl px-6 py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-indigo-700">
            AI Website Hosting
          </p>
          <h1 className="mt-3 text-3xl font-bold text-indigo-950 sm:text-5xl">
            Managed hosting for AI-built websites
          </h1>
          <p className="mt-4 max-w-3xl text-slate-700">
            If your website was built with Lovable, Cursor, Claude Code, Figma
            AI, or similar tools, our team can take it through a structured
            production launch.
          </p>
          <Link
            href="/#start-your-order"
            className="mt-8 inline-flex rounded-full bg-indigo-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            Start launch request
          </Link>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-5xl gap-6 px-6 py-14 md:grid-cols-3">
        <article className="rounded-2xl border border-indigo-100 bg-white p-6">
          <h2 className="text-xl font-semibold">Project intake</h2>
          <p className="mt-3 text-sm text-slate-700">
            Share your website files and domain preferences. No infrastructure
            setup is required on your side.
          </p>
        </article>
        <article className="rounded-2xl border border-indigo-100 bg-white p-6">
          <h2 className="text-xl font-semibold">Managed deployment</h2>
          <p className="mt-3 text-sm text-slate-700">
            We execute deployment, domain connection, SSL setup, and launch
            validation checks.
          </p>
        </article>
        <article className="rounded-2xl border border-indigo-100 bg-white p-6">
          <h2 className="text-xl font-semibold">Post-launch support</h2>
          <p className="mt-3 text-sm text-slate-700">
            Update requests and fixes are handled through a direct support
            workflow.
          </p>
        </article>
      </section>

      <section className="border-t border-indigo-100 bg-white">
        <div className="mx-auto w-full max-w-5xl px-6 py-12">
          <h2 className="text-2xl font-bold text-indigo-950 sm:text-3xl">
            Built for non-technical teams
          </h2>
          <p className="mt-3 text-slate-700">
            You do not need to manage hosting panels, DNS records, or server
            configuration. We handle operations from intake to launch.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold text-indigo-700">
            <Link href="/website-deployment-service" className="underline-offset-4 hover:underline">
              Website deployment service
            </Link>
            <Link href="/full-stack-hosting" className="underline-offset-4 hover:underline">
              Full stack hosting
            </Link>
            <Link
              href="/blog/how-to-host-ai-generated-website-without-coding"
              className="underline-offset-4 hover:underline"
            >
              AI hosting guide
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
