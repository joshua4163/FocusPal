const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async () => {
  const params = {
    TableName: 'WorkSessions'
  };

  try {
    const result = await dynamo.scan(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ logs: result.Items })
    };
  } catch (err) {
    console.error("Error fetching logs:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to fetch logs",
        details: err.message
      })
    };
  }
};
