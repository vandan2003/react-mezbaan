import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./user-slice";
import RestaurantSlice from "./restaurant-slice";
const store = configureStore({
    reducer:{
        user:UserSlice,
        restaurants:RestaurantSlice
    }
});

export default store;