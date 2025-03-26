import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Тип для одного запису настрою
interface Mood {
    id: string; // Унікальний ідентифікатор
    mood: string; // Назва настрою
    note: string; // Нотатка
    date: string; // Дата у форматі "2025-03-26"
}

// Функція для завантаження стану з LocalStorage
const loadState = (): Mood[] => {
    try {
        const serializedState = localStorage.getItem('moods'); // Отримуємо дані з LocalStorage
        if (serializedState === null) {
            return []; // Якщо нічого немає, повертаємо порожній масив
        }
        return JSON.parse(serializedState); // Парсимо JSON у масив
    } catch (err) {
        console.error('Помилка завантаження з LocalStorage:', err);
        return []; // У разі помилки повертаємо порожній масив
    }
};

// Початковий стан із LocalStorage
const initialState: Mood[] = loadState();
// Створюємо slice для настроїв
const moodSlice = createSlice({
    name: 'moods',
    initialState,
    reducers: {
        // Дія для додавання нового настрою
        addMood: (state, action: PayloadAction<Mood>) => {
            state.push(action.payload); // Додаємо настрій у масив
            // Зберігаємо оновлений стан у LocalStorage
            localStorage.setItem('moods', JSON.stringify(state));
        },
        removeMood: (state, action: PayloadAction<string>) => {
            const updatedState = state.filter((mood) => mood.id !== action.payload);
            localStorage.setItem('moods', JSON.stringify(updatedState));
            return updatedState; // Повертаємо оновлений стан
        },
    },
});

export const { addMood ,removeMood} = moodSlice.actions;
export default moodSlice.reducer;
