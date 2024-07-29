import boto3
from boto3.dynamodb.conditions import Key, Attr
from flask import Flask, request, jsonify, send_from_directory, redirect, render_template, session, url_for
from flask_cors import CORS
from datetime import datetime
import pytz
from decimal import Decimal
from dateutil import parser

import json
from os import environ as env
from urllib.parse import quote_plus, urlencode
import jwt
from authlib.integrations.flask_client import OAuth
from dotenv import find_dotenv, load_dotenv
import requests


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
    "timestamp": str(datetime.now())
}


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


def convert_to_local_time(gmt_timestamp):
    try:
        # Parse the GMT timestamp to a datetime object
        gmt_time = parser.isoparse(gmt_timestamp)
        
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
        user_id = session.get("user_id")  # Use user ID from session
        
        print("Session after login:", session)
        if not user_id:
            raise ValueError("User ID is missing in the session")

        item["user_id"] = str(user_id)  # Ensure user_id is a string
        item["price"] = Decimal(item["price"])
        if item["date"] == "":
            item["date"] = str(datetime.now())
        else:
            item["date"] = convert_to_local_time(item["date"])
        print("Uploading item: " + str(item))
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
    user_id = session.get("user_id")  # Use user ID from session

    if not user_id:
        return jsonify({"message": "User ID is missing in the session"}), 400

    categories = request.args.get('categories', type=str).split(",")
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
    user_id = session.get("user_id")  # Use user ID from session

    if not user_id:
        return jsonify({"message": "User ID is missing in the session"}), 400

    min_price = request.args.get('min_price', type=Decimal)
    max_price = request.args.get('max_price', type=Decimal)
    date_start = request.args.get('date_start', type=str)
    date_end = request.args.get('date_end', type=str)
    print("user_id:", user_id)

    r = table.scan(
        FilterExpression=
        Attr('user_id').eq(str(user_id))
        & Attr('price').between(min_price, max_price)
        & Attr('date').between(date_start, date_end)
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
    user_id = session.get("user_id")  # Use user ID from session

    if not user_id:
        return jsonify({"message": "User ID is missing in the session"}), 400

    dates = request.args.get('dates', type=str).split(",")

    items = get_items_on_days(user_id, dates)

    price = 0
    for item in items:
        print(item)
        price += item['price']
    return jsonify(price)

def get_jwk_keys(jwk_url):
    response = requests.get(jwk_url)
    jwk_keys = response.json()
    return jwk_keys

def get_public_key(jwk_keys, kid):
    for key in jwk_keys['keys']:
        if key['kid'] == kid:
            return jwt.algorithms.RSAAlgorithm.from_jwk(key)
    return None

@app.route("/login")
def login():
    return oauth.auth0.authorize_redirect(
        redirect_uri=url_for("callback", _external=True)
    )

@app.route("/callback", methods=["GET", "POST"])
def callback():
    try:
        token = oauth.auth0.authorize_access_token()
        id_token = token.get('id_token')
        
        # Retrieve the JWK keys
        jwk_keys = get_jwk_keys(f'https://{env.get("AUTH0_DOMAIN")}/.well-known/jwks.json')
        
        # Decode the JWT header to get the key id (kid)
        unverified_header = jwt.get_unverified_header(id_token)
        kid = unverified_header['kid']
        
        # Get the public key corresponding to the kid
        public_key = get_public_key(jwk_keys, kid)
        
        # Decode the id_token with signature verification
        decoded_token = jwt.decode(id_token, public_key, algorithms=['RS256'], audience=env.get("AUTH0_CLIENT_ID"))
        
        # Extract user information from decoded_token
        user_info = {
            "sub": decoded_token.get("sub"),
            "name": decoded_token.get("name"),
            "email": decoded_token.get("email"),
            "picture": decoded_token.get("picture"),
        }
        print("Decoded Token:", decoded_token)
        
        # Store user information in session
        session["user"] = user_info
        session["user_id"] = decoded_token.get("sub")  # Store user ID separately for easy access
        print("Session after login:", session)
        
        return redirect("http://localhost:5173/budgit")  # Redirect to the front-end main layout

    except Exception as e:
        print(f"An error occurred during callback: {e}")
        return jsonify({"message": "An error occurred during callback", "error": str(e)}), 500


@app.route("/logout")
def logout():
    session.clear()
    return redirect(
        "https://" + env.get("AUTH0_DOMAIN")
        + "/v2/logout?"
        + urlencode(
            {
                "returnTo": url_for("login", _external=True),
                "client_id": env.get("AUTH0_CLIENT_ID"),
            },
            quote_via=quote_plus,
        )
    )



@app.route("/")
def home():
    return render_template("home.html", session=session.get('user'), pretty=json.dumps(session.get('user'), indent=4))



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=env.get("PORT", 3000), debug=True)