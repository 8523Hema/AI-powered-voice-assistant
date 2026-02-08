/**
 * Intent Parser with Action Extraction and Page Awareness
 */
export const parseIntent = (text, context = {}) => {
    const lowerText = text.toLowerCase().trim();
    const { activeTab, layout } = context;

    // Home / Default navigation
    if (lowerText === 'go home' || lowerText === 'show home' || lowerText === 'reset') {
        return { layout: 'default', action: 'RESET', data: {} };
    }

    // Navigation Commands: "Open Calendar", "Go to Tasks", etc.
    if (lowerText.includes('open ') || lowerText.includes('go to ') || lowerText.includes('switch to ') || lowerText.startsWith('show ') || lowerText.includes('take me to ') || lowerText.includes('nav to ')) {
        const target = lowerText.replace(/^(open|go to|switch to|show|take me to|nav to)\s+/i, '').trim();

        // Priority check for top-level layouts first
        if (target.includes('productivity') || target.includes('dashboard')) {
            return { layout: 'productivity', action: 'SWITCH_TAB', data: { tab: 'dashboard' } };
        }
        if (target.includes('travel')) return { layout: 'travel', action: 'SWITCH_LAYOUT', data: { layout: 'travel' } };
        if (target.includes('debug') || target.includes('developer')) return { layout: 'dev', action: 'SWITCH_LAYOUT', data: { layout: 'dev' } };

        // Sub-page navigation within Productivity
        const tabs = ['dashboard', 'tasks', 'habits', 'calendar', 'notes'];
        const matchedTab = tabs.find(t => target.includes(t));
        if (matchedTab) {
            return {
                layout: 'productivity',
                action: 'SWITCH_TAB',
                data: { tab: matchedTab }
            };
        }
    }

    // Date Parsing Regexes
    const monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    const monthShortNames = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

    // Support "15 March", "15th March", "March 15", "March 15th"
    const datePattern1 = /(\d{1,2})(?:st|nd|rd|th)?\s+(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i;
    const datePattern2 = /(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\s+(\d{1,2})(?:st|nd|rd|th)?/i;

    const dateMatch1 = lowerText.match(datePattern1);
    const dateMatch2 = lowerText.match(datePattern2);

    const dayKeywordMatch = lowerText.match(/(today|tomorrow|monday|tuesday|wednesday|thursday|friday|saturday|sunday)/i);

    // Priority Confirmation Capture
    if (['high', 'medium', 'low'].includes(lowerText)) {
        return {
            layout: 'productivity',
            action: 'CONFIRM_PRIORITY',
            data: { priority: lowerText }
        };
    }

    if (lowerText.includes('remind me to') || lowerText.includes('add task') || lowerText.includes('create task') || lowerText.includes('need to') || (activeTab === 'tasks' && lowerText.length > 2)) {
        let title = text.replace(/^(remind me to|add task|create task|need to|add|task)\s+/i, '').trim();
        // Strip out date keywords from title to keep it clean
        title = title.replace(/\s+(today|tomorrow|on\s+.*|at\s+.*)$/i, '').trim();
        // Strip filler "to" if it starts the title (e.g. "need to buy milk" -> "buy milk")
        title = title.replace(/^to\s+/i, '').trim();

        // Check for inline priority
        let priority = null;
        if (lowerText.includes('high priority')) priority = 'high';
        else if (lowerText.includes('medium priority')) priority = 'medium';
        else if (lowerText.includes('low priority')) priority = 'low';

        // Strip priority from title if found
        if (priority) {
            title = title.replace(/high priority|medium priority|low priority/i, '').trim();
        }

        return {
            layout: 'productivity',
            action: 'ADD_TASK',
            data: { title, priority }
        };
    }

    if (lowerText.includes('delete task') || lowerText.includes('remove task')) {
        const title = text.replace(/^(delete task|remove task)/i, '').trim();
        return {
            layout: 'productivity',
            action: 'DELETE_TASK',
            data: { title }
        };
    }

    // Action: Habits
    if (lowerText.includes('add habit') || lowerText.includes('create habit') || lowerText.includes('track habit') || (activeTab === 'habits' && lowerText.includes('add '))) {
        let title = text.replace(/^(add habit|create habit|track habit|add)\s+/i, '').trim();
        title = title.replace(/^called\s+/i, '').trim();
        return {
            layout: 'productivity',
            action: 'ADD_HABIT',
            data: { title, time: '09:00', syncToCalendar: lowerText.includes('calendar') }
        };
    }

    // Action: Toggle Tasks
    if (lowerText.startsWith('complete ') || lowerText.startsWith('check ') || lowerText.startsWith('uncheck ') || lowerText.startsWith('toggle task ')) {
        const title = text.replace(/^(complete|check|uncheck|toggle task)\s+/i, '').trim();
        return {
            layout: 'productivity',
            action: 'TOGGLE_TASK',
            data: { title }
        };
    }

    // Action: Toggle Habits
    if (lowerText.includes('habit done') || lowerText.includes('complete habit') || lowerText.includes('toggle habit')) {
        const title = text.replace(/.*(habit done|complete habit|toggle habit)\s+/i, '').trim();
        return {
            layout: 'productivity',
            action: 'TOGGLE_HABIT',
            data: { title }
        };
    }

    // Action: Reminders / Tasks
    if (lowerText.startsWith('note') || lowerText.startsWith('take note') || (activeTab === 'notes' && lowerText.includes('add '))) {
        const content = text.replace(/^(note|take note|add)/i, '').trim();
        return {
            layout: 'productivity',
            action: 'ADD_NOTE',
            data: { content }
        };
    }

    // Action: Calendar Events
    if (lowerText.includes('add event') || lowerText.includes('schedule ') || lowerText.includes('create event') || lowerText.includes('plan event')) {
        const titleMatch = text.match(/(?:add event|schedule|create event|plan event|add)\s+(.+?)(?:\s+at|\s+on|\s+today|\s+tomorrow|\d|$)/i);
        const timeMatch = text.match(/\d{1,2}(?::\d{2})?\s*(?:am|pm)/i);

        const title = titleMatch ? titleMatch[1].trim() : text.replace(/^(add event|schedule|create event|plan event|add)\s+/i, '').trim();
        const start = timeMatch ? timeMatch[0] : null;

        let dateData = { dateStr: 'today' };

        if (dateMatch1) {
            dateData = { day: dateMatch1[1], month: dateMatch1[2].toLowerCase() };
        } else if (dateMatch2) {
            dateData = { day: dateMatch2[2], month: dateMatch2[1].toLowerCase() };
        } else if (dayKeywordMatch) {
            dateData = { dateStr: dayKeywordMatch[0].toLowerCase() };
            if (lowerText.includes('next ')) {
                dateData.dateStr = 'next ' + dateData.dateStr;
            }
        }

        // If no time/date found and not in calendar tab, ask for clarification
        if (!start && !dateMatch1 && !dateMatch2 && !dayKeywordMatch && activeTab !== 'calendar') {
            return {
                layout: 'productivity',
                action: 'CLARIFY_EVENT',
                data: { title }
            };
        }

        return {
            layout: 'productivity',
            action: 'ADD_EVENT',
            data: { title, start: start || 'All day', ...dateData }
        };
    }


    // Travel Destination
    if (lowerText.includes('plan trip to') || lowerText.includes('trip to') || lowerText.includes('travel to')) {
        const destination = text.replace(/.*(?:plan (?:a )?trip to|trip to|travel to)\s+/i, '').trim();
        return {
            layout: 'travel',
            action: 'SET_TRAVEL_DESTINATION',
            data: { destination }
        };
    }

    // Travel: Budget
    if (lowerText.includes('budget') && (lowerText.includes('add') || lowerText.includes('cost'))) {
        const amountMatch = lowerText.match(/\$?(\d+)/);
        const amount = amountMatch ? amountMatch[1] : '0';
        const item = text.replace(/.*(?:add|cost)\s+/i, '').replace(/\$?(\d+)/, '').replace(/to (my )?budget/i, '').trim();

        return {
            layout: 'travel',
            action: 'ADD_BUDGET_ITEM',
            data: { item: item || 'Miscellaneous', amount }
        };
    }

    // Travel: Itinerary
    if (lowerText.includes('itinerary') || lowerText.includes('schedule activity') || lowerText.includes('plan activity')) {
        const activity = text.replace(/.*(?:itinerary|activity)\s+/i, '').replace(/to (my )?itinerary/i, '').trim();
        return {
            layout: 'travel',
            action: 'ADD_ITINERARY_ITEM',
            data: { activity }
        };
    }

    // Travel: Flights
    if (lowerText.includes('flight') || lowerText.includes('search flights')) {
        return {
            layout: 'travel',
            action: 'SWITCH_LAYOUT',
            data: { layout: 'travel' }
        };
    }

    // Catch-all Productivity Navigation
    if (lowerText === 'productivity' || lowerText === 'tasks' || lowerText === 'calendar' || lowerText === 'habits' || lowerText === 'notes') {
        const tabMap = { 'tasks': 'tasks', 'calendar': 'calendar', 'habits': 'habits', 'notes': 'notes', 'productivity': 'dashboard' };
        return { layout: 'productivity', action: 'SWITCH_TAB', data: { tab: tabMap[lowerText] || 'dashboard' } };
    }

    // Catch-all Travel Navigation
    if (lowerText.includes('trip') || lowerText.includes('travel') || lowerText.includes('bali') || lowerText.includes('flight') || lowerText.includes('destination')) {
        return { layout: 'travel', action: 'SWITCH_LAYOUT', data: { layout: 'travel' } };
    }

    return { layout: 'default' };
};
