import React, { useState } from 'react';
import { useProductivity } from '../../context/ProductivityContext';
import { motion } from 'framer-motion';

const NotesView = () => {
    const { notes, addNote } = useProductivity();
    const [newNote, setNewNote] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newNote.trim()) {
            addNote(newNote);
            setNewNote('');
        }
    };

    return (
        <div className="p-6 h-full flex flex-col max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6">Voice & Text Notes</h2>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="mb-8 relative">
                <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Type a note or say 'Take note...'"
                    className="w-full bg-navy-800 border border-navy-700 rounded-xl px-4 py-4 pr-12 text-white placeholder-text-secondary focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                />
                <button
                    type="submit"
                    className="absolute right-2 top-2 bottom-2 bg-navy-700 hover:bg-accent hover:text-navy-900 text-white px-4 rounded-lg transition-colors font-medium"
                >
                    Add
                </button>
            </form>

            {/* Notes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto pb-4">
                {notes.length === 0 ? (
                    <div className="col-span-full text-center text-text-secondary py-12 border border-dashed border-navy-700 rounded-xl">
                        <p>No notes yet.</p>
                        <p className="text-sm mt-2 opacity-70">Try saying: "Take note, buy milk on the way home"</p>
                    </div>
                ) : (
                    notes.slice().reverse().map((note) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            key={note.id}
                            className="bg-bg-card border border-navy-700 p-5 rounded-xl shadow-lg hover:border-navy-600 transition-colors"
                        >
                            <p className="text-gray-200 whitespace-pre-wrap leading-relaxed">{note.content}</p>
                            <div className="mt-4 flex items-center justify-between text-xs text-text-secondary border-t border-navy-800 pt-3">
                                <span>{note.timestamp}</span>
                                <span className="bg-navy-800 px-2 py-1 rounded text-accent">#note</span>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
};

export default NotesView;
