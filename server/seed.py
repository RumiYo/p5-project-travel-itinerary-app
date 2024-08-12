#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from datetime import datetime, timedelta


# Remote library imports
from faker import Faker
import random

# Local imports
from app import app
from models import db, User, Destination, Activity, Itinerary, Review, PopularSpot

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
            image_url="https://github.com/RumiYo/p5-project-travel-itinerary-app/blob/main/server/photos/paris_image.jpg?raw=true",
            description="Paris is the capital of France and one of the world's most important cities. It's located in the north-central part of the country along the Seine River and is known for its culture, fashion, gastronomy, and intellectual community." 
        ),
        Destination(
            city="New York", 
            country="USA", 
            image_url="https://github.com/RumiYo/p5-project-travel-itinerary-app/blob/main/server/photos/newyork_image.jpeg?raw=true",
            description="An iconic global centre that has inspired the world with its brilliant architecture, movies, and art. Also known as the Big Apple, New York is well-known for its magnificent skyscrapers, Broadway shows and beautiful landmarks, making it the perfect destination for travellers from all over."
        ),
        Destination(
            city="Barcelona", 
            country="Spain", 
            image_url="https://github.com/RumiYo/p5-project-travel-itinerary-app/blob/main/server/photos/Barcelona_image.jpg?raw=true",
            description="Barcelona, the cosmopolitan capital of Spain’s Catalonia region, is known for its art and architecture. The fantastical Sagrada Família church and other modernist landmarks designed by Antoni Gaudí dot the city. Museu Picasso and Fundació Joan Miró feature modern art by their namesakes."
        ),
        Destination(
            city="Tokyo", 
            country="Japan", 
            image_url="https://github.com/RumiYo/p5-project-travel-itinerary-app/blob/main/server/photos/Barcelona_image.jpg?raw=true",
            description="Tokyo, Japan’s capital, is a modern city with a traditional heart. It’s famous for its skyscrapers, neon lights, and bustling streets. Tokyo offers a fascinating mix of the ultra-modern and the traditional, with beautiful temples, gardens, and a rich culinary scene."
        ),
        Destination(
            city="Sydney", 
            country="Australia", 
            image_url="https://github.com/RumiYo/p5-project-travel-itinerary-app/blob/main/server/photos/Barcelona_image.jpg?raw=true",
            description="Sydney, Australia’s largest city, is known for its stunning harbor, iconic Opera House, and beautiful beaches. It’s a vibrant city with a laid-back atmosphere, offering a mix of modern attractions and natural beauty."
        ),
        Destination(
            city="Cape Town", 
            country="South Africa", 
            image_url="https://github.com/RumiYo/p5-project-travel-itinerary-app/blob/main/server/photos/Barcelona_image.jpg?raw=true",
            description="Cape Town is a port city on South Africa’s southwest coast. It’s known for its stunning natural beauty, including Table Mountain and beautiful beaches. Cape Town offers a rich cultural experience and a gateway to exploring South Africa’s diverse landscapes."
        ),
        Destination(
            city="Rome", 
            country="Italy", 
            image_url="https://github.com/RumiYo/p5-project-travel-itinerary-app/blob/main/server/photos/Barcelona_image.jpg?raw=true",
            description="Rome, Italy’s capital, is known for its ancient history and stunning architecture. The city is a living museum with historic sites like the Colosseum and the Roman Forum. Rome is also famous for its vibrant street life and excellent cuisine."
        ),
        Destination(
            city="Rio de Janeiro", 
            country="Brazil", 
            image_url="https://github.com/RumiYo/p5-project-travel-itinerary-app/blob/main/server/photos/Barcelona_image.jpg?raw=true",
            description="Rio de Janeiro, a major city in Brazil, is known for its stunning beaches, vibrant carnival, and the iconic Christ the Redeemer statue. The city offers a unique blend of natural beauty and lively culture."
        ),
        Destination(
            city="Istanbul", 
            country="Turkey", 
            image_url="https://github.com/RumiYo/p5-project-travel-itinerary-app/blob/main/server/photos/Barcelona_image.jpg?raw=true",
            description="Istanbul, a city that straddles Europe and Asia across the Bosphorus Strait, is known for its historic sites such as the Hagia Sophia and the Blue Mosque. Istanbul offers a rich history and vibrant culture, blending Eastern and Western influences."
        ),
        # ... Add more
    ]
    db.session.add_all(destinations)
    db.session.commit()

