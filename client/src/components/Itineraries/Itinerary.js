import React from "react"
import { Link } from "react-router-dom";
import '../../App.css';

function Itinerary({ itinerary }){

    if (!itinerary) {
        return <div>Loading itinerary...</div>;
    }

    return (
        <div className="itinerariesList">
            <h3>{itinerary.name}</h3>
            <p>{itinerary.description}</p>
            <ul>
                <li>Start date: {itinerary.start_date}</li>
                <li>End date: {itinerary.end_date}</li>
            </ul>
            <br/>
            <Link to={`/itineraries/${itinerary.id}`} >View details</Link> 
        </div>
    )
}

export default Itinerary;