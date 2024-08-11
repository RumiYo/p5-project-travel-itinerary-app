import { useParams, useOutletContext, Link  } from "react-router-dom";
import { useState, useEffect } from "react";
import StarRating from '../components/StarRating';
import ReviewForm from "../components/ReviewForm";

function DestinationDetails(){

    const params = useParams();
    const { user } = useOutletContext();
    const [ error, setError] = useState("")
    const [ destination, setDestination ] = useState(null)
    const [ popularSpots, setPopularSpots ] = useState([])
    const [ reviews, setReviews ] = useState([])

    useEffect(() => {
        fetch(`/destinations/${parseInt(params.id)}`)
        .then((r)=> {
          if(r.ok){
            r.json().then((d) => setDestination(d))
          } else {
            setError("Failed to fetch destination details.");
          }
        })
      }, [params.id]);

    useEffect(() => {
        if (destination) {  
            setPopularSpots(destination.popularSpots || []);
            setReviews(destination.reviews || []);
        }
    }, [destination]);

    const updateReviews = (newReview) => {
        setReviews([...reviews, newReview]);
    };

    if (!destination) {
        return <div>Loading...</div>;
    }
    return (
        
        <div id="destinationDetail">

            <h1>{destination.city} ({destination.country})</h1>
            <img src={destination.image_url} alt={destination.city} id="destinationDetailImage"/>
            <p>{destination.description}</p>
            <h4>Reviews</h4>
            <div>
            {reviews.map((r) => (
                    <div key={r.id} className="reviewList">
                        <StarRating star={r.star} />  
                        <span>   {r.comment}</span>
                    </div>
                ))}                
            </div>
            < ReviewForm destination={destination} user={user} updateReviews={updateReviews}/>
            <br/>
            <div className="allPopularSpot">
                {popularSpots.map((a) => (
                    <div key={a.id} className="popularSpotsList">
                        <h3>{a.name}</h3>
                        <img src={a.image_url} alt={a.name} className="popularSpotsListImage"/><br/>
                        <small>{a.description}</small>
                    </div>
                ))}
            </div>
            <br />
            <Link id="closeDetails" to={`/destinations`}>Close details</Link> 
        </div>
    )
}

export default DestinationDetails;