import { configureStore } from "@reduxjs/toolkit";
import { splitCreateSlice } from "./splitCreateSlice";

const store = configureStore({
    reducer: {
        splitCreate: splitCreateSlice.reducer
    }
})

export const splitCreateActions = splitCreateSlice.actions;

export default store;