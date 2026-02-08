import React from 'react';

const Card = ({ title, children, className }) => (
    <div className={`p-5 glass-panel h-full flex flex-col hover:border-white/20 transition-colors ${className}`}>
        {title && <h3 className="text-xs font-semibold text-muted mb-3 uppercase tracking-wider pl-1">{title}</h3>}
        <div className="flex-1 min-h-0 relative z-10">{children}</div>
    </div>
);

export const CalendarView = () => (
    <Card title="Today's Schedule">
        <div className="space-y-3">
            {[
                { time: '09:00 AM', event: 'Daily Standup', color: 'bg-blue-500/10 text-blue-300 border border-blue-500/20' },
                { time: '11:00 AM', event: 'Design Review', color: 'bg-purple-500/10 text-purple-300 border border-purple-500/20' },
                { time: '02:00 PM', event: 'Focus Time', color: 'bg-green-500/10 text-green-300 border border-green-500/20' },
            ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                    <span className="text-xs font-mono text-zinc-500 group-hover:text-zinc-300 transition-colors">{item.time}</span>
                    <div className={`flex-1 p-2 rounded-lg text-sm font-medium ${item.color} backdrop-blur-sm`}>
                        {item.event}
                    </div>
                </div>
            ))}
        </div>
    </Card>
);

export const TaskList = () => (
    <Card title="Priority Tasks">
        <div className="space-y-2">
            {[
                { label: 'Review PR #402', done: true },
                { label: 'Update API Documentation', done: false },
                { label: 'Fix hydration error in nav', done: false },
                { label: 'Prepare Q3 Report', done: false },
            ].map((task, i) => (
                <label key={i} className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer group transition-all">
                    <div className={`w-5 h-5 rounded border ${task.done ? 'bg-indigo-500 border-indigo-500' : 'border-zinc-700 bg-black/20'} flex items-center justify-center transition-colors`}>
                        {task.done && <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                    </div>
                    <span className={`text-sm transition-colors ${task.done ? 'text-zinc-600 line-through' : 'text-zinc-300 group-hover:text-white'}`}>{task.label}</span>
                </label>
            ))}
        </div>
    </Card>
);

export const FocusTimer = () => (
    <Card title="Focus Mode">
        <div className="flex flex-col items-center justify-center h-full">
            <div className="w-32 h-32 rounded-full border-4 border-[#27272a] border-t-indigo-500 flex items-center justify-center relative shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                <div className="text-center">
                    <div className="text-3xl font-mono font-bold text-white tracking-tighter">25:00</div>
                    <div className="text-[10px] text-zinc-500 uppercase mt-1">Pomodoro</div>
                </div>
            </div>
            <div className="flex gap-4 mt-6">
                <button className="px-4 py-1.5 rounded-full bg-indigo-600 text-xs font-medium text-white hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/20">Start</button>
                <button className="px-4 py-1.5 rounded-full bg-[#27272a] text-xs font-medium text-zinc-400 hover:text-white transition-colors">Reset</button>
            </div>
        </div>
    </Card>
);

export const ProductivityChart = () => (
    <Card title="Flow State">
        <div className="h-40 flex items-end gap-2 px-2">
            {[40, 65, 30, 85, 55, 45, 70].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="w-full bg-white/5 rounded-t-lg relative overflow-hidden h-32">
                        <div
                            style={{ height: `${h}%` }}
                            className={`absolute bottom-0 w-full rounded-t-lg transition-all duration-1000 ease-out ${i === 3 ? 'bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]' : 'bg-zinc-700 group-hover:bg-zinc-500'}`}
                        />
                    </div>
                    <span className="text-[10px] text-zinc-600 font-mono group-hover:text-zinc-400 transition-colors">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
                </div>
            ))}
        </div>
    </Card>
);
