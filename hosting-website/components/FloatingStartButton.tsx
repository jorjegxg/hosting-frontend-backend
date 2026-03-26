"use client";

import { useEffect, useState } from "react";
import ScrollToOrderButton from "./ScrollToOrderButton";

export default function FloatingStartButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const heroButton = document.getElementById("hero-launch-button");
    if (!heroButton) {
      setIsVisible(window.scrollY > 520);
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
