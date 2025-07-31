import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchShipment = createAsyncThunk(
    'shipment/fetchShipmentData',
    async()=>{
        const response  = await axios.get('/json/shipmentData.json')
        return response.data
    }
)


const initialState ={
    shipment:[],
    loading:false,
    error:null
}

const shipmentSlice = createSlice({
    name:'shipment',
    initialState,
    reducers:{
        clearShipment:(state)=>{
            state.shipment = []
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(fetchShipment.pending,(state)=>{
                state.loading = true
                state.error = null
            })
            .addCase(fetchShipment.fulfilled,(state,action)=>{
                state.loading = false
                state.shipment = action.payload
            })
            .addCase(fetchShipment.rejected,(state,action)=>{
                state.loading = false
                state.error = action.error.message
            })
    }

})

export const {clearShipment} = shipmentSlice.actions
export default shipmentSlice.reducer