#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from datetime import datetime, timedelta


# Remote library imports
from faker import Faker
import random

# Local imports
from app import app
from models import db, User, Destination, Activity, Itinerary, Review

fake = Faker()

def seed_users():
    users = []
    for _ in range(10):
        u = User(
            first_name = fake.first_name(),
            last_name = fake.last_name(),
            email = fake.email()         
        )
        u.username = f"{u.first_name}{random.randint(10,100)}"
        u.password_hash = "test1234"
        users.append(u)
    db.session.add_all(users)
    db.session.commit()

def seed_destinations():
    destinations = [
        Destination(
            city="Paris", 
            country="France", 
            image_url="",
            destination_description="Paris is the capital of France and one of the world's most important cities. It's located in the north-central part of the country along the Seine River and is known for its culture, fashion, gastronomy, and intellectual community." 
        ),
        Destination(
            city="New York", 
            country="USA", 
            image_url="",
            destination_description="The city that never sleeps."
        ),
        # ... Add more
    ]
    db.session.add_all(destinations)
    db.session.commit()

def seed_itineraries():
    itineraries = [
        Itinerary(
            itinerary_name="Family Vacation", 
            start_date=datetime(2024, 6, 1), 
            end_date=datetime(2024, 6, 10), 
            user_id=1,
            itinerary_description="Our anual family trip with mom, dad and sister"
            ),
        Itinerary(
            itinerary_name="Business Trip", 
            start_date=datetime(2024, 7, 15), 
            end_date=datetime(2024, 7, 20), 
            user_id=2,
            itinerary_description="Client visit and IT conference."
            ),
        # ... Add more
    ]
    db.session.add_all(itineraries)
    db.session.commit()

def seed_activities():
    activities = [
        Activity(
            activity_name="Eiffel Tower Visit", 
            date=datetime(2024, 6, 2), 
            activity_description="Visit the iconic Eiffel Tower.", 
            itinerary_id=1, 
            destination_id=1
        ),
        Activity(
            activity_name="Central Park Walk", 
            date=datetime(2024, 7, 16), 
            activity_description="Enjoy a walk in Central Park.", 
            itinerary_id=2, 
            destination_id=2
        ),
        # ... Add more 
    ]
    db.session.add_all(activities)
    db.session.commit()

def seed_reviews():
    reviews = [
        Review(star=4.5, comment="Amazing experience!", user_id=1, destination_id=1),
        Review(star=3.0, comment="It was okay.", user_id=2, destination_id=2),
        # ... Add more 
    ]
    db.session.add_all(reviews)
    db.session.commit()

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print('Cleaning db...')
        User.query.delete()
        Itinerary.query.delete()
        Destination.query.delete()
        Activity.query.delete()
        Review.query.delete()
        print("Starting seed...")

        print('Seeding users...')
        seed_users()

        print('Seeding destinations...')
        seed_destinations()

        print('Seeding itineraries...')
        seed_itineraries()

        print('Seeding activities...')
        seed_activities()

        print('Seeding reviews...')
        seed_reviews()
       

