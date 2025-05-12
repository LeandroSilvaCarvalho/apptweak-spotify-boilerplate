import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { ThemeState } from "./slice";

const selectSelf = (state: RootState): ThemeState => state.theme;

export const selectTheme = createSelector(selectSelf, (theme) => theme.appearance);
