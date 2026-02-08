import React, { createContext, useContext, useState } from 'react';

const TravelContext = createContext();

export const TravelProvider = ({ children }) => {
    const [destination, setDestination] = useState('Bali, Indonesia');
    const [budget, setBudget] = useState([
        { id: 1, item: 'Flights', amount: 850 },
        { id: 2, item: 'Accommodation', amount: 600 },
        { id: 3, item: 'Food & Drinks', amount: 300 }
    ]);
    const [itinerary, setItinerary] = useState([
        { id: 1, day: 1, activity: 'Arrival and Beach Sunset' },
        { id: 2, day: 2, activity: 'Ubud Monkey Forest Visit' }
    ]);
    const [flights, setFlights] = useState([
        { id: 1, airline: 'Singapore Airlines', route: 'NYC ➔ DPS', price: 1200, rating: 4.8 },
        { id: 2, airline: 'Qatar Airways', route: 'NYC ➔ DPS', price: 950, rating: 4.9 },
        { id: 3, airline: 'Emirates', route: 'NYC ➔ DPS', price: 1050, rating: 4.7 }
    ]);

    const addBudgetItem = (item, amount) => {
        setBudget(prev => [...prev, { id: Date.now(), item, amount: parseFloat(amount) }]);
    };

    const addItineraryItem = (activity, day = 1) => {
        setItinerary(prev => [...prev, { id: Date.now(), day, activity }]);
    };

    return (
        <TravelContext.Provider value={{
            destination, setDestination,
            budget, addBudgetItem,
            itinerary, addItineraryItem,
            flights
        }}>
            {children}
        </TravelContext.Provider>
    );
};

export const useTravel = () => useContext(TravelContext);
