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
        Destination(
            city="Moscow", 
            country="Russia", 
            image_url="https://github.com/RumiYo/p5-project-travel-itinerary-app/blob/main/server/photos/Barcelona_image.jpg?raw=true",
            description="Moscow, Russia’s capital, is known for its historical and cultural heritage. From the iconic Red Square to the Kremlin, Moscow offers a deep dive into Russian history with its architectural marvels and vibrant cultural scene."
        ),
        Destination(
            city="Dubai", 
            country="UAE", 
            image_url="https://github.com/RumiYo/p5-project-travel-itinerary-app/blob/main/server/photos/Barcelona_image.jpg?raw=true",
            description="Dubai, a city in the UAE, is famous for its ultramodern architecture, luxury shopping, and vibrant nightlife scene. The cityscape is dominated by the Burj Khalifa, the world’s tallest building, and the artificial islands along its coast."
        ),
        Destination(
            city="Amsterdam", 
            country="Netherlands", 
            image_url="https://github.com/RumiYo/p5-project-travel-itinerary-app/blob/main/server/photos/Barcelona_image.jpg?raw=true",
            description="Amsterdam, the Netherlands’ capital, is known for its artistic heritage, elaborate canal system, and narrow houses with gabled facades. The city is rich with museums and historic sites, offering a unique blend of culture and history."
        ),
        Destination(
            city="Bangkok", 
            country="Thailand", 
            image_url="https://github.com/RumiYo/p5-project-travel-itinerary-app/blob/main/server/photos/Barcelona_image.jpg?raw=true",
            description="Bangkok, Thailand’s capital, is known for its vibrant street life and cultural landmarks. The city is a mix of modern skyscrapers, traditional temples, and a bustling night market scene."
        ),
        Destination(
            city="Cairo", 
            country="Egypt", 
            image_url="https://github.com/RumiYo/p5-project-travel-itinerary-app/blob/main/server/photos/Barcelona_image.jpg?raw=true",
            description="Cairo, Egypt’s sprawling capital, is set on the Nile River and is famous for its proximity to the ancient pyramids of Giza. The city is a blend of history and modernity, offering a deep dive into Egyptian culture."
        ),
        Destination(
            city="Los Angeles", 
            country="USA", 
            image_url="https://github.com/RumiYo/p5-project-travel-itinerary-app/blob/main/server/photos/Barcelona_image.jpg?raw=true",
            description="Los Angeles, a sprawling Southern California city, is known for its Mediterranean climate, Hollywood entertainment industry, and diverse culture. It’s a hub of creative energy with attractions like the Hollywood Walk of Fame and Santa Monica Pier."
        )
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
            name="Adventure in Rome", 
            start_date=datetime(2024, 3, 15), 
            end_date=datetime(2024, 3, 25), 
            user_id=4,
            description="Explore the historic sites of Rome."
        ),
        Itinerary(
            name="Rio Carnival Experience", 
            start_date=datetime(2024, 2, 20), 
            end_date=datetime(2024, 2, 25), 
            user_id=5,
            description="Enjoy the vibrant festivities of Rio's Carnival."
        ),
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
            destination_id=1  # Paris
        ),
        Activity(
            name="Central Park Walk", 
            date=datetime(2024, 7, 16), 
            description="Enjoy a walk in Central Park.", 
            itinerary_id=2, 
            destination_id=2  # New York
        ),
        Activity(
            name="Sainte-Chapelle Tour", 
            date=datetime(2024, 6, 4), 
            description="Take a guided tour of Sainte-Chapelle.", 
            itinerary_id=1, 
            destination_id=1  # Paris
        ),
        Activity(
            name="Park Güell Exploration", 
            date=datetime(2024, 5, 11), 
            description="Visit Park Güell and enjoy the park's architecture.", 
            itinerary_id=4, 
            destination_id=3  # Barcelona
        ),
        Activity(
            name="Tokyo Tower Visit", 
            date=datetime(2024, 9, 6), 
            description="Explore Tokyo Tower and its observation decks.", 
            itinerary_id=5, 
            destination_id=4  # Tokyo
        ),
        Activity(
            name="Colosseum Visit", 
            date=datetime(2024, 3, 16), 
            description="Explore the historic Colosseum.", 
            itinerary_id=6, 
            destination_id=7  # Rome
        ),
        Activity(
            name="Christ the Redeemer Visit", 
            date=datetime(2024, 2, 21), 
            description="Visit the iconic Christ the Redeemer statue.", 
            itinerary_id=7, 
            destination_id=8  # Rio de Janeiro
        ),
        Activity(
            name="Louvre Museum Tour", 
            date=datetime(2024, 6, 3), 
            description="Explore the famous Louvre Museum.", 
            itinerary_id=1, 
            destination_id=1  # Paris
        ),
        Activity(
            name="Times Square Experience", 
            date=datetime(2024, 7, 18), 
            description="Experience the hustle and bustle of Times Square.", 
            itinerary_id=2, 
            destination_id=2  # New York
        ),
        Activity(
            name="Sagrada Família Tour", 
            date=datetime(2024, 5, 12), 
            description="Visit the iconic Sagrada Família.", 
            itinerary_id=4, 
            destination_id=3  # Barcelona
        ),
        Activity(
            name="Shibuya Crossing Adventure", 
            date=datetime(2024, 9, 7), 
            description="Experience the bustling Shibuya Crossing.", 
            itinerary_id=5, 
            destination_id=4  # Tokyo
        ),
        Activity(
            name="Roman Forum Exploration", 
            date=datetime(2024, 3, 18), 
            description="Explore the ancient Roman Forum.", 
            itinerary_id=6, 
            destination_id=7  # Rome
        ),
        Activity(
            name="Sambadrome Parade", 
            date=datetime(2024, 2, 22), 
            description="Experience the vibrant Carnival parade at the Sambadrome.", 
            itinerary_id=7, 
            destination_id=8  # Rio de Janeiro
        ),
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

