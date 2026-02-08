import { useState, useEffect } from 'react';

// Simplified event bus for the "Tambo" brain
class TamboEngine {
    constructor() {
        this.listeners = [];
        this.currentLayout = null; // { type, components: [] }
    }

    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    notify() {
        this.listeners.forEach(l => l(this.currentLayout));
    }

    /**
     * The core "AI" function. 
     * In a real system, this would call an LLM.
     * Here, we simulate the intent understanding and layout generation.
     */
    run(userMessage) {
        const msg = userMessage.toLowerCase();
        console.log(`[Tambo] Processing: "${msg}"`);

        let newLayout = null;

        if (msg.includes('productivity') || msg.includes('calendar') || msg.includes('schedule')) {
            newLayout = {
                type: 'productivity',
                components: ['CalendarView', 'TaskList', 'FocusTimer', 'ProductivityChart']
            };
        }
        else if (msg.includes('bali') || msg.includes('trip') || msg.includes('travel')) {
            newLayout = {
                type: 'travel',
                components: ['MapView', 'BudgetBreakdown', 'WeatherWidget', 'HotelCards', 'FlightOptions']
            };
        }
        else if (msg.includes('debug') || msg.includes('code') || msg.includes('react')) {
            newLayout = {
                type: 'dev',
                components: ['CodeEditor', 'AIChatPanel', 'FileExplorer']
            };
        }
        else if (msg.includes('clear') || msg.includes('reset')) {
            newLayout = null;
        }
        else {
            // Fallback / Unknown
            // For demo, maybe just show a generic "I didn't understand" or keep current?
            // Let's keep current but log it.
            console.warn("[Tambo] Intent not recognized.");
            return;
        }

        this.currentLayout = newLayout;
        this.notify();
    }
}

export const tambo = new TamboEngine();

// React Hook to consume Tambo state
export const useTambo = () => {
    const [layout, setLayout] = useState(tambo.currentLayout);

    useEffect(() => {
        return tambo.subscribe(setLayout);
    }, []);

    return layout;
};
