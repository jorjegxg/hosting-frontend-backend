import Link from "next/link";

type OrderSentPageProps = {
  searchParams?:
    | {
        email?: string | string[];
        payment?: string | string[];
      }
    | Promise<{
        email?: string | string[];
        payment?: string | string[];
      }>;
};

export default async function OrderSentPage({ searchParams }: OrderSentPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const paymentStatus = Array.isArray(resolvedSearchParams?.payment)
    ? resolvedSearchParams.payment[0]
    : resolvedSearchParams?.payment;
  const emailStatus = Array.isArray(resolvedSearchParams?.email)
    ? resolvedSearchParams.email[0]
    : resolvedSearchParams?.email;
  const paymentCancelled = paymentStatus === "cancelled";
  const paymentSuccess = paymentStatus === "success";
  const emailFailed = emailStatus === "failed";

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-20 text-slate-900">
      <div className="mx-auto w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-emerald-700">
          Order received
        </p>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
          {paymentCancelled ? "Payment was cancelled." : "Thank you for your order."}
        </h1>
        <p className="mt-4 text-slate-700">
          {paymentCancelled
            ? "Your order draft is saved, but payment is not completed yet. Return and complete Stripe checkout to continue."
            : paymentSuccess
              ? "Your payment was successful and your order is now confirmed. I will contact you soon to continue setup."
              : "Your files and details were sent successfully. I will contact you soon to continue setup."}
        </p>
        {emailFailed && (
          <p className="mt-4 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            We received your order, but your confirmation email could not be sent.
            Please verify SMTP settings or contact support.
          </p>
        )}
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
