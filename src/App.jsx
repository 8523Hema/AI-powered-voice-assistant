import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InputBar from './components/InputBar';
import GenUIContainer from './components/GenUIContainer';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Hero from './components/Hero';
import { parseIntent } from './lib/IntentParser';
import { getLayoutComponents } from './lib/LayoutEngine';
import VoiceVisualizer from './components/VoiceVisualizer';

import { ProductivityProvider, useProductivity } from './context/ProductivityContext';
import { TravelProvider, useTravel } from './context/TravelContext';

function App() {
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [layout, setLayout] = useState('default');
  const [activeComponents, setActiveComponents] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { activeTab, setActiveTab, tasks, habits, notes, events, addTask, addHabit, addNote, addEvent, setIsPlanModalOpen, deleteTaskByTitle, deleteHabitByTitle, toggleTaskByTitle, toggleHabitByTitle, playSound } = useProductivity();
  const { setDestination, addBudgetItem, addItineraryItem } = useTravel();

  const [pendingAction, setPendingAction] = useState(null);
  const [assistantMessage, setAssistantMessage] = useState(null);
  const [interimText, setInterimText] = useState('');

  const recognitionRef = useRef(null);
  const isVoiceActiveRef = useRef(isVoiceActive);
  const activeTabRef = useRef(activeTab);
  const layoutRef = useRef(layout);
  const handleInputRef = useRef(null);
  const silenceTimerRef = useRef(null);
  const lastProcessedTextRef = useRef('');

  // Sync refs with state/functions
  useEffect(() => {
    isVoiceActiveRef.current = isVoiceActive;
    activeTabRef.current = activeTab;
    layoutRef.current = layout;
    handleInputRef.current = handleInput;
    if (!isVoiceActive) {
      lastProcessedTextRef.current = '';
    }
  }, [isVoiceActive, activeTab, layout, pendingAction]);

  // Initialize Voice Recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        let transcript = '';
        for (let i = 0; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }

        setInterimText(transcript);

        // Hyper-Speed: Silence Detection Timer
        if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = setTimeout(() => {
          const finalTranscript = transcript.trim();
          if (finalTranscript.length > 2) {
            console.log("Hyper-Speed Commit:", finalTranscript);
            handleInputRef.current?.(finalTranscript);
          }
        }, 750); // Slightly more relaxed for accuracy
      };

      recognitionRef.current.onend = () => {
        if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
        if (isVoiceActiveRef.current) {
          try {
            recognitionRef.current.start();
          } catch (e) { }
        }
      };

    } else {
      console.warn("Speech Recognition not supported in this browser.");
    }
  }, []);

  // Handle Voice Mode Toggling
  useEffect(() => {
    const recognition = recognitionRef.current;
    if (recognition) {
      try {
        if (isVoiceActive) {
          recognition.start();
        } else {
          recognition.stop();
        }
      } catch (e) {
        // Ignore errors if recognition is already started/stopped
      }
    }
  }, [isVoiceActive]);

  const handleVoiceToggle = () => {
    setIsVoiceActive(!isVoiceActive);
  };

  const handleInput = (text) => {
    const transcript = text.trim();
    if (!transcript) return;

    // Noise Filter: Require at least 2 significant words to avoid accidental triggers
    const words = transcript.split(/\s+/).filter(w => !['the', 'a', 'an', 'is', 'it', 'was', 'this', 'that', 'i', 'me', 'to', 'for'].includes(w.toLowerCase()));
    if (words.length < 2 && !['reset', 'home', 'stop'].includes(transcript.toLowerCase())) {
      console.log("Noise Filter: Ignoring input", transcript);
      setInterimText('');
      return;
    }

    setInterimText('');

    // Briefly stop/start to clear the continuous buffer for the next command
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    console.log("Processing:", transcript);

    // Check if we are waiting for a specific confirmation (like priority or date)
    if (pendingAction) {
      if (pendingAction.action === 'CLARIFY_EVENT') {
        // Assume the follow-up text is the date/time info
        addEvent({ ...pendingAction.data, dateStr: text });
        setPendingAction(null);
        setAssistantMessage(null);
        return;
      }

      const intent = parseIntent(text, { activeTab: activeTabRef.current, layout: layoutRef.current });
      if (intent.action === 'CONFIRM_PRIORITY') {
        addTask({ ...pendingAction.data, priority: intent.data.priority });
        setPendingAction(null);
        setAssistantMessage(null);
        setAssistantMessage("Task saved successfully!");
        playSound("Task saved successfully!");
        setTimeout(() => setAssistantMessage(null), 2000);
        return;
      }
    }

    const { layout: newLayout, action, data } = parseIntent(text, { activeTab: activeTabRef.current, layout: layoutRef.current });
    console.log("Detected Intent:", newLayout, action);

    if (newLayout === 'default' && action === 'RESET') {
      setLayout('default');
      setActiveComponents([]);
      return;
    }

    if (newLayout !== 'default' && newLayout !== layout) {
      setLayout(newLayout);
      const components = getLayoutComponents(newLayout);
      setActiveComponents(components);
    }

    if (action) {
      switch (action) {
        case 'SWITCH_TAB':
          setActiveTab(data.tab);
          playSound(`Opening ${data.tab}`);
          break;
        case 'ADD_TASK':
          // Explicit calendar sync if user said "also add to calendar"
          const syncToCalendar = text.toLowerCase().includes('calendar');
          setActiveTab('tasks');
          if (!data.priority) {
            setPendingAction({ action, data: { ...data, syncToCalendar } });
            const msg = "What is the priority for this task? (High, Medium, or Low)";
            setAssistantMessage(msg);
            playSound(msg, () => {
              setIsVoiceActive(true);
            });
          } else {
            addTask({ ...data, syncToCalendar });
            playSound("Task added with " + data.priority + " priority");
          }
          break;
        case 'ADD_HABIT':
          setActiveTab('habits');
          addHabit({ ...data, syncToCalendar: text.toLowerCase().includes('calendar') });
          playSound(`Habit ${data.title} added`);
          break;
        case 'ADD_NOTE':
          setActiveTab('notes');
          addNote(data.content);
          playSound("Note saved");
          break;
        case 'CONVERT_NOTE_TO_EVENT':
          if (notes.length > 0) {
            const lastNote = notes[notes.length - 1];
            addEvent({ title: `Note: ${lastNote.content.slice(0, 20)}...`, dateStr: 'today' });
            setAssistantMessage("Last note converted to calendar event!");
            setTimeout(() => setAssistantMessage(null), 3000);
          } else {
            setAssistantMessage("No notes to convert.");
            setTimeout(() => setAssistantMessage(null), 2000);
          }
          break;
        case 'SYNC_TASK_TO_CALENDAR':
          if (tasks.length > 0) {
            const lastTask = tasks[tasks.length - 1];
            addEvent({ title: `Task: ${lastTask.title}`, dateStr: 'today' });
            setAssistantMessage("Task mirrored to calendar!");
            setTimeout(() => setAssistantMessage(null), 3000);
          }
          break;
        case 'CLARIFY_EVENT':
          setPendingAction({ action, data });
          const clarifyMsg = `When should I schedule "${data.title}"? (e.g., today, tomorrow, or a date)`;
          setAssistantMessage(clarifyMsg);
          playSound(clarifyMsg, () => {
            setIsVoiceActive(true);
          });
          break;
        case 'ADD_EVENT':
          setActiveTab('calendar');
          addEvent(data);
          playSound(`Event ${data.title} scheduled for ${data.dateStr || 'the requested date'}`);
          break;
        case 'TOGGLE_TASK':
          setActiveTab('tasks');
          toggleTaskByTitle(data.title);
          playSound(`Task ${data.title} updated`);
          break;
        case 'TOGGLE_HABIT':
          setActiveTab('habits');
          toggleHabitByTitle(data.title);
          playSound(`Habit ${data.title} updated`);
          break;
        case 'DELETE_TASK':
          deleteTaskByTitle(data.title);
          break;
        case 'DELETE_HABIT':
          deleteHabitByTitle(data.title);
          break;
        case 'SET_TRAVEL_DESTINATION':
          setLayout('travel');
          setDestination(data.destination);
          playSound(`Setting destination to ${data.destination}`);
          break;
        case 'ADD_BUDGET_ITEM':
          setLayout('travel');
          addBudgetItem(data.item, data.amount);
          playSound(`Added ${data.amount} to your ${data.item} budget`);
          break;
        case 'ADD_ITINERARY_ITEM':
          setLayout('travel');
          addItineraryItem(data.activity);
          playSound(`Plan for ${data.activity} added to itinerary`);
          break;
          addBudgetItem(data.item, data.amount);
          break;
        case 'ADD_TRAVEL_ITINERARY':
          addItineraryItem(data.activity, data.day);
          break;
        case 'PLAN_DAY':
          setIsPlanModalOpen(true);
          break;
      }
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary selection:bg-accent selection:text-navy-900 font-sans relative">

      {/* Assistant Feedback Overlay */}
      <AnimatePresence>
        {assistantMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-accent text-navy-900 px-6 py-3 rounded-2xl font-bold shadow-2xl flex items-center gap-3 border border-white/20"
          >
            <div className="w-2 h-2 rounded-full bg-navy-900 animate-pulse"></div>
            {assistantMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* Desktop Navbar / Mobile Header */}
      <Header
        onMobileMenuToggle={() => setIsMobileMenuOpen(true)}
      />

      <main className="flex-1 flex flex-col relative">
        <div className="flex-1 overflow-y-auto relative scroll-smooth px-4">
          <GenUIContainer>
            <div className="py-8 pb-32 min-h-[calc(100vh-4rem)] flex flex-col justify-center">
              {activeComponents.length === 0 ? (
                <Hero
                  onSuggestionClick={handleInput}
                  isVoiceActive={isVoiceActive}
                  onVoiceToggle={handleVoiceToggle}
                />
              ) : (
                activeComponents.map((Comp, index) => (
                  <div key={index} className="w-full animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <Comp
                      onSuggestionClick={handleInput}
                      isVoiceActive={isVoiceActive}
                      onVoiceToggle={handleVoiceToggle}
                    />
                  </div>
                ))
              )}
            </div>
          </GenUIContainer>
        </div>

        <InputBar
          onSend={handleInput}
          onVoiceToggle={handleVoiceToggle}
          isVoiceActive={isVoiceActive}
          interimText={interimText}
        />
      </main>

      <VoiceVisualizer isActive={isVoiceActive} />
    </div>
  );
}

const WrappedApp = () => (
  <ProductivityProvider>
    <TravelProvider>
      <App />
    </TravelProvider>
  </ProductivityProvider>
);

export default WrappedApp;
