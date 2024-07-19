import boto3
from boto3.dynamodb.conditions import Key, Attr
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import datetime
from decimal import Decimal


app = Flask(__name__)
CORS(app)




# Initialize the DynamoDB client
dynamodb = boto3.resource('dynamodb')

# Specify the table name
table_name = 'transactions'

# Get a reference to the table
table = dynamodb.Table(table_name)

# Define the item to be written
item2 = {
    "category": "Food",
    "user_id": "1",
    "description": "Voyager Coffee",
    "price": Decimal(5.50),
    "timestamp": str(datetime.datetime.now())
}

@app.route('/upload', methods=['POST'])
def upload():
    try:
        # Parse JSON data from the request
        item = request.get_json()
        item["timestamp"] = str(datetime.datetime.now())
        item["user_id"] = "1"
        item["price"] = Decimal(item["price"])
        if item["date"] == "":
            item["date"] = str(datetime.datetime.now())
        else:
            item["date"] = item["date"].replace("T"," ")
        print("Uploading item: "+str(item))
        # Write the item to the DynamoDB table
        response = table.put_item(Item=item)

        # Check the response
        if response['ResponseMetadata']['HTTPStatusCode'] == 200:
            print("Item successfully written to DynamoDB")
            return jsonify({"message": "Item successfully written to DB"}), 200
        else:
            print("Error writing item to DynamoDB")
            return jsonify({"message": "Error writing item to DB"}), 500
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"message": "An error occurred", "error": str(e)}), 500

@app.route('/getItems', methods=['GET'])
def get_items():
    user_id = request.args.get('user_id', type=int)
    category = request.args.get('category', type=str)
    min_price = request.args.get('min_price', type=Decimal)
    max_price = request.args.get('max_price', type=Decimal)

    r = table.scan(
        FilterExpression=
        Attr('user_id').eq(str(user_id))
        & Attr('category').eq(str(category))
        & Attr('price').between(min_price, max_price)
    )
    items = r['Items']
    # print(items)
    return jsonify(items)

if __name__ == '__main__':
    app.run(debug=True)

