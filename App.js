import Tasks from "./components/Tasks";
import React from "react";
import dataReducer from "./components/data";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

export default function App() {
  return (
    <>
      <Provider store={store}>
        <Tasks />
      </Provider>
    </>
  );
}
