import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Website Hosting Guides",
  description:
    "Guides for non-technical founders on hosting, domains, deployment, and launching AI-built websites.",
  alternates: { canonical: "/blog" },
};

const posts = [
  {
    href: "/blog/how-to-host-ai-generated-website-without-coding",
    title: "How to host an AI-generated website (without coding)",
  },
  {
    href: "/blog/domain-vs-hosting-for-non-technical-founders",
    title: "Domain vs hosting for non-technical founders",
  },
  {
    href: "/blog/website-deployment-checklist-before-you-send-files",
    title: "Website deployment checklist before you send files",
  },
  {
    href: "/blog/how-long-does-website-deployment-take",
    title: "How long does website deployment take?",
  },
  {
    href: "/blog/best-way-to-launch-small-business-website-in-24-hours",
    title: "Best way to launch a small business website in 24 hours",
  },
];

export default function BlogPage() {
  return (
    <main className="w-full bg-white text-slate-900">
      <section className="mx-auto w-full max-w-4xl px-6 py-16">
        <h1 className="text-3xl font-bold text-indigo-950 sm:text-5xl">
          Hosting and deployment guides
        </h1>
        <p className="mt-4 text-slate-700">
          Practical articles for founders and non-technical business owners.
        </p>
        <div className="mt-10 space-y-4">
          {posts.map((post) => (
            <Link
              key={post.href}
              href={post.href}
              className="block rounded-2xl border border-indigo-100 p-5 transition hover:border-indigo-300"
            >
              <h2 className="text-lg font-semibold text-indigo-900">{post.title}</h2>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
