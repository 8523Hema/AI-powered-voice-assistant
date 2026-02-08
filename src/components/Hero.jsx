import React from 'react';
import { motion } from 'framer-motion';

const Hero = ({ onSuggestionClick, isVoiceActive, onVoiceToggle }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 relative"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="mb-8" variants={itemVariants}>
        <div className="relative group cursor-pointer" onClick={onVoiceToggle} id="voice-input-toggle">
          <div className={`absolute inset-0 bg-accent/20 rounded-full blur-xl transition-all duration-500 ${isVoiceActive ? 'scale-150 opacity-100' : 'scale-75 opacity-0 group-hover:opacity-50'}`}></div>
          <div className={`relative w-20 h-20 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isVoiceActive ? 'bg-accent border-accent text-navy-900 shadow-[0_0_40px_rgba(100,255,218,0.3)] animate-pulse-slow' : 'bg-navy-800 border-navy-700 text-white hover:border-accent hover:text-accent'}`}>
            {isVoiceActive ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
            )}
          </div>
        </div>
      </motion.div>

      <motion.h1
        className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-white"
        variants={itemVariants}
      >
        GenUI Co-Pilot
      </motion.h1>

      <motion.p
        className="text-lg md:text-xl text-text-secondary max-w-2xl mb-16 leading-relaxed"
        variants={itemVariants}
      >
        Tap the microphone or type below to start building your next idea.
      </motion.p>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl"
        variants={itemVariants}
      >
        <SuggestionCard
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>}
          title="Productivity"
          desc="Manage tasks & calendar"
          onClick={() => onSuggestionClick("Show productivity")}
        />
        <SuggestionCard
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>}
          title="Travel Plan"
          desc="Plan a trip to Bali"
          onClick={() => onSuggestionClick("Plan trip to Bali")}
        />
        <SuggestionCard
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>}
          title="Debug Code"
          desc="Fix React issues"
          onClick={() => onSuggestionClick("Debug React code")}
        />
      </motion.div>
    </motion.div>
  );
};

const SuggestionCard = ({ icon, title, desc, onClick }) => (
  <motion.button
    className="group flex flex-col items-start gap-4 p-6 bg-bg-card/40 hover:bg-bg-card border border-navy-700 hover:border-accent/40 rounded-2xl text-left transition-all duration-300 backdrop-blur-sm"
    onClick={onClick}
    whileHover={{ y: -5, boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.5)' }}
    whileTap={{ scale: 0.98 }}
  >
    <div className="p-3 bg-navy-800 rounded-xl text-accent group-hover:bg-accent group-hover:text-navy-900 transition-colors duration-300">
      {icon}
    </div>
    <div>
      <h3 className="text-lg font-semibold text-white mb-1">
        {title}
      </h3>
      <p className="text-sm text-text-secondary group-hover:text-gray-300 transition-colors">
        {desc}
      </p>
    </div>
  </motion.button>
);

export default Hero;
