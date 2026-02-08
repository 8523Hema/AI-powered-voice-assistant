import React, { useState } from 'react';
import { useProductivity } from '../../context/ProductivityContext';
import { motion, AnimatePresence } from 'framer-motion';

const TaskBoard = () => {
    const { tasks, toggleTask, addTask } = useProductivity();
    const [quickTask, setQuickTask] = useState('');
    const [quickPriority, setQuickPriority] = useState('medium');

    const priorities = [
        { id: 'high', label: 'High Priority', sub: 'Must do today', color: 'border-red-500', bg: 'bg-red-500/10' },
        { id: 'medium', label: 'Medium Priority', sub: 'Do this week', color: 'border-blue-500', bg: 'bg-blue-500/10' },
        { id: 'low', label: 'Low Priority', sub: 'Do when free', color: 'border-gray-500', bg: 'bg-gray-500/10' }
    ];

    const handleQuickAdd = (e) => {
        e.preventDefault();
        if (quickTask.trim()) {
            addTask({ title: quickTask, priority: quickPriority });
            setQuickTask('');
        }
    };

    return (
        <div className="p-4 md:p-6 flex flex-col h-full gap-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Task Board</h2>
                    <p className="text-text-secondary text-sm">Organize your priorities and stay focused.</p>
                </div>

                {/* Quick Add Bar */}
                <form onSubmit={handleQuickAdd} className="w-full md:w-auto flex items-center gap-2 bg-navy-900 border border-navy-700 p-1.5 rounded-xl shadow-2xl">
                    <input
                        type="text"
                        value={quickTask}
                        onChange={(e) => setQuickTask(e.target.value)}
                        placeholder="Add a quick task..."
                        className="bg-transparent border-none text-white px-3 py-1.5 text-sm focus:outline-none w-full md:w-64"
                    />
                    <select
                        value={quickPriority}
                        onChange={(e) => setQuickPriority(e.target.value)}
                        className="bg-navy-800 text-xs text-gray-300 border-none rounded-lg px-2 py-1.5 focus:outline-none cursor-pointer hover:bg-navy-700 transition-colors"
                    >
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                    <button
                        type="submit"
                        disabled={!quickTask.trim()}
                        className="bg-accent text-navy-900 p-2 rounded-lg hover:bg-white transition-all disabled:opacity-50"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    </button>
                </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 overflow-y-auto custom-scrollbar pb-12">
                {priorities.map(p => {
                    const filteredTasks = tasks.filter(t => t.priority === p.id);
                    return (
                        <div key={p.id} className="flex flex-col gap-4 min-w-0">
                            <div className={`p-4 bg-bg-card border-t-4 ${p.color} ${p.bg} rounded-2xl shadow-xl flex items-center justify-between`}>
                                <div>
                                    <h3 className="font-bold text-lg text-white">{p.label}</h3>
                                    <p className="text-[10px] text-text-secondary uppercase tracking-widest">{p.sub}</p>
                                </div>
                                <span className="text-xs font-mono bg-navy-900/50 px-2 py-1 rounded border border-navy-700 text-gray-400">
                                    {filteredTasks.length}
                                </span>
                            </div>

                            <div className="flex flex-col gap-3">
                                <AnimatePresence mode="popLayout">
                                    {filteredTasks.map(task => (
                                        <TaskCard key={task.id} task={task} onToggle={() => toggleTask(task.id)} />
                                    ))}
                                </AnimatePresence>
                                {filteredTasks.length === 0 && (
                                    <div className="py-8 text-center border-2 border-dashed border-navy-800 rounded-2xl">
                                        <p className="text-xs text-text-secondary italic">No {p.id} priority tasks</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const TaskCard = ({ task, onToggle }) => {
    const priorityColors = {
        high: 'bg-red-500/20 text-red-400 border-red-500/50',
        medium: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
        low: 'bg-green-500/20 text-green-400 border-green-500/50'
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`p-4 rounded-2xl border border-navy-700 bg-navy-900/40 flex items-start gap-3 transition-all duration-300 backdrop-blur-sm group ${task.isCompleted ? 'opacity-40 grayscale' : 'hover:border-accent/40 hover:bg-navy-900/60 shadow-lg shadow-black/20 hover:shadow-accent/5'}`}
        >
            <div className="relative flex items-center justify-center">
                <input
                    type="checkbox"
                    checked={task.isCompleted}
                    onChange={onToggle}
                    className="appearance-none w-5 h-5 rounded-lg border-2 border-navy-700 checked:bg-accent checked:border-accent cursor-pointer transition-all duration-300"
                />
                {task.isCompleted && (
                    <svg className="absolute w-3 h-3 text-navy-900 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                )}
            </div>

            <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold truncate transition-all duration-300 ${task.isCompleted ? 'line-through text-text-secondary' : 'text-gray-200 group-hover:text-white'}`}>
                    {task.title}
                </p>
                <div className="flex items-center gap-2 mt-2">
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-tighter ${priorityColors[task.priority] || priorityColors.medium}`}>
                        {task.priority || 'MEDIUM'}
                    </span>
                    <p className="text-[9px] text-text-secondary font-mono bg-navy-800/50 px-1.5 rounded">{task.date}</p>
                </div>
            </div>
        </motion.div>
    );
};

export default TaskBoard;
