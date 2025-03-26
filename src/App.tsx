import React from 'react';
import MoodForm from './components/MoodForm';
import MoodHistory from './components/MoodHistory';
import MoodChart from './components/MoodChart';
import MoodStats from './components/MoodStats';
import MoodStreak from './components/MoodStreak'; // Новий компонент

const App: React.FC = () => {
    const particles = Array.from({ length: 50 }, (_, i) => (
        <div
            key={i}
            className="particle"
            style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
            }}
        />
    ));

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-800 animate-gradient-shift flex flex-col items-center py-6 sm:py-10 relative overflow-hidden">
            <div className="particles">{particles}</div>
            <div className="w-full max-w-4xl px-4 sm:px-6 relative z-10">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-100 mb-8 text-center drop-shadow-md animate-fade-in">
                    Mood Tracker
                </h1>
                <div className="space-y-8">
                    <MoodForm />
                    <MoodStats />
                    <MoodStreak /> {/* Додаємо стрік */}
                    <MoodChart />
                    <MoodHistory />
                </div>
            </div>
        </div>
    );
};

export default App;
