import React, { useEffect, useState } from "react";
import { Outlet, useOutletContext, Link } from "react-router-dom";
import Itinerary from "../components/Itineraries/Itinerary"

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
            <h2>Itineraries</h2>
            <Link to="/itineraries/add">Do you want to plan another trip?</Link>
            <Outlet context={{ItinerariesList: itineraries, user:user }}/>
            <div className="allItineraries">
                <h3>Upcoming Itineraries</h3>
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
                <h3>Past Itineraries</h3>
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