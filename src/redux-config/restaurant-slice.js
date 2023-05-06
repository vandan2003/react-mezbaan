import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../WebApi/api"

export const fetchAtYourCity = createAsyncThunk("restaurant/at-your-city",async (city)=>{
    let response  = await axios.post(api.AT_YOUR_CITY,{city});
    if(response.data.status)
        return response.data.result;
})


export const fetchTopRatedFour = createAsyncThunk("restaurant/top-rated-four",async ()=>{
    let response  = await axios.get(api.TOP_RATED_FOUR);
    console.log(response);
    if(response.data.status)
        return response.data.result;
})

const slice = createSlice({
    name:"restaurant",
    initialState:{
        atYourCity:[],
        topRatedFour:[]
    },
    reducers:{
        setAtYourCity:(state,action)=>{
            state.atYourCity = action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchAtYourCity.fulfilled,(state,action)=>{
            state.atYourCity = action.payload;
        }).addCase(fetchTopRatedFour.fulfilled,(state,action)=>{
            state.topRatedFour = action.payload;
        })
    }
})

export default slice.reducer;