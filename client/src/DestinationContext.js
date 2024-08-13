import React, { createContext, useState } from 'react';

const DestinationContext = createContext();


export function DestinationProvider({ children }) {
    const [ destination, setDestination ] = useState([]);
    const [ destinations, setDestinations ] = useState([]);
    const [ sortedDestinations, setSortedDestinations ] = useState([]);
    const [ popularSpots, setPopularSpots ] = useState([])

    return (
        <DestinationContext.Provider 
            value={{ destination, setDestination, destinations, setDestinations, sortedDestinations, setSortedDestinations, popularSpots, setPopularSpots }}>
            {children}
        </DestinationContext.Provider>
    );
}

export default DestinationContext;