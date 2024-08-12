import React, { createContext, useState } from 'react';

const DestinationContext = createContext();


export function DestinationProvider({ children }) {
    const [destination, setDestination] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [sortedDestinations, setSortedDestinations] = useState([]);

    return (
        <DestinationContext.Provider value={{ destination, setDestination, destinations, setDestinations, sortedDestinations, setSortedDestinations }}>
            {children}
        </DestinationContext.Provider>
    );
}

export default DestinationContext;