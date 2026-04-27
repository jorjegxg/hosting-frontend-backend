import type { Metadata } from "next";
import StartOrderForm from "../../components/StartOrderForm";

export const metadata: Metadata = {
  title: "Start Website Project",
  description:
    "Start your presentation website project and submit your details for build, launch, and monthly maintenance.",
  alternates: {
    canonical: "/start-project",
  },
};

type StartProjectPageProps = {
  searchParams?: Promise<{
    plan?: string;
  }>;
};

export default async function StartProjectPage({
  searchParams,
}: StartProjectPageProps) {
  const resolvedSearchParams = await searchParams;
  const selectedPlanFromUrl =
    resolvedSearchParams?.plan === "presentation-20-monthly"
      ? resolvedSearchParams.plan
      : undefined;

  return (
    <main className="w-full bg-white text-slate-900">
      <section className="fade-in border-b border-indigo-100 bg-white">
        <div className="mx-auto w-full max-w-4xl px-6 py-16">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Start your presentation website project
          </h1>
          <p className="mt-3 text-slate-600">
            Share your details and project files. We will follow up quickly and
            move your website to a reliable live environment.
          </p>
          <StartOrderForm initialPlan={selectedPlanFromUrl} />
        </div>
      </section>
    </main>
  );
}
