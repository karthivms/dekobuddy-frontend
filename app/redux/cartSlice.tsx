import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: [ {
        id: 1,
        name: "string",
        img_url: "string",
        props: "string",
        no_of_reviews: 4,
        price: 5,
        discount: 6
    }],
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
