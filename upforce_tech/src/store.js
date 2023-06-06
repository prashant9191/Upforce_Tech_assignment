
import { configureStore } from "@reduxjs/toolkit";
import dataReducer  from "./reducers/dataReducer";

const store = configureStore({
  reducer: dataReducer,
});

export default store;