def seed_itineraries():
    itineraries = [
        Itinerary(
            name="Family Vacation in Paris", 
            start_date=datetime(2024, 6, 1), 
            end_date=datetime(2024, 6, 10), 
            user_id=1,
            description="A family trip to explore Paris with the kids."
        ),
        Itinerary(
            name="Summer Business Trip to NYC", 
            start_date=datetime(2024, 7, 15), 
            end_date=datetime(2024, 7, 20), 
            user_id=2,
            description="A week-long business trip in New York City."
        ),
        Itinerary(
            name="Christmas Getaway", 
            start_date=datetime(2024, 12, 20), 
            end_date=datetime(2024, 12, 29), 
            user_id=1,
            description="A warm Christmas escape with family."
        ),
        Itinerary(
            name="Weekend in Barcelona", 
            start_date=datetime(2024, 5, 10), 
            end_date=datetime(2024, 5, 13), 
            user_id=3,
            description="A short trip to enjoy the sights of Barcelona."
        ),
        Itinerary(
            name="Tokyo Business Conference", 
            start_date=datetime(2024, 9, 5), 
            end_date=datetime(2024, 9, 10), 
            user_id=2,
            description="Attend a major tech conference in Tokyo."
        ),
        Itinerary(
            name="Sydney Adventure", 
            start_date=datetime(2024, 11, 1), 
            end_date=datetime(2024, 11, 15), 
            user_id=3,
            description="Exploring Sydney and its surroundings."
        ),
        Itinerary(
            name="Cape Town Exploration", 
            start_date=datetime(2024, 8, 10), 
            end_date=datetime(2024, 8, 20), 
            user_id=1,
            description="Discover Cape Town and its attractions."
        ),
        Itinerary(
            name="New Year in New York", 
            start_date=datetime(2024, 12, 30), 
            end_date=datetime(2025, 1, 5), 
            user_id=2,
            description="Ring in the New Year in New York City."
        ),
        Itinerary(
            name="Barcelona Art Tour", 
            start_date=datetime(2024, 6, 15), 
            end_date=datetime(2024, 6, 25), 
            user_id=3,
            description="Touring Barcelona’s art and culture."
        )
    ]
    db.session.add_all(itineraries)
    db.session.commit()

def seed_activities():
    activities = [
        Activity(
            name="Eiffel Tower Visit", 
            date=datetime(2024, 6, 2), 
            description="Visit the iconic Eiffel Tower.", 
            itinerary_id=1, 
            destination_id=1
        ),
        Activity(
            name="Central Park Walk", 
            date=datetime(2024, 7, 16), 
            description="Enjoy a walk in Central Park.", 
            itinerary_id=2, 
            destination_id=2
        ),
        Activity(
            name="Sainte-Chapelle Tour", 
            date=datetime(2024, 6, 4), 
            description="Take a guided tour of Sainte-Chapelle.", 
            itinerary_id=1, 
            destination_id=1
        ),
        Activity(
            name="Park Güell Exploration", 
            date=datetime(2024, 6, 8), 
            description="Visit Park Güell and enjoy the park's architecture.", 
            itinerary_id=1, 
            destination_id=3
        ),
        Activity(
            name="New York Museum Visit", 
            date=datetime(2024, 7, 17), 
            description="Visit a famous museum in New York City.", 
            itinerary_id=2, 
            destination_id=2
        ),
        Activity(
            name="Barcelona Beach Day", 
            date=datetime(2024, 5, 12), 
            description="Relax at one of Barcelona’s beautiful beaches.", 
            itinerary_id=4, 
            destination_id=3
        ),
        Activity(
            name="Tokyo Tower Visit", 
            date=datetime(2024, 9, 6), 
            description="Explore Tokyo Tower and its observation decks.", 
            itinerary_id=5, 
            destination_id=4
        ),
        Activity(
            name="Sydney Opera House Tour", 
            date=datetime(2024, 11, 5), 
            description="Tour the Sydney Opera House.", 
            itinerary_id=6, 
            destination_id=5
        ),
        Activity(
            name="Table Mountain Hike", 
            date=datetime(2024, 8, 15), 
            description="Hike to the top of Table Mountain for panoramic views.", 
            itinerary_id=7, 
            destination_id=6
        ),
        Activity(
            name="Bondi Beach Surfing", 
            date=datetime(2024, 11, 10), 
            description="Enjoy surfing at Bondi Beach.", 
            itinerary_id=6, 
            destination_id=5
        ),
        Activity(
            name="Cape Town City Tour", 
            date=datetime(2024, 8, 12), 
            description="Explore the city of Cape Town and its landmarks.", 
            itinerary_id=7, 
            destination_id=6
        ),
        Activity(
            name="New York Times Square", 
            date=datetime(2024, 12, 31), 
            description="Experience the hustle and bustle of Times Square during New Year's Eve.", 
            itinerary_id=8, 
            destination_id=2
        ),
        Activity(
            name="Barcelona Art Museums", 
            date=datetime(2024, 6, 20), 
            description="Visit art museums such as Museu Picasso and Fundació Joan Miró.", 
            itinerary_id=9, 
            destination_id=3
        )
    ]
    db.session.add_all(activities)
    db.session.commit()

