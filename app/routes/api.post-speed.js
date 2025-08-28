//Api to post data  in a database after the speed is optimized
import { json } from "@remix-run/node";
import { sendToGoogleInsights } from "../utils/api.flyinsight";
export async function action({ request }) {
    try {
        const shopUrl = request.headers.get("X-Shopify-Shop-Domain");
        
        

        if (!shopUrl) {
            throw json({ error: "URL is required" }, { status: 400 });
        }

        // Again the sendToGoogleInsights function is defined in the api.insight file
        const response = await sendToGoogleInsights(shopUrl);
        return response; 
    } catch (error) {
        return json({ error: "Something went wrong", details: error.message }, { status: 500 });
    }
}
