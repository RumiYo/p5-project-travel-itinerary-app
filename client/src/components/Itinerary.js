import React from "react"
import { Link } from "react-router-dom";
import "../App.css";

function Itinerary({ itinerary }){

    return (
         <div className="itineraryList">
            <img src="" alt={itinerary.id} className="itineraryImage"/>
            <h5>{itinerary.itinerary_name}</h5>
            <small>{itinerary.itinerary_description}</small><br/>
            <small>Start date: {itinerary.start_date}</small><br/>
            <small>End date: {itinerary.end_date}</small><br/>
            
        </div>
    )
}

export default Itinerary;