// src/api/getPrediction.js
export async function getPrediction() {
    try {
      const response = await fetch("https://masdlw1jvk.execute-api.us-east-1.amazonaws.com/prod/predictFocusFunction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          domain: "summary",
          timestamp: new Date().toISOString(),
          duration: 30
        })
      });
  
      const data = await response.json();
      return data.prediction || "Unavailable";
    } catch (error) {
      console.error("Prediction fetch failed:", error);
      return "Unavailable";
    }
  }
  