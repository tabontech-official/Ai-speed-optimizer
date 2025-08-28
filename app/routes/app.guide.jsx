import {
  Page,
  Layout,
  Card,
  Text,
  BlockStack,
  InlineStack,
  Button,
  Badge,
  Collapsible,
  MediaCard,
  VideoThumbnail,
  Loading,
  Frame,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useState } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import {
  LogoYoutubeIcon,
  SendIcon,
  LiveIcon,
} from "@shopify/polaris-icons";
import { useNavigate } from "@remix-run/react";

export default function GuideLine() {
  const [openCollapse, setOpenCollapse] = useState(false);
  const toggleCollapse = () => setOpenCollapse(!openCollapse);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/app/help-center");
  };

  const handleRequestClick = () => {
    window.open(
      "https://docs.google.com/forms/d/1bV_XuuTn-qoF6WWVr1wEgpO6iC2E6Yrix0HHR4dCiaU/viewform",
      "_blank"
    );
  };

  return (
    <Frame>
      <Page fullWidth>
        <Loading />
        <TitleBar title="AI Speed Optimizer – Guide" />

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
                Setup Guide
              </Text>
              <Text tone="subdued">
                Learn how to enable app embeds, activate optimization, and get
                the most out of AI Speed Optimizer. For more help, contact us at{" "}
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
              <MediaCard
                title="How to Enable Optimization?"
                primaryAction={{
                  content: "Watch now",
                  onAction: () =>
                    window.open(
                      "https://www.youtube.com/watch?v=exampleVideoId",
                      "_blank"
                    ),
                }}
                description="See how AI Speed Optimizer boosts your theme speed. Learn how to enable the app embed, preview changes, and publish them safely."
                popoverActions={[{ content: "Dismiss", onAction: () => {} }]}
              >
                <VideoThumbnail
                  videoLength={127}
                  thumbnailUrl="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
                  onClick={() =>
                    window.open(
                      "https://www.youtube.com/watch?v=exampleVideoId",
                      "_blank"
                    )
                  }
                />
              </MediaCard>

              <div style={{ borderTop: "1px solid #E3E3E3" }}>
                <button
                  style={{
                    background: "none",
                    border: "none",
                    width: "100%",
                    textAlign: "left",
                    padding: "16px",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  onClick={toggleCollapse}
                >
                  <Text variant="bodyMd" fontWeight="medium">
                    Steps: How to Enable AI Speed Optimizer?
                  </Text>

                  <span style={{ fontSize: "16px" }}>
                    {openCollapse ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
                  </span>
                </button>

                <Collapsible open={openCollapse}>
                  <BlockStack gap="100" style={{ padding: "0 16px 16px 16px" }}>
                    <Text tone="subdued">
                      1. Go to your <strong>Shopify Admin</strong> dashboard.
                      <br />
                      2. Open <strong>AI Speed Optimizer</strong> app from the
                      Apps menu.
                      <br />
                      3. Choose <strong>Enable Optimization</strong> to push the
                      lightweight embed into your theme.
                      <br />
                      4. Go to{" "}
                      <strong>Online Store → Themes → Customize</strong>.
                      <br />
                      5. In the left sidebar, open{" "}
                      <strong>App embeds</strong> and enable{" "}
                      <strong>AI Speed Optimizer</strong>.
                      <br />
                      6. Click <strong>Save</strong> to publish the changes.
                      <br />
                      7. Your store is now optimized with lazy-loading,
                      compressed assets, and faster load times.
                    </Text>
                  </BlockStack>
                </Collapsible>
              </div>
            </Layout.Section>

            <Layout.Section>
              <Card>
                <div style={{ padding: "16px" }}>
                  <div style={{ marginBottom: "16px" }}>
                    <Text variant="headingMd" fontWeight="bold">
                      Need help?
                    </Text>
                  </div>

                  <div style={{ marginBottom: "12px" }}>
                    <Text tone="subdued">
                      Email{" "}
                      <a href="mailto:support@aispeedoptimizer.com">
                        support@aispeedoptimizer.com
                      </a>{" "}
                      or use{" "}
                      <a
                        href="/contact"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        our contact form
                      </a>
                    </Text>
                  </div>

                  <div style={{ marginBottom: "24px" }}>
                    <Text tone="subdued" size="small">
                      We’re a dedicated team working to keep your store fast.
                      Please allow some time for replies ♥
                    </Text>
                  </div>

                  <InlineStack gap="200" wrap>
                    <Button size="slim" icon={LogoYoutubeIcon}>
                      Youtube Tutorials
                    </Button>

                    {/* <Button size="slim" onClick={handleRequestClick} icon={SendIcon}>
                      Request Feature
                    </Button> */}

                    <Button size="slim" icon={LiveIcon} onClick={handleClick}>
                      FAQ
                    </Button>
                  </InlineStack>
                </div>
              </Card>
            </Layout.Section>
          </Layout>
        </div>
      </Page>
    </Frame>
  );
}
