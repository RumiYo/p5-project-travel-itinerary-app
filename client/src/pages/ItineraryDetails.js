import { useParams, Link, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Activity from "../components/Itineraries/Activity";
import ItineraryContext from '../ItineraryContext';  

function ItineraryDetails(){
    const params = useParams();
    const navigate = useNavigate()

    const { itinerary, setItinerary } = useContext(ItineraryContext);

    const [ activities, setActivities ] = useState([])
    const [ sortedActivities, setSortedActivities ] = useState([])   
 
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
    }, [params.id, setItinerary]);

    function deleteItinerary(){
        fetch(`/itineraries/${params.id}`,{
            method: 'DELETE',
        })
        .then((r) => {
            if(r.ok){
                navigate('/itineraries')
            } 
        })
    }

    function addNewActivity(newActivity){
        const newActivities = [...activities, newActivity]
        setActivities(newActivities);
        const sorted = newActivities.sort((a, b) => a.date.localeCompare(b.date))
        setSortedActivities(sorted)
    }

    function updateActivities(updatedActivity) {
        const newActivities = activities.map((a) =>
            a.id === updatedActivity.id ? updatedActivity : a
        );
        setActivities(newActivities);
        const sorted = newActivities.sort((a, b) => a.date.localeCompare(b.date));
        setSortedActivities(sorted);
    }
    
    function deleteActivity(activityId){
        const newActivities = activities.filter((a) => a.id !== activityId)
        setActivities(newActivities)
        const sorted = newActivities.sort((a, b) => a.date.localeCompare(b.date))
        setSortedActivities(sorted)
    }

    function updateItinerary(itinerary){
        setItinerary(itinerary)
    }

    if (!itinerary) {
        return <div>Loading...</div>;
    }
    
    return (
        <div className="mainPages">
            <h2>{itinerary.name}</h2>
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
                <br/>
                <Link className="buttons" to={`/itineraries/${itinerary.id}/activities`}>Let's plan activities</Link>
                <Link className="buttons" to={`/itineraries/${itinerary.id}/edit`}>Edit this Itinerary</Link>
                <button onClick={deleteItinerary} className="buttons">Delete this Itinerary</button>
                <Outlet context={{itinerary: itinerary, activities: activities, updateItinerary: updateItinerary, addNewActivity: addNewActivity, updateActivities:updateActivities}} />
            </div>

            <br/><br/>
            <Link to={`/itineraries`}>Go back to Itineraries</Link>
        </div>
    )
}

export default ItineraryDetails