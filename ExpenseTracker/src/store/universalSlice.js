import { createSlice } from "@reduxjs/toolkit";

const intialUniversalState = {
    toastMsg:null

};

export const universalSlice = createSlice({
  name: "universal",
  initialState: intialUniversalState,
  reducers: {
    setToastMsg(state,action){
        state.toastMsg={msg:action.payload.msg,mood:action.payload.mood};
    },
    clearToastMsg(state){
        state.toastMsg=null;
    }
  },
});
