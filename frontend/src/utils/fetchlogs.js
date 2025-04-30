// Updated fetchLogs.js

export async function fetchLogs() {
  try {
    const response = await fetch('https://masdlw1jvk.execute-api.us-east-1.amazonaws.com/prod/getLogsFunction');
    const data = await response.json();

    console.log("⚡ API Raw Data:", data);

    return data.logs || [];
  } catch (error) {
    console.error("Error fetching logs:", error);
    return [];
  }
}