def seed_reviews():
    reviews = [
        Review(star=randint(1, 5), comment=fake.sentence(nb_words=10), user_id=1, destination_id=1),
        Review(star=randint(1, 5), comment=fake.sentence(nb_words=10), user_id=2, destination_id=2),
        Review(star=randint(1, 5), comment=fake.sentence(nb_words=10), user_id=3, destination_id=3),
        Review(star=randint(1, 5), comment=fake.sentence(nb_words=10), user_id=1, destination_id=4),
        Review(star=randint(1, 5), comment=fake.sentence(nb_words=10), user_id=2, destination_id=1),
        Review(star=randint(1, 5), comment=fake.sentence(nb_words=10), user_id=3, destination_id=2),
        Review(star=randint(1, 5), comment=fake.sentence(nb_words=10), user_id=1, destination_id=3),
        Review(star=randint(1, 5), comment=fake.sentence(nb_words=10), user_id=2, destination_id=4),
        Review(star=randint(1, 5), comment=fake.sentence(nb_words=10), user_id=3, destination_id=1),
        Review(star=randint(1, 5), comment=fake.sentence(nb_words=10), user_id=1, destination_id=2),
        Review(star=randint(1, 5), comment=fake.sentence(nb_words=10), user_id=2, destination_id=3),
        Review(star=randint(1, 5), comment=fake.sentence(nb_words=10), user_id=3, destination_id=4),
        Review(star=randint(1, 5), comment=fake.sentence(nb_words=10), user_id=1, destination_id=1),
        Review(star=randint(1, 5), comment=fake.sentence(nb_words=10), user_id=2, destination_id=2),
        Review(star=randint(1, 5), comment=fake.sentence(nb_words=10), user_id=3, destination_id=3),
        Review(star=randint(1, 5), comment=fake.sentence(nb_words=10), user_id=1, destination_id=4),
        Review(star=randint(1, 5), comment=fake.sentence(nb_words=10), user_id=2, destination_id=1),
        Review(star=randint(1, 5), comment=fake.sentence(nb_words=10), user_id=3, destination_id=2),
    ]
    db.session.add_all(reviews)
    db.session.commit()

