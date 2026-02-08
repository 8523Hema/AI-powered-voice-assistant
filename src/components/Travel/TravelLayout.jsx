import React, { useState, useEffect } from 'react';
import { useTravel } from '../../context/TravelContext';
import { motion, AnimatePresence } from 'framer-motion';
import { MapWidget, BudgetBreakdown, FlightCard } from './index';

const TravelLayout = ({ onVoiceToggle, isVoiceActive }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const { destination, budget, itinerary, flights } = useTravel();

    // Auto-tab switcher for travel data additions (if implemented later)
    const [lastCounts, setLastCounts] = useState({ budget: 0, itinerary: 0 });

    useEffect(() => {
        if (budget.length > lastCounts.budget) setActiveTab('budget');
        else if (itinerary.length > lastCounts.itinerary) setActiveTab('itinerary');
        setLastCounts({ budget: budget.length, itinerary: itinerary.length });
    }, [budget.length, itinerary.length]);

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <MapWidget />
                        <BudgetBreakdown />
                        <div className="md:col-span-2">
                            <FlightCard />
                        </div>
                    </div>
                );
            case 'budget':
                return <BudgetSection />;
            case 'itinerary':
                return <ItinerarySection />;
            case 'flights':
                return <FlightsSection />;
            default:
                return <Overview />;
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto min-h-screen flex p-4 lg:p-8">
            {/* Travel Side Navigation */}
            <div className="hidden lg:flex flex-col w-64 mr-8 gap-6 h-fit sticky top-24">
                <div className="bg-bg-card rounded-2xl border border-navy-700 p-4 flex flex-col gap-2 shadow-xl">
                    <h3 className="text-xs font-bold text-text-secondary uppercase tracking-widest px-4 mb-2">Travel Planner</h3>
                    <TravelNavBtn active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>} label="Overview" />
                    <TravelNavBtn active={activeTab === 'budget'} onClick={() => setActiveTab('budget')} icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>} label="Budget" />
                    <TravelNavBtn active={activeTab === 'itinerary'} onClick={() => setActiveTab('itinerary')} icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>} label="Itinerary" />
                    <TravelNavBtn active={activeTab === 'flights'} onClick={() => setActiveTab('flights')} icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path></svg>} label="Flights" />
                </div>

                <div className="bg-teal-900/20 rounded-2xl border border-teal-500/30 p-6">
                    <h4 className="text-teal-400 font-bold mb-2">{destination}</h4>
                    <p className="text-sm text-text-secondary line-clamp-2">Your next big adventure is just a voice command away.</p>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 min-w-0">
                <div className="mb-8 flex items-end justify-between">
                    <div>
                        <h1 className="text-4xl font-black text-white mb-2 tracking-tight">Trip to <span className="text-teal-400">{destination}</span></h1>
                        <p className="text-text-secondary font-medium">Manage your itinerary, budget, and flights with voice.</p>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {renderContent()}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Floating Speaker Button */}
            <div className="fixed bottom-12 right-12 z-50">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl group relative transition-all duration-300 ${isVoiceActive ? 'bg-red-500 shadow-red-500/40' : 'bg-teal-500 shadow-teal-500/40'}`}
                    onClick={onVoiceToggle}
                >
                    {isVoiceActive ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-navy-900"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg>
                    )}
                    <span className={`absolute inset-0 rounded-full animate-ping opacity-20 pointer-events-none ${isVoiceActive ? 'bg-red-500' : 'bg-teal-500'}`}></span>
                    <div className="absolute bottom-full right-0 mb-4 bg-navy-900 border border-navy-700 px-4 py-2 rounded-xl text-sm font-bold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-2xl">
                        {isVoiceActive ? 'Stop Listening' : 'Travel Assistant'}
                    </div>
                </motion.button>
            </div>
        </div>
    );
};

const TravelNavBtn = ({ active, onClick, icon, label }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${active ? 'bg-teal-500 text-navy-900 shadow-lg shadow-teal-500/20 font-bold' : 'text-text-secondary hover:text-white hover:bg-white/5'}`}
    >
        {icon}
        <span className="text-sm">{label}</span>
    </button>
);

const BudgetSection = () => {
    const { budget } = useTravel();
    return (
        <div className="bg-bg-card rounded-3xl border border-navy-700 p-8">
            <h2 className="text-2xl font-bold mb-6">Trip Budget</h2>
            <div className="space-y-4">
                {budget.map(item => (
                    <div key={item.id} className="flex justify-between items-center p-4 bg-navy-900/50 rounded-2xl border border-navy-800">
                        <span className="font-medium">{item.item}</span>
                        <span className="text-teal-400 font-bold text-lg">${item.amount}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ItinerarySection = () => {
    const { itinerary } = useTravel();
    return (
        <div className="bg-bg-card rounded-3xl border border-navy-700 p-8">
            <h2 className="text-2xl font-bold mb-6">Adventure Plan</h2>
            <div className="space-y-6">
                {itinerary.map(item => (
                    <div key={item.id} className="flex gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-teal-500/20 rounded-2xl flex items-center justify-center text-teal-400 font-bold">
                            D{item.day}
                        </div>
                        <div className="bg-navy-900/50 flex-1 p-4 rounded-2xl border border-navy-800">
                            <p className="font-medium text-white">{item.activity}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const FlightsSection = () => {
    const { flights } = useTravel();
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {flights.map(flight => (
                <div key={flight.id} className="bg-bg-card p-6 rounded-3xl border border-navy-700 hover:border-teal-500/50 transition-colors group">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-xs font-bold text-teal-400 uppercase tracking-widest mb-1">{flight.airline}</p>
                            <h3 className="text-xl font-bold">{flight.route}</h3>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-black text-white">${flight.price}</p>
                            <span className="text-xs text-text-secondary">avg. round trip</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`w-3 h-3 ${i < Math.floor(flight.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-navy-700 fill-navy-700'}`} viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        ))}
                        <span className="text-[10px] text-text-secondary ml-1 font-bold">{flight.rating}</span>
                    </div>
                    <button className="w-full bg-navy-900 border border-navy-700 py-3 rounded-2xl text-xs font-bold text-white group-hover:bg-teal-500 group-hover:text-navy-900 transition-all uppercase tracking-widest">
                        View Details
                    </button>
                </div>
            ))}
        </div>
    );
};

export default TravelLayout;
