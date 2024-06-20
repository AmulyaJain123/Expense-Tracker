import { configureStore, createSlice } from "@reduxjs/toolkit";

const intialSplitCreateState = {
    friends: [],
    bills: []
};

const splitCreateSlice = createSlice({
    name: 'splitCreate',
    initialState: intialSplitCreateState,
    reducers: {
        addFriend(state, action) {
            state.friends.unshift({ name: action.payload.name });
        },
        removeFriend(state, action) {
            let index = 0;
            for (let i of state.friends) {
                if (i.name === action.payload.name) {
                    break;
                }
                ++index;
            }
            state.friends.splice(index, 1);
        },
        addBill(state, action) {
            state.bills.unshift({
                total: action.payload.total,
                payer: action.payload.payer,
                shares: [action.payload.shares.map((sh) => {
                    return {
                        name: sh.name,
                        share: sh.share
                    }
                })]
            })
            console.log(state.bills);
        }
    }
});

const store = configureStore({
    reducer: {
        splitCreate: splitCreateSlice.reducer
    }
})

export const splitCreateActions = splitCreateSlice.actions;

export default store;