"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useOrderPlanStore } from "../store/orderPlanStore";

export default function StartOrderForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [hasSelectedZip, setHasSelectedZip] = useState(false);
  const [status, setStatus] = useState<{ type: "ok" | "error"; text: string } | null>(null);
  const isDev = process.env.NODE_ENV === "development";
  const selectedPlan = useOrderPlanStore((state) => state.selectedPlan);
  const setSelectedPlan = useOrderPlanStore((state) => state.setSelectedPlan);
  const devDefaults = {
    name: "Test Client",
    email: "gheorgheoff@gmail.com",
    preferredDomainName: "strelements-demo",
    message: "Please deploy my website from the attached ZIP and connect domain.",
    backupDomainIdeas: "strelements-demo-site, strelements-online",
  };
  const backendUrl = useMemo(
    () => process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:4000",
    [],
  );

  useEffect(() => {
    if (isDev && !selectedPlan) {
      setSelectedPlan("hosting-9-99");
    }
  }, [isDev, selectedPlan, setSelectedPlan]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    setStatus(null);
    setIsSubmitting(true);

    const formEl = event.currentTarget;
    const formData = new FormData(formEl);
    const uploadedFile = formData.get("projectUpload");
    const file =
      uploadedFile instanceof File && uploadedFile.size > 0 ? uploadedFile : null;

    if (!file) {
      setStatus({
        type: "error",
        text: "Please upload a ZIP file first.",
      });
      setIsSubmitting(false);
      return;
    }

    if (!file.name.toLowerCase().endsWith(".zip")) {
      setStatus({
        type: "error",
        text: "Only .zip files are allowed.",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      setUploadProgress(0);
      const data = await new Promise<{ message?: string }>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", `${backendUrl}/orders`, true);

        xhr.upload.onprogress = (progressEvent) => {
          if (!progressEvent.lengthComputable) return;
          const percent = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100,
          );
          setUploadProgress(percent);
        };

        xhr.onload = () => {
          let parsed: { message?: string } = {};
          try {
            parsed = JSON.parse(xhr.responseText) as { message?: string };
          } catch {
            parsed = {};
          }

          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(parsed);
            return;
          }
          reject(new Error(parsed.message ?? "Failed to send order."));
        };

        xhr.onerror = () => reject(new Error("Network error while uploading."));
        xhr.send(formData);
      });

      formEl.reset();
      setHasSelectedZip(false);
      setUploadProgress(0);
      setSelectedPlan(isDev ? "hosting-9-99" : "");
      setStatus({
        type: "ok",
        text: "Order sent successfully. I will contact you soon.",
      });
      router.push("/order-sent");
    } catch (error) {
      setUploadProgress(0);
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
            defaultValue={isDev ? devDefaults.name : ""}
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
            defaultValue={isDev ? devDefaults.email : ""}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-slate-500"
          />
        </label>
      </div>

      <fieldset className="rounded-xl border border-slate-300 bg-white p-4">
        <legend className="px-2 text-sm font-semibold text-slate-700">Project Upload</legend>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">ZIP file</span>
          <input
            id="project-upload-input"
            type="file"
            name="projectUpload"
            required
            accept=".zip,application/zip,application/x-zip-compressed"
            onChange={(event) =>
              setHasSelectedZip(Boolean(event.currentTarget.files?.length))
            }
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-700 file:mr-4 file:rounded-md file:border-0 file:bg-blue-600 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white"
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
            defaultValue={isDev ? devDefaults.preferredDomainName : ""}
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
            defaultValue={isDev ? devDefaults.message : ""}
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
            defaultValue={isDev ? devDefaults.backupDomainIdeas : ""}
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
              checked={selectedPlan === "hosting-9-99"}
              onChange={() => setSelectedPlan("hosting-9-99")}
              className="mt-1 h-4 w-4 accent-blue-600"
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
              checked={selectedPlan === "full-stack-19-99"}
              onChange={() => setSelectedPlan("full-stack-19-99")}
              className="mt-1 h-4 w-4 accent-blue-600"
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
        disabled={isSubmitting || !hasSelectedZip}
        className="inline-flex rounded-full bg-blue-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Sending..." : hasSelectedZip ? "Send Order" : "Upload ZIP first"}
      </button>

      {isSubmitting && (
        <div className="space-y-2">
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-blue-600 transition-all"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <p className="text-xs font-medium text-slate-600">
            Uploading: {uploadProgress}%
          </p>
        </div>
      )}

      {status && (
        <p
          className={`text-sm font-medium ${
            status.type === "ok" ? "text-emerald-700" : "text-red-700"
          }`}
        >
          {status.text}
        </p>
      )}
      {isDev && (
        <p className="text-xs text-slate-500">
          Development mode: fields are auto-filled (ZIP still must be chosen).
        </p>
      )}
    </form>
  );
}
