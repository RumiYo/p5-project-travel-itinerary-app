import React from "react"
import { Link } from "react-router-dom";
import "../App.css";

function Destination({ destination }){

    return (
         <div className="destinationList">
            <img src={destination.image_url} alt={destination.city} className="destinationListImage"/>
            <h5>{destination.city} ({destination.country})</h5>
            <small>{destination.description}</small><br/>
            <small>
             <Link to={`/destinations/${destination.id}`} >View details</Link> 
            </small> 
        </div>
    )
}

export default Destination;