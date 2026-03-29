export default function ContactPage() {
  return (
    <main className="w-full bg-slate-50 text-slate-900">
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-3xl px-6 py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-emerald-700">
            Contact
          </p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            Send your questions by email
          </h1>
          <p className="mt-4 text-slate-600">
            Fill out this form and your email app will open with your message
            ready to send.
          </p>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <form
              action="mailto:hello@strelements.com"
              method="post"
              encType="text/plain"
              className="space-y-5"
            >
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-semibold text-slate-800">
                  Your name
                </label>
                <input
                  id="name"
                  name="Name"
                  type="text"
                  required
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-800">
                  Your email
                </label>
                <input
                  id="email"
                  name="Email"
                  type="email"
                  required
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                />
              </div>

              <div>
                <label htmlFor="subject" className="mb-2 block text-sm font-semibold text-slate-800">
                  Subject
                </label>
                <input
                  id="subject"
                  name="Subject"
                  type="text"
                  required
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-semibold text-slate-800">
                  Message
                </label>
                <textarea
                  id="message"
                  name="Message"
                  rows={7}
                  required
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                />
              </div>

              <button
                type="submit"
                className="inline-flex rounded-full bg-emerald-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
              >
                Open Email Draft
              </button>
            </form>

            <p className="mt-4 text-sm text-slate-600">
              If your email app does not open, send your question directly to{" "}
              <a
                href="mailto:hello@strelements.com"
                className="font-semibold text-emerald-700 underline underline-offset-2"
              >
                hello@strelements.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
