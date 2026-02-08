import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
const monthMap = {
    'jan': 'january', 'feb': 'february', 'mar': 'march', 'apr': 'april', 'may': 'may', 'jun': 'june',
    'jul': 'july', 'aug': 'august', 'sep': 'september', 'oct': 'october', 'nov': 'november', 'dec': 'december'
};

const ProductivityContext = createContext();

export const ProductivityProvider = ({ children }) => {
    // Initial State with dummy data for visualization
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Finish Project Report', priority: 'high', date: new Date().toISOString().split('T')[0], isCompleted: false },
        { id: 2, title: 'Email Team', priority: 'medium', date: new Date().toISOString().split('T')[0], isCompleted: false },
        { id: 3, title: 'Walk the dog', priority: 'low', date: new Date().toISOString().split('T')[0], isCompleted: true },
    ]);

    const [habits, setHabits] = useState([
        { id: 1, title: 'Morning Jog', time: '07:00', streak: 5, completedToday: false },
        { id: 2, title: 'Read 30 mins', time: '20:00', streak: 12, completedToday: false },
    ]);

    const [notes, setNotes] = useState([
        { id: 1, content: 'Meeting notes: Discuss Q1 goals...', timestamp: new Date().toLocaleString(), tags: ['work'] }
    ]);

    const [events, setEvents] = useState([
        { id: 1, title: 'Team Sync', start: '10:00 AM', dayNum: new Date().getDate(), month: months[new Date().getMonth()], type: 'work' }
    ]);

    const [dailyPlan, setDailyPlan] = useState({
        wakeTime: '07:00',
        bathTime: '07:30',
        gymTime: '08:00',
        eatingTime: '08:45',
        officeTime: '09:30',
        walkTime: '18:00',
        dinnerTime: '20:00',
        readTime: '21:00',
        sleepTime: '23:00'
    });

    const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);

    const [settings, setSettings] = useState({
        screenTimeLimit: 30, // minutes
        isDeepWork: false,
        startTime: Date.now()
    });

    const [audio] = useState(new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg'));

    // Screen Time & Reminders Loop
    useEffect(() => {
        const interval = setInterval(() => {
            checkReminders();
            checkScreenTime();
        }, 60000); // Check every minute

        return () => clearInterval(interval);
    }, [tasks, habits, settings]);

    const checkReminders = () => {
        const now = new Date();
        const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

        // Check Habits
        habits.forEach(habit => {
            if (habit.time === currentTime && !habit.completedToday) {
                playSound("Time for your habit: " + habit.title);
            }
        });

        // Simple reminder check (could be extended with specific times for tasks)
    };

    const checkScreenTime = () => {
        if (settings.isDeepWork) return;

        const elapsedMinutes = (Date.now() - settings.startTime) / 60000;
        if (elapsedMinutes > settings.screenTimeLimit) {
            playSound("Screen time limit reached. Starting Deep Work Mode.");
            setSettings(prev => ({ ...prev, isDeepWork: true }));
        }
    };

    const playSound = (message, onEnd) => {
        audio.play().catch(e => console.error("Audio play failed", e));
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(message);
            utterance.rate = 1.2; // Faster speaking rate
            if (onEnd) {
                utterance.onend = onEnd;
            }
            window.speechSynthesis.speak(utterance);
        }
        // Simulate vibration for mobile
        if ('vibrate' in navigator) {
            navigator.vibrate([200, 100, 200]);
        }

        console.log("ALERT:", message);
    };

    // Actions
    const addTask = (task) => {
        const newTask = { ...task, id: Date.now(), isCompleted: false, date: new Date().toLocaleDateString() };
        setTasks(prev => [...prev, newTask]);
        if (task.syncToCalendar) {
            addEvent({ title: `Task: ${task.title}`, start: 'All day', dateStr: 'today' });
        }
    };
    const toggleTask = (id) => setTasks(prev => prev.map(t => t.id === id ? { ...t, isCompleted: !t.isCompleted } : t));
    const toggleTaskByTitle = (title) => setTasks(prev => prev.map(t => t.title.toLowerCase() === title.toLowerCase() ? { ...t, isCompleted: !t.isCompleted } : t));
    const deleteTask = (id) => setTasks(prev => prev.filter(t => t.id !== id));
    const deleteTaskByTitle = (title) => setTasks(prev => prev.filter(t => t.title.toLowerCase() !== title.toLowerCase()));

    const addHabit = (habit) => {
        const newHabit = { ...habit, id: Date.now(), streak: 0, completedToday: false };
        setHabits(prev => [...prev, newHabit]);
        if (habit.syncToCalendar) {
            addEvent({ title: `Habit: ${habit.title}`, start: habit.time || '09:00', dateStr: 'today' });
        }
    };
    const toggleHabit = (id) => setHabits(prev => prev.map(h => {
        if (h.id === id) {
            const newCompleted = !h.completedToday;
            return {
                ...h,
                completedToday: newCompleted,
                streak: newCompleted ? h.streak + 1 : Math.max(0, h.streak - 1)
            };
        }
        return h;
    }));
    const toggleHabitByTitle = (title) => setHabits(prev => prev.map(h => {
        if (h.title.toLowerCase() === title.toLowerCase()) {
            const newCompleted = !h.completedToday;
            return {
                ...h,
                completedToday: newCompleted,
                streak: newCompleted ? h.streak + 1 : Math.max(0, h.streak - 1)
            };
        }
        return h;
    }));

    const deleteHabitByTitle = (title) => setHabits(prev => prev.filter(h => h.title.toLowerCase() !== title.toLowerCase()));

    const addNote = (content) => setNotes(prev => [...prev, { id: Date.now(), content, timestamp: new Date().toLocaleString(), tags: [] }]);

    const addEvent = (event) => {
        const { dateStr, day, month } = event;
        const now = new Date();
        let dayNum = now.getDate();
        let eventMonth = months[now.getMonth()];

        if (day && month) {
            dayNum = parseInt(day);
            const lowerMonth = month.toLowerCase();
            eventMonth = monthMap[lowerMonth] || (months.includes(lowerMonth) ? lowerMonth : eventMonth);
        } else if (dateStr === 'tomorrow') {
            const tomorrow = new Date();
            tomorrow.setDate(now.getDate() + 1);
            dayNum = tomorrow.getDate();
            eventMonth = months[tomorrow.getMonth()];
        } else if (dateStr && dateStr !== 'today') {
            const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
            const cleanDateStr = dateStr.toLowerCase().replace('next ', '').trim();
            const targetDayIdx = dayNames.indexOf(cleanDateStr);

            if (targetDayIdx !== -1) {
                let dayOffset = (targetDayIdx + 7 - now.getDay()) % 7 || 7;
                if (dateStr.toLowerCase().includes('next ')) {
                    dayOffset += 7;
                }
                const eventDate = new Date();
                eventDate.setDate(now.getDate() + dayOffset);
                dayNum = eventDate.getDate();
                eventMonth = months[eventDate.getMonth()];
            }
        }

        setEvents(prev => [...prev, {
            ...event,
            id: Date.now(),
            dayNum: dayNum,
            month: eventMonth,
            timestamp: new Date().getTime() // just for ref
        }]);
    };


    const deleteEvent = (id) => setEvents(prev => prev.filter(e => e.id !== id));

    const updateDailyPlan = (updates) => setDailyPlan(prev => ({ ...prev, ...updates }));

    const [activeTab, setActiveTab] = useState('dashboard');

    return (
        <ProductivityContext.Provider value={{
            tasks, addTask, toggleTask, toggleTaskByTitle, deleteTask, deleteTaskByTitle,
            habits, addHabit, toggleHabit, toggleHabitByTitle, deleteHabitByTitle,
            notes, addNote,
            events, addEvent, deleteEvent,
            dailyPlan, updateDailyPlan,
            isPlanModalOpen, setIsPlanModalOpen,
            settings, setSettings,
            activeTab, setActiveTab,
            playSound
        }}>
            {children}
        </ProductivityContext.Provider>
    );
};

export const useProductivity = () => useContext(ProductivityContext);
