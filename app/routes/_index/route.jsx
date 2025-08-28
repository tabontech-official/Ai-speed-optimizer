import { redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { login } from "../../shopify.server";

export const loader = async ({ request }) => {
  const url = new URL(request.url);

  if (url.searchParams.get("shop")) {
    throw redirect(`/app?${url.searchParams.toString()}`);
  }

  return { showForm: Boolean(login) };
};

export default function IndexPage() {
  const { showForm } = useLoaderData();

  return (
    <div
      style={{
        fontFamily: "Inter, sans-serif",
        background: "#f9fafb",
        minHeight: "98vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h2
          style={{
            fontSize: "1.1rem",
            fontWeight: "600",
            marginBottom: "15px",
          }}
        >
          AI Speed Optimizer
        </h2>
        <p
          style={{
            fontSize: "0.95rem",
            marginBottom: "20px",
            color: "#374151",
          }}
        >
          Enter your shop domain to log in or install AI Speed Optimizer.
        </p>

        {showForm && (
          <Form method="post" action="/auth/login">
            <input
              type="text"
              name="shop"
              placeholder="example.myshopify.com"
              style={{
                width: "93%",
                padding: "10px 12px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                marginBottom: "15px",
                fontSize: "0.95rem",
              }}
            />
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "#008060",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Install AI Speed Optimizer
            </button>
          </Form>
        )}
      </div>
    </div>
  );
}
