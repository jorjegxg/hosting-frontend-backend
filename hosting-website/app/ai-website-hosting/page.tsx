import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Website Hosting Service",
  description:
    "Host your AI-generated website in the US with done-for-you deployment, domain setup, SSL, and support for non-technical owners.",
  alternates: { canonical: "/ai-website-hosting" },
};

const aiHostingServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "AI Website Hosting Service",
  provider: {
    "@type": "Organization",
    name: "Strelements",
    url: "https://strelements.com",
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
            Host your AI-built website without technical stress
          </h1>
          <p className="mt-4 max-w-3xl text-slate-700">
            If you built your website with Lovable, Cursor, Claude Code, Figma
            AI, or another tool, we can host it for you and make it live fast.
          </p>
          <Link
            href="/#start-your-order"
            className="mt-8 inline-flex rounded-full bg-indigo-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            Start my AI website hosting
          </Link>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-5xl gap-6 px-6 py-14 md:grid-cols-3">
        <article className="rounded-2xl border border-indigo-100 bg-white p-6">
          <h2 className="text-xl font-semibold">Upload your files</h2>
          <p className="mt-3 text-sm text-slate-700">
            Send your website ZIP and domain preferences. No server setup needed
            on your side.
          </p>
        </article>
        <article className="rounded-2xl border border-indigo-100 bg-white p-6">
          <h2 className="text-xl font-semibold">We deploy it for you</h2>
          <p className="mt-3 text-sm text-slate-700">
            We handle deployment, domain connection, SSL, and launch checks for
            a clean go-live.
          </p>
        </article>
        <article className="rounded-2xl border border-indigo-100 bg-white p-6">
          <h2 className="text-xl font-semibold">You get ongoing support</h2>
          <p className="mt-3 text-sm text-slate-700">
            Need updates or fixes after launch? You get direct support from a
            real person.
          </p>
        </article>
      </section>

      <section className="border-t border-indigo-100 bg-white">
        <div className="mx-auto w-full max-w-5xl px-6 py-12">
          <h2 className="text-2xl font-bold text-indigo-950 sm:text-3xl">
            Built for non-technical owners
          </h2>
          <p className="mt-3 text-slate-700">
            You do not need to understand hosting panels, DNS records, or server
            configuration. We guide the process from upload to launch.
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
