import boto3
from boto3.dynamodb.conditions import Key, Attr
import datetime

# Initialize the DynamoDB client
dynamodb = boto3.resource('dynamodb')

# Specify the table name
table_name = 'transactions'

# Get a reference to the table
table = dynamodb.Table(table_name)

# Define the item to be written
item = {
    "category": "Food",
    "user_id": "1",
    "description": "Chipotle",
    "price": "12",
    "timestamp": str(datetime.datetime.now())
}

# # Write the item to the table
# response = table.put_item(Item=item)

# # Check the response
# if response['ResponseMetadata']['HTTPStatusCode'] == 200:
#     print("Item successfully written to DynamoDB")
# else:
#     print("Error writing item to DynamoDB")


r = table.scan(
    FilterExpression=Attr('category').eq("Food")
)
items = r['Items']
print(items)
print(len(items))

