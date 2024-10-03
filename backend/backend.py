import boto3
from boto3.dynamodb.conditions import Attr
from flask import Flask, request, redirect, jsonify, url_for, make_response
from flask_cors import CORS
from datetime import datetime
from decimal import Decimal
from dateutil import parser
import json
from os import environ as env
from urllib.parse import quote_plus, urlencode
import jwt
from functools import wraps
from dotenv import find_dotenv, load_dotenv
import requests

app = Flask(__name__)
CORS(app, supports_credentials=True)

# Load environment variables
ENV_FILE = find_dotenv()
if ENV_FILE:
    load_dotenv(ENV_FILE)

app.secret_key = env.get("APP_SECRET_KEY")

# Auth0 config variables
AUTH0_DOMAIN = env.get("AUTH0_DOMAIN")
AUTH0_CLIENT_ID = env.get("AUTH0_CLIENT_ID")
AUTH0_CLIENT_SECRET = env.get("AUTH0_CLIENT_SECRET")
AUTH0_API_AUDIENCE = env.get("AUTH0_API_AUDIENCE")
AUTH0_ALGORITHMS = ["RS256"]

# Initialize DynamoDB client
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('transactions')

def convert_to_local_time(gmt_timestamp):
    try:
        gmt_time = parser.isoparse(gmt_timestamp)
        return gmt_time.strftime("%Y-%m-%d %H:%M:%S")
    except Exception as e:
        return f"An error occurred: {e}"

# Fetch and cache JWKS
JWKS_URL = f'https://{AUTH0_DOMAIN}/.well-known/jwks.json'
jwks = requests.get(JWKS_URL).json()

def get_rsa_key(kid):
    for key in jwks['keys']:
        if key['kid'] == kid:
            return {
                'kty': key['kty'],
                'kid': key['kid'],
                'use': key['use'],
                'n': key['n'],
                'e': key['e']
            }
    return None

# JWT Verification
def verify_jwt(token):
    try:
        # Decode the token headers without verification to get the kid
        unverified_header = jwt.get_unverified_header(token)
        kid = unverified_header['kid']
        
        # Get the public key from JWKS
        rsa_key = get_rsa_key(kid)
        if rsa_key is None:
            raise jwt.InvalidTokenError("Unable to find the appropriate key.")
        
        # Construct the public key
        public_key = jwt.algorithms.RSAAlgorithm.from_jwk(json.dumps(rsa_key))
        
        # Decode and verify the token
        decoded_token = jwt.decode(
            token,
            public_key,
            algorithms=AUTH0_ALGORITHMS,
            audience=AUTH0_API_AUDIENCE,
            issuer=f'https://{AUTH0_DOMAIN}/'
        )
        return decoded_token
    except jwt.ExpiredSignatureError:
        raise jwt.ExpiredSignatureError("Expired access token.")
    except jwt.InvalidTokenError as e:
        raise jwt.InvalidTokenError(f"Invalid access token: {e}")

# Decorator to require JWT on routes
def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get('Authorization', None)
        if not auth_header:
            return jsonify({"message": "Authorization header is missing"}), 401

        parts = auth_header.split()

        if parts[0].lower() != 'bearer':
            return jsonify({"message": "Authorization header must start with Bearer"}), 401
        elif len(parts) == 1:
            return jsonify({"message": "Token not found"}), 401
        elif len(parts) > 2:
            return jsonify({"message": "Authorization header must be Bearer token"}), 401

        token = parts[1]
        try:
            decoded_token = verify_jwt(token)
        except jwt.ExpiredSignatureError as e:
            return jsonify({"message": str(e)}), 401
        except jwt.InvalidTokenError as e:
            return jsonify({"message": str(e)}), 401

        request.user = decoded_token
        return f(*args, **kwargs)

    return decorated

@app.route("/login")
def login():
    # Redirect user to Auth0 login
    return redirect(
        f"https://{AUTH0_DOMAIN}/authorize?"
        + urlencode(
            {
                "audience": AUTH0_API_AUDIENCE,
                "response_type": "code",
                "client_id": AUTH0_CLIENT_ID,
                "redirect_uri": url_for("callback", _external=True),
                "scope": "openid profile email",
            },
            quote_via=quote_plus,
        )
    )

# @app.route("/callback", methods=["GET"])
# def callback():
#     # Exchange the authorization code for tokens
#     code = request.args.get('code')

#     token_url = f"https://{AUTH0_DOMAIN}/oauth/token"
#     token_payload = {
#         "grant_type": "authorization_code",
#         "client_id": AUTH0_CLIENT_ID,
#         "client_secret": AUTH0_CLIENT_SECRET,
#         "code": code,
#         "redirect_uri": url_for("callback", _external=True),
#     }

#     token_response = requests.post(token_url, json=token_payload)
#     token_response_data = token_response.json()

