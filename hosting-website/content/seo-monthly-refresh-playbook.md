# SEO Monthly Refresh Playbook

## 1) Pull source data

- Google Search Console: pages + queries report (last 28 days and previous 28 days).
- Analytics: organic sessions, key events, and conversion paths.
- CRM/order data: qualified inquiries and completed orders from organic traffic.

## 2) Update KPI tracker

- Use `content/seo-kpi-tracker-template.csv`.
- Fill one row per priority page each month.
- Compare month-over-month movement for impressions, CTR, average position, and conversion rate.

## 3) Refresh triggers

- Position is 8-20 with strong impressions: improve title tag and intro section to increase CTR.
- CTR is below page average: test new title/meta with clearer US intent wording.
- Traffic is rising but leads are flat: strengthen CTA placement and add trust proof near CTA.
- Leads are high but unqualified: tighten page promise and pre-qualification copy.

## 4) Monthly optimization checklist

- Update top 3 underperforming money pages.
- Update top 2 blog posts with new internal links to current money pages.
- Add one new FAQ block for repeated sales/support questions.
- Check all new pages are present in `app/sitemap.ts`.
- Verify noindex routes remain excluded (`/admin`, `/order-sent`, `/email`).

## 5) Quarterly review

- Keep only winning keywords in primary page targets.
- Merge or prune pages with low impressions and zero assisted conversions after 90 days.
- Expand builder-specific pages based on query data (tools and phrasing users actually search).
