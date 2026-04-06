import { NextResponse } from "next/server";

const contactPath = "/contact";

function buildRedirectUrl(status: "ok" | "error", message: string) {
  const params = new URLSearchParams({
    status,
    message,
  });
  return `/contact?${params.toString()}`;
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !subject || !message) {
    return NextResponse.redirect(
      new URL(
        buildRedirectUrl("error", "Please fill in all fields."),
        request.url,
      ),
    );
  }

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:4000";

  try {
    const response = await fetch(`${backendUrl}${contactPath}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, subject, message }),
      cache: "no-store",
    });

    const data = (await response.json()) as { message?: string };
    if (!response.ok) {
      return NextResponse.redirect(
        new URL(
          buildRedirectUrl("error", data.message ?? "Failed to send message."),
          request.url,
        ),
      );
    }

    return NextResponse.redirect(
      new URL(
        buildRedirectUrl("ok", "Message sent successfully. I will reply soon."),
        request.url,
      ),
    );
  } catch {
    return NextResponse.redirect(
      new URL(
        buildRedirectUrl("error", "Unexpected error."),
        request.url,
      ),
    );
  }
}
