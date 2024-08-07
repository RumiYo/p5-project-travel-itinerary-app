import React from "react"
import { Link } from "react-router-dom";
import "../App.css";

function Destination({ destination }){

    return (
         <div className="destinationList">
            <img src="" alt={destination.city} className="destinationImage"/>
            <h5>{destination.city}</h5>
            <small>Country: {destination.country}</small><br/>
            <small>Description: {destination.destination_description}</small><br/>
            <small>
             <Link to={`/destinations/${destination.id}`} >View details</Link> 
            </small> 
        </div>
    )
}

export default Destination;