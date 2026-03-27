import Link from "next/link";

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-20 text-slate-900">
      <section className="mx-auto w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-700">
          About Us
        </p>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Who is behind Strelements?</h1>
        <p className="mt-5 text-base leading-relaxed text-slate-700">
          Strelements is run by me as a Romanian PFA and independent freelancer.
          I help people launch websites quickly with clear communication and
          direct support.
        </p>
        <p className="mt-4 text-base leading-relaxed text-slate-700">
          I am from Romania and I studied Computer Science at university. This
          technical background helps me keep hosting and deployment simple,
          reliable, and easy to understand for non-technical clients.
        </p>
        <p className="mt-4 text-base leading-relaxed text-slate-700">
          If you need your site online without stress, I can handle setup, domain
          connection, and ongoing support.
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            Back to home
          </Link>
        </div>
      </section>
    </main>
  );
}
