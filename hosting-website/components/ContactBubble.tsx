export default function ContactBubble() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href="https://wa.me/40753570440?text=Hi%2C%20I%20need%20help%20launching%20my%20website."
        target="_blank"
        rel="noreferrer"
        className="inline-flex w-full items-center justify-center rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
      >
        Contact on WhatsApp
      </a>
    </div>
  );
}
