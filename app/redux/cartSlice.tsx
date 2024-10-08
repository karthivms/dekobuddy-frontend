import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: ["wdw"],
    status: "loading",
    error: undefined
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
    }
})

export default cartSlice.reducer;
