import Image from "next/image";
import ContactBubble from "../components/ContactBubble";
import PlanSelectLink from "../components/PlanSelectLink";
import ScrollToOrderButton from "../components/ScrollToOrderButton";
import StartOrderForm from "../components/StartOrderForm";

export default function Home() {
  return (
    <main className="w-full bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <a href="#hero-title" className="flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white">
              <Image
                src="/hosting-logo.svg"
                alt="Strelements logo"
                width={34}
                height={34}
                className="h-8 w-8"
              />
            </span>
            <span className="font-serif text-lg font-bold tracking-[0.06em] text-slate-900 sm:text-xl">
              Strelements
            </span>
          </a>
          <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-700 md:flex">
            <a href="#pricing" className="transition hover:text-slate-900">
              Pricing
            </a>
            <a href="#faq" className="transition hover:text-slate-900">
              FAQ
            </a>
            <a href="#start-your-order" className="transition hover:text-slate-900">
              Contact
            </a>
          </nav>
          <a
            href="#start-your-order"
            className="inline-flex rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            Launch My Site
          </a>
        </div>
      </header>
      <section className="relative overflow-hidden bg-linear-to-b from-slate-900 via-slate-800 to-slate-900">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 hidden lg:block"
        >
          <div className="absolute inset-0 bg-radial-[at_50%_12%] from-blue-400/20 via-transparent to-transparent" />
          <div className="absolute -top-32 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-blue-500/15 blur-3xl" />
          <div className="absolute -top-12 -left-24 h-[460px] w-[460px] rounded-full bg-sky-400/15 blur-3xl" />
          <div className="absolute -bottom-40 -right-24 h-[620px] w-[620px] rounded-full bg-indigo-500/10 blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto flex min-h-[70vh] w-full max-w-6xl flex-col items-center justify-center px-6 py-14 text-center">
        <h1
          id="hero-title"
          className="max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl"
        >
          Your website, live in 24 hours
        </h1>
        <ScrollToOrderButton
          id="hero-launch-button"
          label="Launch my website"
          className="mt-6 inline-flex items-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
        />

        <div className="mt-6 grid w-full max-w-6xl gap-6 sm:grid-cols-3">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <p className="border-b border-slate-200 px-4 py-3 text-sm font-semibold text-slate-800">
              1. Upload zip file of your website
            </p>
            <a href="#start-your-order" className="block">
              <div className="relative aspect-5/4 w-full cursor-pointer">
                <Image
                  src="/project_upload_exact_sqare.svg"
                  alt="Project upload step"
                  fill
                  className="object-contain object-center p-2"
                  priority
                />
              </div>
            </a>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <p className="border-b border-slate-200 px-4 py-3 text-sm font-semibold text-slate-800">
              2. I upload it to a server
            </p>
            <div className="relative aspect-5/4 w-full">
              <Image
                src="/steps/upload_to_server.svg"
                alt="Website deployed to a server"
                fill
                className="object-contain p-1"
              />
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <p className="border-b border-slate-200 px-4 py-3 text-sm font-semibold text-slate-800">
              3. I connect your domain name
            </p>
            <div className="relative aspect-5/4 w-full">
              <Image
                src="/steps/browser_your-brand-02.svg"
                alt="Domain name setup"
                fill
                className="object-contain p-1"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 w-full max-w-3xl rounded-2xl border border-slate-200 bg-white px-6 py-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-800 shadow-sm">
              WordPress
            </span>
            <span className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-sm font-medium text-slate-700">
              Webflow
            </span>
            <span className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-sm font-medium text-slate-700">
              Tilda
            </span>
            <span className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-sm font-medium text-slate-700">
              Figma AI
            </span>
            <span className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-sm font-medium text-slate-700">
              Lovable
            </span>
            <span className="rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-800 shadow-sm">
              Cursor
            </span>
            <span className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-sm font-medium text-slate-700">
              Claude Code
            </span>
            <span className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-sm font-medium text-slate-700">
              Divi
            </span>
            <span className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-sm font-medium text-slate-700">
              HTML
            </span>
            <span className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-sm font-medium text-slate-700">
              React
            </span>
            <span className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-sm font-medium text-slate-700">
              Others
            </span>
          </div>
        </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Presentation Video
          </h2>
          <p className="mt-3 max-w-3xl text-slate-600">
            Watch a quick overview of the hosting service, pricing, and how I
            can get your website online fast.
          </p>

          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
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
        className="scroll-mt-28 border-t border-slate-200 bg-white"
      >
        <div className="mx-auto w-full max-w-6xl px-6 py-16 text-center">
          <div className="mx-auto grid w-full max-w-4xl gap-6 text-left md:grid-cols-2">
            <PlanSelectLink
              plan="hosting-9-99"
              className="block rounded-2xl border border-slate-200 bg-white px-8 py-8 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                Hosting Plan
              </p>
              <p className="mt-2 text-5xl font-extrabold text-slate-800">
                $9.99
              </p>
              <p className="mt-1 text-slate-600">per month, simple and solid</p>
              <p className="mt-3 text-sm font-semibold text-slate-800">
                Best for landing pages and business websites
              </p>
              <span className="mt-6 inline-flex rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-500">
                Choose Hosting Plan - $9.99/mo
              </span>
            </PlanSelectLink>

            <PlanSelectLink
              plan="full-stack-19-99"
              className="block rounded-2xl border border-slate-200 bg-white px-8 py-8 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                Full Stack Plan
              </p>
              <p className="mt-2 text-5xl font-extrabold text-slate-800">
                $19.99
              </p>
              <p className="mt-1 text-slate-600">per month, full power</p>
              <p className="mt-3 text-sm font-semibold text-slate-800">
                Great for web apps with frontend, backend, and database
              </p>
              <span className="mt-6 inline-flex rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-500">
                Choose Full Stack - $19.99/mo
              </span>
            </PlanSelectLink>
          </div>
          <a
            href="#start-your-order"
            className="mt-10 inline-flex rounded-full bg-blue-600 px-8 py-3 text-base font-semibold text-white transition hover:bg-blue-500"
          >
            Let&apos;s Launch Your Site
          </a>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-6 py-16 md:grid-cols-3">
          <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Done-For-You Setup</h2>
            <p className="mt-3 text-slate-600">
              I handle setup and launch from start to finish, so you avoid the
              technical maze.
            </p>
          </article>
          <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Reliable Uptime</h2>
            <p className="mt-3 text-slate-600">
              Stable hosting with proactive monitoring keeps your site available
              for visitors.
            </p>
          </article>
          <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
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
        className="scroll-mt-28 border-t border-slate-200 bg-white"
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

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-5xl px-6 py-16">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            What clients say
          </h2>
          <div className="mt-8 rounded-2xl border border-slate-300 bg-white p-8 shadow-sm">
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

      <section id="faq" className="scroll-mt-28 border-t border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">FAQ</h2>
          <p className="mt-3 max-w-3xl text-slate-600">
            Clear answers for non-technical business owners.
          </p>

          <div className="mt-8 space-y-4">
            <article className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="text-base font-semibold text-slate-900">
                What is hosting?
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                Hosting is internet space where your website lives so people can
                access it online 24/7.
              </p>
            </article>
            <article className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="text-base font-semibold text-slate-900">
                Do I need a domain name?
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                Yes. A domain is your website address (like yourbusiness.com). I
                can help you pick and connect it.
              </p>
            </article>
            <article className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="text-base font-semibold text-slate-900">
                What is SSL / HTTPS?
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                It is the security lock shown in browsers. I set up SSL so your
                website opens with HTTPS by default.
              </p>
            </article>
            <article className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="text-base font-semibold text-slate-900">
                I built my website with AI. Can you host it?
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                Yes. Send your files and I handle deployment, domain connection,
                and launch.
              </p>
            </article>
            <article className="rounded-xl border border-slate-200 bg-white p-5">
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
              className="inline-flex rounded-full bg-blue-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Start Your Order Now
            </a>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 md:p-10 shadow-sm">
            <p className="inline-flex rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-slate-800">
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
              <article className="rounded-xl border border-slate-300 bg-white p-5">
                <h3 className="text-lg font-semibold text-slate-900">
                  No hidden charges
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Monthly pricing is clear before we start.
                </p>
              </article>

              <article className="rounded-xl border border-slate-300 bg-white p-5">
                <h3 className="text-lg font-semibold text-slate-900">
                  Real human support
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  You talk directly to me when you need help.
                </p>
              </article>

              <article className="rounded-xl border border-slate-300 bg-white p-5">
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
      <footer className="border-t border-slate-200 bg-slate-950">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 pb-20 pt-10 text-sm text-slate-300 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Strelements. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#faq" className="transition hover:text-white">
              FAQ
            </a>
            <a
              href="mailto:hello@strelements.com"
              className="transition hover:text-white"
            >
              hello@strelements.com
            </a>
            <a href="#hero-title" className="transition hover:text-white">
              Back to top
            </a>
          </div>
        </div>
      </footer>
      <ContactBubble />
    </main>
  );
}
