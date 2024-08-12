import React, { useEffect, useContext } from "react";
import Destination from "../components/Destinations/Destination"
import DestinationContext from "../DestinationContext";

function Destinations(){

    const { destinations, setDestinations } = useContext(DestinationContext);

    useEffect(()=>{
        fetch('/destinations')
        .then((r) =>r.json())
        .then(setDestinations);
    }, [])

    return (
        <div className="mainPages">
            <h2>Popular Cities</h2>
            <div className="allDestinations">
                {destinations.map((d) => (
                    <Destination destination={d} key={d.id}/>
                ))}
            </div>
        </div>
    )
}

export default Destinations;