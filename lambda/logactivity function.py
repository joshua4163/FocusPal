const https = require('https');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const OPENSEARCH_ENDPOINT = 'https://search-focuspal-domain-tbbig5hcwvzo2qisrvqxy6d5su.aos.us-east-1.on.aws';
const INDEX_NAME = 'worksessions';

const runtime = new AWS.SageMakerRuntime();
const ENDPOINT_NAME = 'focuspal-autopilot-endpoint'; // ✅ Your real SageMaker endpoint

exports.handler = async (event) => {
  try {
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body || {};

    const url = body.url || "unknown";

    // 🧠 Step 1: Predict Focus/Distraction
    const prediction = await getFocusDistraction(url);

    // 📝 Step 2: Create document
    const document = {
      sessionId: uuidv4(),
      createdAt: new Date().toISOString(),
      userId: body.userId || "anonymous",
      url: url,
      type: body.type || "unknown",
      focus: prediction.focus,
      distraction: prediction.distraction
    };

    const payload = JSON.stringify(document);

    // 📦 Step 3: Insert into OpenSearch
    const result = await sendToOpenSearch(payload);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: '✅ Successfully logged activity to OpenSearch!',
        document,
        opensearchResponse: result
      }),
    };
  } catch (error) {
    console.error('❌ Lambda Handler Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Lambda Execution Failed',
        details: error.message || String(error)
      }),
    };
  }
};

// 🧠 Corrected: Call SageMaker endpoint and handle plain text response
async function getFocusDistraction(url) {
  const response = await runtime.invokeEndpoint({
    EndpointName: ENDPOINT_NAME,
    ContentType: 'text/csv',
    Body: `${url},30,1` // Send 3 columns
  }).promise();

  const resultText = Buffer.from(response.Body).toString('utf8').trim();

  // Interpret the plain text output manually
  if (resultText.toLowerCase().includes('focus')) {
    return { focus: 1, distraction: 0 };
  } else {
    return { focus: 0, distraction: 1 };
  }
}

// 📦 Upload document into OpenSearch
function sendToOpenSearch(payload) {
  const url = new URL(`${OPENSEARCH_ENDPOINT}/${INDEX_NAME}/_doc`);

  const username = 'admin'; // <-- OpenSearch username
  const password = 'FocusPal2025!'; // <-- OpenSearch password

  const auth = Buffer.from(`${username}:${password}`).toString('base64');

  const options = {
    method: 'POST',
    hostname: url.hostname,
    path: url.pathname,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${auth}`,
      'Host': url.hostname
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(data));
        } else {
          console.error('❌ OpenSearch Error:', data);
          reject(new Error(`OpenSearch Error: ${res.statusCode} - ${data}`));
        }
      });
    });

    req.on('error', (e) => {
      console.error('❌ HTTPS Request Error:', e);
      reject(new Error('Failed HTTPS request to OpenSearch'));
    });

    req.write(payload);
    req.end();
  });
}
