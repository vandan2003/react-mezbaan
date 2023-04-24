import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name:"user",
    initialState:{
        currentUser:null,
        coordinates:[]
    },
    reducers:{
        setUser:(state,action)=>{
            state.currentUser = action.payload;
        },
        setCoordinates:(state,action)=>{
            state.coordinates = action.payload;
        }
    }
})

export const {setCoordinates,setUser} = slice.actions;
export default slice;