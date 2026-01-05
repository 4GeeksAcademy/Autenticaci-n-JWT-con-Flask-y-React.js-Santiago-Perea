"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/signup', methods = ['POST'])
def user_signup():
    email = request.json.get("email")
    username = request.json.get("username")
    password = request.json.get("password")

    new_user = User(
        email=email,
        username = username,
        is_active = True
    )
    new_user.password_encrip(password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'msg': 'User created successfully!'}), 201


@api.route('/login', methods = ['POST'])
def user_login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email).first()

    if not user or not user.password_check(password):
        return jsonify({'msg':"Error, incorrect email or password"}), 401

    access_token = create_access_token(identity=str(user.id))
    return jsonify({ "token": access_token, "user_id": user.id, "msg": "User logged suscesfully!" }), 200

@api.route('/private', methods = ['POST'])
def profile_check():
    response_body = {}
    current_user = get_jwt_identity()
    response_body['message'] = f'El usuario es: {current_user[0]}'
    response_body['results'] = current_user[0]
    
    return jsonify(response_body), 200