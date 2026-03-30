import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Website Deployment Checklist Before You Send Files",
  description:
    "Use this checklist before submitting your website files for deployment to avoid delays and launch issues.",
  alternates: { canonical: "/blog/website-deployment-checklist-before-you-send-files" },
};

export default function WebsiteDeploymentChecklistPage() {
  return (
    <main className="w-full bg-white text-slate-900">
      <article className="mx-auto w-full max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold text-indigo-950 sm:text-4xl">
          Website deployment checklist before you send files
        </h1>
        <ul className="mt-6 list-disc space-y-2 pl-5 text-slate-700">
          <li>Include the latest production-ready files</li>
          <li>Share domain preferences and registrar access details</li>
          <li>List required integrations (forms, email, analytics)</li>
          <li>Provide environment variables for external services</li>
          <li>Include a contact email for launch updates</li>
        </ul>
        <p className="mt-8 text-slate-700">
          Need help with this process? Our{" "}
          <Link href="/website-deployment-service" className="font-semibold text-indigo-700 underline">
            deployment service
          </Link>{" "}
          covers the setup and launch checks.
        </p>
      </article>
    </main>
  );
}
