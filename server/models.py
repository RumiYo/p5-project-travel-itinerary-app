from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    serialize_rules = ('-itineraries.user', '-reviews.user')

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    username = db.Column(db.String, nullable=False, unique=True)
    email = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column(db.String, nullable=False)

    itineraries = db.relationship('Itinerary', back_populates='user', cascade='all, delete-orphan')
    reviews = db.relationship('Review', back_populates='user', cascade='all, delete-orphan')

    @validates('email')
    def validate_email(self, key, email):
        if '@' not in email:
             raise ValueError("Email address validation error")
        return email

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hash is not accessible')

    @password_hash.setter
    def password_hash(self, password):
        if password is None:
            raise ValueError("Password cannot be empty")
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8')
        )
        self._password_hash = password_hash.decode('utf-8')
    
    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8')
        )

    # def to_dict(self):
    #     return{
    #         "id": self.id,
    #         "first_name": self.first_name, 
    #         "last_name": self.last_name,
    #         "username": self.username,
    #         "email": self.email,

    #     }

    def __repr__(self):
        return f'<User {self.id}: {self.first_name}, {self.last_name}, {self.username}, {self.email}>'

class Itinerary(db.Model, SerializerMixin):
    __tablename__ = 'itineraries'
    serialize_rules = ('-user.itineraries', '-activities.itinerary', '-activities.destination',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    start_date = db.Column(db.DateTime)
    end_date = db.Column(db.DateTime)
    user_id =  db.Column(db.Integer, db.ForeignKey('users.id'))
    description = db.Column(db.String)
    
    user = db.relationship('User', back_populates='itineraries')
    activities = db.relationship('Activity', back_populates='itinerary', cascade='all, delete-orphan')
    destinations = association_proxy('activities', 'destination',
                     creator=lambda destination_obj: Activity(destination=destination_obj))

    @validates('name')
    def validate_name(self, key, name):
        if not name:
             raise ValueError("Itinerary Name cannot be empty")
        return name

    def __repr__(self):
        return f'<Itinerary {self.id}: {self.name}, {self.start_date}, {self.end_date}, {self.user_id}>'

class Destination(db.Model, SerializerMixin):
    __tablename__ = 'destinations'
    serialize_rules = ('-activities.destination', '-activities.itinerary', '-itineraries.activities', '-itineraries.destinations', '-reviews.destination', '-popularSpots.destination')

    id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.String, nullable=False, unique=True)
    country = db.Column(db.String, nullable=False)
    image_url = db.Column(db.String)
    description = db.Column(db.String)

    activities = db.relationship('Activity', back_populates='destination')
    itineraries = association_proxy('activities', 'itinerary', 
                    creator=lambda project_obj: Activity(project=project_obj))
    reviews = db.relationship('Review', back_populates='destination')
    popularSpots = db.relationship('PopularSpot', back_populates='destination')

    @validates('city', 'country')
    def validate_input(self, key, name):
        if not name:
             raise ValueError("City and Country cannot be empty")
        return name

    def __repr__(self):
        return f'<Destination {self.id}: {self.city}, {self.country}, {self.description}>'

class Activity(db.Model, SerializerMixin):
    __tablename__ = 'activities'
    serialize_rules = ('-itinerary.activities', '-itinerary.destionations', '-destination.activities', '-destinations.itineraries')

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    date =  db.Column(db.DateTime)
    description = db.Column(db.String)
    itinerary_id = db.Column(db.Integer, db.ForeignKey('itineraries.id'))
    destination_id = db.Column(db.Integer, db.ForeignKey('destinations.id'))

    itinerary = db.relationship('Itinerary', back_populates='activities')
    destination = db.relationship('Destination', back_populates='activities')

    @validates('name')
    def validate_input(self, key, name):
        if not name:
             raise ValueError("Activity Name cannot be empty")
        return name

    def __repr__(self):
        return f'<Activity {self.id}: {self.name}, {self.date}, {self.description}, {self.itinerary_id}, {self.destination_id}>'

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'
    serialize_rules = ('-user.reviews', '-destination.reviews')

    id = db.Column(db.Integer, primary_key=True)
    star = db.Column(db.Float)
    comment = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    destination_id = db.Column(db.Integer, db.ForeignKey('destinations.id'))

    user = db.relationship('User', back_populates='reviews')
    destination = db.relationship('Destination', back_populates='reviews')

    @validates('star')
    def validate_star(self, key, star):
        star = float(star)
        if star < 0.00 or star > 5.00:
            raise ValueError('Star must be between 0.00 and 5.00')
        return star

    def __repr__(self):
        return f'<Review {self.id}: {self.star}, {self.comment}, {self.user_id}, {self.destination_id}>'

class PopularSpot(db.Model, SerializerMixin):
    __tablename__ = 'popularSpots'
    serialize_rules = ('-destination.popularSpots',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    image_url = db.Column(db.String)
    destination_id = db.Column(db.Integer, db.ForeignKey('destinations.id'))

    destination = db.relationship('Destination', back_populates='popularSpots')

    def __repr__(self):
        return f'<PopularSpot {self.id}: {self.name}, {self.description}, {self.destination_id}>'
