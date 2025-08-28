// api to get first time generated report from App data base

import { json } from '@remix-run/node'; // Import Remix's json helper
import db from "../db.server"

export const loader = async ({ request }) => {
  const storeUrl = request.headers.get("X-Shopify-Shop-Domain");

  const fullUrl = `https://${storeUrl}`;

  try {
    const report = await db.currentReport.findUnique({
      where: { storeUrl: fullUrl },
    });

    if (!report) {
      return new Response("Report not found", { status: 404 });
    }

    const parsedReport = JSON.parse(report.report); // Parse the saved report

    return json({
      pageSpeedScore: parsedReport.lighthouseResult.categories.performance.score * 100, // Lighthouse score is typically 0-1
      metrics: {
        firstContentfulPaint:
          (parsedReport.lighthouseResult.audits["first-contentful-paint"]
            .numericValue / 1000).toFixed(2), // Convert to seconds
        largestContentfulPaint:
          (parsedReport.lighthouseResult.audits["largest-contentful-paint"]
            .numericValue / 1000).toFixed(2), // Convert to seconds
        totalBlockingTime:
          (parsedReport.lighthouseResult.audits["total-blocking-time"]
            .numericValue / 1000).toFixed(2), // Convert to seconds
        cumulativeLayoutShift:
          parsedReport.lighthouseResult.audits["cumulative-layout-shift"]
            .numericValue, // CLS is already a unitless score
        speedIndex:
          (parsedReport.lighthouseResult.audits["speed-index"].numericValue /
            1000).toFixed(2), // Convert to seconds
      },
    });
  } catch (error) {
    console.error("Error fetching report:", error);
    return new Response("Error fetching report", { status: 500 });
  }
};
