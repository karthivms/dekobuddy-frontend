
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiRequest } from '../api/apiConfig';
import { RootState } from './store';
import { rating } from '../types/types';

interface initialState {
    status: "loading" | "failure" | "success"
    reviews: rating[]
}


const initialState: initialState = {
    status: 'loading',
    reviews: []
}


export const getReviews = createAsyncThunk<rating[], number, { rejectValue: string }>(
    "reviews/getreviews",
    async (productID, { rejectWithValue, getState }) => {

        const state = getState() as RootState;

        try {
            const response = await apiRequest(
                'GET', `${state.cart.url}/api/reviews`, null, {id : productID});
            return response.data;

        } catch (error) {
            console.log(error);
            return rejectWithValue('Failed to get reviews');
        }

    })


const ReviewSlice = createSlice({
    name: "Filter",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getReviews.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(getReviews.fulfilled, (state, action) => {
            state.status = "success";
            state.reviews = action.payload;

        });
        builder.addCase(getReviews.rejected, (state) => {
            state.status = "failure";
        })
    }
})



export default ReviewSlice.reducer;
