import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hostera24.com";

const publicRoutes: Array<{
  path: string;
  changeFrequency: "weekly" | "monthly";
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/website-deployment-service", changeFrequency: "weekly", priority: 0.9 },
  { path: "/full-stack-hosting", changeFrequency: "weekly", priority: 0.9 },
  { path: "/contact", changeFrequency: "weekly", priority: 0.8 },
  { path: "/about-us", changeFrequency: "monthly", priority: 0.7 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.75 },
  {
    path: "/blog/how-to-host-lovable-website",
    changeFrequency: "monthly",
    priority: 0.72,
  },
  {
    path: "/blog/how-to-deploy-cursor-built-website",
    changeFrequency: "monthly",
    priority: 0.72,
  },
  {
    path: "/blog/claude-code-website-deployment-checklist",
    changeFrequency: "monthly",
    priority: 0.72,
  },
  {
    path: "/blog/how-to-host-ai-generated-website-without-coding",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/blog/domain-vs-hosting-for-non-technical-founders",
    changeFrequency: "monthly",
    priority: 0.65,
  },
  {
    path: "/blog/website-deployment-checklist-before-you-send-files",
    changeFrequency: "monthly",
    priority: 0.65,
  },
  {
    path: "/blog/how-long-does-website-deployment-take",
    changeFrequency: "monthly",
    priority: 0.65,
  },
  {
    path: "/blog/best-way-to-launch-small-business-website-in-24-hours",
    changeFrequency: "monthly",
    priority: 0.65,
  },
  { path: "/privacy-policy", changeFrequency: "monthly", priority: 0.4 },
  { path: "/terms-and-conditions", changeFrequency: "monthly", priority: 0.4 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return publicRoutes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
