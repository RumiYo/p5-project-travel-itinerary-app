import React, { useEffect, useState } from "react";
import { Outlet, useOutletContext, Link } from "react-router-dom";
import Destination from "../components/Destinations/Destination"

function Destinations(){

    const [destinations, setDestinations] = useState([]);
    const { user } = useOutletContext();

    useEffect(()=>{
        fetch('/destinations')
        .then((r) =>r.json())
        .then(setDestinations);
    }, [])


    return (
        <div>
            <h2>Popular Cities</h2>
            {/* <Link to="/destinations/add">Do you want to add your favorite destination city?</Link> */}
            <br/>
            <Outlet context={{destinationList: destinations, user:user }}/>
            <div className="allDestinations">
                {destinations.map((d) => (
                    <Destination destination={d} key={d.id}/>
                ))}
            </div>
        </div>
    )
}

export default Destinations;