import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    value: {
      d: [],
    },
  },
  
  reducers: {
    initialize: (state, action) => {
      state.value = action.payload;
    },
    check: (state, action) => {
      let s = state.value;
      s.d[s.d.indexOf(action.payload)] = "`" + action.payload;
      state.value = { ...state.value, ...s };
    },
    uncheck: (state, action) => {
      let s = state.value;
      s.d[s.d.indexOf(action.payload)] = action.payload.substring(1);
      state.value = { ...state.value, ...s };
    },
    addData: (state, action) => {
      state.value = {
        ...state.value,
        d: [action.payload].concat(state.value.d),
      };
    },
    editData: (state, action) => {
      let s = state.value;
      s.d[s.d.indexOf(action.payload.old)] = action.payload.new;
      state.value = { ...state.value, ...s };
    },
    delet: (state, action) => {
      let s = state.value;
      s.d = s.d.filter((e) => e !== action.payload);
      state.value = { ...state.value, ...s };
    },
  },
});

export const { check } = dataSlice.actions;
export const { uncheck } = dataSlice.actions;
export const { delet } = dataSlice.actions;
export const { addData } = dataSlice.actions;
export const { editData } = dataSlice.actions;
export const { initialize } = dataSlice.actions;

export default dataSlice.reducer;
