import { configureStore } from "@reduxjs/toolkit";
import { MenuSlice } from "./Reducers/MenuSlice";

export const store = configureStore({
    reducer: {
        menu:MenuSlice.reducer
    },
})