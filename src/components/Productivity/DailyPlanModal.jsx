import React, { useState, useEffect } from 'react';
import { useProductivity } from '../../context/ProductivityContext';
import { motion, AnimatePresence } from 'framer-motion';

const FIELDS = [
    { key: 'wakeTime', label: 'Wake Up Time' },
    { key: 'bathTime', label: 'Bath Time' },
    { key: 'gymTime', label: 'Gym/Exercise' },
    { key: 'eatingTime', label: 'Breakfast/Eating' },
    { key: 'officeTime', label: 'Office Start' },
    { key: 'walkTime', label: 'Evening Walk' },
    { key: 'dinnerTime', label: 'Dinner' },
    { key: 'readTime', label: 'Reading/Relax' },
    { key: 'sleepTime', label: 'Sleep Time' }
];

const DailyPlanModal = ({ isOpen, onClose }) => {
    const { dailyPlan, updateDailyPlan } = useProductivity();
    const [currentStep, setCurrentStep] = useState(0);

    const handleNext = () => {
        if (currentStep < FIELDS.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            onClose();
        }
    };

    const handleChange = (val) => {
        const field = FIELDS[currentStep].key;
        updateDailyPlan({ [field]: val });
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <div className="bg-navy-900 border border-navy-700 p-8 rounded-2xl max-w-lg w-full shadow-2xl relative">
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">✕</button>

                    <h2 className="text-2xl font-bold text-white mb-2">Plan Your Day</h2>
                    <p className="text-text-secondary mb-8">Tell me your schedule. I'm listening...</p>

                    <div className="space-y-6">
                        {FIELDS.map((field, index) => (
                            <div
                                key={field.key}
                                className={`flex items-center justify-between p-4 rounded-xl transition-all ${index === currentStep
                                        ? 'bg-accent/10 border border-accent/50 scale-105 shadow-lg'
                                        : 'opacity-50'
                                    }`}
                                onClick={() => setCurrentStep(index)}
                            >
                                <span className={`font-medium ${index === currentStep ? 'text-white' : 'text-gray-500'}`}>
                                    {field.label}
                                </span>
                                <input
                                    type="text"
                                    value={dailyPlan[field.key] || ''}
                                    onChange={(e) => updateDailyPlan({ [field.key]: e.target.value })}
                                    placeholder="8:00 AM"
                                    className="bg-transparent text-right text-white focus:outline-none w-32 font-mono"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 flex justify-end gap-4">
                        <button onClick={onClose} className="px-4 py-2 text-text-secondary hover:text-white">Cancel</button>
                        <button
                            onClick={handleNext}
                            className="bg-accent text-navy-900 px-6 py-2 rounded-lg font-bold hover:bg-white transition-colors"
                        >
                            {currentStep === FIELDS.length - 1 ? 'Finish' : 'Next'}
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default DailyPlanModal;
