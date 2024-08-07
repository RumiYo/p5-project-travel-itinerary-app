import React, { useEffect, useState } from "react";
import { Outlet, useOutletContext, Link } from "react-router-dom";
import Itinerary from "../components/Itinerary"

function Itineraries(){

    const [itineraries, setItineraries] = useState([]);
    const { user } = useOutletContext();

    useEffect(()=>{
        fetch(`/users/${user.id}`)
        .then((r) =>r.json())
        .then((r) => setItineraries(r.itineraries));
    }, [])


    return (
        <div>
            <h2>Itineraries List</h2>
            {/* <Link to="/itineraries/add">Do you want to plan another trip?</Link> */}
            <br/>
            <Outlet context={{ItinerariesList: itineraries, user:user }}/>
            <div className="allItineraries">
                {itineraries.map((i) => (
                    <Itinerary itinerary={i} key={i.id}/>
                ))}
            </div>
        </div>
    )
}


export default Itineraries;