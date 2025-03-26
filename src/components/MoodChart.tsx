import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const MoodChart: React.FC = () => {
    const moods = useSelector((state: RootState) => state.moods);

    if (moods.length === 0) {
        return (
            <div className="p-4 sm:p-6 text-center text-gray-400 bg-gray-800 rounded-lg shadow-lg animate-fade-in">
                Add a mood to see the chart!
            </div>
        );
    }

    const moodToValue = (mood: string): number => {
        switch (mood) {
            case 'Happy': return 3;
            case 'Energetic': return 2;
            case 'Sad': return 1;
            default: return 0;
        }
    };

    const chartData = {
        labels: moods.map((mood) => mood.date),
        datasets: [
            {
                label: 'Mood',
                data: moods.map((mood) => moodToValue(mood.mood)),
                borderColor: '#60A5FA',
                backgroundColor: 'rgba(96, 165, 250, 0.2)',
                tension: 0.3,
                pointBackgroundColor: '#60A5FA',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#60A5FA',
            },
        ],
    };

    const options: ChartOptions<'line'> = {
        responsive: true,
        plugins: {
            legend: { position: 'top' as const, labels: { color: '#D1D5DB' } },
            title: {
                display: true,
                text: 'Mood Chart',
                font: { size: 18 },
                color: '#D1D5DB',
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const value = context.raw as number;
                        switch (value) {
                            case 1: return 'Sad';
                            case 2: return 'Energetic';
                            case 3: return 'Happy';
                            default: return 'Unknown';
                        }
                    },
                },
            },
        },
        scales: {
            x: { ticks: { color: '#9CA3AF' } },
            y: {
                min: 0,
                max: 3,
                ticks: {
                    stepSize: 1,
                    color: '#9CA3AF',
                },
                grid: { color: '#374151' },
            },
        },
        animation: {
            duration: 1000,
            easing: 'easeOutQuart',
        },
    };

    return (
        <div className="p-4 sm:p-6 bg-gray-800 rounded-lg shadow-lg animate-slide-up transform hover:-translate-y-1 transition-all duration-300">
            <div className="bg-gray-900 p-4 rounded-lg max-w-lg mx-auto border border-transparent bg-gradient-to-r from-blue-500/20 to-indigo-500/20 animate-pulse-glow">
                <Line data={chartData} options={options} />
            </div>
        </div>
    );
};

export default MoodChart;
