import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Domain vs Hosting for Non-Technical Founders",
  description:
    "Understand the difference between a domain and hosting in plain language, with a simple launch path for beginners.",
  alternates: { canonical: "/blog/domain-vs-hosting-for-non-technical-founders" },
};

export default function DomainVsHostingPage() {
  return (
    <main className="w-full bg-white text-slate-900">
      <article className="mx-auto w-full max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold text-indigo-950 sm:text-4xl">
          Domain vs hosting for non-technical founders
        </h1>
        <p className="mt-5 text-slate-700">
          Your domain is your address on the internet. Hosting is the place where
          your website files live. You need both to make a website visible.
        </p>
        <h2 className="mt-8 text-2xl font-semibold text-indigo-950">Simple example</h2>
        <p className="mt-4 text-slate-700">
          Think of a store: the domain is the street address and hosting is the
          building where the store operates.
        </p>
        <p className="mt-8 text-slate-700">
          If you want everything handled for you, start with{" "}
          <Link href="/website-deployment-service" className="font-semibold text-indigo-700 underline">
            website deployment service
          </Link>
          .
        </p>
      </article>
    </main>
  );
}
