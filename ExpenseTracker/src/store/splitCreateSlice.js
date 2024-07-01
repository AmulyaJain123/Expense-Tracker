import { createSlice } from "@reduxjs/toolkit";

const intialSplitCreateState = {
    friends: [],
    bills: [],
    topNavSplitStatus: "Split Creation",
    splitInfo: {
        splitName: "",
        description: "",
        splitDate: ""
    },
    addBillNavStatus: "Divide Equally",
    selectBillNavStatus: null
};

export const splitCreateSlice = createSlice({
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
            console.log(action.payload);
            const newArr = [];
            for (let i of action.payload.shares) {
                console.log(i.name, i.share);
                newArr.push({ name: i.name, share: i.share });
            }
            console.log("newArr", newArr);
            const newEntry = {
                billName: action.payload.billName === "" ? "Unnamed" : action.payload.billName,
                billDate: action.payload.billDate === "" ? (new Date()).toISOString() : action.payload.billDate,
                description: action.payload.desc === "" ? "None" : action.payload.desc,
                totalAmt: action.payload.totalAmt,
                payedBy: action.payload.payedBy,
                id: action.payload.id,
                shares: newArr
            }
            console.log("newEntry", newEntry);
            state.bills.push(newEntry)
            console.log("new state bills", state.bills);
        },
        removeBill(state, action) {
            let index = 0;
            for (let i of state.bills) {
                if (i.id === action.payload) {
                    break;
                }
                ++index;
            }
            state.bills.splice(index, 1);
            state.selectBillNavStatus = null;
        },
        changeTopNavEventStatus(state, action) {
            console.log(action.payload);
            state.topNavSplitStatus = action.payload;
        },
        setSplitInfo(state, action) {
            state.splitInfo.splitName = action.payload.name;
            if (action.payload.desc != "") {
                state.splitInfo.description = action.payload.desc;
            } else {
                state.splitInfo.description = "None";
            }
            const currDate = new Date();
            const formattedDate = `${currDate.getDate()}/${currDate.getMonth() + 1}/${currDate.getFullYear()}`
            state.splitInfo.splitDate = formattedDate;
        },
        changeAddBillNavStatus(state, action) {
            state.addBillNavStatus = action.payload;
        },
        changeSelectBillNavStatus(state, action) {
            state.selectBillNavStatus = action.payload;
        },
        clearAll(state) {
            state.friends = [];
            state.bills = [];
            state.topNavSplitStatus = "Split Creation";
            state.addBillNavStatus = "Divide Equally";
            state.selectBillNavStatus = null;
            state.splitInfo = { splitName: "", description: "" };
        }
    }
});