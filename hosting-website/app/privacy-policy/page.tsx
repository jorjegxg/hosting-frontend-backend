import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Strelements",
  description: "Privacy policy for Strelements hosting services.",
};

export default function PrivacyPolicyPage() {
  const updatedOn = "March 27, 2026";

  return (
    <main className="min-h-dvh bg-slate-50 text-slate-900">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-4xl px-6 py-10">
          <Link
            href="/"
            className="text-sm font-semibold text-slate-600 underline-offset-4 hover:text-slate-900 hover:underline"
          >
            Back to Home
          </Link>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl">Privacy Policy</h1>
          <p className="mt-3 text-sm text-slate-600">Last updated: {updatedOn}</p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-4xl px-6 py-10">
        <div className="space-y-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <article className="space-y-3">
            <h2 className="text-xl font-semibold">1. Information We Collect</h2>
            <p className="text-slate-700">
              When you contact Strelements or place an order, we may collect your
              name, email address, preferred domain details, project files, and
              service-related messages.
            </p>
          </article>

          <article className="space-y-3">
            <h2 className="text-xl font-semibold">2. How We Use Information</h2>
            <p className="text-slate-700">
              We use collected data to deliver hosting services, communicate about
              your order, process payments, and provide customer support.
            </p>
          </article>

          <article className="space-y-3">
            <h2 className="text-xl font-semibold">3. Payment Processing</h2>
            <p className="text-slate-700">
              Payments are processed through third-party providers (for example,
              Stripe). Strelements does not store full payment card details on its
              own servers.
            </p>
          </article>

          <article className="space-y-3">
            <h2 className="text-xl font-semibold">4. Data Sharing</h2>
            <p className="text-slate-700">
              We do not sell your personal information. Data may be shared only
              with trusted service providers needed to run the service, such as
              payment processors, infrastructure providers, and email providers.
            </p>
          </article>

          <article className="space-y-3">
            <h2 className="text-xl font-semibold">5. Data Retention</h2>
            <p className="text-slate-700">
              We retain data only as long as needed for service delivery,
              compliance, billing records, and support. You can request deletion
              of your personal data, subject to legal obligations.
            </p>
          </article>

          <article className="space-y-3">
            <h2 className="text-xl font-semibold">6. Security</h2>
            <p className="text-slate-700">
              We take reasonable technical and organizational measures to protect
              your data. No method of internet transmission or storage is 100%
              secure, and absolute security cannot be guaranteed.
            </p>
          </article>

          <article className="space-y-3">
            <h2 className="text-xl font-semibold">7. Your Rights</h2>
            <p className="text-slate-700">
              Depending on your jurisdiction, you may have rights to access,
              update, delete, or object to processing of your personal data.
            </p>
          </article>

          <article className="space-y-3">
            <h2 className="text-xl font-semibold">8. Contact</h2>
            <p className="text-slate-700">
              For privacy questions or requests, contact{" "}
              <a
                href="mailto:hello@strelements.com"
                className="font-semibold text-slate-800 underline-offset-4 hover:underline"
              >
                hello@strelements.com
              </a>
              .
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
