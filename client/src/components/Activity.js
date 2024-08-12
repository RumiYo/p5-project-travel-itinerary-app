function Activity({ activity, deleteActivity }){

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
            <button onClick={() => handleDeleteActivity(activity.id)}>Delete</button>
        </div>
    )
}

export default Activity