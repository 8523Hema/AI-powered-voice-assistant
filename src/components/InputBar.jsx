import React, { useState } from 'react';

const InputBar = ({ onSend, onVoiceToggle, isVoiceActive, interimText }) => {
  const [inputValue, setInputValue] = useState('');

  // Update input value with interim text when voice is active
  React.useEffect(() => {
    if (isVoiceActive) {
      setInputValue(interimText);
    }
  }, [interimText, isVoiceActive]);

  const handleSend = () => {
    if (inputValue.trim()) {
      onSend(inputValue);
      setInputValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 p-6 flex justify-center z-50 pointer-events-none">
      <div className="w-full max-w-3xl bg-bg-secondary/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl p-2 flex items-center gap-2 pointer-events-auto transition-all duration-300 focus-within:ring-2 focus-within:ring-accent/50 focus-within:border-accent">
        <button
          id="voice-input-toggle"
          className={`p-3 rounded-xl transition-all duration-200 ${isVoiceActive
            ? 'bg-red-500 text-white animate-pulse'
            : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          onClick={onVoiceToggle}
          title="Toggle Voice Mode"
        >
          {isVoiceActive ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="1" y1="1" x2="23" y2="23"></line>
              <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path>
              <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path>
              <line x1="12" y1="19" x2="12" y2="23"></line>
              <line x1="8" y1="23" x2="16" y2="23"></line>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
              <line x1="12" y1="19" x2="12" y2="23"></line>
              <line x1="8" y1="23" x2="16" y2="23"></line>
            </svg>
          )}
        </button>

        <input
          type="text"
          className="flex-1 bg-transparent border-none text-lg text-white placeholder-gray-500 focus:outline-none px-2"
          placeholder={isVoiceActive ? "Listening..." : "Type a command or ask a question..."}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button
          className={`p-3 rounded-xl transition-all duration-200 ${inputValue.trim()
            ? 'bg-accent text-white hover:bg-accent-hover shadow-lg shadow-accent/20'
            : 'text-gray-500 hover:text-gray-300'
            }`}
          onClick={handleSend}
          disabled={!inputValue.trim()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default InputBar;
