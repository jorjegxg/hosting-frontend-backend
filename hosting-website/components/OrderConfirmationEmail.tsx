const PLAN_DETAILS: Record<
  "hosting-9-99" | "full-stack-19-99",
  { title: string; description: string; priceLabel: string }
> = {
  "hosting-9-99": {
    title: "Hosting Plan",
    description: "Ideal for landing pages and business sites.",
    priceLabel: "$9.99/mo",
  },
  "full-stack-19-99": {
    title: "Full Stack Plan",
    description: "Best for web apps with frontend, backend, and database.",
    priceLabel: "$19.99/mo",
  },
};

export type OrderConfirmationEmailProps = {
  customerName: string;
  customerEmail: string;
  /** Shown as the order reference (e.g. database id or external id). */
  orderId: string | number;
  paymentPlanId: keyof typeof PLAN_DETAILS;
  preferredDomain?: string | null;
  paymentStatus: "success" | "pending" | "cancelled";
  /** Pre-formatted date string when payment succeeded, e.g. from `toLocaleString()`. */
  paidAtLabel?: string;
  className?: string;
};

function statusCopy(status: OrderConfirmationEmailProps["paymentStatus"]) {
  switch (status) {
    case "success":
      return { label: "Paid", className: "text-emerald-700 bg-emerald-50 border-emerald-200" };
    case "pending":
      return { label: "Pending", className: "text-amber-800 bg-amber-50 border-amber-200" };
    case "cancelled":
      return { label: "Cancelled", className: "text-slate-700 bg-slate-100 border-slate-200" };
  }
}

/**
 * Email-style order confirmation layout. Reuse this on a preview route and
 * when rendering the same content after successful Stripe checkout.
 */
export default function OrderConfirmationEmail({
  customerName,
  customerEmail,
  orderId,
  paymentPlanId,
  preferredDomain,
  paymentStatus,
  paidAtLabel,
  className = "",
}: OrderConfirmationEmailProps) {
  const plan = PLAN_DETAILS[paymentPlanId];
  const status = statusCopy(paymentStatus);

  return (
    <div
      className={`mx-auto w-full max-w-[600px] overflow-hidden rounded-xl border border-slate-200 bg-white text-left shadow-sm ${className}`}
    >
      <div className="border-b border-slate-100 bg-slate-50 px-6 py-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Strelements
        </p>
        <h1 className="mt-1 text-xl font-bold text-slate-900">Order confirmation</h1>
      </div>

      <div className="space-y-5 px-6 py-6 text-sm text-slate-700">
        <p>
          Hi {customerName},
          <br />
          <span className="mt-2 block text-slate-600">
            {paymentStatus === "success"
              ? "Thank you — your payment went through and your order is confirmed."
              : paymentStatus === "pending"
                ? "We have your order. Complete payment to confirm and start setup."
                : "This order is on hold because checkout was not completed."}
          </span>
        </p>

        <div className="rounded-lg border border-slate-200 bg-slate-50/80 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Summary</p>
          <dl className="mt-3 space-y-2.5">
            <div className="flex flex-wrap justify-between gap-2 border-b border-slate-200/80 pb-2">
              <dt className="text-slate-500">Order</dt>
              <dd className="font-mono text-slate-900">#{orderId}</dd>
            </div>
            <div className="flex flex-wrap justify-between gap-2 border-b border-slate-200/80 pb-2">
              <dt className="text-slate-500">Email</dt>
              <dd className="break-all text-slate-900">{customerEmail}</dd>
            </div>
            <div className="flex flex-wrap justify-between gap-2 border-b border-slate-200/80 pb-2">
              <dt className="text-slate-500">Plan</dt>
              <dd className="text-right text-slate-900">
                {plan.title}{" "}
                <span className="text-slate-600">({plan.priceLabel})</span>
              </dd>
            </div>
            {preferredDomain ? (
              <div className="flex flex-wrap justify-between gap-2 border-b border-slate-200/80 pb-2">
                <dt className="text-slate-500">Preferred domain</dt>
                <dd className="break-all text-slate-900">{preferredDomain}</dd>
              </div>
            ) : null}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5">
              <dt className="text-slate-500">Payment</dt>
              <dd className="flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold ${status.className}`}
                >
                  {status.label}
                </span>
                {paymentStatus === "success" && paidAtLabel ? (
                  <span className="text-xs text-slate-500">{paidAtLabel}</span>
                ) : null}
              </dd>
            </div>
          </dl>
        </div>

        <p className="text-xs leading-relaxed text-slate-500">
          {plan.description} You will receive a separate message when your site setup moves to the
          next step.
        </p>

        <p className="text-xs text-slate-400">
          Questions? Reply to this email or write to{" "}
          <a href="mailto:hello@strelements.com" className="text-blue-600 underline">
            hello@strelements.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
