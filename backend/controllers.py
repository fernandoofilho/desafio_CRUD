from app import db
from models import User, UserHistory
from cryptography.fernet import Fernet
import re
from datetime import datetime

def extract_user_data_from_request(request):
    userEmail = request.form.get('userEmail')
    userName = request.form.get('userName')
    userSurname = request.form.get('userSurname')
    userKey = request.form.get('userKey')
    userAccess = request.form.get('userAccess')
    return userEmail, userName, userSurname, userKey, userAccess

def encrypt_key(key, value):
    key = key.encode()
    cipher_suite = Fernet(key)
    encrypted_value = cipher_suite.encrypt(value.encode())
    return encrypted_value

def decrypt_key(key, encrypted_value):
    key = key.encode()
    cipher_suite = Fernet(key)
    decrypted_value = cipher_suite.decrypt(encrypted_value).decode()
    return decrypted_value
def is_valid_data(userEmail, userName, userSurname, userAccess, userKey):
    def is_valid_key():
        reg = r'^(?=.*[A-Z])(?=.*[!@#$%^&*()_+=\-{}[\]:;"\'|,.<>?]).{8,16}$'
        return 'Invalid key' if not re.match(reg, userKey) else None
    def is_valid_email():
        reg = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return 'Invalid email address' if not re.match(reg, userEmail) else None
    def user_exists():
        existing_user = User.query.filter_by(userEmail=userEmail).first()
        return 'User already exists' if existing_user is not None else None 
    def is_name_valid():
        return 'Invalid user name' if len(userName) == 0 else None 
    def is_surname_valid():
        return 'invalid user surname' if len(userSurname) == 0 else None
    def is_user_access_valid():                         # [normal, admin]
        return 'invalid userAccess' if userAccess not in ['1','2'] else None
        
    errors = (user_exists(),
              is_valid_email(), 
              is_valid_key(),
              is_name_valid(),
              is_surname_valid(),
              is_user_access_valid())
    if any(errors):
        return {'status': False, 'message':[e for e in errors if e is not None]} 
    return {'status': True, 'message': []}

def is_admin(userEmail):
    user, _ = search(userEmail)
    if user is None or user.userLevelAccess < 2:
        return False
    return True

def query_all_users():
    users = User.query.all()
    usersHistory = UserHistory.query.all()
    return users, usersHistory

def search(userEmail):
    user = User.query.filter_by(userEmail=userEmail).first()
    user_history = UserHistory.query.filter_by(userEmail=userEmail).first()
    return (user, user_history) if user else (None, None)

def create(userEmail, userName, userSurname, userAccess, userKey, createdBy= 'self'):
    # optei por utilizar _ para o garbage collector liberar esse obj da memória asap
    _ = is_valid_data(userEmail, userName, userSurname, userAccess, userKey)
    valid, message = _['status'], _['message']
    if not valid:
        return f'Error: {[m for m in message]}', 403
    
    try: 
        key = encrypt_key(key= 'pzGaqwa6nphXtMmCEJnZvBgM5hK8oaBUABhaKMP4MhY=', value = userKey).decode('utf-8')
        user = User(
                    userEmail=userEmail,
                    userName=userName,
                    userSurname=userSurname,
                    userLevelAccess=userAccess,
                    userKey=key
                )
        newHistory = UserHistory(
            userEmail=userEmail,
            userStatus='active',
            userLevelAccess=userAccess,
            userCreatedBy= createdBy,
            creationDate=f"{datetime.today().date().strftime('%Y-%m-%d')}"
        )
        db.session.add(user)
        db.session.add(newHistory)
        db.session.commit()
        return f'User created for {userName}, {userEmail}', 200
    except Exception as e:
        db.session.rollback()
        return f'Error {e} while creating user for this email: {userEmail}', 500
      
def update(userEmail, userName= None, userSurname= None, userKey= None, userAccess= None, data:dict= None):
    new_data ={
              'userName':userName,
              'userSurname':userSurname,
              'userKey':userKey,
              'userLevelAccess':userAccess
              }
    # update all
    user = User.query.get(userEmail)
    for column, value in zip(new_data.keys(), new_data.values()):
        setattr(user, column, value)
        db.session.commit()
    return f'user {userEmail} Updated', 200

def delete(userEmail):
    user = User.query.get(userEmail)
    history = UserHistory.query.get(userEmail)
    if user:
        setattr(user, 'userLevelAccess', 0)
        setattr(history, 'userLevelAccess', 0)
        setattr(history, 'userStatus', 'inactive')
        setattr(history, 'deleteDate', f"{datetime.today().date().strftime('%Y-%m-%d')}")

        db.session.commit()
        return f'Registro deletado com sucesso: {user.userEmail}', 200
    
    return f'Not Found: {user.userEmail}', 404


