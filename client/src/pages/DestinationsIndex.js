import React, { useEffect, useState } from "react";
import { Outlet, useOutletContext, Link } from "react-router-dom";
import Destination from "../components/Destination"

function DestinationsIndex(){

    const [destinations, setDestinations] = useState([]);
    const { user } = useOutletContext();

    useEffect(()=>{
        fetch('/destinations')
        .then((r) =>r.json())
        .then(setDestinations);
    }, [])


    return (
        <div>
            <h2>Destination city List</h2>
            {/* <Link to="/destinations/add">Do you want to add your favorite destination city?</Link> */}
            <br/>
            <Outlet context={{destinationList: destinations, user:user }}/>
            <div className="allDestination">
                {destinations.map((d) => (
                    <Destination destination={d} key={d.id}/>
                ))}
            </div>
        </div>
    )
}

export default DestinationsIndex;