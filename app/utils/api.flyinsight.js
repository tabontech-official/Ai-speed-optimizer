import db from "../db.server";

export async function sendToGoogleInsights(url) {
  const apiKey = process.env.GOOGLE_INSIGHTS_KEY || "AIzaSyCuw6GhC1CiImN8VlI94Ndcsoz0UmFZBZw";

  const formattedUrl = url.startsWith("https://") ? url : `https://${url}`;
  const insightsUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${formattedUrl}&key=${apiKey}`;

  try {
    const response = await fetch(insightsUrl);
    const data = await response.json();
    await savePerformanceReport(formattedUrl, data);
    return data;
  } catch (error) {
    console.error("Error fetching Google Insights data: ", error);
    throw new Error("Failed to fetch Google Insights data");
  }
}

async function savePerformanceReport(storeUrl, reportData) {
  try {
    const existingReport = await db.currentReport.findUnique({ where: { storeUrl } });

    if (existingReport) {
      return existingReport;
    }

    return db.currentReport.create({
      data: { storeUrl, report: JSON.stringify(reportData) },
    });
  } catch (error) {
    console.error("Error saving CurrentReport: ", error);
    throw new Error("Failed to save CurrentReport");
  }
}
