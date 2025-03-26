import { configureStore } from '@reduxjs/toolkit'; // Імпортуємо функцію для створення store
import moodReducer from './moodSlice'; // Імпортуємо редюсер, який створимо далі

// Налаштовуємо store
export const store = configureStore({
    reducer: {
        moods: moodReducer, // Додаємо редюсер для настроїв під ключем "moods"
    },
});

// Типи для TypeScript
export type RootState = ReturnType<typeof store.getState>; // Тип усього стану
export type AppDispatch = typeof store.dispatch; // Тип для dispatch
export default store;
