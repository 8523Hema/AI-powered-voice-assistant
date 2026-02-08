import React from 'react';
import { useProductivity } from '../../context/ProductivityContext';
import { motion } from 'framer-motion';
import CalendarView from './CalendarView';

const Dashboard = ({ onNavigate }) => {
    const { tasks, habits, events, dailyPlan, setIsPlanModalOpen } = useProductivity();

    const highPriorityTasks = tasks.filter(t => t.priority === 'high' && !t.isCompleted);
    const pendingHabits = habits.filter(h => !h.completedToday);

    const handlePlanDay = () => {
        setIsPlanModalOpen(true);
    };

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Header Card */}
            <div className="lg:col-span-2 bg-gradient-to-r from-navy-800 to-navy-900 p-8 rounded-2xl border border-navy-700 relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-3xl font-bold text-white mb-2">Good Afternoon, User</h2>
                    <p className="text-text-secondary mb-6">You have {highPriorityTasks.length} high priority tasks remaining.</p>
                    <button
                        onClick={handlePlanDay}
                        className="bg-accent text-navy-900 px-6 py-3 rounded-xl font-bold hover:bg-white transition-colors shadow-lg shadow-accent/10 flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                        Plan My Day
                    </button>
                </div>
                <div className="absolute right-0 top-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
            </div>

            {/* Quick Priorities */}
            <div className="bg-bg-card p-6 rounded-2xl border border-navy-700">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-white">High Priority</h3>
                    <button onClick={() => onNavigate('tasks')} className="text-sm text-accent hover:underline">View All</button>
                </div>
                <div className="space-y-3">
                    {highPriorityTasks.length === 0 ? (
                        <p className="text-text-secondary italic">No urgent tasks.</p>
                    ) : (
                        highPriorityTasks.slice(0, 3).map(task => (
                            <div key={task.id} className="p-3 bg-navy-900/50 border-l-4 border-red-500 rounded-r-lg flex justify-between items-center group">
                                <span className="font-medium text-gray-200">{task.title}</span>
                                <span className="text-xs text-red-400 font-mono">Today</span>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Habits Snapshot */}
            <div className="bg-bg-card p-6 rounded-2xl border border-navy-700">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-white">Habit Tracker</h3>
                    <button onClick={() => onNavigate('habits')} className="text-sm text-accent hover:underline">Manage</button>
                </div>
                <div className="space-y-3">
                    {pendingHabits.slice(0, 3).map(habit => (
                        <div key={habit.id} className="p-3 bg-navy-900/50 border border-navy-700 rounded-lg flex justify-between items-center">
                            <span className="text-gray-300">{habit.title}</span>
                            <span className="text-xs text-text-secondary bg-navy-800 px-2 py-1 rounded">{habit.time}</span>
                        </div>
                    ))}
                    {pendingHabits.length === 0 && <p className="text-green-400">All habits completed!</p>}
                </div>
            </div>

            {/* Calendar Integration */}
            <div className="lg:col-span-2 bg-bg-card rounded-2xl border border-navy-700 overflow-hidden">
                <div className="p-6 border-b border-navy-700 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white">Your Calendar</h3>
                    <button onClick={() => onNavigate('calendar')} className="text-sm text-accent hover:underline">Full View</button>
                </div>
                <div className="h-[400px]">
                    <CalendarView />
                </div>
            </div>

            {/* Daily Plan Summary */}
            <div className="lg:col-span-2 bg-navy-900/40 p-6 rounded-2xl border border-navy-700">
                <h3 className="text-xl font-bold text-white mb-4">Your Daily Schedule</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-9 gap-2">
                    {['Wake', 'Bath', 'Gym', 'Eat', 'Office', 'Walk', 'Dinner', 'Read', 'Sleep'].map((label, i) => {
                        const keys = ['wakeTime', 'bathTime', 'gymTime', 'eatingTime', 'officeTime', 'walkTime', 'dinnerTime', 'readTime', 'sleepTime'];
                        const val = dailyPlan[keys[i]];
                        return (
                            <div key={label} className="p-2 bg-bg-card rounded-lg text-center border border-navy-800">
                                <div className="text-xs text-text-secondary mb-1">{label}</div>
                                <div className="text-sm font-bold text-accent">{val || '--:--'}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
