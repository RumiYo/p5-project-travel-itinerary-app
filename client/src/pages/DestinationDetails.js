import { useParams, useOutletContext, Link  } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import StarRating from '../components/Destinations/StarRating';
import ReviewForm from "../components/Destinations/ReviewForm";
import DestinationContext from "../DestinationContext";
import UserContext from "../UserContext";
import MapboxMap from "../components/Destinations/MapboxMap";


function DestinationDetails(){

    const { destination, setDestination, popularSpots, setPopularSpots  } = useContext(DestinationContext);
    const params = useParams();
    const { user } = useContext(UserContext);    
    const [ error, setError] = useState("")
    const [ reviews, setReviews ] = useState([])
    const zoom = 12;

    useEffect(() => {
        fetch(`/destinations/${parseInt(params.id)}`)
        .then((r)=> {
          if(r.ok){
            r.json().then((d) => setDestination(d))
          } else {
            setError("Failed to fetch destination details.");
          }
        })
        .catch(() => setError("An error occurred while fetching data."));
      }, [params.id, setDestination]);

    useEffect(() => {
        if (destination) {  
            setPopularSpots(destination.popularSpots || []);
            setReviews(destination.reviews || []);
        }
    }, [destination]);

    const updateReviews = (newReview) => {
        setReviews([...reviews, newReview]);
    };

    if (!destination && !error) {
        return <div>Loading...</div>;
    }
    return (
        
        <div id="destinationDetail">

            <h1>{destination.city} ({destination.country})</h1>
            <img src={destination.image_url} alt={destination.city} id="destinationDetailImage"/>
            <p>{destination.description}</p>
            <h3>Reviews</h3>
            <div>
            {reviews.length >0 ? (
                reviews.map((r) => (
                        <div key={r.id} className="reviewList">
                            <StarRating star={r.star} />  
                            <span>   {r.comment}</span>
                        </div>
                    ))
                ) : (
                    <p>No reviews.</p>                    
                )}                
            </div>
            < ReviewForm destination={destination} updateReviews={updateReviews}/>
            <br/>
            <div className="allPopularSpot">
                {popularSpots.map((a) => (
                    <div key={a.id} className="popularSpotsList">
                        <h3>{a.name}</h3>
                        <img src={a.image_url} alt={a.name} className="popularSpotsListImage"/><br/>
                        <small>{a.description}</small>
                    </div>
                ))}

                <br />
                <div className="locationsHeading">
                    <h3>Locations</h3>                
                    <MapboxMap city={destination.city} zoom={zoom} />
                </div>
            </div>
            <br />
            <Link id="closeDetails" to={`/destinations`}>Close details</Link> 
        </div>
    )
}

export default DestinationDetails;