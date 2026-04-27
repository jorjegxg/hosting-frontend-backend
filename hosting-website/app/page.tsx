import type { Metadata } from "next";
import Image from "next/image";
import ContactBubble from "../components/ContactBubble";

export const metadata: Metadata = {
  title: "Presentation Website Build + Maintenance",
  description:
    "I build your presentation website and you pay only $20/month for maintenance, hosting, and domain.",
  alternates: {
    canonical: "/",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Hostera 24",
  url: "https://hostera24.com",
  email: "hello@hostera24.com",
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Presentation Website Build and Maintenance Service",
  provider: {
    "@type": "Organization",
    name: "Hostera 24",
    url: "https://hostera24.com",
  },
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  offers: [
    {
      "@type": "Offer",
      name: "Presentation Website Maintenance Plan",
      price: "20.00",
      priceCurrency: "USD",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do you build presentation websites for clients?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We build and launch presentation websites based on your business goals, content, and brand direction.",
      },
    },
    {
      "@type": "Question",
      name: "What do I need to send to get started?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Send your business details, preferred content structure, and domain preferences. We handle website build, launch, SSL setup, and ongoing maintenance.",
      },
    },
    {
      "@type": "Question",
      name: "How fast can my website go live?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most presentation websites go live quickly after content and launch requirements are confirmed.",
      },
    },
    {
      "@type": "Question",
      name: "Is this an automated platform or a managed service?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This is a managed service. Our engineering team handles deployment, monitoring, and ongoing maintenance.",
      },
    },
  ],
};

