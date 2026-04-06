import type { Metadata } from "next";
import OrderConfirmationEmail from "../../components/OrderConfirmationEmail";

export const metadata: Metadata = {
  title: "Email preview (test) | Hostera 24",
  description: "Development preview of the order confirmation email layout.",
  robots: { index: false, follow: false },
};

export default function EmailTestPage() {
  const paidAtLabel = new Date().toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-12 text-slate-900 sm:px-6">
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <div className="rounded-lg border border-dashed border-slate-300 bg-white/90 px-4 py-3 text-center text-sm text-slate-600">
          Test page — preview of the order confirmation email used after payment. Not linked from the
          public site navigation.
        </div>

        <OrderConfirmationEmail
          customerName="Alex Example"
          customerEmail="alex@example.com"
          orderId={1042}
          paymentPlanId="hosting-9-99"
          preferredDomain="alex-demo-site"
          paymentStatus="success"
          paidAtLabel={paidAtLabel}
        />

        <p className="text-center text-xs text-slate-500">
          Cancelled example below (same component, different props).
        </p>

        <OrderConfirmationEmail
          customerName="Jamie Sample"
          customerEmail="jamie@example.com"
          orderId={1043}
          paymentPlanId="full-stack-19-99"
          preferredDomain={null}
          paymentStatus="cancelled"
        />
      </div>
    </main>
  );
}
