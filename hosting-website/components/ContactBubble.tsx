"use client";

import { FormEvent, useMemo, useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

export default function ContactBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "Need your site online fast? Send your question here.",
    },
  ]);

  const backendUrl = useMemo(
    () => process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:4000",
    [],
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = question.trim();
    if (!trimmed || isLoading) return;

    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setQuestion("");
    setIsLoading(true);

    try {
      const response = await fetch(`${backendUrl}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed }),
      });

      const data = (await response.json()) as { answer?: string; message?: string };

      if (!response.ok) {
        throw new Error(data.message ?? "Could not send your question.");
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text:
            data.answer ??
            "Thanks! I got your question and will get back to you soon.",
        },
      ]);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unexpected error happened.";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: `Sorry, ${message}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-[320px] rounded-2xl border border-slate-300 bg-white shadow-2xl">
          <div className="flex items-center justify-between rounded-t-2xl bg-slate-900 px-4 py-3 text-white">
            <p className="text-sm font-semibold">Contact Support</p>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-md px-2 py-1 text-xs hover:bg-slate-700"
            >
              Close
            </button>
          </div>

          <div className="max-h-72 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`rounded-xl px-3 py-2 text-sm ${
                  message.role === "assistant"
                    ? "bg-slate-100 text-slate-700"
                    : "bg-fuchsia-100 text-fuchsia-900"
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>

          <form onSubmit={onSubmit} className="border-t border-slate-200 p-3">
            <label htmlFor="contact-question" className="sr-only">
              Ask a question
            </label>
            <textarea
              id="contact-question"
              rows={2}
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Type your question..."
              className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-fuchsia-500"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 w-full rounded-lg bg-fuchsia-700 px-3 py-2 text-sm font-semibold text-white hover:bg-fuchsia-600 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="rounded-full bg-fuchsia-700 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-fuchsia-600"
        >
          Contact
        </button>
      )}
    </div>
  );
}
