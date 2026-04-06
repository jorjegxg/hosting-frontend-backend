import type { Metadata } from "next";
import Image from "next/image";
import ContactBubble from "../components/ContactBubble";
import PlanSelectLink from "../components/PlanSelectLink";
import ScrollToOrderButton from "../components/ScrollToOrderButton";
import StartOrderForm from "../components/StartOrderForm";

export const metadata: Metadata = {
  title: "AI Website Hosting for Sites Built with AI Tools",
  description:
    "AI website hosting and deployment service for websites built with Claude Code, Cursor, Lovable, and Webflow.",
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
  serviceType: "AI Website Hosting and Deployment Service",
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
      name: "AI Website Hosting Plan",
      price: "9.99",
      priceCurrency: "USD",
    },
    {
      "@type": "Offer",
      name: "AI Full-Stack Hosting Plan",
      price: "19.99",
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
      name: "Can you host websites built with AI tools?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We host AI-built websites created with Lovable, Cursor, Claude Code, Webflow exports, and custom React/HTML projects.",
      },
    },
    {
      "@type": "Question",
      name: "What do I need to send to get started?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Send your project files or repository plus domain details if available. We handle AI website deployment, SSL setup, and launch.",
      },
    },
    {
      "@type": "Question",
      name: "How fast can my AI-built website go live?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most AI-built websites go live within 24 hours after files and launch requirements are confirmed.",
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
            Managed Hosting Platform
          </p>
          <h1
            id="hero-title"
            className="mt-5 max-w-4xl text-3xl font-bold leading-tight text-indigo-950 sm:text-4xl md:text-6xl"
          >
            Managed hosting and deployment for websites built with AI tools
          </h1>
          <p className="mt-4 max-w-3xl text-sm text-slate-600 sm:text-base">
            Built your website with Lovable, Cursor, Claude Code, or Webflow
            export? We handle deployment, domain setup, SSL, and launch support.
          </p>
          <ScrollToOrderButton
            id="hero-launch-button"
            label="Start managed launch"
            className="mt-7 inline-flex items-center rounded-full bg-indigo-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          />
          <p className="mt-3 text-xs font-medium text-slate-500 sm:text-sm">
            Let us be part of your team for launch and maintenance.
          </p>

          <div className="group mt-8 flex w-full max-w-4xl flex-col items-stretch gap-4 sm:flex-row sm:items-stretch sm:gap-3">
            <div className="min-w-0 flex-1 overflow-hidden rounded-3xl border border-indigo-100 bg-white transition-shadow duration-300 group-hover:shadow-md">
              <p className="border-b border-indigo-100 px-4 py-3 text-sm font-semibold text-indigo-900">
                1. Submit project files and requirements
              </p>
              <a href="#start-your-order" className="block">
                <div className="relative aspect-5/4 w-full cursor-pointer">
                  <Image
                    src="/steps/browser_localhost_3000-02.svg"
                    alt="Browser showing local development preview"
                    fill
                    className="object-contain object-center p-2"
                    priority
                  />
                </div>
              </a>
            </div>

            <div
              className="flex shrink-0 items-center justify-center py-1 text-indigo-500 sm:w-16 sm:py-0"
              aria-hidden="true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-9 w-9 rotate-90 text-indigo-500 transition-transform duration-300 ease-out group-hover:translate-y-1 sm:rotate-0 sm:group-hover:translate-x-1 sm:group-hover:translate-y-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </div>

            <div className="min-w-0 flex-1 overflow-hidden rounded-3xl border border-indigo-100 bg-white transition-shadow duration-300 group-hover:shadow-md">
              <p className="border-b border-indigo-100 px-4 py-3 text-sm font-semibold text-indigo-900">
                2. Deployment, security checks, and launch
              </p>
              <a href="#start-your-order" className="block">
                <div className="relative aspect-5/4 w-full cursor-pointer">
                  <Image
                    src="/steps/browser_your-brand-02.svg"
                    alt="Domain name setup"
                    fill
                    className="object-contain p-1"
                  />
                </div>
              </a>
            </div>
          </div>

          <div className="mt-8 w-full max-w-3xl rounded-2xl border border-indigo-100 bg-white px-6 py-6">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="rounded-full border border-indigo-200 bg-white px-3 py-1 text-sm font-medium text-indigo-900/80">
                Lovable
              </span>
              <span className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-900">
                Cursor
              </span>
              <span className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-900">
                Claude Code
              </span>
              <span className="rounded-full border border-indigo-200 bg-white px-3 py-1 text-sm font-medium text-indigo-900/80">
                Webflow
              </span>
              <span className="rounded-full border border-indigo-200 bg-white px-3 py-1 text-sm font-medium text-indigo-900/80">
                React
              </span>
              <span className="rounded-full border border-indigo-200 bg-white px-3 py-1 text-sm font-medium text-indigo-900/80">
                Next.js
              </span>
              <span className="rounded-full border border-indigo-200 bg-white px-3 py-1 text-sm font-medium text-indigo-900/80">
                Static HTML
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="fade-in border-b border-t border-indigo-100 bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-14">
          <h2 className="text-center text-3xl font-bold text-slate-900 sm:text-4xl">
            Why teams choose Hostera 24
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-center text-slate-600">
            Managed delivery for teams that build quickly with AI and need a
            reliable production handoff without infrastructure overhead.
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
            Delivery workflow
          </h2>
          <p className="mt-3 max-w-3xl text-slate-600">
            A clear process designed for founders and product teams.
          </p>

          <div className="mt-9 grid gap-5 md:grid-cols-3">
            <article className="relative rounded-2xl border border-indigo-200 bg-white p-6 shadow-sm">
              <span className="inline-flex rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-white">
                Step 1
              </span>
              <h3 className="mt-3 text-lg font-semibold text-slate-900">
                Intake and scope
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                Share your repository/files and launch requirements, including
                domain and environment details.
              </p>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-3 top-1/2 hidden h-0.5 w-6 -translate-y-1/2 bg-indigo-300 md:block"
              />
            </article>
            <article className="relative rounded-2xl border border-indigo-200 bg-white p-6 shadow-sm">
              <span className="inline-flex rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-white">
                Step 2
              </span>
              <h3 className="mt-3 text-lg font-semibold text-slate-900">
                Deployment preparation
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                We deploy, connect infrastructure, activate SSL, and run
                pre-launch checks.
              </p>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-3 top-1/2 hidden h-0.5 w-6 -translate-y-1/2 bg-indigo-300 md:block"
              />
            </article>
            <article className="rounded-2xl border border-indigo-200 bg-white p-6 shadow-sm">
              <span className="inline-flex rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-white">
                Step 3
              </span>
              <h3 className="mt-3 text-lg font-semibold text-slate-900">
                Launch and support
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                Your website is released with monitoring and ongoing support for
                updates and fixes.
              </p>
            </article>
          </div>

          <a
            href="#start-your-order"
            className="mt-8 inline-flex rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            Start your launch workflow
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
            Choose the right AI website hosting plan
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Pick the plan that matches your AI-built website complexity.
          </p>

          <div className="mx-auto mt-10 grid w-full max-w-6xl gap-6 text-left md:grid-cols-2">
            <PlanSelectLink
              plan="hosting-9-99"
              className="block h-full rounded-2xl border border-indigo-300 bg-white px-8 py-8 transition hover:border-indigo-500"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                  Reliable Choice
                </span>
                <span className="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                  33% OFF
                </span>
              </div>

              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-indigo-500">
                Hosting Plan
              </p>
              <p className="mt-3 text-sm text-slate-500 line-through">$14.99</p>
              <p className="mt-1 text-5xl font-extrabold text-indigo-950">
                $9.99
              </p>
              <p className="mt-1 text-slate-600">/ month</p>
              <p className="mt-3 min-h-[40px] text-sm font-semibold text-indigo-900">
                Best for AI-generated landing pages and business websites.
              </p>

              <span className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500">
                Choose Hosting Plan - $9.99/mo
              </span>

              <p className="mt-4 text-sm text-slate-500">
                30-day support included
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Domain included (.site or .online or .store)
              </p>

              <ul className="mt-6 space-y-2.5 text-sm text-slate-700">
                <li>✓ Fast deployment and SSL setup</li>
                <li>✓ Domain connection done for you</li>
                <li>✓ Ongoing maintenance and updates</li>
                <li>✓ Website monitoring</li>
                <li>✓ Direct support when needed</li>
              </ul>
            </PlanSelectLink>

            <PlanSelectLink
              plan="full-stack-19-99"
              className="block h-full rounded-2xl border-2 border-indigo-500 bg-white px-8 py-8 transition hover:border-indigo-600"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
                  Most Popular
                </span>
                <span className="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                  33% OFF
                </span>
              </div>

              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-indigo-500">
                Full Stack Plan
              </p>
              <p className="mt-3 text-sm text-slate-500 line-through">$29.99</p>
              <p className="mt-1 text-5xl font-extrabold text-indigo-950">
                $19.99
              </p>
              <p className="mt-1 text-slate-600">/ month</p>
              <p className="mt-3 min-h-[40px] text-sm font-semibold text-indigo-900">
                Great for apps with frontend, backend, APIs, and database.
              </p>

              <span className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500">
                Choose Full Stack - $19.99/mo
              </span>

              <p className="mt-4 text-sm text-slate-500">
                Priority support included
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Domain included (.site or .online or .store)
              </p>

              <ul className="mt-6 space-y-2.5 text-sm text-slate-700">
                <li>✓ Frontend + backend deployment</li>
                <li>✓ Database provisioning and config</li>
                <li>✓ Environment/security baseline setup</li>
                <li>✓ Performance and uptime checks</li>
                <li>✓ Ongoing maintenance and updates</li>
                <li>✓ Website monitoring</li>
                <li>✓ Faster support response</li>
              </ul>
            </PlanSelectLink>
          </div>
          <a
            href="#start-your-order"
            className="mt-10 inline-flex rounded-full bg-indigo-600 px-8 py-3 text-base font-semibold text-white transition hover:bg-indigo-500"
          >
            Launch my AI-built site
          </a>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-sm font-semibold text-indigo-700">
            <a
              href="/ai-website-hosting"
              className="underline-offset-4 hover:underline"
            >
              AI website hosting
            </a>
            <a
              href="/website-deployment-service"
              className="underline-offset-4 hover:underline"
            >
              Website deployment service
            </a>
            <a
              href="/full-stack-hosting"
              className="underline-offset-4 hover:underline"
            >
              Full stack hosting
            </a>
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-sm font-medium text-indigo-800">
            <a
              href="/blog/how-to-host-ai-generated-website-without-coding"
              className="underline-offset-4 hover:underline"
            >
              How to host an AI-generated website
            </a>
            <a
              href="/blog/website-deployment-checklist-before-you-send-files"
              className="underline-offset-4 hover:underline"
            >
              AI website deployment checklist
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

      <section
        id="start-your-order"
        className="fade-in scroll-mt-28 border-b border-indigo-100 bg-white"
      >
        <div className="mx-auto w-full max-w-4xl px-6 py-16">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Start your AI website launch
          </h2>
          <p className="mt-3 text-slate-600">
            Share your details and project files. We will follow up quickly and
            move your website to a reliable live environment.
          </p>

          <StartOrderForm />
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
            Clear answers for founders launching AI-generated websites.
          </p>

          <div className="mt-8 space-y-4">
            <article className="rounded-xl border border-indigo-100 bg-white p-5">
              <h3 className="text-base font-semibold text-slate-900">
                Can you host websites built with AI tools?
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                Yes. We host websites built with Lovable, Cursor, Claude Code,
                and other tools when you can provide the project files.
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
                Can you host full-stack apps too?
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                Yes. We support frontend + backend + database projects with the
                Full Stack plan.
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
              href="#start-your-order"
              className="inline-flex rounded-full bg-indigo-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
            >
            Start launch request
            </a>
          </div>
        </div>
      </section>

      <section className="fade-in bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <div className="rounded-3xl border border-indigo-100 bg-white p-8 md:p-10">
            <p className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-indigo-900">
              Managed launch
            </p>
            <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
              Ready for a structured production launch?
            </h2>
            <p className="mt-4 max-w-3xl text-slate-700">
              Get deployment, domain setup, security baseline, and support from
              one team responsible for delivery.
            </p>
            <p className="mt-3 text-sm font-medium text-indigo-800">
              Let us be part of your team.
            </p>
            <a
              href="#start-your-order"
              className="mt-7 inline-flex rounded-full bg-indigo-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
            >
              Start launch request
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
