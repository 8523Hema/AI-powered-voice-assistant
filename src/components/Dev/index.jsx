import React from 'react';

export const CodeEditor = () => {
    return (
        <div className="widget-card code-widget">
            <div className="editor-header">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
                <span className="filename">Apply.jsx</span>
            </div>
            <pre className="code-content">
                <code>
                    {`function App() {
  const [state, setState] = useState(null);
  
  useEffect(() => {
    // Error here?
    fetchData(); 
  }, []);
}`}
                </code>
            </pre>
            <style jsx>{`
        .widget-card { background: var(--bg-card); border-radius: var(--radius-lg); width: 100%; box-shadow: var(--shadow-md); overflow: hidden; font-family: 'Fira Code', monospace; }
        .editor-header { background: #15181e; padding: 0.75rem; display: flex; align-items: center; gap: 0.5rem; border-bottom: 1px solid var(--border-color); }
        .dot { width: 10px; height: 10px; border-radius: 50%; }
        .red { background: #ef4444; } .yellow { background: #f59e0b; } .green { background: #10b981; }
        .filename { margin-left: 1rem; color: var(--text-secondary); font-size: 0.9rem; }
        .code-content { padding: 1rem; margin: 0; color: #a1a1aa; font-size: 0.9rem; }
      `}</style>
        </div>
    );
};

export const DevAssistant = () => {
    return (
        <div className="widget-card">
            <h3>AI Assistant</h3>
            <p className="ai-msg">It looks like <code>fetchData</code> isn't defined in this scope. You might need to import it or define it inside the component.</p>
            <button className="fix-btn">Auto-Fix</button>
            <style jsx>{`
                .widget-card { background: var(--bg-card); padding: 1rem; border-radius: var(--radius-lg); width: 100%; box-shadow: var(--shadow-md); }
                .ai-msg { color: var(--text-secondary); font-size: 0.9rem; line-height: 1.5; }
                code { background: rgba(255,255,255,0.1); padding: 0.1rem 0.3rem; border-radius: 4px; color: var(--accent-color); }
                .fix-btn { background: var(--accent-color); color: white; border: none; padding: 0.5rem 1rem; border-radius: var(--radius-md); margin-top: 1rem; cursor: pointer; }
                .fix-btn:hover { background: var(--accent-hover); }
            `}</style>
        </div>
    )
}
