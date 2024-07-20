import { createSlice } from "@reduxjs/toolkit";

const intialTransactionState = {
    filterParam: null,
    durations: [],

};

export const transactionSlice = createSlice({
    name: "transactions",
    initialState: intialTransactionState,
    reducers: {
        setFilterParam(state, action) {
            state.filterParam = action.payload;
        },
        pushDuration(state, action) {
            state.durations.push(action.payload);
        },
        popDuration(state, action) {
            state.durations.splice(action.payload, 1);
        },
        clearDurations(state) {
            state.durations = [];
        }
    },
});
