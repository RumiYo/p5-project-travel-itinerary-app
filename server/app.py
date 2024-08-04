#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import make_response, request, session
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Itinerary, Destination, Activity, Review

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


class Signups(Resource):

    def post(self):
        json_data = request.get_json()
        if not json_data.get('username') or not json_data.get('first_name') or not json_data.get('last_name')or not json_data.get('email'):
            return {"error": "All input fields cannot be empty"}, 422 
        duplicate_name_user = User.query.filter(User.username==json_data['username']).first()
        if duplicate_name_user:
            return {"error": "This username already exists. Try with a new user id"}, 422
        new_record = User(
            first_name=json_data.get('first_name'),
            last_name=json_data.get('last_name'),
            username=json_data.get('username'),
            email=json_data.get('email'),
        )
        new_record.password_hash = json_data.get('password_hash')
        db.session.add(new_record)
        db.session.commit()
        print(new_record.to_dict())

        if not new_record.id:
            return {'error': 'validation errors'}, 400
        session['user_id'] = new_record.id
        return make_response(new_record.to_dict(), 201)

class CheckSession(Resource):
    def get(self):
        user = User.query.filter(User.id==session.get('user_id')).first()
        if user:
            return user.to_dict()
        else:
            return {'error': '401: Not Authorized'}, 401     

class Login(Resource):
    def post(self):
        json_data = request.get_json()
        user = User.query.filter(User.username==json_data.get('username')).first()
        if user and user.authenticate(json_data.get('password')):
            session['user_id'] = user.id
            return user.to_dict()

        return {'error': 'Invalid username or password'}, 401

class Logout(Resource):
    def delete(self):
        if not session['user_id']:
            return {'error': 'You are not logged in'}, 401

        session['user_id']= None
        return {}, 204

class Users(Resource):
    def get(self):
        users = User.query.all()
        users_dict = [user.to_dict() for user in users]
        return make_response(users_dict, 200)    

class UserById(Resource):
    def get(self,id):
        user = User.query.filter(User.id==id).first()
        if not user: 
            return {'error': 'User not found'}, 404
        return make_response(user.to_dict(), 200)

    def patch(self,id):
        user = User.query.filter(User.id==id).first()
        if not user: 
            return {'error': 'User not found'}, 404

        json_data = request.get_json()

        if 'email' in json_data and "@" not in json_data.get('email'):
            return {'error': 'validation errors'}, 400

        for key, value in json_data.items():
            if hasattr(user, key):
                setattr(user, key, value)
            else:
                return {'error': f'Invalid field: {key}'}, 400
        
        db.session.commit()
        return make_response(user.to_dict(), 200)

    def delete(self,id):
        user = User.query.filter(User.id==id).first()
        if not user: 
            return {'error': 'User not found'}, 404
        db.session.delete(user)
        db.session.commit()

api.add_resource(Signups, '/signup')
api.add_resource(CheckSession, '/check_session')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(Users, '/users')
api.add_resource(UserById, '/users/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

