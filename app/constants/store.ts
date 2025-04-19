import { configureStore, createSlice } from '@reduxjs/toolkit';

const choosenSpecSlice = createSlice({
  name: 'choosenSpec',
  initialState: '', // Начальное значение (может быть null или что угодно)
  reducers: {
    setChoosenSpec: (state, action) => action.payload, // Устанавливает новое значение
  },
});

export const { setChoosenSpec } = choosenSpecSlice.actions;

const store = configureStore({
  reducer: {
    choosenSpec: choosenSpecSlice.reducer, // Добавляем choosenSpec в глобальный state
  },
});
// Тип RootState описывает все состояние Redux store
export type RootState = ReturnType<typeof store.getState>;
export default store;
