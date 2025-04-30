const AWS = require('aws-sdk');
const fs = require('fs');
const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile);

const dynamo = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

exports.handler = async () => {
  const params = { TableName: 'WorkSessions' };

  try {
    const result = await dynamo.scan(params).promise();

    const rows = result.Items.map(item => {
      const created = new Date(item.createdAt);
      const hour = created.getUTCHours();
      const timeOfDay =
        hour < 12 ? "morning" :
        hour < 17 ? "afternoon" : "evening";
      const duration = Math.floor(Math.random() * 30) + 5; // Simulated for now

      return `${item.url},${timeOfDay},${duration},${item.type}`;
    });

    const header = "url,timeOfDay,duration,label";
    const csvContent = [header, ...rows].join("\n");

    const fileName = `logs-${Date.now()}.csv`;
    await s3.putObject({
      Bucket: 'focuspal-ml-data',  // <--- change if you named it differently
      Key: `exports/${fileName}`,
      Body: csvContent,
      ContentType: "text/csv"
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "CSV exported to S3", file: fileName })
    };
  } catch (err) {
    console.error("Export failed:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
