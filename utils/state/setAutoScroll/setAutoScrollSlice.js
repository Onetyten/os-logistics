import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    setScroll:true
}

const setAutoScrollSlice = createSlice({
    name:'setScroll',
    initialState,
    reducers:{
        setScrollTrue:(state)=>{
            state.setScroll = true
        },
        setScrollFalse:(state)=>{
            state.setScroll = false
        },
        toggleScroll:(state)=>{
            state.setScroll = !state.setScroll
        },
    }
})

export const {setScrollTrue,setScrollFalse,toggleScroll} = setAutoScrollSlice.actions
export default setAutoScrollSlice.reducer