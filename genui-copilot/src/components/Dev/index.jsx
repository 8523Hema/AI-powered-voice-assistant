import React from 'react';

const Card = ({ title, children, className, noPadding }) => (
    <div className={`glass-panel h-full flex flex-col overflow-hidden ${className}`}>
        {title && <div className="px-4 py-3 border-b border-[rgba(255,255,255,0.05)] text-[10px] font-bold text-muted uppercase tracking-wider bg-black/20">{title}</div>}
        <div className={`flex-1 min-h-0 ${noPadding ? '' : 'p-4'}`}>{children}</div>
    </div>
);

export const CodeEditor = () => (
    <Card title="App.jsx" noPadding className="col-span-2 row-span-2 font-mono text-sm bg-[#0d0d0d]">
        <div className="flex h-full">
            <div className="w-12 bg-black/20 border-r border-white/5 flex flex-col items-end py-4 px-2 text-zinc-600 select-none">
                {Array.from({ length: 15 }, (_, i) => <div key={i} className="leading-6 text-xs opacity-50">{i + 1}</div>)}
            </div>
            <div className="flex-1 p-4 text-zinc-300 leading-6 overflow-auto">
                <p><span className="text-purple-400">import</span> React <span className="text-purple-400">from</span> <span className="text-green-400">'react'</span>;</p>
                <p>&nbsp;</p>
                <p><span className="text-blue-400">function</span> <span className="text-yellow-200">App</span>() {'{'}</p>
                <p>&nbsp;&nbsp;<span className="text-blue-400">const</span> [count, setCount] = useState(<span className="text-green-400">0</span>);</p>
                <p>&nbsp;</p>
                <p>&nbsp;&nbsp;<span className="text-green-600/70 italic">// Fix: missing dependency in useEffect</span></p>
                <p>&nbsp;&nbsp;useEffect(() ={'>'} {'{'}</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;console.log(<span className="text-green-400">"Effect ran"</span>);</p>
                <p>&nbsp;&nbsp;{'}'}, []); <span className="text-red-400/80 w-full inline-block bg-red-500/10 px-1 rounded ml-2">{'<-- Lint Warning'}</span></p>
                <p>&nbsp;</p>
                <p>&nbsp;&nbsp;<span className="text-purple-400">return</span> (</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;{'<'}<span className="text-blue-400">div</span>{'>'}Hello World{'</'}<span className="text-blue-400">div</span>{'>'}</p>
                <p>&nbsp;&nbsp;);</p>
                <p>{'}'}</p>
            </div>
        </div>
    </Card>
);

export const AIChatPanel = () => (
    <Card title="Copilot Chat" className="row-span-2">
        <div className="flex flex-col h-full">
            <div className="flex-1 p-2 space-y-4 overflow-y-auto">
                <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-md bg-indigo-500 flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-white shadow-lg shadow-indigo-500/30">AI</div>
                    <div className="bg-white/5 border border-white/5 p-3 rounded-2xl rounded-tl-none text-sm text-zinc-300 leading-relaxed">
                        I found a potential issue in your <code className="bg-black/30 px-1 rounded text-indigo-300">useEffect</code> dependency array. Line 8 is missing <code className="bg-black/30 px-1 rounded text-indigo-300">count</code>.
                    </div>
                </div>
            </div>
            <div className="mt-2 pt-2 border-t border-white/5">
                <div className="bg-black/20 rounded-lg p-2 text-xs text-zinc-500 border border-transparent hover:border-white/5 transition-colors cursor-text">Reply to Copilot...</div>
            </div>
        </div>
    </Card>
);

export const FileExplorer = () => (
    <Card title="Files" noPadding>
        <div className="text-sm py-2">
            {['src', 'components', 'App.jsx', 'main.jsx', 'index.css'].map((f, i) => (
                <div key={i} className={`flex items-center gap-2 px-4 py-2 hover:bg-white/5 cursor-pointer ${f === 'App.jsx' ? 'bg-indigo-500/10 text-indigo-300 border-l-2 border-indigo-500' : 'text-zinc-500'}`}>
                    <span className="opacity-50 text-xs">{['📂', '📂', 'react', 'react', 'css'][i].replace('react', '📄').replace('css', '#')}</span>
                    {f}
                </div>
            ))}
        </div>
    </Card>
);
