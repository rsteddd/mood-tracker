import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMood } from '../store/moodSlice';

const MoodForm: React.FC = () => {
    const [mood, setMood] = useState<string>('');
    const [note, setNote] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = () => {
        if (!mood) {
            alert('Choose a mood!');
            return;
        }
        setIsSubmitting(true);
        const moodEntry = {
            id: crypto.randomUUID(),
            mood,
            note,
            date: new Date().toISOString().split('T')[0],
        };
        dispatch(addMood(moodEntry));
        setTimeout(() => {
            setMood('');
            setNote('');
            setIsSubmitting(false);
        }, 300);
    };

    const moodOptions = [
        { value: 'Happy', emoji: '😊' },
        { value: 'Sad', emoji: '😢' },
        { value: 'Energetic', emoji: '⚡' },
    ];

    return (
        <div className="p-4 sm:p-6 bg-gray-800 rounded-lg shadow-lg animate-slide-up transform hover:-translate-y-1 transition-all duration-300">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-200 mb-4 animate-fade-in text-center">
                How’s your mood?
            </h2>
            <div className="space-y-4 max-w-lg mx-auto">
                <div className="flex flex-wrap justify-center gap-2 sm:gap-4 animate-fade-in delay-100">
                    {moodOptions.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => setMood(option.value)}
                            className={`flex items-center px-3 py-2 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 ${
                                mood === option.value
                                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                                    : 'bg-gray-900 text-gray-300 hover:bg-gray-700'
                            }`}
                        >
                            <span className="mr-2">{option.emoji}</span>
                            <span>{option.value}</span>
                        </button>
                    ))}
                </div>
                <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Add a note (optional)"
                    className="w-full p-3 bg-gray-900 text-gray-300 border border-gray-700 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition animate-fade-in delay-200"
                    rows={3}
                />
                <button
                    onClick={handleSubmit}
                    className={`w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300 ${
                        isSubmitting ? 'animate-pulse scale-95' : 'hover:from-blue-700 hover:to-indigo-700 animate-gradient-shift'
                    }`}
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default MoodForm;
