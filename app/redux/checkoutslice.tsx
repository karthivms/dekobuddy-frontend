import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { address } from '../types/types';
import { apiRequest } from '../api/apiConfig';

interface initialState {
    addresses: address[]
    status: "loading" | "success" | "failure",
    error: undefined
    activeStep: number
}

const initialState: initialState = {
    addresses: [],
    status: "loading",
    activeStep: 3,
    error: undefined
}


export const fetchAddress = createAsyncThunk<address[], number, { rejectValue: string }>('/checkout/fetchAddress', async (id, { rejectWithValue }) => {
    try {
        const response = await apiRequest(
            'GET', `http://localhost:3000/api/address`,
            null,
            {
                id: id
            });
        return response.data;

    } catch (error) {
        console.log(error);
        return [];
    }
})


const cartSlice = createSlice({
    name: "Checkout",
    initialState,
    reducers: {
        changeStep: (state, action) => {
            state.activeStep = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAddress.fulfilled, (state, action) => {
            state.addresses = action.payload;
            state.status = "success"
        })
    }
})

export const { changeStep } = cartSlice.actions;

export default cartSlice.reducer;
