import React, { useState, useEffect } from 'react';
import { useProductivity } from '../../context/ProductivityContext';
import { motion, AnimatePresence } from 'framer-motion';
import Dashboard from './Dashboard';
import HabitTracker from './HabitTracker';
import TaskBoard from './TaskBoard';
import CalendarView from './CalendarView';
import NotesView from './NotesView';
import DailyPlanModal from './DailyPlanModal';

const ProductivityLayout = ({ onVoiceToggle, isVoiceActive }) => {
    const { activeTab, setActiveTab, tasks, habits, events, settings, isPlanModalOpen, setIsPlanModalOpen } = useProductivity();

    // Smart Tab Switching: Jump to the relevant tab when new data is added
    const [lastCounts, setLastCounts] = useState(null);

    useEffect(() => {
        // Only trigger if we have a previous count (prevents jump on load)
        if (lastCounts) {
            if (tasks.length > lastCounts.tasks) setActiveTab('tasks');
            else if (habits.length > lastCounts.habits) setActiveTab('habits');
            else if (events.length > lastCounts.events) setActiveTab('calendar');
        }

        setLastCounts({ tasks: tasks.length, habits: habits.length, events: events.length });
    }, [tasks.length, habits.length, events.length]);

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard': return <Dashboard onNavigate={setActiveTab} />;
            case 'habits': return <HabitTracker />;
            case 'tasks': return <TaskBoard />;
            case 'calendar': return <CalendarView />;
            case 'notes': return <NotesView />;
            default: return <Dashboard />;
        }
    };

    return (
        <div className={`w-full max-w-7xl mx-auto min-h-screen flex transition-colors duration-1000 p-4 lg:p-8 ${settings.isDeepWork ? 'grayscale brightness-75' : ''}`}>
            <DailyPlanModal isOpen={isPlanModalOpen} onClose={() => setIsPlanModalOpen(false)} />

            {/* Desktop Side Navigation */}
            <div className="hidden lg:flex flex-col w-64 mr-8 gap-6 h-fit sticky top-24">
                <div className="bg-bg-card rounded-2xl border border-navy-700 p-4 flex flex-col gap-2 shadow-xl">
                    <h3 className="text-xs font-bold text-text-secondary uppercase tracking-widest px-4 mb-2">Productivity</h3>
                    <NavBtn active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>} label="Dashboard" />
                    <NavBtn active={activeTab === 'tasks'} onClick={() => setActiveTab('tasks')} icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>} label="Tasks" />
                    <NavBtn active={activeTab === 'habits'} onClick={() => setActiveTab('habits')} icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10 10 10 0 0 0-10-10z"></path><polyline points="12 6 12 12 16 14"></polyline></svg>} label="Habits" />
                    <NavBtn active={activeTab === 'calendar'} onClick={() => setActiveTab('calendar')} icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>} label="Calendar" />
                    <NavBtn active={activeTab === 'notes'} onClick={() => setActiveTab('notes')} icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>} label="Notes" />
                </div>

                {/* Status Card */}
                <div className="bg-navy-900/50 rounded-2xl border border-navy-800 p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                        <span className="text-xs font-bold text-accent uppercase tracking-widest">Live Status</span>
                    </div>
                    <p className="text-sm text-text-secondary">AI Assistant is active and listening for your commands.</p>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 min-w-0 pb-32">
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
                    className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl group relative transition-all duration-300 ${isVoiceActive ? 'bg-red-500 shadow-red-500/40' : 'bg-accent shadow-accent/40'}`}
                    onClick={onVoiceToggle}
                >
                    {isVoiceActive ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-navy-900"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg>
                    )}
                    <span className={`absolute inset-0 rounded-full animate-ping opacity-20 pointer-events-none ${isVoiceActive ? 'bg-red-500' : 'bg-accent'}`}></span>
                    <div className="absolute bottom-full right-0 mb-4 bg-navy-900 border border-navy-700 px-4 py-2 rounded-xl text-sm font-bold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-2xl">
                        {isVoiceActive ? 'Stop Listening' : 'Voice Assistant'}
                    </div>
                </motion.button>
            </div>

            {/* Deep Work Overlay */}
            {settings.isDeepWork && (
                <div className="fixed inset-0 bg-navy-950/40 backdrop-blur-[2px] z-30 pointer-events-none flex items-center justify-center">
                    <div className="bg-bg-card p-4 rounded-xl border border-accent/20 text-accent font-bold animate-pulse">
                        DEEP WORK MODE ACTIVE
                    </div>
                </div>
            )}
        </div>
    );
};

const NavBtn = ({ active, onClick, icon, label }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${active ? 'bg-accent text-navy-900 shadow-lg shadow-accent/20 font-bold' : 'text-text-secondary hover:text-white hover:bg-white/5'}`}
    >
        {icon}
        <span className="text-sm">{label}</span>
    </button>
);

export default ProductivityLayout;
