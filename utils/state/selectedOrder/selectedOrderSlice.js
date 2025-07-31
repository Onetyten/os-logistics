import { createSlice } from "@reduxjs/toolkit";


const initialState={
    selectedOrder:null
}

const selectedOrderSlice = createSlice({
    name:'selectedOrder',
    initialState,
    reducers:{
        setSelectedOrder:(state,action)=>{
            state.selectedOrder = action.payload
        }
    }
})


export const {setSelectedOrder} = selectedOrderSlice.actions
export default selectedOrderSlice.reducer