import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    checkoutItems: ["wdw"],
    userAddress:{
        name: '',
        mobileNumber: '',
        pincode: '',
        locality: '',
        address: '',
        city: '',
        state: '',
        landmark: '',
        alternatePhone: '',
        addressType: 'home',
    },
    status: "loading",
    activeStep: 3,
    error: undefined
}

const cartSlice = createSlice({
    name: "Checkout",
    initialState,
    reducers: {
        changeStep: (state, action) => {
            state.activeStep = action.payload
        }
    }
})

export const { changeStep } = cartSlice.actions;

export default cartSlice.reducer;
