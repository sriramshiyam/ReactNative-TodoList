import {createSlice} from '@reduxjs/toolkit';

export const dataSlice = createSlice({
  name: 'data',
  initialState: {
    value: {
      d: [],
      c: [],
    },
  },
  reducers: {
    initialize: (state, action) => {
      state.value = action.payload;
    },
    check: (state, action) => {
      state.value = {
        d: state.value.d.filter(e => e !== action.payload),
        c: state.value.c.concat([action.payload]),
      };
    },
    uncheck: (state, action) => {
      state.value = {
        c: state.value.c.filter(e => e !== action.payload),
        d: state.value.d.concat([action.payload]),
      };
    },
    addData: (state, action) => {
      state.value = {
        ...state.value,
        d: state.value.d.concat([action.payload]),
      };
    },
    deleteData: (state, action) => {
      state.value = {
        ...state.value,
        c: state.value.c.filter(e => e !== action.payload),
      };
    },
  },
});

export const {check} = dataSlice.actions;
export const {uncheck} = dataSlice.actions;
export const {deleteData} = dataSlice.actions;
export const {addData} = dataSlice.actions;
export const {initialize} = dataSlice.actions;

export default dataSlice.reducer;
