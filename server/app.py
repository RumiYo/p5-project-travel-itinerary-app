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

class Itineraries(Resource):
    def get(self):
        itineraries = Itinerary.query.all()
        itineraries_dict = [itinerary.to_dict() for itinerary in itineraries]
        return make_response(itineraries_dict, 200)     

    def post(self):
        json_data = request.get_json()
        if not json_data.get('itinerary_name') or not json_data.get('user_id'):
            return {"error": "Itinerary name and userID cannot be empty"}, 422 
        new_record = Itinerary(
            itinerary_name=json_data.get('itinerary_name'),
            start_date=json_data.get('start_date'),
            end_date=json_data.get('end_date'),
            user_id=json_data.get('user_id'),
        )
        db.session.add(new_record)
        db.session.commit()

        if not new_record.id:
            return {'error': 'validation errors'}, 400
        session['user_id'] = new_record.id
        return make_response(new_record.to_dict(), 201)


class ItineraryById(Resource):
    def get(self,id):
        itinerary = Itinerary.query.filter(Itinerary.id==id).first()
        if not itinerary: 
            return {'error': 'Itinerary not found'}, 404
        return make_response(itinerary.to_dict(), 200)

    def patch(self,id):
        itinerary = Itinerary.query.filter(Itinerary.id==id).first()
        if not itinerary: 
            return {'error': 'Itinerary not found'}, 404

        json_data = request.get_json()
        for key, value in json_data.items():
            if hasattr(itinerary, key):
                setattr(itinerary, key, value)
            else:
                return {'error': f'Invalid field: {key}'}, 400
        
        db.session.commit()
        return make_response(itinerary.to_dict(), 200)

    def delete(self,id):
        itinerary = Itinerary.query.filter(Itinerary.id==id).first()
        if not itinerary: 
            return {'error': 'Itinerary not found'}, 404
        db.session.delete(itinerary)
        db.session.commit()     
   
   
class Destinations(Resource):
    def get(self):
        destinations = Destination.query.all()
        destinations_dict = [destination.to_dict() for destination in destinations]
        return make_response(destinations_dict, 200)  

    def post(self):
        json_data = request.get_json()
        if not json_data.get('city') or not json_data.get('country'):
            return {"error": "City and Country cannot be empty"}, 422 
        duplicate_city = Destination.query.filter(Destination.city==json_data['city']).first()
        if duplicate_city:
            return {"error": "This city already exists."}, 422
        new_record = Destination(
            city=json_data.get('city'),
            country=json_data.get('country'),
            destination_description=json_data.get('destination_description'),
        )
        db.session.add(new_record)
        db.session.commit()

        if not new_record.id:
            return {'error': 'validation errors'}, 400
        session['user_id'] = new_record.id
        return make_response(new_record.to_dict(), 201)    

class DestinationById(Resource):
    def get(self,id):
        destination = Destination.query.filter(Destination.id==id).first()
        if not destination: 
            return {'error': 'Destination not found'}, 404
        return make_response(destination.to_dict(), 200)

    def patch(self,id):
        destination = Destination.query.filter(Destination.id==id).first()
        if not destination: 
            return {'error': 'Destination not found'}, 404

        json_data = request.get_json()
        for key, value in json_data.items():
            if hasattr(destination, key):
                setattr(destination, key, value)
            else:
                return {'error': f'Invalid field: {key}'}, 400
        
        db.session.commit()
        return make_response(destination.to_dict(), 200)

    def delete(self,id):
        destination = Destination.query.filter(Destination.id==id).first()
        if not destination: 
            return {'error': 'Destination not found'}, 404
        db.session.delete(destination)
        db.session.commit()       

class Activities(Resource): 
    def get(self):
        activities = Activity.query.all()
        activities_dict = [activity.to_dict() for activity in activities]
        return make_response(activities_dict, 200)        

    def post(self):
        json_data = request.get_json()
        if not json_data.get('activity_name') or not json_data.get('activity_description') or not json_data.get('destination_id'):
            return {"error": "Activity Name, Description and city name cannot be empty"}, 422 
        new_record = Activity(
            activity_name=json_data.get('activity_name'),
            date=json_data.get('date'),
            activity_description=json_data.get('activity_description'),
            itinerary_id=json_data.get('itinerary_id'),
            destination_id=json_data.get('destination_id'),
        )
        db.session.add(new_record)
        db.session.commit()


class ActivityById(Resource):
    def get(self,id):
        activity = Activity.query.filter(Activity.id==id).first()
        if not activity: 
            return {'error': 'Activity not found'}, 404
        return make_response(activity.to_dict(), 200)

    def patch(self,id):
        activity = Activity.query.filter(Activity.id==id).first()
        if not activity: 
            return {'error': 'Activity not found'}, 404

        json_data = request.get_json()
        for key, value in json_data.items():
            if hasattr(activity, key):
                setattr(activity, key, value)
            else:
                return {'error': f'Invalid field: {key}'}, 400
        
        db.session.commit()
        return make_response(activity.to_dict(), 200)

    def delete(self,id):
        activity = Activity.query.filter(Activity.id==id).first()
        if not activity: 
            return {'error': 'Activity not found'}, 404
        db.session.delete(activity)
        db.session.commit()       


class Reviews(Resource): 
    def get(self):
        reviews = Review.query.all()
        reviews_dict = [review.to_dict() for review in reviews]
        return make_response(reviews_dict, 200)

    def post(self):
        json_data = request.get_json()
        if not json_data.get('star') or not json_data.get('comment') or not json_data.get('user_id') or not json_data.get('destination_id'):
            return {"error": "All fields cannot be empty"}, 422 
        new_record = Itinerary(
            star=json_data.get('star'),
            comment=json_data.get('comment'),
            user_id=json_data.get('user_id'),
            destination_id=json_data.get('destination_id'),
        )
        db.session.add(new_record)
        db.session.commit()

class ReviewById(Resource): 
    def get(self,id):
        review = Review.query.filter(Review.id==id).first()
        if not review: 
            return {'error': 'Review not found'}, 404
        return make_response(review.to_dict(), 200)

    def patch(self,id):
        review = Review.query.filter(Review.id==id).first()
        if not review: 
            return {'error': 'Review not found'}, 404

        json_data = request.get_json()

        for key, value in json_data.items():
            if hasattr(review, key):
                setattr(review, key, value)
            else:
                return {'error': f'Invalid field: {key}'}, 400
        
        db.session.commit()
        return make_response(review.to_dict(), 200)

    def delete(self,id):
        review = Review.query.filter(Review.id==id).first()
        if not review: 
            return {'error': 'Review not found'}, 404
        db.session.delete(review)
        db.session.commit()     


api.add_resource(Signups, '/signup')
api.add_resource(CheckSession, '/check_session')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(Users, '/users')
api.add_resource(UserById, '/users/<int:id>')
api.add_resource(Itineraries, '/itineraries')
api.add_resource(ItineraryById, '/itineraries/<int:id>')
api.add_resource(Destinations, '/destinations')
api.add_resource(DestinationById, '/destinations/<int:id>')
api.add_resource(Activities, '/activities')
api.add_resource(Reviews, '/reviews')
api.add_resource(ReviewById, '/reviews/<int:id>')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

