import { createSlice } from "@reduxjs/toolkit";

export interface ThemeState {
  appearance: "light" | "dark";
}

const initialState: ThemeState = {
  appearance: (localStorage.getItem("theme") as "light" | "dark") || "light"
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.appearance = action.payload;
      localStorage.setItem("theme", action.payload);
    },
    toggleTheme: (state) => {
      state.appearance = state.appearance === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.appearance);
    }
  }
});

export const { setTheme, toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
