import React, { useEffect, useState } from "react";
import { Outlet, useOutletContext, Link } from "react-router-dom";
import Itinerary from "../components/Itinerary"

function Itineraries(){

    const [itineraries, setItineraries] = useState([]);
    const [upcomingItineraries, setUpcomingItineraries] = useState([]);
    const [pastItineraries, setPastItineraries] = useState([]);
    const { user } = useOutletContext();

    useEffect(()=>{
        fetch(`/users/${user.id}`)
        .then((r) =>r.json())
        .then((data) => {
            setItineraries(data.itineraries);
            const currentDate = new Date();
            setUpcomingItineraries(
                data.itineraries.filter(i => new Date(i.end_date) >= currentDate)
            );
            setPastItineraries(
                data.itineraries.filter(i => new Date(i.end_date) < currentDate)
            )
        });
    }, [user])


    return (
        <div>
            <h1>Itineraries List</h1>
            {/* <Link to="/itineraries/add">Do you want to plan another trip?</Link> */}
            <br/>
            <Outlet context={{ItinerariesList: itineraries, user:user }}/>
            <div className="allItineraries">
                <h2>Upcoming Itineraries</h2>
                {upcomingItineraries.length >0 ? (
                    upcomingItineraries.map((i) => (
                    <Itinerary itinerary={i} key={i.id}/>
                    ))
                ) : (
                    <p>No upcoming itineraries.</p>
                )}   
            </div>
            <br/>
            <div className="allItineraries">
                <h2>Past Itineraries</h2>
                {pastItineraries.length >0 ? (
                    pastItineraries.map((i) => (
                    <Itinerary itinerary={i} key={i.id}/>
                    ))
                ) : (
                    <p>No past itineraries.</p>
                )}   
            </div>
        </div>
    )
}


export default Itineraries;