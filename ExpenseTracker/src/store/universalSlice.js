import { createSlice } from "@reduxjs/toolkit";

const intialUniversalState = {
  toastMsg: null,
  loggedInDetails: null,
  hamMenu: false

};

export const universalSlice = createSlice({
  name: "universal",
  initialState: intialUniversalState,
  reducers: {
    setToastMsg(state, action) {
      state.toastMsg = { msg: action.payload.msg, mood: action.payload.mood };
    },
    clearToastMsg(state) {
      state.toastMsg = null;
    },
    setLoginInfo(state, action) {
      state.loggedInDetails = action.payload;
    },
    clearLoginInfo(state) {
      state.loggedInDetails = null;
    },
    openMenu(state) {
      state.hamMenu = true;
    },
    closeMenu(state) {
      state.hamMenu = false;
    }
  },
});
