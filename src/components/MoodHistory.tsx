import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {AppDispatch, RootState} from '../store/store';
import { removeMood } from '../store/moodSlice';

const MoodHistory: React.FC = () => {
    const moods = useSelector((state: RootState) => state.moods);
    const dispatch = useDispatch<AppDispatch>();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentMoods = moods.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(moods.length / itemsPerPage);

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handleDelete = (id: string) => {
        dispatch(removeMood(id));
        if (currentMoods.length === 1 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    if (moods.length === 0) {
        return (
            <div className="p-4 sm:p-6 text-center text-gray-400 bg-gray-800 rounded-lg shadow-lg animate-fade-in">
                Mood history is empty. Add your first mood!
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-6 bg-gray-800 rounded-lg shadow-lg animate-slide-up transform hover:-translate-y-1 transition-all duration-300">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-200 mb-4 animate-fade-in text-center">
                Mood History
            </h2>
            <ul className="space-y-4 max-w-lg mx-auto">
                {currentMoods.map((mood, index) => (
                    <li
                        key={mood.id}
                        className="p-4 bg-gray-900 border border-gray-700 rounded-lg shadow-md hover:shadow-blue-500/40 hover:border-blue-500/60 transition-all duration-300 animate-fade-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div className="flex justify-between items-center">
                            <div className="flex-1">
                <span className="text-lg font-medium text-gray-200">
                  {mood.mood}
                </span>
                                <span className="text-sm text-gray-400 ml-2">{mood.date}</span>
                            </div>
                            <button
                                onClick={() => handleDelete(mood.id)}
                                className="ml-4 py-1 px-2 bg-red-600 text-white rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 transform hover:scale-105"
                            >
                                Delete
                            </button>
                        </div>
                        {mood.note && (
                            <p className="mt-2 text-gray-300 text-sm">{mood.note}</p>
                        )}
                    </li>
                ))}
            </ul>
            {moods.length > itemsPerPage && (
                <div className="mt-6 flex justify-center items-center space-x-4">
                    <button
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                        className={`py-2 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 ${
                            currentPage === 1
                                ? 'opacity-50 cursor-not-allowed'
                                : 'hover:from-blue-700 hover:to-indigo-700 animate-pulse-glow'
                        }`}
                    >
                        Previous
                    </button>
                    <span className="text-gray-200 font-medium">
            Page {currentPage} of {totalPages}
          </span>
                    <button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        className={`py-2 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 ${
                            currentPage === totalPages
                                ? 'opacity-50 cursor-not-allowed'
                                : 'hover:from-blue-700 hover:to-indigo-700 animate-pulse-glow'
                        }`}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default MoodHistory;
