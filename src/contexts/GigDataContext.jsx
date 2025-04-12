import React, { createContext, useState } from 'react';

// Create context
const GigDataContext = createContext();

// Create the provider
export const GigDataProvider = ({ children }) => {
    const [gigData, setGigData] = useState({
        artist: '',
        venue: '',
        city: '',
        ticketPrice: 0,
        startDate: '',
        endDate: '',
        isFestival: false,
        haveTickets: false,
        isAbroad: false,
        festivalArtists: [],
        transportCosts: 0,
        accommodationCosts: 0,
        otherCosts: 0,
        notes: ''
    });

    return (
        <GigDataContext.Provider value={{ gigData, setGigData }}>
            {children}
        </GigDataContext.Provider>
    );
};

export { GigDataContext };  // Export the context directly
