import Link from "next/link";
import type { Metadata } from "next";
import OrderConfirmationEmail from "../../components/OrderConfirmationEmail";

export const metadata: Metadata = {
  title: "Order Confirmation",
  description: "Order confirmation page.",
  robots: { index: false, follow: false },
};

type OrderSentPageProps = {
  searchParams?:
    | {
        email?: string | string[];
        payment?: string | string[];
        session_id?: string | string[];
        order_id?: string | string[];
      }
    | Promise<{
        email?: string | string[];
        payment?: string | string[];
        session_id?: string | string[];
        order_id?: string | string[];
      }>;
};

type ConfirmationOrder = {
  id: number;
  name: string;
  email: string;
  preferredDomain: string | null;
  paymentPlan: string;
  paidAt: string | null;
};

function firstParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function mapPaymentPlanId(
  plan: string,
): "presentation-20-monthly" {
  if (plan === "presentation-20-monthly") {
    return "presentation-20-monthly";
  }
  return "presentation-20-monthly";
}

function serverBackendUrl(): string {
  return (
    process.env.BACKEND_URL ??
    process.env.NEXT_PUBLIC_BACKEND_URL ??
    "http://127.0.0.1:4000"
  );
}

async function fetchConfirmationOrder(
  sessionId: string,
  orderId?: string,
): Promise<ConfirmationOrder | null> {
  const backendUrl = serverBackendUrl();
  const params = new URLSearchParams({ session_id: sessionId });
  if (orderId && /^\d+$/.test(orderId)) {
    params.set("order_id", orderId);
  }
  const url = `${backendUrl}/orders/confirmation-summary?${params.toString()}`;
  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      return null;
    }
    const data = (await response.json()) as {
      status?: string;
      order?: ConfirmationOrder;
    };
    if (data.status !== "ok" || !data.order) {
      return null;
    }
    return data.order;
  } catch {
    return null;
  }
}

export default async function OrderSentPage({ searchParams }: OrderSentPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const paymentStatus = firstParam(resolvedSearchParams?.payment);
  const emailStatus = firstParam(resolvedSearchParams?.email);
  const sessionId = firstParam(resolvedSearchParams?.session_id);
  const orderIdParam = firstParam(resolvedSearchParams?.order_id);
  const paymentCancelled = paymentStatus === "cancelled";
  const paymentSuccess = paymentStatus === "success";
  const emailFailed = emailStatus === "failed";

  const confirmationOrder =
    paymentSuccess && sessionId
      ? await fetchConfirmationOrder(sessionId, orderIdParam)
      : null;

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-20 text-slate-900">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-8">
        {paymentSuccess && confirmationOrder ? (
          <>
            <p className="text-center text-sm font-semibold uppercase tracking-[0.15em] text-indigo-700">
              Order received
            </p>
            <OrderConfirmationEmail
              customerName={confirmationOrder.name}
              customerEmail={confirmationOrder.email}
              orderId={confirmationOrder.id}
              paymentPlanId={mapPaymentPlanId(confirmationOrder.paymentPlan)}
              preferredDomain={confirmationOrder.preferredDomain}
              paymentStatus="success"
              paidAtLabel={
                confirmationOrder.paidAt
                  ? new Date(confirmationOrder.paidAt).toLocaleString()
                  : undefined
              }
            />
            {emailFailed && (
              <p className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                We received your order, but your confirmation email could not be sent.
                Please verify SMTP settings or contact support.
              </p>
            )}
          </>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-indigo-700">
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
          </div>
        )}
        <Link
          href="/"
          className="inline-flex w-fit rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
