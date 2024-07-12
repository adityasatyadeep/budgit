import boto3
from boto3.dynamodb.conditions import Key, Attr
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import datetime


app = Flask(__name__)
CORS(app)




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
    "description": "Voyager Coffee",
    "price": "5.50",
    "timestamp": str(datetime.datetime.now())
}

@app.route('/upload', methods=['GET'])
def upload_chipotle():
    # Write the item to the table
    response = table.put_item(Item=item)

    # Check the response
    if response['ResponseMetadata']['HTTPStatusCode'] == 200:
        print("Item successfully written to DynamoDB")
    else:
        print("Error writing item to DynamoDB")
    
    return "Item successfully written to DB"

@app.route('/getItems', methods=['GET'])
def get_items():
    r = table.scan(
        FilterExpression=Attr('category').eq("Food")
    )
    items = r['Items']
    return str(items)

# r = table.scan(
#     FilterExpression=Attr('category').eq("Food")
# )
# items = r['Items']
# print(items)
# print(len(items))

if __name__ == '__main__':
    app.run(debug=True)

