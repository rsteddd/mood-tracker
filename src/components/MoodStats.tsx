import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const MoodStats: React.FC = () => {
    const moods = useSelector((state: RootState) => state.moods);

    if (moods.length === 0) {
        return null;
    }

    const moodCounts = moods.reduce(
        (acc, mood) => {
            acc[mood.mood] = (acc[mood.mood] || 0) + 1;
            return acc;
        },
        {} as Record<string, number>
    );

    const totalMoods = moods.length;

    const stats = [
        { mood: 'Happy', emoji: '😊', count: moodCounts['Happy'] || 0 },
        { mood: 'Sad', emoji: '😢', count: moodCounts['Sad'] || 0 },
        { mood: 'Energetic', emoji: '⚡', count: moodCounts['Energetic'] || 0 },
    ];

    return (
        <div className="p-4 sm:p-6 bg-gray-800 rounded-lg shadow-lg animate-slide-up transform hover:-translate-y-1 transition-all duration-300">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-200 mb-4 animate-fade-in text-center">
                Mood Statistics
            </h2>
            <div className="max-w-lg mx-auto space-y-3">
                {stats.map((stat) => (
                    <div
                        key={stat.mood}
                        className="flex items-center justify-between p-3 bg-gray-900 rounded-lg shadow-md hover:shadow-blue-500/40 transition-all duration-300 animate-fade-in"
                        style={{ animationDelay: `${stats.indexOf(stat) * 100}ms` }}
                    >
                        <div className="flex items-center">
                            <span className="text-2xl mr-2">{stat.emoji}</span>
                            <span className="text-gray-200 font-medium">{stat.mood}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-gray-300">{stat.count} times</span>
                            <span className="text-gray-400 text-sm">
                ({((stat.count / totalMoods) * 100).toFixed(1)}%)
              </span>
                        </div>
                    </div>
                ))}
                <p className="text-gray-400 text-sm text-center mt-2">
                    Total: {totalMoods} entries
                </p>
            </div>
        </div>
    );
};

export default MoodStats;
