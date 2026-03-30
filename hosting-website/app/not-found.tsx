import Link from "next/link";

export default function NotFound() {
  return (
    <main className="w-full bg-slate-50 text-slate-900">
      <section className="mx-auto flex min-h-[70vh] w-full max-w-4xl items-center px-6 py-16">
        <div className="w-full rounded-3xl border border-indigo-100 bg-white p-8 shadow-sm sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-indigo-700">
            404 Error
          </p>
          <h1 className="mt-3 text-3xl font-bold text-indigo-950 sm:text-5xl">
            This page could not be found
          </h1>
          <p className="mt-4 max-w-2xl text-slate-700">
            The link may be outdated, or the page may have moved. You can return
            to the homepage, contact us, or jump directly to start your order.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
            >
              Go to homepage
            </Link>
            <Link
              href="/#start-your-order"
              className="inline-flex rounded-full border border-indigo-200 bg-white px-6 py-3 text-sm font-semibold text-indigo-900 transition hover:border-indigo-300 hover:bg-indigo-50"
            >
              Start your order
            </Link>
            <Link
              href="/contact"
              className="inline-flex rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-300 hover:bg-slate-100"
            >
              Contact support
            </Link>
          </div>

          <div className="mt-10 border-t border-slate-200 pt-6">
            <p className="text-sm font-semibold text-slate-800">Popular pages</p>
            <div className="mt-3 flex flex-wrap gap-3 text-sm font-semibold text-indigo-700">
              <Link href="/ai-website-hosting" className="underline-offset-4 hover:underline">
                AI website hosting
              </Link>
              <Link
                href="/website-deployment-service"
                className="underline-offset-4 hover:underline"
              >
                Website deployment service
              </Link>
              <Link href="/full-stack-hosting" className="underline-offset-4 hover:underline">
                Full stack hosting
              </Link>
              <Link href="/blog" className="underline-offset-4 hover:underline">
                Hosting guides
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
