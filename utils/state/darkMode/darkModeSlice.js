import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    darkmode:false
}

const darkModeSlice = createSlice({
    name:'darkmode',
    initialState,
    reducers:{
        setDarkMode:(state)=>{
            state.darkmode = true
        },
        setLightMode:(state)=>{
            state.darkmode = false
        },
        toggleDarkMode:(state)=>{
            state.darkmode = !state.darkmode
        }
    }

})

export const {setDarkMode,setLightMode,toggleDarkMode} = darkModeSlice.actions
export default darkModeSlice.reducer