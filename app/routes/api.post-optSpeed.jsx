//Api to post data  in a database after the speed is optimized
import { json } from "@remix-run/node";
import { sendToGoogleInsights } from "../utils/insight";

export async function action({ request }) {
  try {
    const shopUrl = request.headers.get("X-Shopify-Shop-Domain");

    if (!shopUrl) {
      throw json({ error: "Url is missing" }, { status: 400 });
    }
    const response = await sendToGoogleInsights(shopUrl);
    return response;
  } catch (error) {
    return json(
      { error: "Something went wrong", details: error.message },
      { status: 500 },
    );
  }
}
