import { useParams, Link, Outlet, useOutletContext, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function ItineraryDetails(){
    const params = useParams();

    const [ itinerary, setItinerary ] = useState(null)
    const [ activities, setActivities ] = useState([])
    const [ message , setMessage] = useState("") 
 
    useEffect(() => {
        fetch(`/itineraries/${parseInt(params.id)}`)
        .then((r)=> {
          if(r.ok){
            r.json().then((itinerary) => {
                setItinerary(itinerary)
                setActivities(itinerary.activities)
            })
          }
        })
    }, [params.id]);

    function updateActivites(newActivity){
        setActivities([...activities, newActivity]);
    }

    function handleDeleteActivity (activityId){
        console.log("Delete", activityId)
        fetch(`/activities/${activityId}`,{
            method: "DELETE",
        }).then((r) => {
            if(r.ok){
                setActivities(activities.filter((a) => a.id !== activityId));
            } else {
                r.json().then((err) => setMessage(err.error));
                console.log(message)
            }
        });
    }



    if (!itinerary) {
        return <div>Loading...</div>;
    }
    
    return (
        <div id="itineraryDetail">
            <h4>{itinerary.name}</h4>
            <p>{itinerary.description}</p>
            <ul>
                <li>Start date: {itinerary.start_date}</li>
                <li>End date: {itinerary.end_date}</li>
            </ul>            
            <h5>Activities</h5>
            
            <div id="activitiesList">
                {activities.length >0 ? (
                    activities.map((a) => (
                        <div key={a.id} className="activity">
                            <h4 key={a.id}>{a.date} {a.name}</h4>
                            <small>{a.destination.city} ({a.destination.country})</small>
                            <p>{a.description}</p>
                            <button onClick={() => handleDeleteActivity(a.id)}>Delete</button>
                        </div>
                    ))
                ) : (
                    <p>No activities are planned yet.</p>
                )}
                <Link to={`/itineraries/${itinerary.id}/activities`}>Let's plan activities</Link>
                <br/>
                <Outlet context={{itinerary:itinerary, updateActivites:updateActivites}} />
            </div>
            <br/>
            <Link to={`/itineraries`}>Go back to Itineraries</Link>
        </div>
    )
}

export default ItineraryDetails