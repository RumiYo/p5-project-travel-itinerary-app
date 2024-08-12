import { useParams, Link, Outlet, useOutletContext, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Activity from "../components/Itineraries/Activity";

function ItineraryDetails(){
    const params = useParams();
    const navigate = useNavigate()

    const [ itinerary, setItinerary ] = useState(null)
    const [ activities, setActivities ] = useState([])
    const [ sortedActivities, setSortedActivities ] = useState([])   
    const [ message , setMessage] = useState("") 
 
    useEffect(() => {
        fetch(`/itineraries/${parseInt(params.id)}`)
        .then((r)=> {
          if(r.ok){
            r.json().then((itinerary) => {
                setItinerary(itinerary)
                setActivities(itinerary.activities)
                const sorted = itinerary.activities.sort((a, b) => a.date.localeCompare(b.date));
                setSortedActivities(sorted)
            })
          }
        })
    }, [params.id]);

    function deleteItinerary(){
        fetch(`/itineraries/${params.id}`,{
            method: 'DELETE',
        })
        .then((r) => {
            if(r.ok){
                navigate('/itineraries')
            } else {
                setMessage("Failed to delete itinerary.")
            }
        })
    }

    function updateActivites(newActivity){
        setActivities([...activities, newActivity]);
    }

    function deleteActivity(activityId){
        setActivities(activities.filter((a) => a.id !== activityId))
    }

    function updateItinerary(itinerary){
        setItinerary(itinerary)
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
                {sortedActivities.length > 0 ? (
                    sortedActivities.map((a) => 
                        <Activity activity={a} deleteActivity={deleteActivity} key={a.id}/>
                    )
                ) : (
                    <p>No activities are planned yet.</p>
                )}
                <Link to={`/itineraries/${itinerary.id}/activities`}>Let's plan activities</Link>
                <br/>
                <Link to={`/itineraries/${itinerary.id}/edit`}>Edit this Itinerary</Link>
                <br/>
                <Outlet context={{itinerary:itinerary, updateItinerary:updateItinerary, updateActivites:updateActivites}} />
            </div>
            <br/>
            <button onClick={deleteItinerary} className="buttons">Delete this Itinerary</button>
            <br/><br/>
            <Link to={`/itineraries`}>Go back to Itineraries</Link>
        </div>
    )
}

export default ItineraryDetails