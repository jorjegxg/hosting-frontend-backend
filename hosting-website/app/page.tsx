import Image from "next/image";
import ContactBubble from "../components/ContactBubble";
import FloatingStartButton from "../components/FloatingStartButton";

export default function Home() {
  return (
    <main className="relative w-full overflow-hidden bg-linear-to-b from-slate-100 via-blue-100/50 to-slate-50 text-slate-800">
      <FloatingStartButton />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-radial-[at_50%_12%] from-sky-200/35 via-transparent to-transparent" />
        <div className="absolute -top-32 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-slate-300/30 blur-3xl" />
        <div className="absolute -top-12 -left-24 h-[460px] w-[460px] rounded-full bg-sky-300/30 blur-3xl" />
        <div className="absolute -bottom-40 -right-24 h-[620px] w-[620px] rounded-full bg-blue-400/25 blur-3xl" />
      </div>
      <section className="relative z-10 mx-auto flex min-h-[70vh] w-full max-w-6xl flex-col items-center justify-center px-6 py-14 text-center">
        <h1 className="max-w-3xl text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
          I get your website live online, ready for customers.
        </h1>

        <div className="mt-6 grid w-full max-w-6xl gap-6 sm:grid-cols-3">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white/70 shadow-sm backdrop-blur-sm">
            <p className="border-b border-slate-200 px-4 py-3 text-sm font-semibold text-slate-800">
              1. Your website on your computer
            </p>
            <div className="relative aspect-5/4 w-full">
              <Image
                src="/steps/browser_localhost_3000-02.svg"
                alt="Website running on your computer"
                fill
                className="object-contain p-1"
                priority
              />
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white/70 shadow-sm backdrop-blur-sm">
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

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white/70 shadow-sm backdrop-blur-sm">
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
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 text-center">
          <div className="mx-auto grid w-full max-w-4xl gap-6 text-left md:grid-cols-2">
            <a
              href="#start-your-order"
              className="block rounded-2xl border-2 border-slate-300 bg-white px-8 py-8 shadow-md shadow-slate-200 transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                Hosting Plan
              </p>
              <p className="mt-2 text-5xl font-extrabold text-slate-800">$9.99</p>
              <p className="mt-1 text-slate-600">per month, simple and solid</p>
              <p className="mt-3 text-sm font-semibold text-slate-800">
                Best for landing pages and business websites
              </p>
              <span className="mt-6 inline-flex rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
                Choose Hosting Plan - $9.99/mo
              </span>
            </a>

            <a
              href="#start-your-order"
              className="block rounded-2xl border-2 border-slate-300 bg-white px-8 py-8 shadow-md shadow-slate-200 transition hover:-translate-y-0.5 hover:shadow-lg"
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
              <span className="mt-6 inline-flex rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
                Choose Full Stack - $19.99/mo
              </span>
            </a>
          </div>
          <a
            href="#start-your-order"
            className="mt-10 inline-flex rounded-full bg-slate-900 px-8 py-3 text-base font-semibold text-white transition hover:bg-slate-800"
          >
            Let&apos;s Launch Your Site
          </a>
          <p className="mx-auto mt-6 max-w-3xl text-base font-medium text-slate-700 sm:text-lg">
            From localhost to{" "}
            <span className="whitespace-nowrap rounded-md bg-slate-200 px-2 py-0.5 font-mono text-sm text-slate-900 sm:text-base">
              https://your-brand.site
            </span>
            — no tech talk required.
          </p>
          <p className="mx-auto mt-3 max-w-3xl text-base text-slate-600 sm:text-lg">
            Freelancer service. Your website will be online in 1-2 days with a
            domain like brand.site.
          </p>
          <div className="mx-auto mt-6 w-full max-w-3xl rounded-2xl border border-slate-200 bg-white px-6 py-5 text-left shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-700">
              What I handle for you
            </p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <p className="text-sm text-slate-700">- Domain name setup</p>
              <p className="text-sm text-slate-700">- SSL certificate (HTTPS)</p>
              <p className="text-sm text-slate-700">- Server and hosting setup</p>
              <p className="text-sm text-slate-700">- Website deployment</p>
              <p className="text-sm text-slate-700">- DNS configuration</p>
              <p className="text-sm text-slate-700">- Launch support</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50/80">
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

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Your Launch Journey
          </h2>
          <p className="mt-3 max-w-3xl text-slate-600">
            No technical knowledge needed. I handle each step clearly and keep
            you updated from first upload to launch day.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <article className="relative rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-700">
                  01
                </p>
                <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
                  PREPARE
                </span>
              </div>
              <h3 className="mt-4 text-xl font-semibold">
                Prepare Your Website
              </h3>
              <p className="mt-3 text-slate-600">
                You bring your website, and I prepare it properly to connect to
                your domain and launch online smoothly.
              </p>
              <p className="mt-4 text-sm text-slate-600">
                Result: your site is ready
              </p>
            </article>

            <article className="relative rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-700">
                  02
                </p>
                <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
                  DOMAIN
                </span>
              </div>
              <h3 className="mt-4 text-xl font-semibold">Set Up Your Domain</h3>
              <p className="mt-3 text-slate-600">
                I help you choose and register the right domain for your brand,
                then connect it to your website correctly.
              </p>
              <p className="mt-4 text-sm text-slate-600">
                Result: your name points to your site
              </p>
            </article>

            <article className="relative rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-700">
                  03
                </p>
                <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
                  HOSTING
                </span>
              </div>
              <h3 className="mt-4 text-xl font-semibold">
                Host It On a Server
              </h3>
              <p className="mt-3 text-slate-600">
                I deploy your website on a reliable server so people can open it
                online anytime, from anywhere.
              </p>
              <p className="mt-4 text-sm text-slate-600">
                Result: visible to everyone
              </p>
            </article>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-600">
            <span className="rounded-full border border-slate-300 bg-white px-3 py-1">
              Website Ready
            </span>
            <span className="text-slate-400">•</span>
            <span className="rounded-full border border-slate-300 bg-white px-3 py-1">
              Domain Setup
            </span>
            <span className="text-slate-400">•</span>
            <span className="rounded-full border border-slate-300 bg-white px-3 py-1">
              Live Hosting
            </span>
          </div>

          <div className="mt-8 rounded-2xl border-2 border-slate-300 bg-slate-100 p-5 text-slate-900">
            Pick your plan, send your project, and I handle the full setup so
            your website goes live fast with clear support.
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
        id="start-your-order"
        className="border-t border-slate-200 bg-white"
      >
        <div className="mx-auto w-full max-w-4xl px-6 py-16">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Start Your Order
          </h2>
          <p className="mt-3 text-slate-600">
            Share your details and project files. I will reach out and get your
            site live with a clean setup.
          </p>

          <form className="mt-8 space-y-6 rounded-2xl border border-slate-300 bg-slate-50 p-6 shadow-sm">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  Name
                </span>
                <input
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-slate-500"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  Email
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-slate-500"
                />
              </label>
            </div>

            <fieldset className="rounded-xl border border-slate-300 bg-white p-4">
              <legend className="px-2 text-sm font-semibold text-slate-700">
                Project Upload (same block)
              </legend>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">
                  ZIP file or project folder
                </span>
                <input
                  type="file"
                  name="projectUpload"
                  accept=".zip,application/zip"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-700 file:mr-4 file:rounded-md file:border-0 file:bg-slate-800 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white"
                />
              </label>
            </fieldset>

            <div className="grid gap-4">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">
                  Preferred domain name
                </span>
                <input
                  type="text"
                  name="preferredDomainName"
                  placeholder="examplebrand"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-slate-500"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">
                  Message / Project details
                </span>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Share your goals, required features, and a GitHub link (or other project link)."
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-slate-500"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">
                  Backup domain ideas (optional)
                </span>
                <textarea
                  name="backupDomainIdeas"
                  rows={3}
                  placeholder="examplebrandonline, getexamplebrand, myexamplebrand"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-slate-500"
                />
              </label>
            </div>

            <fieldset className="rounded-xl border border-slate-300 bg-white p-4">
              <legend className="px-2 text-sm font-semibold text-slate-700">
                Choose payment plan
              </legend>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-300 bg-slate-50 p-3 transition hover:border-slate-500">
                  <input
                    type="radio"
                    name="paymentPlan"
                    value="hosting-9-99"
                    required
                    className="mt-1 h-4 w-4 accent-slate-700"
                  />
                  <span>
                    <span className="block text-sm font-semibold text-slate-800">
                      Hosting Plan - $9.99/mo
                    </span>
                    <span className="block text-xs text-slate-600">
                      Ideal for landing pages and business sites.
                    </span>
                  </span>
                </label>

                <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-300 bg-slate-50 p-3 transition hover:border-slate-500">
                  <input
                    type="radio"
                    name="paymentPlan"
                    value="full-stack-19-99"
                    required
                    className="mt-1 h-4 w-4 accent-slate-700"
                  />
                  <span>
                    <span className="block text-sm font-semibold text-slate-800">
                      Full Stack Plan - $19.99/mo
                    </span>
                    <span className="block text-xs text-slate-600">
                      Best for web apps with frontend, backend, and database.
                    </span>
                  </span>
                </label>
              </div>
            </fieldset>

            <button
              type="submit"
              className="inline-flex rounded-full bg-slate-900 px-7 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Send Order
            </button>
          </form>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <div className="rounded-3xl border-2 border-slate-300 bg-slate-100 p-8 md:p-10">
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
              Business: LUȚA D. L. GHEORGHE PERSOANĂ FIZICĂ AUTORIZATĂ
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
      <ContactBubble />
    </main>
  );
}
