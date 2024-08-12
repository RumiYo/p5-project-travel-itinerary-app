import React, { createContext, useState } from 'react';

const ItineraryContext = createContext();

export function ItineraryProvider({ children }) {
    const [itinerary, setItinerary] = useState(null);
    const [itineraries, setItineraries] = useState([]);

    const updateItinerary = (updatedItinerary) => {
        setItineraries((prevItineraries) =>
            prevItineraries.map((itinerary) =>
                itinerary.id === updatedItinerary.id ? updatedItinerary : itinerary
            )
        );
    };
    return (
        <ItineraryContext.Provider value={{ itinerary, setItinerary, itineraries, setItineraries, updateItinerary }}>
            {children}
        </ItineraryContext.Provider>
    );
}

export default ItineraryContext;