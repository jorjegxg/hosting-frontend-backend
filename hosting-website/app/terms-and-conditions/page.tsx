import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions | Hostera 24",
  description: "Terms and conditions for Hostera 24 hosting services.",
};

export default function TermsAndConditionsPage() {
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
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl">
            Terms and Conditions
          </h1>
          <p className="mt-3 text-sm text-slate-600">Last updated: {updatedOn}</p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-4xl px-6 py-10">
        <div className="space-y-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <article className="space-y-3">
            <h2 className="text-xl font-semibold">1. Services</h2>
            <p className="text-slate-700">
              Hostera 24 provides website hosting, deployment support, and
              related technical services as described on the website.
            </p>
          </article>

          <article className="space-y-3">
            <h2 className="text-xl font-semibold">2. Client Responsibilities</h2>
            <p className="text-slate-700">
              You are responsible for providing lawful content, having rights to
              all files you upload, and maintaining accurate account and contact
              information.
            </p>
          </article>

          <article className="space-y-3">
            <h2 className="text-xl font-semibold">3. Fees and Billing</h2>
            <p className="text-slate-700">
              Service fees are billed as displayed at checkout. Late or failed
              payments may result in suspension of service until payment is
              resolved.
            </p>
          </article>

          <article className="space-y-3">
            <h2 className="text-xl font-semibold">4. Cancellations and Refunds</h2>
            <p className="text-slate-700">
              You may request cancellation at any time. Refunds are handled case
              by case and may depend on usage, elapsed service period, and payment
              provider policies.
            </p>
          </article>

          <article className="space-y-3">
            <h2 className="text-xl font-semibold">5. Acceptable Use</h2>
            <p className="text-slate-700">
              You agree not to use the service for illegal, abusive, infringing,
              or harmful activities, including malware distribution, phishing, or
              unauthorized access attempts.
            </p>
          </article>

          <article className="space-y-3">
            <h2 className="text-xl font-semibold">6. Limitation of Liability</h2>
            <p className="text-slate-700">
              Services are provided on an &quot;as is&quot; and &quot;as
              available&quot; basis.
              Hostera 24 is not liable for indirect or consequential losses,
              including loss of profits, business interruption, or data loss.
            </p>
          </article>

          <article className="space-y-3">
            <h2 className="text-xl font-semibold">7. Changes to Terms</h2>
            <p className="text-slate-700">
              We may update these terms from time to time. Continued use of the
              service after updates indicates acceptance of the revised terms.
            </p>
          </article>

          <article className="space-y-3">
            <h2 className="text-xl font-semibold">8. Contact</h2>
            <p className="text-slate-700">
              For questions about these terms, contact{" "}
              <a
                href="mailto:hello@hostera24.com"
                className="font-semibold text-slate-800 underline-offset-4 hover:underline"
              >
                hello@hostera24.com
              </a>
              .
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
