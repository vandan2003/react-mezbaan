import { configureStore } from "@reduxjs/toolkit";

import UserSlice from "./user-slice";
const store = configureStore({
    reducer:{
        user:UserSlice
    }
});

export default store;