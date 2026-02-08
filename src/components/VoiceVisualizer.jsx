import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const VoiceVisualizer = ({ isActive }) => {
    return (
        <AnimatePresence>
            {isActive && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="fixed bottom-32 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 pointer-events-none"
                >
                    <div className="flex items-end gap-1 h-12">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    height: [12, 48, 12],
                                }}
                                transition={{
                                    duration: 0.8,
                                    repeat: Infinity,
                                    delay: i * 0.1,
                                    ease: "easeInOut"
                                }}
                                className="w-1.5 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)]"
                            />
                        ))}
                    </div>
                    <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-2xl">
                        <span className="text-blue-400 text-sm font-medium tracking-wider uppercase">Listening...</span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default VoiceVisualizer;
