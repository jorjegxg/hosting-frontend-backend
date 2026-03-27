import Link from "next/link";

export default function OrderSentPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-20 text-slate-900">
      <div className="mx-auto w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-emerald-700">
          Order received
        </p>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
          Thank you for your order.
        </h1>
        <p className="mt-4 text-slate-700">
          Your files and details were sent successfully. I will contact you soon to
          continue setup.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
