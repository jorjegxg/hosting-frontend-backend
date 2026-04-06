import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Claude Code Website Deployment Checklist",
  description:
    "Deployment checklist for websites built with Claude Code: hosting prep, domain, SSL, and release validation.",
  alternates: { canonical: "/blog/claude-code-website-deployment-checklist" },
};

export default function ClaudeCodeWebsiteDeploymentChecklistPage() {
  return (
    <main className="w-full bg-white text-slate-900">
      <article className="mx-auto w-full max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold text-indigo-950 sm:text-4xl">
          Claude Code website deployment checklist
        </h1>
        <p className="mt-5 text-slate-700">
          Before deploying a website built with Claude Code, use this checklist
          to reduce launch issues and speed up go-live.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-indigo-950">
          Pre-launch checklist
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
          <li>Production build runs without local-only dependencies</li>
          <li>Environment variables are documented and validated</li>
          <li>Domain and DNS access are available for setup</li>
          <li>SSL certificate and HTTPS redirect are enabled</li>
          <li>Monitoring and post-launch support path are defined</li>
        </ul>

        <p className="mt-8 text-slate-700">
          If you want managed execution, start with{" "}
          <Link href="/ai-website-hosting" className="font-semibold text-indigo-700 underline">
            AI website hosting
          </Link>{" "}
          or submit your project through{" "}
          <Link href="/#start-your-order" className="font-semibold text-indigo-700 underline">
            the launch request form
          </Link>
          .
        </p>
      </article>
    </main>
  );
}
