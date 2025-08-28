// api to get Optimized report from App data base
import { json } from "@remix-run/node";
import db from "../db.server";

export const loader = async ({ request }) => {
  const storeUrl = request.headers.get("X-Shopify-Shop-Domain");

  const fullUrl = `https://${storeUrl}`;

  try {
    const report = await db.optimizedReport.findUnique({
      where: { storeUrl: fullUrl },
    });

    if (!report) {
      return new Response("Report not Found", { status: 400 });
    }

    const parsedReport = JSON.parse(report.report);

    return json({
      pageSpeedScore:
        parsedReport.lighthouseResult.categories.performance.score * 100,
      metrics: {
        firstContentfulPaint: (
          parsedReport.lighthouseResult.audits["first-contentful-paint"]
            .numericValue / 1000
        ).toFixed(2), // Convert to seconds
        largestContentfulPaint: (
          parsedReport.lighthouseResult.audits["largest-contentful-paint"]
            .numericValue / 1000
        ).toFixed(2),
        totalBlockingTime:
          parsedReport.lighthouseResult.audits[
            "total-blocking-time"
          ].numericValue.toFixed(2),
        cumulativeLayoutShift:
          parsedReport.lighthouseResult.audits["cumulative-layout-shift"]
            .numericValue,
        speedIndex: (
          parsedReport.lighthouseResult.audits["speed-index"].numericValue /
          1000
        ).toFixed(2),
      },
      updatedAt: report.updatedAt,
    });
  } catch (error) {
    console.error("Error fetching report:", error);
    return new Response("Error fetching report", { status: 500 });
  }
};