export default function Home() {
  return (
    <main className="w-full bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section className="fade-in relative overflow-hidden border-b border-indigo-100 bg-linear-to-b from-indigo-50 via-white to-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 hidden lg:block"
        >
          <div className="absolute inset-0 bg-radial-[at_50%_12%] from-indigo-300/25 via-transparent to-transparent" />
          <div className="absolute -top-32 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-indigo-300/25 blur-3xl" />
          <div className="absolute -top-12 -left-24 h-[460px] w-[460px] rounded-full bg-violet-300/20 blur-3xl" />
          <div className="absolute -bottom-40 -right-24 h-[620px] w-[620px] rounded-full bg-indigo-200/20 blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto flex min-h-[68vh] w-full max-w-6xl flex-col items-center justify-center px-6 py-14 text-center">
          <p className="rounded-full border border-indigo-200 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-indigo-700">
            Presentation Website Service
          </p>
          <h1
            id="hero-title"
            className="mt-5 max-w-4xl text-3xl font-bold leading-tight text-indigo-950 sm:text-4xl md:text-6xl"
          >
            We build your presentation website for your business.
          </h1>
          <p className="mt-4 max-w-3xl text-sm text-slate-600 sm:text-base">
            We build your website and keep it online with maintenance, hosting,
            and domain management in one simple monthly plan.
          </p>
          <a
            id="hero-launch-button"
            href="/start-project"
            className="mt-7 inline-flex items-center rounded-full bg-indigo-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            Start your website build
          </a>
          <p className="mt-3 text-xs font-medium text-slate-500 sm:text-sm">
            One team handles build, launch, and monthly maintenance.
          </p>

          <div className="mt-8 grid w-full max-w-4xl gap-4 text-left sm:grid-cols-3">
            <article className="group rounded-2xl border border-indigo-200 bg-white/95 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                1
              </div>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-indigo-700">
                Step 1
              </p>
              <h3 className="mt-2 text-base font-semibold text-slate-900">
                Share your business details
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Tell us about your company, goals, and preferred pages.
              </p>
            </article>
            <article className="group rounded-2xl border border-indigo-200 bg-white/95 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                2
              </div>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-indigo-700">
                Step 2
              </p>
              <h3 className="mt-2 text-base font-semibold text-slate-900">
                We build and launch your website
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                We design, build, connect domain, and publish your website.
              </p>
            </article>
            <article className="group rounded-2xl border border-indigo-200 bg-white/95 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                3
              </div>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-indigo-700">
                Step 3
              </p>
              <h3 className="mt-2 text-base font-semibold text-slate-900">
                Monthly maintenance
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Ongoing updates, hosting, monitoring, and support in one plan.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="fade-in border-b border-t border-indigo-100 bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-14">
          <h2 className="text-center text-3xl font-bold text-slate-900 sm:text-4xl">
            Why teams choose Hostera 24
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-center text-slate-600">
            Clear delivery for founders who want their presentation website built
            and managed without technical overhead.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <article className="rounded-2xl border border-indigo-100 bg-white p-6">
              <h3 className="text-lg font-semibold text-slate-900">
                Managed implementation
              </h3>
              <p className="mt-3 text-sm text-slate-700">
                We configure hosting, deployment workflow, domain integration,
                SSL, and baseline production settings.
              </p>
            </article>
            <article className="rounded-2xl border border-indigo-100 bg-white p-6">
              <h3 className="text-lg font-semibold text-slate-900">
                Structured launch workflow
              </h3>
              <p className="mt-3 text-sm text-slate-700">
                Clear intake and validation steps keep launches predictable and
                reduce last-minute deployment issues.
              </p>
            </article>
            <article className="rounded-2xl border border-indigo-100 bg-white p-6">
              <h3 className="text-lg font-semibold text-slate-900">
                Ongoing support operations
              </h3>
              <p className="mt-3 text-sm text-slate-700">
                Post-launch updates and fixes are handled through direct support
                with clear communication.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="fade-in border-b border-indigo-100 bg-indigo-50/40">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            What you get every month
          </h2>
          <p className="mt-3 max-w-3xl text-slate-600">
            A complete website service built for business owners.
          </p>

          <div className="mt-9 grid gap-5 md:grid-cols-3">
            <article className="rounded-2xl border border-indigo-200 bg-white p-6 shadow-sm">
              <span className="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-indigo-700">
                Included
              </span>
              <h3 className="mt-3 text-lg font-semibold text-slate-900">
                Website build and updates
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                We build your presentation website and handle requested updates
                so it always reflects your business.
              </p>
            </article>
            <article className="rounded-2xl border border-indigo-200 bg-white p-6 shadow-sm">
              <span className="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-indigo-700">
                Included
              </span>
              <h3 className="mt-3 text-lg font-semibold text-slate-900">
                Hosting, domain, and SSL
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                Your hosting, domain setup, and SSL security are managed by one
                team from start to finish.
              </p>
            </article>
            <article className="rounded-2xl border border-indigo-200 bg-white p-6 shadow-sm">
              <span className="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-indigo-700">
                Included
              </span>
              <h3 className="mt-3 text-lg font-semibold text-slate-900">
                Monitoring and support
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                We monitor uptime and respond quickly when you need changes or
                fixes.
              </p>
            </article>
          </div>

          <a
            href="/start-project"
            className="mt-8 inline-flex rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            Start my website service
          </a>
        </div>
      </section>

      <section className="fade-in border-b border-indigo-100 bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Operational standards
          </h2>
          <p className="mt-3 max-w-3xl text-slate-600">
            Every launch follows the same operational baseline so delivery
            quality stays consistent.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <article className="rounded-2xl border border-indigo-100 bg-white p-6">
              <h3 className="text-lg font-semibold text-slate-900">
                Deployment checklist
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                Build verification, runtime validation, and route checks before
                release.
              </p>
            </article>
            <article className="rounded-2xl border border-indigo-100 bg-white p-6">
              <h3 className="text-lg font-semibold text-slate-900">
                Security baseline
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                SSL/HTTPS setup and environment configuration aligned to
                production best practices.
              </p>
            </article>
            <article className="rounded-2xl border border-indigo-100 bg-white p-6">
              <h3 className="text-lg font-semibold text-slate-900">
                Monitoring setup
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                Launch includes core uptime and stability monitoring to reduce
                incident risk.
              </p>
            </article>
            <article className="rounded-2xl border border-indigo-100 bg-white p-6">
              <h3 className="text-lg font-semibold text-slate-900">
                Support response workflow
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                Issues and update requests are handled through a clear support
                communication process.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section
        id="pricing"
        className="fade-in scroll-mt-28 border-b border-indigo-100 bg-white"
      >
        <div className="mx-auto w-full max-w-6xl px-6 py-16 text-center">
          <h2 className="text-3xl font-bold text-indigo-950 sm:text-4xl">
            One simple presentation website plan
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            No setup fee. You only pay for maintenance, hosting, and domain.
          </p>

          <div className="mx-auto mt-10 grid w-full max-w-4xl gap-6 text-left">
            <a
              href="/start-project?plan=presentation-20-monthly"
              className="block h-full rounded-2xl border border-indigo-300 bg-white px-8 py-8 transition hover:border-indigo-500"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                  All-in-one plan
                </span>
              </div>

              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-indigo-500">
                Presentation Website Plan
              </p>
              <p className="mt-1 text-5xl font-extrabold text-indigo-950">$20</p>
              <p className="mt-1 text-slate-600">/ month</p>
              <p className="mt-3 min-h-[40px] text-sm font-semibold text-indigo-900">
                I build your presentation website and manage it every month.
              </p>

              <span className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500">
                Choose Plan - $20/mo
              </span>

              <p className="mt-4 text-sm text-slate-500">
                Maintenance, hosting, and domain included
              </p>

              <ul className="mt-6 space-y-2.5 text-sm text-slate-700">
                <li>✓ Presentation website build and launch</li>
                <li>✓ Ongoing maintenance and updates</li>
                <li>✓ Hosting setup and SSL security</li>
                <li>✓ Domain management included</li>
                <li>✓ Website monitoring</li>
                <li>✓ Direct support when needed</li>
              </ul>
            </a>
          </div>
          <a
            href="/start-project"
            className="mt-10 inline-flex rounded-full bg-indigo-600 px-8 py-3 text-base font-semibold text-white transition hover:bg-indigo-500"
          >
            Start my website project
          </a>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-sm font-semibold text-indigo-700">
            <a
              href="/website-deployment-service"
              className="underline-offset-4 hover:underline"
            >
              Website build service
            </a>
            <a
              href="/contact"
              className="underline-offset-4 hover:underline"
            >
              Contact us
            </a>
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-sm font-medium text-indigo-800">
            <a
              href="/blog/best-way-to-launch-small-business-website-in-24-hours"
              className="underline-offset-4 hover:underline"
            >
              Launch a small business website fast
            </a>
            <a
              href="/blog/website-deployment-checklist-before-you-send-files"
              className="underline-offset-4 hover:underline"
            >
              Website launch checklist
            </a>
          </div>
        </div>
      </section>

      <section className="fade-in border-b border-indigo-100 bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Selected client brands
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <div className="rounded-2xl border border-indigo-100 bg-white px-8 py-5">
              <Image
                src="/reko-packaging.svg"
                alt="Reko Packaging"
                width={240}
                height={64}
                className="h-12 w-auto object-contain"
              />
            </div>
            <div className="rounded-2xl border border-indigo-100 bg-white px-8 py-5">
              <Image
                src="/abiso-logo.svg"
                alt="Abiso"
                width={240}
                height={64}
                className="h-12 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="fade-in border-b border-indigo-100 bg-white">
        <div className="mx-auto w-full max-w-5xl px-6 py-16">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Client feedback
          </h2>
          <div className="mt-8 rounded-2xl border border-indigo-100 bg-white p-8">
            <p className="text-lg leading-relaxed text-slate-700">
              &ldquo;The launch process was structured and clear. We shared the
              files and the site went live quickly, without technical
              back-and-forth.&rdquo;
            </p>
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">
              David. H
            </p>
            <a
              href="https://www.linkedin.com/in/david-horobet-563541232/"
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex text-sm font-semibold text-slate-700 underline-offset-4 transition hover:text-slate-900 hover:underline"
            >
              View profile
            </a>
          </div>
        </div>
      </section>

      <section
        id="faq"
        className="fade-in scroll-mt-28 border-b border-indigo-100 bg-white"
      >
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">FAQ</h2>
          <p className="mt-3 max-w-3xl text-slate-600">
            Clear answers for founders launching presentation websites.
          </p>

          <div className="mt-8 space-y-4">
            <article className="rounded-xl border border-indigo-100 bg-white p-5">
              <h3 className="text-base font-semibold text-slate-900">
                Do you build the website for me?
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                Yes. We build your presentation website and handle launch,
                hosting, and maintenance.
              </p>
            </article>
            <article className="rounded-xl border border-indigo-100 bg-white p-5">
              <h3 className="text-base font-semibold text-slate-900">
                What do I need to send?
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                Send your website files or repository and, if available, your
                domain details. We guide you if anything is missing.
              </p>
            </article>
            <article className="rounded-xl border border-indigo-100 bg-white p-5">
              <h3 className="text-base font-semibold text-slate-900">
                Do you set up SSL and HTTPS?
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                Yes. SSL setup is included so your live website runs securely
                over HTTPS by default.
              </p>
            </article>
            <article className="rounded-xl border border-indigo-100 bg-white p-5">
              <h3 className="text-base font-semibold text-slate-900">
                What is included in the $20/month plan?
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                It includes monthly maintenance, hosting, domain support, and
                direct help when updates are needed.
              </p>
            </article>
            <article className="rounded-xl border border-indigo-100 bg-white p-5">
              <h3 className="text-base font-semibold text-slate-900">
                Is this an automated platform or a managed service?
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                It is a managed service. Our engineering team handles deployment,
                monitoring, and maintenance when incidents or updates happen.
              </p>
            </article>
            <article className="rounded-xl border border-indigo-100 bg-white p-5">
              <h3 className="text-base font-semibold text-slate-900">
                How fast can my site go live?
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                Most websites go live within 24 hours once files and setup
                details are confirmed.
              </p>
            </article>
          </div>

          <div className="mt-10">
            <a
              href="/start-project"
              className="inline-flex rounded-full bg-indigo-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
            >
              Start website request
            </a>
          </div>
        </div>
      </section>

      <section className="fade-in bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <div className="rounded-3xl border border-indigo-100 bg-white p-8 md:p-10">
            <p className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-indigo-900">
              Website build + maintenance
            </p>
            <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
              Ready to have your website built for you?
            </h2>
            <p className="mt-4 max-w-3xl text-slate-700">
              We handle website build, launch, domain, and maintenance so you
              can focus on your business.
            </p>
            <p className="mt-3 text-sm font-medium text-indigo-800">
              Let us be part of your team.
            </p>
            <a
              href="/start-project"
              className="mt-7 inline-flex rounded-full bg-indigo-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
            >
              Start website request
            </a>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <article className="rounded-xl border border-indigo-100 bg-white p-5">
                <h3 className="text-lg font-semibold text-slate-900">
                  Transparent pricing
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Monthly pricing is clearly stated before work begins.
                </p>
              </article>

              <article className="rounded-xl border border-indigo-100 bg-white p-5">
                <h3 className="text-lg font-semibold text-slate-900">
                  Direct support channel
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Direct access to our engineering team for maintenance and
                  incident support.
                </p>
              </article>

              <article className="rounded-xl border border-indigo-100 bg-white p-5">
                <h3 className="text-lg font-semibold text-slate-900">
                  Reliable operation
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Hosting and domain are managed properly so your site stays
                  online and stable.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>
      <ContactBubble />
    </main>
  );
}
