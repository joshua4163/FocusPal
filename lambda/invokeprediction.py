import json
import boto3
import os

def respond(status_code, body_dict):
    return {
        "statusCode": status_code,
        "headers": {
            "Access-Control-Allow-Origin": "*",  # Change to your domain if needed
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        "body": json.dumps(body_dict)
    }

def lambda_handler(event, context):
    try:
        # Handle CORS preflight
        if event.get("requestContext", {}).get("http", {}).get("method") == "OPTIONS":
            return respond(200, {"message": "CORS preflight passed"})

        body = event.get('body')
        if isinstance(body, str):
            body = json.loads(body)

        features = body.get("features")
        if not features:
            return respond(400, {"error": "Missing 'features' in request"})

        # 🧠 Call SageMaker endpoint
        runtime = boto3.client('sagemaker-runtime')
        endpoint_name = os.environ.get('SAGEMAKER_ENDPOINT') or "focuspal-automl-endpoint"
        payload = ",".join(map(str, features))

        response = runtime.invoke_endpoint(
            EndpointName=endpoint_name,
            ContentType="text/csv",
            Body=payload
        )

        result = response['Body'].read().decode("utf-8").strip()
        return respond(200, {"prediction": result})

    except Exception as e:
        return respond(500, {"error": str(e)})
