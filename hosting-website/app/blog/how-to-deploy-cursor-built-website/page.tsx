import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Deploy a Cursor-Built Website",
  description:
    "Practical deployment guide for websites built with Cursor, including domain setup, SSL, and launch validation.",
  alternates: { canonical: "/blog/how-to-deploy-cursor-built-website" },
};

export default function HowToDeployCursorBuiltWebsitePage() {
  return (
    <main className="w-full bg-white text-slate-900">
      <article className="mx-auto w-full max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold text-indigo-950 sm:text-4xl">
          How to deploy a Cursor-built website
        </h1>
        <p className="mt-5 text-slate-700">
          Cursor helps you build quickly, but production deployment still needs a
          release workflow. Start with a reliable build, environment variables,
          domain setup, and SSL.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-indigo-950">
          Deployment steps
        </h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-slate-700">
          <li>Freeze your release branch and confirm build output</li>
          <li>Prepare environment variables and API endpoints</li>
          <li>Connect domain and DNS records</li>
          <li>Enable SSL and run post-launch checks</li>
        </ol>

        <p className="mt-8 text-slate-700">
          Need help with full release operations? See{" "}
          <Link href="/website-deployment-service" className="font-semibold text-indigo-700 underline">
            managed deployment service
          </Link>{" "}
          and{" "}
          <Link href="/full-stack-hosting" className="font-semibold text-indigo-700 underline">
            full stack hosting
          </Link>
          .
        </p>
      </article>
    </main>
  );
}
