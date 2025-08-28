import {
  Page,
  Layout,
  Card,
  Text,
  BlockStack,
  Collapsible,
  Badge,
  Frame,
  Loading,
  SkeletonBodyText,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useState, useEffect } from "react";

export default function HelpCenter() {
  const [faqSections, setFaqSections] = useState([]);
  const [openCollapse, setOpenCollapse] = useState(null);

  const toggleCollapse = (id) => () => {
    setOpenCollapse(openCollapse === id ? null : id);
  };

  useEffect(() => {
    const fetchFaqs = async () => {
      const sampleFaqs = [
        {
          id: "1",
          title: "How does AI Speed Optimizer improve my store speed?",
          content:
            "Our app automatically optimizes theme files, lazy-loads assets, and removes unused scripts/CSS when you enable it through the theme customizer. This reduces load time and improves your store's performance scores.",
        },
        {
          id: "2",
          title: "Do I need coding knowledge to use AI Speed Optimizer?",
          content:
            "No coding is required. Once installed, simply enable the embed from your Shopify theme editor and AI Speed Optimizer will handle everything automatically.",
        },
        {
          id: "3",
          title: "Will it work with my current Shopify theme?",
          content:
            "Yes! AI Speed Optimizer is fully compatible with all Online Store 2.0 themes. It installs lightweight snippets that work universally.",
        },
        {
          id: "4",
          title: "Does it remove third-party app scripts?",
          content:
            "The app does not delete app code, but it delays or lazy-loads unused third-party scripts so they don’t block rendering. This ensures faster first paint and improved Core Web Vitals.",
        },
        {
          id: "5",
          title: "Can I preview the optimization before going live?",
          content:
            "Yes. You can preview changes inside the Shopify theme customizer before publishing them live, ensuring no design or layout issues occur.",
        },
        {
          id: "6",
          title: "Will my SEO ranking improve?",
          content:
            "Yes. Faster websites generally perform better in search rankings. AI Speed Optimizer aligns with Google’s Core Web Vitals, which are critical SEO factors.",
        },
        {
          id: "7",
          title: "Can I disable optimization later?",
          content:
            "Yes, you can disable or remove the embed at any time from your theme editor. Your store will return to its original state without any leftover heavy code.",
        },
      ];

      await new Promise((res) => setTimeout(res, 400));
      setFaqSections(sampleFaqs);
    };

    fetchFaqs();
  }, []);

  return (
    <Frame>
      {faqSections.length === 0 && <Loading />}
      <Page fullWidth>
        <TitleBar title="AI Speed Optimizer – Help Center" />

        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px",
            }}
          >
            <BlockStack gap="100">
              <Text variant="headingLg" fontWeight="bold">
                Frequently Asked Questions
              </Text>
              <Text tone="subdued">
                Still have questions? Reach out at{" "}
                <a href="mailto:support@aispeedoptimizer.com">
                  support@aispeedoptimizer.com
                </a>
              </Text>
            </BlockStack>
            <Badge status="info" size="medium">
              AI Speed Optimizer
            </Badge>
          </div>

          <Layout>
            <Layout.Section>
              <Card padding="400">
                <div style={{ marginTop: "12px" }}>
                  {faqSections.length === 0 ? (
                    <SkeletonBodyText lines={6} />
                  ) : (
                    faqSections.map((faq) => (
                      <div
                        key={faq.id}
                        style={{
                          borderBottom: "1px solid #E3E3E3",
                          padding: "16px 0",
                        }}
                      >
                        <button
                          onClick={toggleCollapse(faq.id)}
                          style={{
                            background: "none",
                            border: "none",
                            width: "100%",
                            textAlign: "left",
                            padding: "8px 0",
                            cursor: "pointer",
                          }}
                        >
                          <Text variant="headingSm" fontWeight="bold">
                            {faq.title}
                          </Text>
                        </button>
                        <Collapsible
                          open={openCollapse === faq.id}
                          id={faq.id}
                          transition={{
                            duration: "150ms",
                            timingFunction: "ease-in-out",
                          }}
                        >
                          <div style={{ padding: "8px 0" }}>
                            <Text tone="subdued">{faq.content}</Text>
                          </div>
                        </Collapsible>
                      </div>
                    ))
                  )}
                </div>
              </Card>
            </Layout.Section>
          </Layout>
        </div>
      </Page>
    </Frame>
  );
}
