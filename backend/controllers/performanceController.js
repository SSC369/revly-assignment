import axios from "axios";
import dotenv from "dotenv";
dotenv.configDotenv();

const API_KEY = process.env.GOOGLE_API_KEY;
export const analyzePerformance = async (req, res) => {
  const { url } = req.body;
  console.log(API_KEY);

  try {
    const response = await axios.get(
      "https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed?category=BEST_PRACTICES&category=SEO&category=ACCESSIBILITY&category=PERFORMANCE&strategy=DESKTOP",
      {
        params: {
          url: url,
          key: API_KEY,
          strategy: "desktop", // or 'mobile'
        },
      }
    );

    const data = response.data;

    const categories = data.lighthouseResult?.categories || {};
    const audits = data.lighthouseResult?.audits || {};

    const performanceScore = (categories.performance?.score ?? 0) * 100;
    const accessibilityScore = (categories.accessibility?.score ?? 0) * 100;
    const bestPracticesScore = (categories["best-practices"]?.score ?? 0) * 100;
    const seoScore = (categories.seo?.score ?? 0) * 100;

    const totalRequests =
      audits["network-requests"]?.details?.items?.length ?? 0;
    const totalRequestSize = audits["total-byte-weight"]?.numericValue ?? 0;
    const pageLoadTime = audits["speed-index"]?.numericValue ?? 0;

    res.status(200).json({
      success: true,
      data: {
        url,
        performanceScore,
        accessibilityScore,
        bestPracticesScore,
        seoScore,
        totalRequests,
        totalRequestSize,
        pageLoadTime,
      },
    });
  } catch (error) {
    console.log(error);
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Failed to analyze website performance",
    });
  }
};
