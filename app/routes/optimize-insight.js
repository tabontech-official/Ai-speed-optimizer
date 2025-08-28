import { json } from "@remix-run/node";
import db from '../db.server'
export async function sendToGoogleInsights(url) {
  const apiKey = "AIzaSyCuw6GhC1CiImN8VlI94Ndcsoz0UmFZBZw";

  const formattedUrl = url.startsWith("https://") ? url : `https://${url}`;

  const insightsUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${formattedUrl}&key=${apiKey}`;

  try {
    const response = await fetch(insightsUrl);
    const data = await response.json();

    const result = await savePerformanceReport(formattedUrl, data);
    return json(data);
    
  } catch (error) {
    console.error("Error fetching Google Insights data:", error);
    throw json(
      { error: "Failed to fetch Google Insights data" },
      { status: 500 },
    );
  }
}

async function savePerformanceReport(storeUrl, reportData) {
  try {
    const existingReport = await db.optimizedReport.findUnique({
      where: { storeUrl },
    });
    if (existingReport) {
      const updatedReport = await db.optimizedReport.update({
        where: { storeUrl },
        data: {
          report: JSON.stringify(reportData),
        },
      });
      return updatedReport;
    }
    const result = await db.optimizedReport.create({
      data: {
        storeUrl,
        report: JSON.stringify(reportData),
      },
    });
    return result;
  } catch (error) {
    console.error("Error saving OptimizedReport:", error);
    throw json({ error: "Failed to save OptimizedReport" }, { status: 500 });
  }
}
