module.exports = async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.status(200).end();
    return;
  }

  // Only allow GET requests
  if (req.method !== "GET") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");

    res.status(200).json({
      status: "OK",
      message: "BOUESTI Chatbot API is running on Vercel",
      timestamp: new Date().toISOString(),
      environment: "production",
      node_version: process.version,
      openai_configured: !!process.env.OPENAI_API_KEY,
    });
  } catch (error) {
    console.error("Error in health API:", error);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(500).json({
      status: "ERROR",
      message: "Health check failed",
      error: error.message,
    });
  }
};
