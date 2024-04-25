from app import app
from controllers import *
from flask import request
from flask import jsonify
from flask_jwt_extended import create_access_token, jwt_required


def add_headers(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route('/')
def index():
    return "why u're here?"

# @app.route('/test/db')
# def test_db_connection():
#     try:
#         users = User.query.all()
#         return jsonify({'message': 'Conexão com o banco de dados bem-sucedida', 'users': [user.serialize() for user in users]})
#     except Exception as e:
#         return jsonify({'error': str(e)})


# Create 
@app.route('/create/selfCreate',methods=['POST'])
def create_user():  
    userEmail, userName, userSurname, userKey, _ = extract_user_data_from_request(request) 
    userAccess = '1' # std
    message, statusCode = create(userEmail, userName, userSurname, userAccess, userKey)
    response = add_headers(jsonify({'message':message}))
    return response, statusCode


@app.route('/create/adminCreate', methods=['POST'])
@jwt_required()
def create_by_admin():
    requesterEmail = request.form.get('requesterEmail')
    isAdmin = is_admin(requesterEmail)
    if not isAdmin:
        response = add_headers(jsonify({'message':'user not allowed to this operation'}))
        return response, 403
    userEmail, userName, userSurname, userKey, userAccess = extract_user_data_from_request(request) 

    message, statusCode = create(userEmail, userName, userSurname, userAccess, userKey,
                                 createdBy=requesterEmail)
    response = add_headers(jsonify({'message':message}))
    return response, statusCode

# Read 
@app.route('/search/', methods=['GET'])
# @jwt_required()
def get_users():
    users, history = query_all_users()
    
    response = add_headers(jsonify({
        'message':'success',
        'users': f'{users}',
        'history':f'{history}', 
        })) 
    
    return response, 200

@app.route('/search/user/', methods=['GET', 'POST'])
# @jwt_required()
def search_user():
    userEmail, _, _, _, _ = extract_user_data_from_request(request) 
    user, history = search(userEmail)
    if user is not None:
        response = add_headers(jsonify({'message': 'success', 'data':f'{user}' }))
        return response, 200
    response = add_headers(jsonify({'message':'user not found'}))
    return response, 404
    
# update
@app.route('/update/user/', methods=['PUT', 'PATCH'])
# @jwt_required()
def update_entire_user():
    if request.method == 'PUT':
        userEmail, userName, userSurname, userKey, userAccess = extract_user_data_from_request(request) 
        if None in (userEmail, userName, userSurname, userKey, userAccess):
            response = add_headers(jsonify({'message': 'incomplete user data'}))
            return response, 400 
    if request.method == 'PATCH':
        return 
    message, statuscode = update(userEmail = userEmail,
                                 userName= userName,
                                 userSurname= userSurname,
                                 userKey= userKey,
                                 userAccess= userAccess)
    
    response = add_headers(jsonify({'message': f'{message}'}))
    return response, statuscode 

# delete
@app.route('/delete/user/', methods=['DELETE'])
# @jwt_required()
def delete_user():
    userEmail, _, _, _, _ = extract_user_data_from_request(request) 
    message, statuscode = delete(userEmail = userEmail)
    response = add_headers(jsonify({'message': f'{message}'}))
    return response, statuscode 
 
#login
@app.route('/login', methods=['POST'])
def login():
    userEmail = request.form.get('userEmail')
    password = request.form.get('userKey')
    print(request.form)
    if auth(userEmail, password):
        access_token = create_access_token(identity=userEmail)
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({"message": "Invalid username or password"}), 401

# seed data
@app.route("/seed/", methods=['POST'])
def seed():
    seedData()
    return jsonify({'message': f'Success'}), 200 

@app.route("/analytics/", methods=['GET'])
# @jwt_required()
def analytics():
    response = analytics_data()
    response = add_headers(jsonify({'data': response}))
    return response, 200 
