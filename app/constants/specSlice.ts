// File: specSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface SpecState {
  choosenSpec: string | null; // Выбранная специальность
}

const initialState: SpecState = {
  choosenSpec: null, // Начальное значение
};

export const specSlice = createSlice({
  name: 'spec',
  initialState,
  reducers: {
    setChoosenSpec: (state, action) => {
      state.choosenSpec = action.payload;
    },
    resetChoosenSpec: (state) => {
      state.choosenSpec = null;
    },
  },
});

export const { setChoosenSpec, resetChoosenSpec } = specSlice.actions;

export default specSlice.reducer;