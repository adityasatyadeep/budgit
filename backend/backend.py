import boto3
from boto3.dynamodb.conditions import Key, Attr
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from datetime import datetime
import pytz
from decimal import Decimal
from dateutil import parser

import json
from os import environ as env
from urllib.parse import quote_plus, urlencode

from authlib.integrations.flask_client import OAuth
from dotenv import find_dotenv, load_dotenv
from flask import Flask, redirect, render_template, session, url_for

app = Flask(__name__)
CORS(app)


ENV_FILE = find_dotenv()
if ENV_FILE:
    load_dotenv(ENV_FILE)

app.secret_key = env.get("APP_SECRET_KEY")

oauth = OAuth(app)

oauth.register(
    "auth0",
    client_id=env.get("AUTH0_CLIENT_ID"),
    client_secret=env.get("AUTH0_CLIENT_SECRET"),
    client_kwargs={
        "scope": "openid profile email",
    },
    server_metadata_url=f'https://{env.get("AUTH0_DOMAIN")}/.well-known/openid-configuration'
)


@app.route("/login")
def login():
    return oauth.auth0.authorize_redirect(
        redirect_uri=url_for("callback", _external=True)
    )

@app.route("/callback", methods=["GET", "POST"])
def callback():
    token = oauth.auth0.authorize_access_token()
    session["user"] = token
    return redirect("http://budgit.one/")

@app.route("/logout")
def logout():
    session.clear()
    return redirect(
        "https://" + env.get("AUTH0_DOMAIN")
        + "/v2/logout?"
        + urlencode(
            {
                "returnTo": url_for("home", _external=True),
                "client_id": env.get("AUTH0_CLIENT_ID"),
            },
            quote_via=quote_plus,
        )
    )

@app.route("/")
def home():
    return render_template("home.html", session=session.get('user'), pretty=json.dumps(session.get('user'), indent=4))

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
    "timestamp": str(datetime.now())
}
def convert_to_local_time(gmt_timestamp):
    try:
        print(gmt_timestamp)
        # Parse the GMT timestamp to a datetime object
        gmt_time = parser.isoparse(gmt_timestamp)
        print(gmt_time)
        return gmt_time.strftime("%Y-%m-%d %H:%M:%S")
        # Ensure the timezone is set to GMT/UTC
        if gmt_time.tzinfo is None:
            gmt_time = gmt_time.replace(tzinfo=pytz.utc)
        else:
            gmt_time = gmt_time.astimezone(pytz.utc)
        
        # Convert to local time
        local_time = gmt_time.astimezone()
        
        return local_time.strftime("%Y-%m-%d %H:%M:%S")
    except Exception as e:
        return f"An error occurred: {e}"

@app.route('/upload', methods=['POST'])
def upload():
    try:
        # Parse JSON data from the request
        item = request.get_json()
        item["timestamp"] = str(datetime.now())
        item["user_id"] = "1"
        item["price"] = Decimal(item["price"])
        if item["date"] == "":
            item["date"] = str(datetime.now())
        else:
            item["date"] = convert_to_local_time(item["date"])
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
    # filters = request.get_json()
    # print(filters)
    user_id = request.args.get('user_id', type=int)
    categories = request.args.get('categories',type=str).split(",")
    min_price = request.args.get('min_price', type=Decimal)
    max_price = request.args.get('max_price', type=Decimal)

    r = table.scan(
        FilterExpression=
        Attr('user_id').eq(str(user_id))
        & Attr('category').is_in(categories)
        & Attr('price').between(min_price, max_price)
    )
    items = r['Items']
    print("fetching " + str(len(items)) + " items")
    return jsonify(items)

@app.route('/getCalendarItems', methods=['GET'])
def get_calendar_items():
    # filters = request.get_json()
    # print(filters)
    if False:
        user_id = 1
        categories = ["Food"]
        min_price = 0
        max_price = 100
        date_start = "2024-07"
    else:
        user_id = request.args.get('user_id', type=int)
        # categories = request.args.get('categories',type=str).split(",")
        min_price = request.args.get('min_price', type=Decimal)
        max_price = request.args.get('max_price', type=Decimal)
        date_start = request.args.get('date_start', type=str)
        date_end = request.args.get('date_end', type=str)
    print("user_id:", user_id)
    # print("Catergories:", categories)

    r = table.scan(
        FilterExpression=
        Attr('user_id').eq(str(user_id))
        # & Attr('category').is_in(categories)
        & Attr('price').between(min_price, max_price)
        & Attr('date').between(date_start,date_end)
    )
    items = r['Items']
    print("fetching " + str(len(items)) + " items")
    return jsonify(items)

    
def get_items_on_days(user_id, dates):
    items = []
    for date in dates:
        r = table.scan(
            FilterExpression=
            Attr('user_id').eq(str(user_id))
            & Attr('date').begins_with(date)
        )
        items += r['Items']

    print("fetching " + str(len(items)) + " items")
    return items

@app.route('/getTotalOnDays', methods=['GET'])
def get_total_on_days():
    user_id = request.args.get('user_id', type=int)
    dates = request.args.get('dates', type=str).split(",")

    items = get_items_on_days(user_id, dates)

    price = 0
    for item in items:
        print(item)
        price += item['price']
    return jsonify(price)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
