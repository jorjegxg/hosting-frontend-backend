import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Website Deployment Service",
  description:
    "Done-for-you website deployment service for US businesses. We launch your site, connect domain and SSL, and keep it stable.",
  alternates: { canonical: "/website-deployment-service" },
};

export default function WebsiteDeploymentServicePage() {
  return (
    <main className="w-full bg-white text-slate-900">
      <section className="border-b border-indigo-100 bg-white">
        <div className="mx-auto w-full max-w-5xl px-6 py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-indigo-700">
            Done-for-you Deployment
          </p>
          <h1 className="mt-3 text-3xl font-bold text-indigo-950 sm:text-5xl">
            Website deployment service for people who want it handled
          </h1>
          <p className="mt-4 max-w-3xl text-slate-700">
            Send your project files and we deploy your website, connect your
            domain, activate SSL, and verify everything before launch.
          </p>
          <Link
            href="/#start-your-order"
            className="mt-8 inline-flex rounded-full bg-indigo-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            Deploy my website
          </Link>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 py-14">
        <h2 className="text-2xl font-bold text-indigo-950 sm:text-3xl">
          What this service includes
        </h2>
        <ul className="mt-6 space-y-3 text-slate-700">
          <li>✓ Upload and review of your website files</li>
          <li>✓ Domain setup and DNS connection support</li>
          <li>✓ SSL/HTTPS setup and verification</li>
          <li>✓ Launch checks and post-launch support</li>
        </ul>
      </section>

      <section className="border-t border-indigo-100 bg-indigo-50/40">
        <div className="mx-auto w-full max-w-5xl px-6 py-12">
          <h2 className="text-2xl font-bold text-indigo-950">Related pages</h2>
          <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-indigo-700">
            <Link href="/ai-website-hosting" className="underline-offset-4 hover:underline">
              AI website hosting
            </Link>
            <Link href="/full-stack-hosting" className="underline-offset-4 hover:underline">
              Full stack hosting
            </Link>
            <Link
              href="/blog/website-deployment-checklist-before-you-send-files"
              className="underline-offset-4 hover:underline"
            >
              Deployment checklist
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
