# Online Library App 
Flatiron Softwear engineer course phase 5 project (Final Project)

## Table of Contents
* [Phase 5 project requirement](#phase-5-project-requirements)
* [My Full-Stack application](#my-full-stack-application)
* [Technologies](#technologies)
* [Future improvement](#future-improvement)
* [Resources](#resources)


## Phase 5 project requirements

[Project guidelines are here. ](https://github.com/RumiYo/python-p5-project-guidelines-and-schedule)

For this project, you must:

1. Implement Flask and SQLAlchemy in an application backend.
2. Include a many to many relationship.
3. Implement a minimum of 4 models.
4. Implement a minimum of 5 client side routes using React router.
5. Include full CRUD on at least 1 model, following REST conventions.
6. Implement validations and error handling.
7. Implement something new not taught in the curriculum. (Check in with your instructor to ensure the scope of your idea is appropriate.)
8. Implement useContext or Redux.

## My Full-Stack application
This Travel Itinerary Application allows users to browse popular cities and tourist spots and plan their trip after logging in. 

[![Watch the video](https://img.youtube.com/vi/YcI8zp8sVsE/0.jpg)](https://youtu.be/YcI8zp8sVsE)

#### Backend:
- Python and Flask for building the API
- SQLAlchemy for database management
- Serialization and validation

#### Frontend:
- React for building the user interface
- Sending HTTP requests with fetch to the API
- React Router for navigation
- Formik and Form Validation
- API integration with mapbox

#### Models:
![itineraryapp_diagram](https://github.com/user-attachments/assets/bd5ee756-877f-45c0-8f21-85a7686477d5)

## Technologies

### Password Protection
Instead of storing users' passwords in plain text, we store a hashed version of them for the security purpose.
We use `bcrypt` to hash passwords before storing them in the database. Hashing transforms the password into a secure string that is not reversible, while salting adds unique data to each password to prevent identical passwords from having the same hash. This protects user credentials in case of a database breach and makes it harder for attackers to crack passwords.
Benefits:
- Enhanced Security: Passwords are stored as hashes, not plain text.
- Protection Against Attacks: Unique salts and hashing complexity make it difficult for attackers to reverse-engineer passwords.
```
class Member(db.Model, SerializerMixin):
    __tablename__='members'
    serialize_rules = ('-loans.member','-books.members', '-books.loans')

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    user_id = db.Column(db.String, nullable=False, unique=True)
    email = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)

    # Add relationships
    loans = db.relationship('Loan', back_populates='member')
    books = association_proxy('loans', 'book',
                creator=lambda project_obj: Loan(project=project_obj))

    #passsword handling
    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hash is not accessible')

    @password_hash.setter
    def password_hash(self, password):
        if password is None:
            raise ValueError("Password cannot be None")
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8')
        )
        self._password_hash = password_hash.decode('utf-8')
    
    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8')
        )

```

### Authentication in Flask
Authentication is to provide one's identity to an application in order to access protected information; logging in.
UserID and password combination is the most popular authentication mechanism, and it is also known as password authentication.
```
class Signups(Resource):

    def post(self):
        json_data = request.get_json()
        if not json_data.get('user_id') or not json_data.get('first_name') or not json_data.get('last_name')or not json_data.get('email'):
            return {"error": "All input fields cannot be empty"}, 422 
        duplicate_name_member = Member.query.filter(Member.user_id==json_data['user_id']).first()
        if duplicate_name_member:
            return {"error": "This user_id already exists. Try with a new user id"}, 422
        new_record = Member(
            first_name=json_data.get('first_name'),
            last_name=json_data.get('last_name'),
            user_id=json_data.get('user_id'),
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
        member = Member.query.filter(Member.id==session.get('user_id')).first()
        if member:
            return member.to_dict()
        else:
            return {'error': '401: Not Authorized'}, 401     

class Login(Resource):
    def post(self):
        json_data = request.get_json()
        member = Member.query.filter(Member.user_id==json_data.get('user_id')).first()
        if member and member.authenticate(json_data.get('password')):
            session['user_id'] = member.id
            return member.to_dict()

        return {'error': 'Invalid username or password'}, 401

class Logout(Resource):
    def delete(self):
        if not session['user_id']:
            return {'error': 'You are not logged in'}, 401

        session['user_id']= None
        return {}, 204
```

### Formik Form Validation
The Formik library provides us a hook to give initial values to the form and write a onSubmit callback function to do something with the values that were submitted with the condition below.  
Yup provides a schema-based validation approach.
```
	const formSchema = yup.object().shape({
		first_name: yup.string().required("Must enter First Name")
				.max(15, "First Name must be at most 15 characters long"),
		last_name: yup.string().required("Must enter Last Name")
				.max(15, "Last Name must be at most 15 characters long"),
		username: yup.string().required("Must enter a User Name")
				.max(10, "Username must be at most 10 characters long")
				.matches(/^\S*$/, "Username cannot contain spaces"),
		email: yup.string().email("Invalid email").required("Must enter email"),
		password_hash: yup.string().required("Must enter password")
				.matches(/^\S*$/, "Username cannot contain spaces").max(15),
	});
```

### mapbox Integration
https://www.mapbox.com/
Mapbox is a powerful tool used for integrating interactive maps into web applications. It provides customizable mapping services and geocoding capabilities to enhance user experience by displaying geographic data and locations.
In this application, Mapbox is utilized to show the locations of cities. By leveraging the Mapbox Geocoding API, city names are converted into geographical coordinates, which are then used to render interactive maps.
```
function MapboxMap ({ city, zoom = 8 }) {
    const [center, setCenter] = useState([0, 0]);

    useEffect(() => {
        if (city) {
        // Fetch coordinates for the city using Mapbox Geocoding API
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(city)}.json?access_token=${mapboxgl.accessToken}`)
            .then(response => response.json())
            .then(data => {
            if (data.features.length > 0) {
                const [lng, lat] = data.features[0].geometry.coordinates;
                setCenter([lng, lat]);![itineraryapp_diagram](https://github.com/user-attachments/assets/a360060c-edf0-4630-9ce0-08fff3c60f90)

            }
            })
            .catch(error => console.error('Error fetching city coordinates:', error));
        }
    }, [city]);

    useEffect(() => {
        if (center[0] !== 0) {
        const map = new mapboxgl.Map({
            container: 'map', // ID of the HTML element
            style: 'mapbox://styles/mapbox/streets-v11', // Map style
            center, // [longitude, latitude]
            zoom, // Initial zoom level
        });

        // Add a marker for the city
        new mapboxgl.Marker()
            .setLngLat(center)
            .setPopup(new mapboxgl.Popup().setText(city))
            .addTo(map);

        // Clean up the map on component unmount
        return () => map.remove();
        }
    }, [center, city, zoom]);

    return <div id="map" className="map-container" />;
};

export default MapboxMap;
```

## Future Improvement
- **Add Facebook/Google Sign-In:** Enhance accessibility by integrating social media sign-in options.
- **Map Search Box:** Implement a search feature on the map to easily locate popular spots.
- **Create Itinerary/Add Activity Button:** Add functionality to create itineraries or add activities directly from the Destination Detail page.
- **Replace Pulldown with Search Box:** Improve user experience on the Add Activity page by replacing the pulldown menu with a search box.

## Resources

- [DBDiagram](https://dbdiagram.io/d)
- [Faker 26.0.0 documentation: date_time](https://faker.readthedocs.io/en/master/providers/faker.providers.date_time.html)
- [Python Formik Validation](https://github.com/learn-co-curriculum/python-formik-validation)
- [MAPBOX VS GOOGLE MAPS: WHAT MAPS API IS BEST FOR YOUR APP?](https://www.uptech.team/blog/mapbox-vs-google-maps-vs-openstreetmap)
- [React + Mapbox beginner tutorial](https://dev.to/laney/react-mapbox-beginner-tutorial-2e35)
- [Coolors](https://coolors.co/palette/cb997e-eddcd2-fff1e6-f0efeb-ddbea9-a5a58d-b7b7a4)