#     if 'access_token' not in token_response_data:
#         return jsonify({"message": "Failed to obtain access token"}), 400

#     access_token = token_response_data['access_token']
#     id_token = token_response_data.get('id_token')


#     print(access_token)
#     # Redirect to the frontend with the tokens
#     return redirect(f'http://{env.get("FRONTEND_DOMAIN")}/home?token={access_token}')


@app.route("/callback", methods=["GET"])
def callback():
    # Get the authorization code from the query parameters
    code = request.args.get('code')

    # Prepare the token endpoint payload
    token_url = f"https://{AUTH0_DOMAIN}/oauth/token"
    token_payload = {
        "grant_type": "authorization_code",
        "client_id": AUTH0_CLIENT_ID,
        "client_secret": AUTH0_CLIENT_SECRET,
        "code": code,
        "redirect_uri": url_for("callback", _external=True),
    }

    # Exchange the code for tokens
    token_response = requests.post(token_url, json=token_payload)
    token_response_data = token_response.json()

    # Error handling
    if 'access_token' not in token_response_data:
        return jsonify({"message": "Failed to obtain access token"}), 400

    # Extract tokens
    access_token = token_response_data['access_token']

    # Securely store the token in a cookie
    response = make_response(redirect(f'https://{FRONTEND_DOMAIN}/home'))
    print("callback", access_token)
    response.set_cookie('jwtToken', access_token, httponly=True, secure=True, samesite='Strict')
    
    return response


@app.route("/logout")
def logout():
    return redirect(
        f"https://{AUTH0_DOMAIN}/v2/logout?"
        + urlencode(
            {
                "returnTo": url_for("home", _external=True),
                "client_id": AUTH0_CLIENT_ID,
            },
            quote_via=quote_plus,
        )
    )

@app.route("/")
def home():
    return "Welcome to the home page!"

@app.route('/upload', methods=['POST'])
@requires_auth
def upload():
    try:
        # Get user_id from JWT token
        user_id = request.user['sub']

        # Parse JSON data from the request
        item = request.get_json()
        item["timestamp"] = str(datetime.now())
        item["user_id"] = user_id
        item["price"] = Decimal(item["price"])

        if not item.get("date"):
            item["date"] = str(datetime.now())
        else:
            item["date"] = convert_to_local_time(item["date"])

        # Write the item to the DynamoDB table
        response = table.put_item(Item=item)

        if response['ResponseMetadata']['HTTPStatusCode'] == 200:
            return jsonify({"message": "Item successfully written to DB"}), 200
        else:
            return jsonify({"message": "Error writing item to DB"}), 500
    except Exception as e:
        return jsonify({"message": "An error occurred", "error": str(e)}), 500

@app.route('/getItems', methods=['GET'])
@requires_auth
def get_items():
    user_id = request.user['sub']
    categories = request.args.get('categories', type=str)
    if categories:
        categories = categories.split(",")
    else:
        categories = []
    min_price = request.args.get('min_price', type=Decimal)
    max_price = request.args.get('max_price', type=Decimal)

    filter_expression = Attr('user_id').eq(user_id)
    if categories:
        filter_expression &= Attr('category').is_in(categories)
    if min_price is not None and max_price is not None:
        filter_expression &= Attr('price').between(min_price, max_price)

    r = table.scan(
        FilterExpression=filter_expression
    )
    items = r.get('Items', [])
    return jsonify(items)

@app.route('/getCalendarItems', methods=['GET'])
@requires_auth
def get_calendar_items():
    user_id = request.user['sub']
    min_price = request.args.get('min_price', type=Decimal)
    max_price = request.args.get('max_price', type=Decimal)
    date_start = request.args.get('date_start', type=str)
    date_end = request.args.get('date_end', type=str)

    filter_expression = Attr('user_id').eq(user_id)
    if min_price is not None and max_price is not None:
        filter_expression &= Attr('price').between(min_price, max_price)
    if date_start and date_end:
        filter_expression &= Attr('date').between(date_start, date_end)

    r = table.scan(
        FilterExpression=filter_expression
    )
    items = r.get('Items', [])
    return jsonify(items)

def get_items_on_days(user_id, dates):
    items = []
    for date in dates:
        r = table.scan(
            FilterExpression=Attr('user_id').eq(user_id) & Attr('date').begins_with(date)
        )
        items += r.get('Items', [])
    return items

@app.route('/getTotalOnDays', methods=['GET'])
@requires_auth
def get_total_on_days():
    user_id = request.user['sub']
    dates = request.args.get('dates', type=str)
    if dates:
        dates = dates.split(",")
    else:
        dates = []

    items = get_items_on_days(user_id, dates)

    total_price = sum(item['price'] for item in items)
    return jsonify(total_price)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