def seedData():
    user_count = User.query.count()
    if user_count == 0:
        user_history_data = [
                    ('user1@example.com', 'active', '2', 'self', '2023-01-01', None),
                    ('user2@example.com', 'active', '1', 'self', '2023-01-02', None),
                    ('user3@example.com', 'active', '1', 'self', '2023-01-20', None),
                    ('user4@example.com', 'active', '1', 'self', '2023-01-20', None),
                    ('user5@example.com', 'active', '1', 'self', '2023-01-20', None),
                    ('user6@example.com', 'active', '1', 'self', '2023-01-20', None),
                    ('user7@example.com', 'active', '1', 'self', '2023-01-20', None),
                    ('user8@example.com', 'active', '1', 'self', '2023-01-20', None),
                    ('user9@example.com', 'active', '1', 'self', '2023-01-20', None),
                    ('user10@example.com', 'active', '1', 'self', '2023-01-20', None)
                ]

        user_data = [
            ('admin@example.com', 'admin', 'usr', 'gAAAAABmKDnCxwPm7_6PpOFxle4uaDODq_Fhbr8g_AXYex06F0f8cu5gMKpTp133qjVP0eCX4ETpQ7FlDEO7angIb6hKDpDE9Q==', 2),
            ('user2@example.com', 'User2', 'Surname2', 'gAAAAABmKDnCxwPm7_6PpOFxle4uaDODq_Fhbr8g_AXYex06F0f8cu5gMKpTp133qjVP0eCX4ETpQ7FlDEO7angIb6hKDpDE9Q==', 1),
            ('user3@example.com', 'User3', 'Surname3', 'gAAAAABmKDnCxwPm7_6PpOFxle4uaDODq_Fhbr8g_AXYex06F0f8cu5gMKpTp133qjVP0eCX4ETpQ7FlDEO7angIb6hKDpDE9Q==', 1),
            ('user4@example.com', 'User4', 'Surname4', 'gAAAAABmKDnCxwPm7_6PpOFxle4uaDODq_Fhbr8g_AXYex06F0f8cu5gMKpTp133qjVP0eCX4ETpQ7FlDEO7angIb6hKDpDE9Q==', 1),
            ('user5@example.com', 'User5', 'Surname5', 'gAAAAABmKDnCxwPm7_6PpOFxle4uaDODq_Fhbr8g_AXYex06F0f8cu5gMKpTp133qjVP0eCX4ETpQ7FlDEO7angIb6hKDpDE9Q==', 1),
            ('user6@example.com', 'User6', 'Surname6', 'gAAAAABmKDnCxwPm7_6PpOFxle4uaDODq_Fhbr8g_AXYex06F0f8cu5gMKpTp133qjVP0eCX4ETpQ7FlDEO7angIb6hKDpDE9Q==', 1),
            ('user7@example.com', 'User7', 'Surname7', 'gAAAAABmKDnCxwPm7_6PpOFxle4uaDODq_Fhbr8g_AXYex06F0f8cu5gMKpTp133qjVP0eCX4ETpQ7FlDEO7angIb6hKDpDE9Q==', 1),
            ('user8@example.com', 'User8', 'Surname8', 'gAAAAABmKDnCxwPm7_6PpOFxle4uaDODq_Fhbr8g_AXYex06F0f8cu5gMKpTp133qjVP0eCX4ETpQ7FlDEO7angIb6hKDpDE9Q==', 1),
            ('user9@example.com', 'User9', 'Surname9', 'gAAAAABmKDnCxwPm7_6PpOFxle4uaDODq_Fhbr8g_AXYex06F0f8cu5gMKpTp133qjVP0eCX4ETpQ7FlDEO7angIb6hKDpDE9Q==', 1),
            ('user10@example.com', 'User10', 'Surname10', 'gAAAAABmKDnCxwPm7_6PpOFxle4uaDODq_Fhbr8g_AXYex06F0f8cu5gMKpTp133qjVP0eCX4ETpQ7FlDEO7angIb6hKDpDE9Q==', 1)
        ]

        for user_history_item in user_history_data:
            user_history = UserHistory(
                userEmail=user_history_item[0],
                userStatus=user_history_item[1],
                userLevelAccess=user_history_item[2],
                userCreatedBy=user_history_item[3],
                creationDate=user_history_item[4],
                deleteDate=user_history_item[5]
            )
            db.session.add(user_history)

        for user_item in user_data:
            user = User(
                userEmail=user_item[0],
                userName=user_item[1],
                userSurname=user_item[2],
                userKey=user_item[3],
                userLevelAccess=user_item[4]
            )
            db.session.add(user)

        db.session.commit()
    return None

def analytics_data():
    usersHistory = UserHistory.query.all()
    
    active_admin = sum(1 for user in usersHistory if user.is_active() and user.is_admin())
    inactive_admin = sum(1 for user in usersHistory if not user.is_active() and user.is_admin())
    active_normal = sum(1 for user in usersHistory if user.is_active() and not user.is_admin())
    inactive_normal = sum(1 for user in usersHistory if not user.is_active() and not user.is_admin())

        
        
    
    return {'admin': {'active': active_admin, 'inactive': inactive_admin},
            'normal':{'active': active_normal, 'inactive': inactive_normal}}
    
def auth(userEmail, password):
    user, history = search(userEmail)
    if None in (user, history):
        return False
    key = decrypt_key(key='pzGaqwa6nphXtMmCEJnZvBgM5hK8oaBUABhaKMP4MhY=', encrypted_value=user.userKey)  

    if not key == password:
        return False
    if history.userStatus != 'active':
        return False
    
    return True