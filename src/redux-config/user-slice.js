import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../WebApi/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const googleLogin = createAsyncThunk("customer/google-signin", async (email) => {
    try {
        let response = await axios.post(api.GOOGLE_SIGNIN, { email: email });
        if(response.data.status)
            return response.data;
    } catch (err) {
        window.alert("Something went wrong!!");
    }
})

export const getVisits = createAsyncThunk("customer/get-visits", async (customerId) => {
    let response = await axios.post(api.GET_USER_VISITS, { customerId });
    console.log(response);
    return response.data.result;
})

export const getReviews = createAsyncThunk("customer/get-reviews", async (customerId) => {
    let response = await axios.post(api.GET_USER_VISITS, { customerId });
    console.log(response);
    return response.data.result;
})

export const getBookings = createAsyncThunk("customer/get-bookings", async (customerId) => {
    let response = await axios.post(api.GET_USER_BOOKINGS, { customerId });
    console.log(response);
    return response.data.res;
})

export const addIntoFavourites = createAsyncThunk("customer/add-to-favourite", async ({ customerId, restaurantId }) => {
    let response = await axios.post(api.ADD_TO_FAVOURITE, { customerId, restaurantId });
    console.log(response);
    return response.data.favourite;
})

export const cancelBooking = createAsyncThunk("customer/add-to-favourite", async (bookingId) => {
    let response = await axios.post(api.CANCEL_BOOKING, { _id: bookingId });
    if (response.data.status)
        return bookingId;
})

const slice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        visits: [],
        bookings: [],
        isLoading: false,
        error: ""
    },
    reducers: {
        setUser: (state, action) => {
            state.currentUser = action.payload;
        },
        addFavourite: (state, action) => {
            state.currentUser.favourites.push(action.payload);
        },
        removeFavourite: (state, action) => {
            let index = state.currentUser.favourites.findIndex(fav => fav.restaurantId._id == action.payload);
            state.currentUser.favourites.splice(index, 1);
        },
        signOut: (state, action) => {
            state.currentUser = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(googleLogin.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(googleLogin.fulfilled, (state, action) => {
            console.log(action.payload)
            state.currentUser = action.payload.customer;
            state.visits = action.payload.visits;
            state.bookings = action.payload.bookings;
            state.isLoading = false;
            toast.success("Sign In Success");
        }).addCase(googleLogin.rejected, (state, action) => {
            state.error = "Some thing went wrong !!";
            toast.error("Some thing went wrong !!");
            state.isLoading = false;
        }).addCase(getVisits.fulfilled, (state, action) => {
            state.visits = action.payload;
        }).addCase(getBookings.fulfilled, (state, action) => {
            state.bookings = action.payload
        }).addCase(cancelBooking.fulfilled, (state, action) => {
            state.bookings.find(booking => booking._id == action.payload).status = "canceled";
        })
    }
})

export const { setCoordinates, setUser, addFavourite, removeFavourite, signOut } = slice.actions;
export default slice.reducer;