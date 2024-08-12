import { useParams, Link, Outlet } from "react-router-dom";
import EditActivity from "./EditActivity";

function Activity({ itinerary, activity, deleteActivity, updateActivites }){

    function handleDeleteActivity (activityId){
        console.log("Delete", activityId)
        fetch(`/activities/${activityId}`,{
            method: "DELETE",
        }).then((r) => {
            if(r.ok){
                deleteActivity(activityId);
            } 
        });
    }

    return (
        <div key={activity.id} className="activity">
            <h4>{activity.date} {activity.name}</h4>
            <small>{activity.destination.city} ({activity.destination.country})</small>
            <p>{activity.description}</p>
            <Link to={`/itineraries/${itinerary.id}/activities/${activity.id}`}>Edit activities</Link>
            <br />
            <button onClick={() => handleDeleteActivity(activity.id)}  className="buttons">Delete this Activity</button>
        </div>
    )
}

export default Activity