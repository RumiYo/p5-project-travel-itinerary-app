import { useParams, useOutletContext, Link  } from "react-router-dom";
import { useState, useEffect } from "react";
import StarRating from '../components/StarRating';

function DestinationDetails(){

    const params = useParams();
    const { user } = useOutletContext();
    const [ error, setError] = useState("")
    const [ destination, setDestination ] = useState(null)
    const [ activities, setActivities ] = useState([])
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
            setActivities(destination.activities || []);
            setReviews(destination.reviews || []);
        }
    }, [destination]);

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
                        <p><StarRating star={r.star} />  {r.comment}</p>
                    </div>
                ))}                
            </div>
            <br/>
            <div>
                {activities.map((a) => (
                    <div key={a.id} className="activityList">
                        <h4>{a.name}</h4>
                        <img src={a.image_url} alt={a.name} className="activityListImage"/><br/>
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