"use client";

import { useEffect, useState } from "react";
import ScrollToOrderButton from "./ScrollToOrderButton";

export default function FloatingStartButton() {
  const [isVisible, setIsVisible] = useState(() =>
    typeof window !== "undefined" ? window.scrollY > 520 : false,
  );

  useEffect(() => {
    const heroButton = document.getElementById("hero-launch-button");
    if (!heroButton) {
      const onScroll = () => setIsVisible(window.scrollY > 520);
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener("scroll", onScroll);
    }

    if (typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    observer.observe(heroButton);
    return () => observer.disconnect();
  }, []);

  if (!isVisible) return null;

  return (
    <ScrollToOrderButton
      label="Launch my website"
      className="fixed left-1/2 top-4 z-50 inline-flex -translate-x-1/2 items-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
    />
  );
}
