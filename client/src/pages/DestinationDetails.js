import { useParams, useOutletContext, Link  } from "react-router-dom";
import { useState, useEffect } from "react";

function DestinationDetails(){

    const params = useParams();
    const { user } = useOutletContext();
    const [ error, setError] = useState("")
    const [ destination, setDestination ] = useState(null)
    const [ activities, setActivities ] = useState([])

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
        }
    }, [destination]);

    if (!destination) {
        return <div>Loading...</div>;
    }
    return (
        
        <div id="destinationDetail">

            <h1>{destination.city} ({destination.country})</h1>
            <img src={destination.image_url} alt={destination.city} id="destinationDetailImage"/>
            <h4>Summary</h4>
            <p>{destination.description}</p>
            <br/>
            {activities.map((a) => (
                <div>
                    <h4 key={a.id}>{a.name}</h4>
                    <small>{a.description}</small>
                </div>
            ))}
            <br />
            <Link id="closeDetails" to={`/destinations`}>Close details</Link> 
        </div>
    )
}

export default DestinationDetails;