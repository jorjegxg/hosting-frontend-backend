import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hostera24.com";

const publicRoutes = [
  "/",
  "/about-us",
  "/contact",
  "/privacy-policy",
  "/terms-and-conditions",
  "/ai-website-hosting",
  "/website-deployment-service",
  "/full-stack-hosting",
  "/host-lovable-website",
  "/host-cursor-website",
  "/host-claude-code-website",
  "/blog",
  "/blog/how-to-host-ai-generated-website-without-coding",
  "/blog/domain-vs-hosting-for-non-technical-founders",
  "/blog/website-deployment-checklist-before-you-send-files",
  "/blog/how-long-does-website-deployment-take",
  "/blog/best-way-to-launch-small-business-website-in-24-hours",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return publicRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route.startsWith("/blog/") ? "monthly" : "weekly",
    priority: route === "/" ? 1 : route.startsWith("/blog/") ? 0.7 : 0.8,
  }));
}
