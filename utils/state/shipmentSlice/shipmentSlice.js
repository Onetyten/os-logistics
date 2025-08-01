import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchShipment = createAsyncThunk(
  'shipment/fetchShipmentData',
  async (_, thunkAPI) => {
    try {
      const res = await fetch('/json/shipmentData.json');

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error("Expected JSON but got:", contentType);
        return thunkAPI.rejectWithValue("Invalid content type");
      }

      const data = await res.json();

      if (!Array.isArray(data)) {
        console.error("Shipment data is not an array:", data);
        return thunkAPI.rejectWithValue("Invalid shipment data structure");
      }

      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Fetch error");
    }
  }
);


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
                state.shipment = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(fetchShipment.rejected,(state,action)=>{
                state.loading = false
                state.error = action.error.message
            })

    }

})

export const {clearShipment} = shipmentSlice.actions
export default shipmentSlice.reducer