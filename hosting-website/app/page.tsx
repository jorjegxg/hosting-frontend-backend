import Image from "next/image";
import ContactBubble from "../components/ContactBubble";
import PlanSelectLink from "../components/PlanSelectLink";
import ScrollToOrderButton from "../components/ScrollToOrderButton";
import StartOrderForm from "../components/StartOrderForm";

export default function Home() {
  return (
    <main className="w-full bg-white text-slate-900">
      <section className="fade-in relative overflow-hidden bg-linear-to-b from-indigo-50 via-white to-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 hidden lg:block"
        >
          <div className="absolute inset-0 bg-radial-[at_50%_12%] from-indigo-300/25 via-transparent to-transparent" />
          <div className="absolute -top-32 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-indigo-300/25 blur-3xl" />
          <div className="absolute -top-12 -left-24 h-[460px] w-[460px] rounded-full bg-violet-300/20 blur-3xl" />
          <div className="absolute -bottom-40 -right-24 h-[620px] w-[620px] rounded-full bg-indigo-200/20 blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto flex min-h-[70vh] w-full max-w-6xl flex-col items-center justify-center px-6 py-14 text-center">
        <h1
          id="hero-title"
          className="max-w-3xl text-3xl font-bold leading-tight text-indigo-950 sm:text-4xl md:text-6xl"
        >
          Your website, live in 24 hours
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
          No tech, no stress. Just send your website — we&apos;ll make it live.
        </p>
        <ScrollToOrderButton
          id="hero-launch-button"
          label="Launch my website"
          className="mt-6 inline-flex items-center rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        />

        <div className="group mt-6 flex w-full max-w-4xl flex-col items-stretch gap-4 sm:flex-row sm:items-stretch sm:gap-3">
          <div className="min-w-0 flex-1 overflow-hidden rounded-3xl border border-indigo-100 bg-white transition-shadow duration-300 group-hover:shadow-md">
            <p className="border-b border-indigo-100 px-4 py-3 text-sm font-semibold text-indigo-900">
              1. Preview your site locally (e.g. localhost:3000)
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
              2. I connect your domain name
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
            <span className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-900">
              WordPress
            </span>
            <span className="rounded-full border border-indigo-200 bg-white px-3 py-1 text-sm font-medium text-indigo-900/80">
              Webflow
            </span>
            <span className="rounded-full border border-indigo-200 bg-white px-3 py-1 text-sm font-medium text-indigo-900/80">
              Tilda
            </span>
            <span className="rounded-full border border-indigo-200 bg-white px-3 py-1 text-sm font-medium text-indigo-900/80">
              Figma AI
            </span>
            <span className="rounded-full border border-indigo-200 bg-white px-3 py-1 text-sm font-medium text-indigo-900/80">
              Lovable
            </span>
            <span className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-900">
              Cursor
            </span>
            <span className="rounded-full border border-indigo-200 bg-white px-3 py-1 text-sm font-medium text-indigo-900/80">
              Claude Code
            </span>
            <span className="rounded-full border border-indigo-200 bg-white px-3 py-1 text-sm font-medium text-indigo-900/80">
              Divi
            </span>
            <span className="rounded-full border border-indigo-200 bg-white px-3 py-1 text-sm font-medium text-indigo-900/80">
              HTML
            </span>
            <span className="rounded-full border border-indigo-200 bg-white px-3 py-1 text-sm font-medium text-indigo-900/80">
              React
            </span>
            <span className="rounded-full border border-indigo-200 bg-white px-3 py-1 text-sm font-medium text-indigo-900/80">
              Others
            </span>
          </div>
        </div>
        </div>
      </section>

      <section className="fade-in border-t border-indigo-100 bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Presentation Video
          </h2>
          <p className="mt-3 max-w-3xl text-slate-600">
            Watch a quick overview of the hosting service, pricing, and how I
            can get your website online fast.
          </p>

          <div className="mt-8 overflow-hidden rounded-2xl border border-indigo-100 bg-white">
            <video
              controls
              preload="metadata"
              className="h-auto w-full"
              poster="https://dummyimage.com/1280x720/0f172a/94a3b8&text=Presentation+Video"
            >
              <source
                src="https://www.w3schools.com/html/mov_bbb.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      <section
        id="pricing"
        className="fade-in scroll-mt-28 border-t border-indigo-100 bg-white"
      >
        <div className="mx-auto w-full max-w-6xl px-6 py-16 text-center">
          <h2 className="text-3xl font-bold text-indigo-950 sm:text-4xl">
            Simple plans for every stage
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Start small or choose full-stack support. Both plans include direct
            communication and clean setup.
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
              <p className="mt-1 text-5xl font-extrabold text-indigo-950">$9.99</p>
              <p className="mt-1 text-slate-600">/ month</p>
              <p className="mt-3 min-h-[40px] text-sm font-semibold text-indigo-900">
                Best for landing pages and business websites.
              </p>

              <span className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500">
                Choose Hosting Plan - $9.99/mo
              </span>

              <p className="mt-4 text-sm text-slate-500">30-day support included</p>
              <p className="mt-1 text-sm text-slate-500">
                Domain included (.site or .online or .store)
              </p>

              <ul className="mt-6 space-y-2.5 text-sm text-slate-700">
                <li>✓ Fast deployment and SSL setup</li>
                <li>✓ Domain connection done for you</li>
                <li>✓ Ongoing maintenance &amp; updates</li>
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
              <p className="mt-1 text-5xl font-extrabold text-indigo-950">$19.99</p>
              <p className="mt-1 text-slate-600">/ month</p>
              <p className="mt-3 min-h-[40px] text-sm font-semibold text-indigo-900">
                Great for apps with frontend, backend, and database.
              </p>

              <span className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500">
                Choose Full Stack - $19.99/mo
              </span>

              <p className="mt-4 text-sm text-slate-500">Priority support included</p>
              <p className="mt-1 text-sm text-slate-500">
                Domain included (.site or .online or .store)
              </p>

              <ul className="mt-6 space-y-2.5 text-sm text-slate-700">
                <li>✓ Frontend + backend deployment</li>
                <li>✓ Database provisioning and config</li>
                <li>✓ Environment/security baseline setup</li>
                <li>✓ Performance and uptime checks</li>
                <li>✓ Ongoing maintenance &amp; updates</li>
                <li>✓ Website monitoring</li>
                <li>✓ Faster support response</li>
              </ul>
            </PlanSelectLink>
          </div>
          <a
            href="#start-your-order"
            className="mt-10 inline-flex rounded-full bg-indigo-600 px-8 py-3 text-base font-semibold text-white transition hover:bg-indigo-500"
          >
            Let&apos;s Launch Your Site
          </a>
        </div>
      </section>

      <section className="fade-in border-t border-indigo-100 bg-white">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-6 py-16 md:grid-cols-3">
          <article className="rounded-xl border border-indigo-100 bg-white p-6">
            <h2 className="text-xl font-semibold">Done-For-You Setup</h2>
            <p className="mt-3 text-slate-600">
              I handle setup and launch from start to finish, so you avoid the
              technical maze.
            </p>
          </article>
          <article className="rounded-xl border border-indigo-100 bg-white p-6">
            <h2 className="text-xl font-semibold">Reliable Uptime</h2>
            <p className="mt-3 text-slate-600">
              Stable hosting with proactive monitoring keeps your site available
              for visitors.
            </p>
          </article>
          <article className="rounded-xl border border-indigo-100 bg-white p-6">
            <h2 className="text-xl font-semibold">Real Human Support</h2>
            <p className="mt-3 text-slate-600">
              Need changes or help? You talk directly to me and get a quick
              response.
            </p>
          </article>
        </div>
      </section>

      <section
        id="start-your-order"
        className="fade-in scroll-mt-28 border-t border-indigo-100 bg-white"
      >
        <div className="mx-auto w-full max-w-4xl px-6 py-16">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Start Your Order
          </h2>
          <p className="mt-3 text-slate-600">
            Share your details and project files. I will reach out and get your
            site live with a clean setup.
          </p>

          <StartOrderForm />
        </div>
      </section>

      <section className="fade-in border-t border-indigo-100 bg-white">
        <div className="mx-auto w-full max-w-5xl px-6 py-16">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            What clients say
          </h2>
          <div className="mt-8 rounded-2xl border border-indigo-100 bg-white p-8">
            <p className="text-lg leading-relaxed text-slate-700">
              &ldquo;I thought hosting a website would be complicated. It
              wasn&apos;t. I just sent my files and it was online the next
              day.&rdquo;
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
              View LinkedIn Profile
            </a>
          </div>
        </div>
      </section>

      <section id="faq" className="fade-in scroll-mt-28 border-t border-indigo-100 bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">FAQ</h2>
          <p className="mt-3 max-w-3xl text-slate-600">
            Clear answers for non-technical business owners.
          </p>

          <div className="mt-8 space-y-4">
            <article className="rounded-xl border border-indigo-100 bg-white p-5">
              <h3 className="text-base font-semibold text-slate-900">
                What is hosting?
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                Hosting is internet space where your website lives so people can
                access it online 24/7.
              </p>
            </article>
            <article className="rounded-xl border border-indigo-100 bg-white p-5">
              <h3 className="text-base font-semibold text-slate-900">
                Do I need a domain name?
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                Yes. A domain is your website address (like yourbusiness.com). I
                can help you pick and connect it.
              </p>
            </article>
            <article className="rounded-xl border border-indigo-100 bg-white p-5">
              <h3 className="text-base font-semibold text-slate-900">
                What is SSL / HTTPS?
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                It is the security lock shown in browsers. I set up SSL so your
                website opens with HTTPS by default.
              </p>
            </article>
            <article className="rounded-xl border border-indigo-100 bg-white p-5">
              <h3 className="text-base font-semibold text-slate-900">
                What is a website with backend and db?
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                It is a full-stack website: the frontend is what people see, the
                backend handles logic and requests, and the database stores data
                like users, orders, or content.
              </p>
            </article>
            <article className="rounded-xl border border-indigo-100 bg-white p-5">
              <h3 className="text-base font-semibold text-slate-900">
                I built my website with AI. Can you host it?
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                Yes. Send your files and I handle deployment, domain connection,
                and launch.
              </p>
            </article>
            <article className="rounded-xl border border-indigo-100 bg-white p-5">
              <h3 className="text-base font-semibold text-slate-900">
                How fast can my site go live?
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                Most websites are live within 24 hours after I receive your
                files and domain details.
              </p>
            </article>
          </div>

          <div className="mt-10">
            <a
              href="#start-your-order"
              className="inline-flex rounded-full bg-indigo-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
            >
              Start Your Order Now
            </a>
          </div>
        </div>
      </section>

      <section className="fade-in border-t border-indigo-100 bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <div className="rounded-3xl border border-indigo-100 bg-white p-8 md:p-10">
            <p className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-indigo-900">
              Trust & Transparency
            </p>
            <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
              Too good to be true?
            </h2>
            <p className="mt-4 max-w-3xl text-slate-700">
              It is a fair monthly service, not a hidden-fee offer. You get
              direct support, clear communication, domain setup, and reliable
              hosting from one person.
            </p>
            <p className="mt-3 text-sm font-medium text-slate-700">
              Brand: Strelements
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <article className="rounded-xl border border-indigo-100 bg-white p-5">
                <h3 className="text-lg font-semibold text-slate-900">
                  No hidden charges
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Monthly pricing is clear before we start.
                </p>
              </article>

              <article className="rounded-xl border border-indigo-100 bg-white p-5">
                <h3 className="text-lg font-semibold text-slate-900">
                  Real human support
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  You talk directly to me when you need help.
                </p>
              </article>

              <article className="rounded-xl border border-indigo-100 bg-white p-5">
                <h3 className="text-lg font-semibold text-slate-900">
                  Reliable service
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Your domain and hosting are managed properly so your website
                  stays online.
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
