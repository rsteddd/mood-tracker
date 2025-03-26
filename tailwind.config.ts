export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out', // Плавна поява
                'slide-up': 'slideUp 0.7s ease-out', // Слайд вверх
                'pulse-glow': 'pulseGlow 2s infinite', // Пульсуюче сяйво
                'gradient-shift': 'gradientShift 6s ease infinite', // Переливання градієнта
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                pulseGlow: {
                    '0%, 100%': { boxShadow: '0 0 5px rgba(96, 165, 250, 0.5)' },
                    '50%': { boxShadow: '0 0 15px rgba(96, 165, 250, 0.8)' },
                },
                gradientShift: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
            },
        },
        },
    plugins: [],
};
