import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Hostera 24",
  description:
    "Meet the founder behind Hostera 24 and learn how non-technical US business owners launch websites without stress.",
  alternates: {
    canonical: "/about-us",
  },
};

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-20 text-slate-900">
      <section className="mx-auto w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-indigo-700">
          About Us
        </p>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Who is behind Hostera 24?</h1>
        <p className="mt-5 text-base leading-relaxed text-slate-700">
          Hostera 24 is run by me as a Romanian PFA and independent freelancer.
          I help people launch websites quickly with clear communication and
          direct support.
        </p>
        <p className="mt-4 text-base leading-relaxed text-slate-700">
          I am based in Romania and studied Computer Science, which gave me a
          strong technical foundation. I use that experience to keep hosting and
          deployment simple, stable, and clear for non-technical clients.
        </p>
        <div className="mt-6 mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-slate-200">
          <Image
            src="/lg.jpeg"
            alt="Founder of Hostera 24"
            width={1200}
            height={800}
            className="h-auto w-full object-cover"
            priority
          />
        </div>
        <p className="mt-4 text-base leading-relaxed text-slate-700">
          If you need your site online without stress, I can handle setup, domain
          connection, and ongoing support.
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            Back to home
          </Link>
        </div>
      </section>
    </main>
  );
}
