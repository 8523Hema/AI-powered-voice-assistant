import React, { useState } from 'react';
import TamboZone from './components/TamboZone';
import { tambo } from './lib/tambo/engine';

function App() {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // ------------------------------------------
    // THE ONLY WAY components are rendered:
    // ------------------------------------------
    tambo.run(inputValue);

    setInputValue("");
  };

  return (
    <div className="h-screen w-screen bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans overflow-hidden">
      {/* 1. Static Top Bar */}
      <header className="h-14 border-b border-zinc-200 dark:border-zinc-800 flex items-center px-6 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md z-10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
          <h1 className="text-sm font-semibold tracking-wide">GenUI Co-Pilot <span className="text-zinc-400 font-normal">AI Command Center</span></h1>
        </div>
      </header>

      {/* 2. Dynamic Center Zone (Managed by Tambo) */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        <TamboZone />
      </main>

      {/* 3. Persistent Chat Bar */}
      <footer className="p-6 pt-0 z-20">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="relative group">
            <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <input
              type="text"
              className="w-full bg-white dark:bg-zinc-800 border-2 border-transparent focus:border-indigo-500/50 shadow-xl shadow-zinc-200/50 dark:shadow-zinc-950/50 rounded-full py-4 px-6 pl-12 outline-none text-zinc-800 dark:text-white placeholder-zinc-400 transition-all"
              placeholder="Ask Tambo... (e.g., 'Plan a trip to Bali')"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              autoFocus
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
            </div>
          </form>
          <div className="text-center mt-4 text-[10px] text-zinc-400 uppercase tracking-widest font-medium">Powered by Tambo Engine</div>
        </div>
      </footer>
    </div>
  );
}

export default App;
