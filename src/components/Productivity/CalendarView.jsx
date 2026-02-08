import React, { useState } from 'react';
import { useProductivity } from '../../context/ProductivityContext';
import { motion, AnimatePresence } from 'framer-motion';

const CalendarView = () => {
    const { events } = useProductivity();
    const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

    const now = new Date();
    const [viewDate, setViewDate] = useState(new Date());

    const currentMonthIdx = viewDate.getMonth();
    const currentMonthName = months[currentMonthIdx];
    const currentYear = viewDate.getFullYear();

    const displayMonth = currentMonthName.charAt(0).toUpperCase() + currentMonthName.slice(1) + " " + currentYear;
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Get first day of month and total days
    const firstDayOfMonth = new Date(currentYear, currentMonthIdx, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonthIdx + 1, 0).getDate();

    const nextMonth = () => {
        const next = new Date(viewDate);
        next.setMonth(next.getMonth() + 1);
        setViewDate(next);
    };

    const prevMonth = () => {
        const prev = new Date(viewDate);
        prev.setMonth(prev.getMonth() - 1);
        setViewDate(prev);
    };

    const resetToToday = () => setViewDate(new Date());

    return (
        <div className="p-4 md:p-6 h-full flex flex-col max-w-6xl mx-auto w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <span className="p-2 bg-accent/20 rounded-lg text-accent">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    </span>
                    {displayMonth}
                </h2>

                <div className="flex items-center gap-2 bg-navy-900/50 p-1 rounded-xl border border-navy-800">
                    <button onClick={prevMonth} className="p-2 hover:bg-navy-800 rounded-lg text-gray-400 hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    </button>
                    <button onClick={resetToToday} className="px-4 py-1.5 text-xs font-bold text-accent hover:bg-accent/10 rounded-lg transition-colors">TODAY</button>
                    <button onClick={nextMonth} className="p-2 hover:bg-navy-800 rounded-lg text-gray-400 hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </button>
                </div>
            </div>

            <div className="bg-bg-card rounded-3xl border border-navy-700 p-4 md:p-8 flex-1 shadow-2xl relative overflow-hidden group">
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -mr-32 -mt-32"></div>

                <div className="grid grid-cols-7 mb-6 text-center border-b border-navy-800/50 pb-4">
                    {days.map(d => (
                        <div key={d} className="text-text-secondary font-bold text-xs uppercase tracking-widest">{d}</div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-1 md:gap-3 flex-1 auto-rows-fr min-h-[400px]">
                    {Array.from({ length: 42 }, (_, i) => {
                        const dayNum = i - firstDayOfMonth + 1;
                        const isValidDay = dayNum > 0 && dayNum <= daysInMonth;

                        const isToday = isValidDay &&
                            dayNum === now.getDate() &&
                            currentMonthIdx === now.getMonth() &&
                            currentYear === now.getFullYear();

                        const dayEvents = events.filter(e => {
                            return parseInt(e.dayNum) === dayNum && e.month === currentMonthName;
                        });

                        return isValidDay ? (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: i * 0.01 }}
                                className={`rounded-2xl border transition-all duration-300 relative group/day p-2 min-h-[60px] md:min-h-[100px] flex flex-col ${isToday
                                        ? 'bg-accent/10 border-accent/40 shadow-[0_0_20px_rgba(100,255,218,0.1)]'
                                        : 'border-navy-800/50 hover:bg-white/5 hover:border-navy-700'
                                    }`}
                            >
                                <div className="flex justify-between items-start">
                                    <span className={`text-sm md:text-base font-bold ${isToday ? 'text-accent' : 'text-gray-400 group-hover/day:text-white'}`}>
                                        {dayNum}
                                    </span>
                                    {dayEvents.length > 0 && (
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></div>
                                    )}
                                </div>

                                <div className="mt-2 space-y-1 overflow-y-auto custom-scrollbar flex-1 max-h-[60px] md:max-h-none">
                                    {dayEvents.map((e, idx) => (
                                        <motion.div
                                            initial={{ x: -5, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            key={idx}
                                            className="text-[9px] md:text-[10px] bg-navy-800/80 text-white rounded-lg px-2 py-1 truncate border border-navy-700 group-hover/day:border-accent/30 transition-colors"
                                        >
                                            {e.start && e.start !== 'All day' && (
                                                <span className="text-accent mr-1 font-mono font-bold">{e.start}</span>
                                            )}
                                            {e.title}
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <div key={i} className="opacity-0 pointer-events-none"></div>
                        );
                    })}
                </div>
            </div>

            {/* Empty State / Legend */}
            <div className="mt-6 flex flex-wrap gap-6 text-[10px] md:text-xs text-text-secondary font-medium">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-accent/20 border border-accent/40"></div>
                    <span>Today</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-navy-800 border border-navy-700"></div>
                    <span>Scheduled Event</span>
                </div>
                <div className="ml-auto italic">
                    Tip: Say "Add event on 15 March meeting" to schedule.
                </div>
            </div>
        </div>
    );
};

export default CalendarView;
