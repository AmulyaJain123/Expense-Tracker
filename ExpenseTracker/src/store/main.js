import { configureStore } from "@reduxjs/toolkit";
import { splitCreateSlice } from "./splitCreateSlice";
import { vaultSlice } from "./vaultSlice.js";
import { universalSlice } from "./universalSlice.js";

const store = configureStore({
    reducer: {
        splitCreate: splitCreateSlice.reducer,
        vault: vaultSlice.reducer,
        universal: universalSlice.reducer,
    }
})

export const splitCreateActions = splitCreateSlice.actions;
export const vaultActions = vaultSlice.actions;
export const universalActions = universalSlice.actions;

export default store;