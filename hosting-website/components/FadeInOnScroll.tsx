"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function FadeInOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".fade-in"));

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          entry.target.classList.add("fade-in-visible");
          obs.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.15,
      },
    );

    elements.forEach((element) => {
      if (element.classList.contains("fade-in-visible")) {
        return;
      }
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
