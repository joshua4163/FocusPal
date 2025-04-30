import boto3
import csv
import io

dynamodb = boto3.resource('dynamodb')
s3 = boto3.client('s3')

TABLE_NAME = 'WorkSessions'
BUCKET_NAME = 'focuspal-ml-data'
FILE_KEY = 'focus_logs.csv'

def lambda_handler(event, context):
    table = dynamodb.Table(TABLE_NAME)
    response = table.scan()

    output = io.StringIO()
    writer = csv.writer(output)

    # Write CSV header
    writer.writerow(['url', 'timestamp', 'focus', 'distraction'])

    for item in response['Items']:
        writer.writerow([
            item.get('url', ''),
            item.get('timestamp', ''),
            item.get('focus', 0),
            item.get('distraction', 0)
        ])

    # Upload CSV to S3
    s3.put_object(
        Bucket=BUCKET_NAME,
        Key=FILE_KEY,
        Body=output.getvalue()
    )

    return {
        'statusCode': 200,
        'body': 'CSV Exported Successfully'
    }
