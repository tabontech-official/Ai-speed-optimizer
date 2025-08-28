import {
  Card,
  Page,
  Button,
  Badge,
  Popover,
  Layout,
  Banner,
  ActionList,
  Link,
  Text,
  Spinner,
  Box,
} from "@shopify/polaris";
import ReactSpeedometer from "react-d3-speedometer";
import { useCallback, useState, useEffect } from "react";
import { Divider } from "@mui/material";
export default function Home() {
  const [isCurrentLoading, setIsCurrentLoading] = useState(false);
  const [isOptLoading, setIsOptLoading] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);
  const [active, setActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Standard View");
  const handleSelect = (option) => {
    setSelectedOption(option);
    setActive(false); // Close the Popover
  };
   const handleEmailClick = () => {
    window.open("mailto:support@aispeedoptimizer.com", "_blank");
  };

  const activator = (
    <Button disclosure="select" onClick={toggleActive}>
      {selectedOption}
    </Button>
  );
  const [pageSpeedScore, setPageSpeedScore] = useState(null);
  const [performanceMetrics, setPerformanceMetrics] = useState(null);

  const [pageOptSpeedScore, setPageOptSpeedScore] = useState(null);
  const [optPerformanceMetrics, setOptPerformanceMetrics] = useState(null);
  const [cachedData, setCachedData] = useState(null);

  // for current report
  // automatically trigger the post and get on first page load to get report of current spped before optimization
  useEffect(() => {
    //post for current report(old record)
    const postSpeedData = async () => {
      setIsCurrentLoading(true);
      if (localStorage.getItem("speedDataPosted")) {
        console.log("Speed data already posted, skipping POST request.");
        fetchSpeedData();
        return;
      }

      try {
        const response = await fetch("/api/post-speed", {
          method: "POST",
          headers: {
            "X-Shopify-Shop-Domain": window.location.hostname,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to post speed data");
        }
        console.log("Speed data posted successfully");

        localStorage.setItem("speedDataPosted", "true");

        fetchSpeedData();
      } catch (error) {
        console.error("Error posting speed data:", error);
        setIsCurrentLoading(false); // Stop the spinner in case of error
      }
    };
    //get for current report(old record)
    const fetchSpeedData = async () => {
      try {
        const response = await fetch("/api/get-speed", {
          method: "GET",
          headers: {
            "X-Shopify-Shop-Domain": window.location.hostname,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Fetched Data:", data);

          if (data.pageSpeedScore !== undefined && data.metrics !== undefined) {
            setPageSpeedScore(data.pageSpeedScore);
            setPerformanceMetrics(data.metrics);
          } else {
            console.error("Invalid data structure:", data);
          }
        } else {
          console.error("Failed to fetch speed data");
        }
      } catch (error) {
        console.error("Error fetching speed data:", error);
      } finally {
        setIsCurrentLoading(false);
      }
    };

    postSpeedData();
  }, []);

  // post api for optimized speed record ( triggered by button click)
  const postOptSpeedData = async () => {
    setIsOptLoading(true);
    try {
      const response = await fetch("/api/post-optSpeed", {
        method: "POST",
        headers: {
          "X-Shopify-Shop-Domain": window.location.hostname,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to post OPT-Speed Data");
      }

      console.log("OPT-Speed Data posted successfully");

      await fetchOptSpeedData(true);
    } catch (error) {
      console.error("Error posting OPT-Speed Data:", error);
    } finally {
      setIsOptLoading(false);
    }
  };

  //get api integration for optimized speed record
  const fetchOptSpeedData = async (forceFetch = false) => {
    if (!forceFetch && cachedData) {
      console.log("Using cached data:", cachedData);
      setPageOptSpeedScore(cachedData.pageSpeedScore);
      setOptPerformanceMetrics(cachedData.metrics);
      return;
    }

    try {
      const response = await fetch("/api/get-optSpeed", {
        method: "GET",
        headers: {
          "X-Shopify-Shop-Domain": window.location.hostname,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Fetched Data:", data);

        if (data.pageSpeedScore !== undefined && data.metrics !== undefined) {
          setPageOptSpeedScore(data.pageSpeedScore);
          setOptPerformanceMetrics(data.metrics);

          setCachedData(data);
        } else {
          console.error("Invalid data structure:", data);
        }
      } else {
        console.error("Failed to fetch speed data");
      }
    } catch (error) {
      console.error("Error fetching speed data:", error);
    }
  };

  useEffect(() => {
    setIsOptLoading(true);
    fetchOptSpeedData();
    setIsOptLoading(false);
  }, []);

  return (
    <div>
      {/* //Navbae */}
      <div>{/* <NavBar /> */}</div>
      {/* Main Content */}
      <Page>
        <div>
          <Card>
            {/* main div of the Card */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "40px",
                paddingTop: "20px",
                paddingBottom: "20px",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text>
                  <h1 style={{ fontWeight: "800", fontSize: "16px" }}>
                    You Successfully Improved Your Speed!
                  </h1>
                </Text>
                <Text>
                  <h1>
                    You Successfully increased Your page Score and can check the
                    live Result here
                  </h1>
                </Text>
              </div>

              {/* div for speedometer */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "40px",
                      alignItems: "center",
                      justifyContent: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    {/* speedometer 1 */}
                    <Box>
                      <ReactSpeedometer
                        maxValue={100}
                        value={pageSpeedScore || 0}
                        currentValueText="UnOptimized Score"
                      />
                      {isCurrentLoading ? (
                        <div
                          style={{
                            marginTop: "-40%",
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <Spinner
                            accessibilityLabel="Loading speed data"
                            size="small"
                          />
                          <Text>Loaading Current Speed....</Text>
                        </div>
                      ) : (
                        <div
                          style={{
                            marginTop: "-40%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text>
                            <h1 style={{ fontWeight: "900", fontSize: "18px" }}>
                              {pageSpeedScore || 0}
                            </h1>
                          </Text>
                        </div>
                      )}
                    </Box>

                    {/* option button */}
                    <Box>
                      <Popover
                        active={active}
                        activator={activator}
                        onClose={toggleActive}
                      >
                        <ActionList
                          items={[
                            {
                              content: "Standard View",
                              onAction: () => handleSelect("Standard View"),
                            },
                            {
                              content: "Expert View",
                              onAction: () => handleSelect("Expert View"),
                            },
                          ]}
                        />
                      </Popover>
                    </Box>

                    {/* speedometer 2 */}
                    <Box>
                      <ReactSpeedometer
                        maxValue={100}
                        value={pageOptSpeedScore || 0}
                        currentValueText="Optimized Score"
                      />
                      {isOptLoading ? (
                        <div
                          style={{
                            marginTop: "-40%",
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <Spinner
                            accessibilityLabel="Loading speed data"
                            size="small"
                          />
                          <Text>Loaading Optimized Speed....</Text>
                        </div>
                      ) : (
                        <div
                          style={{
                            marginTop: "-40%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text>
                            <h1 style={{ fontWeight: "900", fontSize: "18px" }}>
                              {pageOptSpeedScore || 0}
                            </h1>
                          </Text>
                        </div>
                      )}
                    </Box>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "25px",
                    alignItems: "center",
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <h1
                      style={{
                        fontWeight: "bold",
                        display: "flex",
                        gap: "4px",
                      }}
                    >
                      Last fetched:{" "}
                      <span>
                        {cachedData?.updatedAt ? (
                          <Badge tone="success">
                            {new Date(cachedData.updatedAt).toLocaleString()}
                          </Badge>
                        ) : (
                          <Badge tone="warning">Yet Not Fetched</Badge>
                        )}
                      </span>
                    </h1>
                  </div>
                  <Button onClick={postOptSpeedData} disabled={isOptLoading}>
                    {isOptLoading ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          flexDirection: "row",
                          gap: "5px",
                          alignItems: "center",
                        }}
                      >
                        <Spinner
                          accessibilityLabel="Loading speed data"
                          size="small"
                        />
                        <Text>Optimizing Speed....</Text>
                      </div>
                    ) : (
                      "Optimize Your Speed"
                    )}
                  </Button>
                </div>
                {/* <div>
    {isOptLoading && (
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
        <Spinner accessibilityLabel="Loading speed data" size="large" />
        <Text>Checking Speed....</Text>
      </div>
    )}
  </div> */}

                <div>
                  <Text>
                    <h1>
                      Please note speed score in Shopify reports and core web
                      vitals in the Page speed can take up to 30 days to reflect
                    </h1>
                  </Text>
                </div>

                {selectedOption === "Expert View" && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                      width: "100%",
                      alignItems: "center",
                    }}
                  >
                    {/* card 1 */}
                    <div style={{}}>
                      <Layout.Section>
                        <div
                          style={{
                            border: "1px solid #D1D5DB",
                            borderRadius: "16px",
                            flexDirection: "column",
                            gap: "12px",
                            padding: "16px",
                          }}
                        >
                          <Banner title="UnOptimized Performance Report:" />
                          <div>
                            {performanceMetrics ? (
                              <div>
                                {/* Display metrics */}
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "4px",
                                    borderBottom: "1px solid #D1D5DB",
                                    padding: "8px 0",
                                  }}
                                >
                                  <h1 style={{ fontWeight: "bold" }}>
                                    First Contentful Paint:
                                  </h1>
                                  <h1>
                                    {performanceMetrics.firstContentfulPaint ||
                                      0}{" "}
                                    ms
                                  </h1>
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "4px",
                                    borderBottom: "1px solid #D1D5DB",
                                    padding: "8px 0",
                                  }}
                                >
                                  <h1 style={{ fontWeight: "bold" }}>
                                    Largest Contentful Paint:
                                  </h1>
                                  <h1>
                                    {performanceMetrics.largestContentfulPaint ||
                                      0}{" "}
                                    ms
                                  </h1>
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "4px",
                                    borderBottom: "1px solid #D1D5DB",
                                    padding: "8px 0",
                                  }}
                                >
                                  <h1 style={{ fontWeight: "bold" }}>
                                    Total Blocking Time:
                                  </h1>
                                  <h1>
                                    {performanceMetrics.totalBlockingTime || 0}{" "}
                                    s
                                  </h1>
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "4px",
                                    borderBottom: "1px solid #D1D5DB",
                                    padding: "8px 0",
                                  }}
                                >
                                  <h1 style={{ fontWeight: "bold" }}>
                                    Cumulative Layout Shift:
                                  </h1>
                                  <h1>
                                    {performanceMetrics.cumulativeLayoutShift ||
                                      0}
                                  </h1>
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "4px",
                                    borderBottom: "1px solid #D1D5DB",
                                    padding: "8px 0",
                                  }}
                                >
                                  <h1 style={{ fontWeight: "bold" }}>
                                    Speed Index:
                                  </h1>
                                  <h1>
                                    {performanceMetrics.speedIndex || 0} ms
                                  </h1>
                                </div>
                              </div>
                            ) : (
                              <div>
                                {/* Display metrics */}
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "4px",
                                    borderBottom: "1px solid #D1D5DB",
                                    padding: "8px 0",
                                  }}
                                >
                                  <h1 style={{ fontWeight: "bold" }}>
                                    First Contentful Paint:
                                  </h1>
                                  <h1>{0} ms</h1>
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "4px",
                                    borderBottom: "1px solid #D1D5DB",
                                    padding: "8px 0",
                                  }}
                                >
                                  <h1 style={{ fontWeight: "bold" }}>
                                    Largest Contentful Paint:
                                  </h1>
                                  <h1>{0} ms</h1>
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "4px",
                                    borderBottom: "1px solid #D1D5DB",
                                    padding: "8px 0",
                                  }}
                                >
                                  <h1 style={{ fontWeight: "bold" }}>
                                    Total Blocking Time:
                                  </h1>
                                  <h1>{0} s</h1>
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "4px",
                                    borderBottom: "1px solid #D1D5DB",
                                    padding: "8px 0",
                                  }}
                                >
                                  <h1 style={{ fontWeight: "bold" }}>
                                    Cumulative Layout Shift:
                                  </h1>
                                  <h1>{0}</h1>
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "4px",
                                    borderBottom: "1px solid #D1D5DB",
                                    padding: "8px 0",
                                  }}
                                >
                                  <h1 style={{ fontWeight: "bold" }}>
                                    Speed Index:
                                  </h1>
                                  <h1>{0} ms</h1>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </Layout.Section>
                    </div>
                    {/* divider */}

                    <Divider
                      orientation="horizontal"
                      flexItem
                      style={{ height: "300px", backgroundColor: "#fff11111" }}
                    />

                    {/* card 2 */}
                    <div style={{}}>
                      <Layout.Section>
                        <div
                          style={{
                            border: "1px solid #D1D5DB",
                            borderRadius: "16px",
                            flexDirection: "column",
                            gap: "12px",
                            padding: "16px",
                          }}
                        >
                          <Banner title="Optimized Performance Report:" />
                          <div>
                            {optPerformanceMetrics ? (
                              <div>
                                {/* Display metrics */}
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "4px",
                                    borderBottom: "1px solid #D1D5DB",
                                    padding: "8px",
                                  }}
                                >
                                  <h1 style={{ fontWeight: "bold" }}>
                                    First Contentful Paint:
                                  </h1>
                                  <h1>
                                    {optPerformanceMetrics.firstContentfulPaint ||
                                      0}{" "}
                                    ms
                                  </h1>
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "4px",
                                    borderBottom: "1px solid #D1D5DB",
                                    padding: "8px 0",
                                  }}
                                >
                                  <h1 style={{ fontWeight: "bold" }}>
                                    Largest Contentful Paint:
                                  </h1>
                                  <h1>
                                    {optPerformanceMetrics.largestContentfulPaint ||
                                      0}{" "}
                                    ms
                                  </h1>
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "4px",
                                    borderBottom: "1px solid #D1D5DB",
                                    padding: "8px 0",
                                  }}
                                >
                                  <h1 style={{ fontWeight: "bold" }}>
                                    Total Blocking Time:
                                  </h1>
                                  <h1>
                                    {optPerformanceMetrics.totalBlockingTime ||
                                      0}{" "}
                                    s
                                  </h1>
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "4px",
                                    borderBottom: "1px solid #D1D5DB",
                                    padding: "8px 0",
                                  }}
                                >
                                  <h1 style={{ fontWeight: "bold" }}>
                                    Cumulative Layout Shift:
                                  </h1>
                                  <h1>
                                    {optPerformanceMetrics.cumulativeLayoutShift ||
                                      0}
                                  </h1>
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "4px",
                                    borderBottom: "1px solid #D1D5DB",
                                    padding: "8px 0",
                                  }}
                                >
                                  <h1 style={{ fontWeight: "bold" }}>
                                    Speed Index:
                                  </h1>
                                  <h1>
                                    {optPerformanceMetrics.speedIndex || 0} ms
                                  </h1>
                                </div>
                              </div>
                            ) : (
                              <div>
                                {/* Display metrics */}
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "4px",
                                    borderBottom: "1px solid #D1D5DB",
                                    padding: "8px",
                                  }}
                                >
                                  <h1 style={{ fontWeight: "bold" }}>
                                    First Contentful Paint:
                                  </h1>
                                  <h1>{0} ms</h1>
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "4px",
                                    borderBottom: "1px solid #D1D5DB",
                                    padding: "8px 0",
                                  }}
                                >
                                  <h1 style={{ fontWeight: "bold" }}>
                                    Largest Contentful Paint:
                                  </h1>
                                  <h1>{0} ms</h1>
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "4px",
                                    borderBottom: "1px solid #D1D5DB",
                                    padding: "8px 0",
                                  }}
                                >
                                  <h1 style={{ fontWeight: "bold" }}>
                                    Total Blocking Time:
                                  </h1>
                                  <h1>{0} s</h1>
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "4px",
                                    borderBottom: "1px solid #D1D5DB",
                                    padding: "8px 0",
                                  }}
                                >
                                  <h1 style={{ fontWeight: "bold" }}>
                                    Cumulative Layout Shift:
                                  </h1>
                                  <h1>{0}</h1>
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "4px",
                                    borderBottom: "1px solid #D1D5DB",
                                    padding: "8px 0",
                                  }}
                                >
                                  <h1 style={{ fontWeight: "bold" }}>
                                    Speed Index:
                                  </h1>
                                  <h1>{0} ms</h1>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </Layout.Section>
                    </div>
                  </div>
                )}
              </div>

              {/* div for inner cards */}

              {/* <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '40px' }}> */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: "20px",
                  width: "100%",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                {/* card 1 */}
                <div>
                  <Card>
                    <div
                      style={{
                        display: "flex",
                        gap: "56px",
                        paddingTop: "32px",
                        paddingBottom: "32px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div>
                          <Text>
                            <h1 style={{ fontWeight: "800" }}>Guide</h1>
                          </Text>
                        </div>
                      </div>
                      <div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <Text>
                            <Link url="/app/guide">
                              <h1>Go to guide</h1>
                            </Link>
                          </Text>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
                {/* card  2 */}
                <div>
                  <Card>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div>
                          <Text>
                            <h1 style={{ fontWeight: "800" }}>Questions?</h1>
                          </Text>
                        </div>
                        {/* <div>
                          <Badge tone="success">Not Optimized</Badge>
                        </div> */}
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text>
                          <h1>
                            If the results are not as expected, please contact
                            us
                          </h1>
                        </Text>
                      </div>

                      <div style={{ display: "flex", gap: "8px" }}>
                        <Button onClick={handleEmailClick}>E-mail us</Button>
                        <Button>Join Stack</Button>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
              {/* </div> */}
            </div>
          </Card>
        </div>
      </Page>
    </div>
  );
}
