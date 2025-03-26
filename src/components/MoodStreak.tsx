import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const MoodStreak: React.FC = () => {
    const moods = useSelector((state: RootState) => state.moods);

    if (moods.length === 0) {
        return null;
    }

    const sortedMoods = [...moods].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    let streak = 1;
    let currentDate = new Date(sortedMoods[0].date);
    for (let i = 1; i < sortedMoods.length; i++) {
        const prevDate = new Date(sortedMoods[i].date);
        const diffInDays = (currentDate.getTime() - prevDate.getTime()) / (1000 * 3600 * 24);
        if (diffInDays === 1) {
            streak++;
            currentDate = prevDate;
        } else if (diffInDays > 1) {
            break;
        }
    }

    return (
        <div className="p-4 sm:p-6 bg-gray-800 rounded-lg shadow-lg animate-slide-up transform hover:-translate-y-1 transition-all duration-300">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-200 mb-4 animate-fade-in text-center">
                Mood Streak
            </h2>
            <div className="flex items-center justify-center space-x-4 max-w-lg mx-auto">
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-indigo-500/30 rounded-full animate-pulse-glow blur-md"></div>
                    <span className="relative text-4xl font-extrabold text-gray-100 drop-shadow-md">
            {streak}
          </span>
                </div>
                <p className="text-gray-300">days in a row</p>
            </div>
        </div>
    );
};

export default MoodStreak;
