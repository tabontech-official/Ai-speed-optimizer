// import { json } from "@remix-run/node";
// import db from "../db.server";

// export async function sendToGoogleInsights(url) {
//   const apiKey = "AIzaSyCuw6GhC1CiImN8VlI94Ndcsoz0UmFZBZw";

//   const formattedUrl = url.startsWith("https://") ? url : `https://${url}`;

//   const insightsUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${formattedUrl}&key=${apiKey}`;

//   try {
//     const response = await fetch(insightsUrl);
//     const data = await response.json();

//     // Store the performance report in the database using Prisma
//     const result = await savePerformanceReport(formattedUrl, data);
//     return json(data);
//   } catch (error) {
//     console.error("Error fetching Google Insights data: ", error);
//     throw json(
//       { error: "Failed to fetch Google Insights data" },
//       { status: 500 },
//     );
//   }
// }

// // Function to save the performance report with Prisma
// async function savePerformanceReport(storeUrl, reportData) {
//   try {
//     // Check if a report already exists for the given store URL
//     const existingReport = await db.currentReport.findUnique({
//       where: { storeUrl },
//     });

//     if (existingReport) {
//       console.log(
//         "Report already exists for this store URL. Skipping save...............",
//       );
//       return existingReport; // Return the existing report if it exists
//     }

//     // If no report exists, save the new report
//     const result = await db.currentReport.create({
//       data: {
//         storeUrl,
//         report: JSON.stringify(reportData), // Convert the report data to a string
//       },
//     });
//     return result;
//   } catch (error) {
//     console.error("Error saving CurrentReport : ", error);
//     throw json({ error: "Failed to save CurrentReport" }, { status: 500 });
//   }
// }
import { json } from "@remix-run/node";
import { sendToGoogleInsights } from "../utils/api.flyinsight";

export async function action({ request }) {
  const formData = await request.formData();
  const url = formData.get("url");

  if (!url) {
    return json({ error: "URL is required" }, { status: 400 });
  }

  try {
    const data = await sendToGoogleInsights(url);
    return json(data);
  } catch (error) {
    return json({ error: error.message }, { status: 500 });
  }
}