def seed_popularSpots():
    popularSpots = [
        PopularSpot(
            name="Eiffel Tower", 
            description="The Eiffel Tower is a wrought iron tower in Paris, France that's 1,063 ft (324 m) tall. It's a famous symbol of Paris and one of the most recognizable structures in the world. ", 
            image_url="https://github.com/RumiYo/p5-project-travel-itinerary-app/blob/main/server/photos/image_effelTower.jpg?raw=true", 
            destination_id=1
        ),
        PopularSpot(
            name="Central Park", 
            description="Central Park is a world-famous, 843-acre public park in the middle of Manhattan, New York City. ", 
            image_url="https://github.com/RumiYo/p5-project-travel-itinerary-app/blob/main/server/photos/image_centralPark.jpg?raw=true",
            destination_id=2
        ),        
        PopularSpot(
            name="Sagrada Família", 
            description="The Sagrada Família, or Expiatory Temple, is a unfinished basilica in Barcelona, Spain that's been under construction since 1882. Designed by architect Antoni Gaudí, the temple is a UNESCO World Heritage Site", 
            image_url="https://github.com/RumiYo/p5-project-travel-itinerary-app/blob/main/server/photos/image_SagradaFamilia.jpg?raw=true",
            destination_id=3
        ),
        PopularSpot(
            name="Louvre Museum", 
            description="um, located in Paris, France. It's housed in the Louvre Palace, a 160,000 square meter building that was once a 12th-century fortress and a royal residence for French kings. ", 
            image_url="https://github.com/RumiYo/p5-project-travel-itinerary-app/blob/main/server/photos/image_effelTower.jpg?raw=true", 
            destination_id=1
        ),
               PopularSpot(
            name="Statue of Liberty", 
            description="The Statue of Liberty is a colossal neoclassical sculpture on Liberty Island in New York Harbor in New York City. It's a symbol of freedom and democracy.", 
            image_url="https://github.com/RumiYo/p5-project-travel-itinerary-app/blob/main/server/photos/image_SagradaFamilia.jpg?raw=true",
            destination_id=2
        ),
        PopularSpot(
            name="Sagrada Família", 
            description="The Sagrada Família, or Expiatory Temple, is an unfinished basilica in Barcelona, Spain that's been under construction since 1882. Designed by architect Antoni Gaudí, the temple is a UNESCO World Heritage Site.", 
            image_url="https://github.com/RumiYo/p5-project-travel-itinerary-app/blob/main/server/photos/image_SagradaFamilia.jpg?raw=true",
            destination_id=3
        ),
        PopularSpot(
            name="Park Güell", 
            description="Park Güell is a public park designed by Antoni Gaudí, located on Carmel Hill in Barcelona. It's known for its colorful mosaics and architectural wonders.", 
            image_url="https://github.com/RumiYo/p5-project-travel-itinerary-app/blob/main/server/photos/image_SagradaFamilia.jpg?raw=true",
            destination_id=3
        ),
        PopularSpot(
            name="Shibuya Crossing", 
            description="Shibuya Crossing is one of the busiest pedestrian crossings in the world, located in Tokyo. It's a vibrant symbol of Tokyo's bustling urban life.", 
            image_url="https://github.com/RumiYo/p5-project-travel-itinerary-app/blob/main/server/photos/image_SagradaFamilia.jpg?raw=true",
            destination_id=4
        ),
        PopularSpot(
            name="Tokyo Tower", 
            description="Tokyo Tower is a communications and observation tower in Tokyo. It's inspired by the Eiffel Tower and offers panoramic views of the city.", 
            image_url="https://github.com/RumiYo/p5-project-travel-itinerary-app/blob/main/server/photos/image_SagradaFamilia.jpg?raw=true",
            destination_id=4
        ),
        PopularSpot(
            name="Sydney Opera House", 
            description="The Sydney Opera House is an iconic performing arts center located on Sydney Harbour. It's known for its unique sail-like design and is a UNESCO World Heritage Site.", 
            image_url="https://github.com/RumiYo/p5-project-travel-itinerary-app/blob/main/server/photos/image_SagradaFamilia.jpg?raw=true",
            destination_id=5
        ),
        PopularSpot(
            name="Bondi Beach", 
            description="Bondi Beach is a famous beach in Sydney known for its golden sands, surf culture, and vibrant atmosphere. It's a popular destination for both locals and tourists.", 
            image_url="https://github.com/RumiYo/p5-project-travel-itinerary-app/blob/main/server/photos/image_SagradaFamilia.jpg?raw=true",
            destination_id=5
        ),
        PopularSpot(
            name="Table Mountain", 
            description="Table Mountain is a flat-topped mountain in Cape Town, South Africa. It offers stunning panoramic views of the city and is a popular hiking destination.", 
            image_url="https://github.com/RumiYo/p5-project-travel-itinerary-app/blob/main/server/photos/image_SagradaFamilia.jpg?raw=true",
            destination_id=6
        ),
        PopularSpot(
            name="V&A Waterfront", 
            description="The V&A Waterfront is a bustling harbor area in Cape Town, featuring shops, restaurants, and attractions. It's a popular spot for tourists and locals alike.", 
            image_url="https://github.com/RumiYo/p5-project-travel-itinerary-app/blob/main/server/photos/image_SagradaFamilia.jpg?raw=true",
        )
        # ... Add more 
    ]
    db.session.add_all(popularSpots)
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
        PopularSpot.query.delete()
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
       
        print('Seeding Popular Spots...')
        seed_popularSpots()

