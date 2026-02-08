import React from 'react';
import { useProductivity } from '../../context/ProductivityContext';
import { motion } from 'framer-motion';

const HabitTracker = () => {
    const { habits, toggleHabit } = useProductivity();

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6">Habit Tracker</h2>
            <div className="grid grid-cols-1 gap-4">
                {habits.map(habit => (
                    <div key={habit.id} className="p-4 bg-bg-card border border-navy-700 rounded-xl flex items-center justify-between shadow-lg">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => toggleHabit(habit.id)}
                                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${habit.completedToday ? 'bg-accent border-accent text-navy-900' : 'border-gray-600 text-gray-600 hover:border-accent hover:text-accent'}`}
                            >
                                {habit.completedToday && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                            </button>
                            <div>
                                <h3 className="font-bold text-white text-lg">{habit.title}</h3>
                                <p className="text-sm text-text-secondary">Reminder at {habit.time}</p>
                            </div>
                        </div>
                        <div className="text-center px-4 border-l border-navy-700">
                            <div className="text-2xl font-bold text-accent">{habit.streak}</div>
                            <div className="text-xs text-text-secondary uppercase tracking-wider">Day Streak</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HabitTracker;
