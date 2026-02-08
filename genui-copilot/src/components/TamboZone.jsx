import React from 'react';
import { useTambo } from '../lib/tambo/engine';
import { ComponentRegistry } from '../lib/tambo/registry';

const TamboZone = () => {
    const layout = useTambo();

    if (!layout) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center text-zinc-600">
                <div className="w-16 h-16 mb-6 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center animate-pulse">
                    <svg className="w-8 h-8 opacity-50 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                </div>
                <p className="font-light tracking-wide text-sm">Awaiting Instructions...</p>
            </div>
        );
    }

    // Define grid layouts based on type
    let gridClass = "grid-cols-1";
    if (layout.type === 'productivity') gridClass = "grid-cols-1 md:grid-cols-3 grid-rows-2";
    if (layout.type === 'travel') gridClass = "grid-cols-1 md:grid-cols-4 grid-rows-3 md:grid-rows-2";
    if (layout.type === 'dev') gridClass = "grid-cols-1 md:grid-cols-4 grid-rows-2";

    return (
        <div className={`p-6 w-full max-w-7xl mx-auto flex-1 grid gap-6 ${gridClass} animate-enter`}>
            {layout.components.map((compName, index) => {
                const Component = ComponentRegistry[compName];
                if (!Component) return null;

                let spanClass = "";

                // Productivity Layout Logic (4 items)
                if (layout.type === 'productivity') {
                    if (compName === 'CalendarView') spanClass = "md:col-span-1 md:row-span-2";
                    if (compName === 'TaskList') spanClass = "md:col-span-2";
                    if (compName === 'FocusTimer') spanClass = "md:col-span-1";
                    if (compName === 'ProductivityChart') spanClass = "md:col-span-1";
                }

                // Travel Layout Logic (5 items)
                if (layout.type === 'travel') {
                    if (compName === 'MapView') spanClass = "md:col-span-2 md:row-span-2";
                    if (compName === 'BudgetBreakdown') spanClass = "md:col-span-1";
                    if (compName === 'WeatherWidget') spanClass = "md:col-span-1";
                    if (compName === 'HotelCards') spanClass = "md:col-span-1";
                    if (compName === 'FlightOptions') spanClass = "md:col-span-1";
                }

                // Dev Layout Logic
                if (layout.type === 'dev') {
                    if (index === 0) spanClass = "md:col-span-3 md:row-span-2"; // Editor huge
                    if (index > 0) spanClass = "md:col-span-1 md:row-span-1";
                }

                return (
                    <div key={`${layout.type}-${index}`} className={spanClass}>
                        <Component />
                    </div>
                );
            })}
        </div>
    );
};

export default TamboZone;
