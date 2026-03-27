"use client";

import { FormEvent, useMemo, useState } from "react";

export default function StartOrderForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "ok" | "error"; text: string } | null>(null);
  const backendUrl = useMemo(
    () => process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:4000",
    [],
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    setStatus(null);
    setIsSubmitting(true);

    const formEl = event.currentTarget;
    const formData = new FormData(formEl);

    try {
      const response = await fetch(`${backendUrl}/orders`, {
        method: "POST",
        body: formData,
      });
      const data = (await response.json()) as { message?: string };
      if (!response.ok) {
        throw new Error(data.message ?? "Failed to send order.");
      }

      formEl.reset();
      setStatus({
        type: "ok",
        text: "Order sent successfully. I will contact you soon.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        text: error instanceof Error ? error.message : "Unexpected error.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mt-8 space-y-6 rounded-2xl border border-slate-300 bg-slate-50 p-6 shadow-sm"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">Name</span>
          <input
            type="text"
            name="name"
            required
            placeholder="Your full name"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-slate-500"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">Email</span>
          <input
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-slate-500"
          />
        </label>
      </div>

      <fieldset className="rounded-xl border border-slate-300 bg-white p-4">
        <legend className="px-2 text-sm font-semibold text-slate-700">Project Upload</legend>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">ZIP file</span>
          <input
            type="file"
            name="projectUpload"
            required
            accept=".zip,application/zip,application/x-zip-compressed"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-700 file:mr-4 file:rounded-md file:border-0 file:bg-slate-800 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white"
          />
        </label>
      </fieldset>

      <div className="grid gap-4">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">
            Preferred domain name
          </span>
          <input
            type="text"
            name="preferredDomainName"
            placeholder="examplebrand"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-slate-500"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">
            Message / Project details
          </span>
          <textarea
            name="message"
            rows={4}
            placeholder="Share your goals, required features, and a GitHub link (or other project link)."
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-slate-500"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">
            Backup domain ideas (optional)
          </span>
          <textarea
            name="backupDomainIdeas"
            rows={3}
            placeholder="examplebrandonline, getexamplebrand, myexamplebrand"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-slate-500"
          />
        </label>
      </div>

      <fieldset className="rounded-xl border border-slate-300 bg-white p-4">
        <legend className="px-2 text-sm font-semibold text-slate-700">Choose payment plan</legend>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-300 bg-slate-50 p-3 transition hover:border-slate-500">
            <input
              type="radio"
              name="paymentPlan"
              value="hosting-9-99"
              required
              className="mt-1 h-4 w-4 accent-slate-700"
            />
            <span>
              <span className="block text-sm font-semibold text-slate-800">
                Hosting Plan - $9.99/mo
              </span>
              <span className="block text-xs text-slate-600">
                Ideal for landing pages and business sites.
              </span>
            </span>
          </label>

          <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-300 bg-slate-50 p-3 transition hover:border-slate-500">
            <input
              type="radio"
              name="paymentPlan"
              value="full-stack-19-99"
              required
              className="mt-1 h-4 w-4 accent-slate-700"
            />
            <span>
              <span className="block text-sm font-semibold text-slate-800">
                Full Stack Plan - $19.99/mo
              </span>
              <span className="block text-xs text-slate-600">
                Best for web apps with frontend, backend, and database.
              </span>
            </span>
          </label>
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex rounded-full bg-slate-900 px-7 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Sending..." : "Send Order"}
      </button>

      {status && (
        <p
          className={`text-sm font-medium ${
            status.type === "ok" ? "text-emerald-700" : "text-red-700"
          }`}
        >
          {status.text}
        </p>
      )}
    </form>
  );
}
