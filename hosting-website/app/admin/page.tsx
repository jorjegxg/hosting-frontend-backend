"use client";

import { useEffect, useMemo, useState } from "react";

type Order = {
  id: number;
  name: string;
  email: string;
  preferred_domain_name: string | null;
  message: string | null;
  backup_domain_ideas: string | null;
  payment_plan: string;
  project_zip_path: string;
  created_at: string;
};

type StorageStats = {
  path: string;
  totalBytes: number;
  usedBytes: number;
  freeBytes: number;
};

function formatBytes(value: number): string {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let amount = value;
  let unitIndex = 0;
  while (amount >= 1024 && unitIndex < units.length - 1) {
    amount /= 1024;
    unitIndex += 1;
  }
  return `${amount.toFixed(unitIndex === 0 ? 0 : 2)} ${units[unitIndex]}`;
}

export default function AdminPage() {
  const backendUrl = useMemo(
    () => process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:4000",
    [],
  );

  const [password, setPassword] = useState("");
  const [savePassword, setSavePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloadingId, setIsDownloadingId] = useState<number | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [storage, setStorage] = useState<StorageStats | null>(null);
  const [errorText, setErrorText] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function loadAdminData(adminPassword: string) {
    const headers = { "x-admin-password": adminPassword };
    const [ordersResponse, storageResponse] = await Promise.all([
      fetch(`${backendUrl}/admin/orders`, { headers }),
      fetch(`${backendUrl}/admin/storage`, { headers }),
    ]);

    const ordersData = (await ordersResponse.json()) as {
      message?: string;
      orders?: Order[];
    };
    const storageData = (await storageResponse.json()) as {
      message?: string;
      storage?: StorageStats;
    };

    if (!ordersResponse.ok) {
      throw new Error(ordersData.message ?? "Failed to fetch orders.");
    }
    if (!storageResponse.ok) {
      throw new Error(storageData.message ?? "Failed to fetch storage.");
    }

    setOrders(ordersData.orders ?? []);
    setStorage(storageData.storage ?? null);
  }

  async function onLogin() {
    if (!password.trim()) {
      setErrorText("Please enter admin password.");
      return;
    }

    setErrorText("");
    setIsLoading(true);
    try {
      await loadAdminData(password.trim());
      setIsLoggedIn(true);

      if (savePassword) {
        localStorage.setItem("adminPassword", password.trim());
      } else {
        localStorage.removeItem("adminPassword");
      }
      localStorage.setItem("saveAdminPassword", savePassword ? "1" : "0");
    } catch (error) {
      setErrorText(error instanceof Error ? error.message : "Login failed.");
    } finally {
      setIsLoading(false);
    }
  }

  async function onDownload(orderId: number) {
    setIsDownloadingId(orderId);
    setErrorText("");
    try {
      const response = await fetch(`${backendUrl}/admin/orders/${orderId}/download`, {
        headers: { "x-admin-password": password.trim() },
      });
      if (!response.ok) {
        const data = (await response.json()) as { message?: string };
        throw new Error(data.message ?? "Download failed.");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `order-${orderId}.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      setErrorText(error instanceof Error ? error.message : "Download failed.");
    } finally {
      setIsDownloadingId(null);
    }
  }

  useEffect(() => {
    const shouldSave = localStorage.getItem("saveAdminPassword") === "1";
    const savedPassword = localStorage.getItem("adminPassword") ?? "";
    setSavePassword(shouldSave);
    if (shouldSave && savedPassword) {
      setPassword(savedPassword);
    }
  }, []);

  return (
    <main className="min-h-dvh bg-slate-100 px-6 py-10 text-slate-800">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <h1 className="text-3xl font-bold">Admin Panel</h1>

        {!isLoggedIn ? (
          <section className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
            <p className="mb-4 text-sm text-slate-600">
              Enter admin password to view orders and download ZIP files.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Admin password"
                className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-slate-500"
              />
              <button
                type="button"
                onClick={onLogin}
                disabled={isLoading}
                className="rounded-lg bg-slate-900 px-5 py-2 font-semibold text-white hover:bg-slate-800 disabled:opacity-70"
              >
                {isLoading ? "Loading..." : "Login"}
              </button>
            </div>
            <label className="mt-3 inline-flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={savePassword}
                onChange={(event) => setSavePassword(event.target.checked)}
              />
              Save password
            </label>
            {errorText && <p className="mt-3 text-sm font-medium text-red-700">{errorText}</p>}
          </section>
        ) : (
          <>
            <section className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold">VPS Storage</h2>
              {storage ? (
                <div className="mt-3 grid gap-2 text-sm">
                  <p>
                    <span className="font-semibold">Path:</span> {storage.path}
                  </p>
                  <p>
                    <span className="font-semibold">Total:</span>{" "}
                    {formatBytes(storage.totalBytes)}
                  </p>
                  <p>
                    <span className="font-semibold">Used:</span>{" "}
                    {formatBytes(storage.usedBytes)}
                  </p>
                  <p>
                    <span className="font-semibold">Free:</span>{" "}
                    {formatBytes(storage.freeBytes)}
                  </p>
                </div>
              ) : (
                <p className="mt-3 text-sm text-slate-600">No storage info available.</p>
              )}
            </section>

            <section className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold">Orders ({orders.length})</h2>
              {errorText && <p className="mt-3 text-sm font-medium text-red-700">{errorText}</p>}

              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-slate-300 text-left">
                      <th className="px-3 py-2">ID</th>
                      <th className="px-3 py-2">Name</th>
                      <th className="px-3 py-2">Email</th>
                      <th className="px-3 py-2">Plan</th>
                      <th className="px-3 py-2">Domain</th>
                      <th className="px-3 py-2">Created</th>
                      <th className="px-3 py-2">ZIP</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b border-slate-200 align-top">
                        <td className="px-3 py-2">{order.id}</td>
                        <td className="px-3 py-2">{order.name}</td>
                        <td className="px-3 py-2">{order.email}</td>
                        <td className="px-3 py-2">{order.payment_plan}</td>
                        <td className="px-3 py-2">{order.preferred_domain_name ?? "-"}</td>
                        <td className="px-3 py-2">
                          {new Date(order.created_at).toLocaleString()}
                        </td>
                        <td className="px-3 py-2">
                          <button
                            type="button"
                            onClick={() => onDownload(order.id)}
                            disabled={isDownloadingId === order.id}
                            className="rounded-md bg-slate-900 px-3 py-1 font-semibold text-white hover:bg-slate-800 disabled:opacity-70"
                          >
                            {isDownloadingId === order.id ? "Downloading..." : "Download"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
